import { describe, expect, it } from 'vitest';
import { formatJournalExport } from './journal-export';

describe('local journal export', () => {
  it('includes every supplied entry with exact multiline writing, question and date', () => {
    const output = formatJournalExport([
      {
        promptId: 'first',
        promptText: 'Question one?',
        text: 'First line\nSecond line',
        savedAt: '2026-09-14T12:00:00Z',
      },
      {
        promptId: 'second',
        promptText: 'Question two?',
        text: 'Another reflection',
        savedAt: '',
        pendingSync: true,
      },
    ]);
    expect(output).toContain('2 entries');
    expect(output).toContain('Question one?\n\nFirst line\nSecond line');
    expect(output).toContain('2026-09-14T12:00:00Z');
    expect(output).toContain('Question two?\n\nAnother reflection');
    expect(output).toContain('cloud sync pending');
  });
  it('does not read local storage or include entries outside the current view', () => {
    const selected = [
      {
        promptId: 'current-account',
        promptText: 'Current question',
        text: 'Current account writing',
        savedAt: '',
      },
    ];
    const output = formatJournalExport(selected);
    expect(output).toContain('1 entry');
    expect(output).toContain('Current account writing');
    expect(output).not.toContain('current-account');
  });
});
