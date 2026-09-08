export type SaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

/** Serialize writes so a slow older save cannot overwrite newer writing. */
export class JournalAutosave {
  private pending: string | undefined;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private running: Promise<boolean> | undefined;
  private disposed = false;

  constructor(
    private persist: (text: string) => Promise<void>,
    private onStatus: (status: SaveStatus, error?: unknown) => void,
    private delay = 800
  ) {}

  schedule(text: string) {
    if (this.disposed) return;
    this.pending = text;
    this.onStatus('pending');
    clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(), this.delay);
  }

  flush(): Promise<boolean> {
    clearTimeout(this.timer);
    if (this.disposed) return Promise.resolve(false);
    if (this.running) return this.running;
    if (this.pending === undefined) return Promise.resolve(true);
    this.running = this.drain().finally(() => {
      this.running = undefined;
    });
    return this.running;
  }

  private async drain(): Promise<boolean> {
    while (!this.disposed && this.pending !== undefined) {
      const value = this.pending;
      this.pending = undefined;
      this.onStatus('saving');
      try {
        await this.persist(value);
      } catch (error) {
        if (!this.disposed) {
          if (this.pending === undefined) this.pending = value;
          this.onStatus('error', error);
        }
        return false;
      }
    }
    if (!this.disposed) this.onStatus('saved');
    return !this.disposed;
  }

  dispose() {
    this.disposed = true;
    this.pending = undefined;
    clearTimeout(this.timer);
  }
}
