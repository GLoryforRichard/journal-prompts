'use client';

import React from 'react';

import type { ApiKey } from 'better-auth/client/plugins';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/formatter';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth-client';

function TableRowSkeleton({ columns }: { columns: number }) {
  return (
    <TableRow className="h-14">
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index} className="py-3">
          <Skeleton className="h-4 w-24" />
        </TableCell>
      ))}
    </TableRow>
  );
}

type ApiKeyListResponse = {
  apiKeys: Array<Omit<ApiKey, 'key'>>;
  total: number;
};

export function ApiKeysPageClient() {
  const t = useTranslations('Dashboard.settings.apiKeys');

  const [apiKeys, setApiKeys] = useState<Array<Omit<ApiKey, 'key'>>>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const result = await authClient.apiKey.list({
        query: {
          limit: pageSize,
          offset: pageIndex * pageSize,
          sortBy: 'createdAt',
          sortDirection: 'desc',
        },
      });
      if ('data' in result && result.data) {
        const data = result.data as unknown as ApiKeyListResponse;
        setApiKeys(data.apiKeys);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch API keys, error:', error);
      toast.error(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch API keys on mount and when pagination changes
  React.useEffect(() => {
    fetchApiKeys();
  }, [pageIndex, pageSize]);

  const columns: ColumnDef<Omit<ApiKey, 'key'>>[] = useMemo(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} label={t('columns.name')} />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <span className="font-medium">{row.original.name}</span>
            </div>
          );
        },
        meta: {
          label: t('columns.name'),
        },
        minSize: 120,
        size: 140,
      },
      {
        id: 'prefix',
        accessorKey: 'prefix',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} label={t('columns.prefix')} />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {row.original.prefix}
              </Badge>
            </div>
          );
        },
        meta: {
          label: t('columns.prefix'),
        },
        minSize: 100,
        size: 120,
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            label={t('columns.createdAt')}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              {formatDate(row.original.createdAt)}
            </div>
          );
        },
        meta: {
          label: t('columns.createdAt'),
        },
        minSize: 140,
        size: 160,
      },
      {
        id: 'expiresAt',
        accessorKey: 'expiresAt',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            label={t('columns.expiresAt')}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              {row.original.expiresAt
                ? formatDate(row.original.expiresAt)
                : t('never')}
            </div>
          );
        },
        meta: {
          label: t('columns.expiresAt'),
        },
        minSize: 140,
        size: 160,
      },
      {
        id: 'actions',
        header: t('columns.actions'),
        cell: ({ row }) => {
          const keyId = row.original.id;
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(keyId)}
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          );
        },
        meta: {
          label: t('columns.actions'),
        },
        minSize: 80,
        size: 100,
      },
    ],
    [t]
  );

  const handleDelete = async (keyId: string) => {
    try {
      await authClient.apiKey.delete({ keyId });
      toast.success(t('deleteSuccess'));
      fetchApiKeys();
    } catch (error) {
      console.error('Failed to delete API key, error:', error);
      toast.error(t('deleteError'));
    }
  };

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      toast.error(t('nameRequired'));
      return;
    }

    setCreating(true);
    try {
      const result = await authClient.apiKey.create({
        name: newKeyName.trim(),
      });

      if ('data' in result && result.data) {
        toast.success(t('createSuccess'));
        setCreateDialogOpen(false);
        setNewKeyName('');
        fetchApiKeys();
      }
    } catch (error) {
      console.error('Failed to create API key, error:', error);
      toast.error(t('createError'));
    } finally {
      setCreating(false);
    }
  };

  const table = useReactTable({
    data: apiKeys,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      sorting,
      columnFilters: [],
      columnVisibility: {},
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(next);
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      if (next.pageSize !== pageSize) {
        setPageSize(next.pageSize);
        setPageIndex(0);
      } else if (next.pageIndex !== pageIndex) {
        setPageIndex(next.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: false,
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 size-4" />
              {t('createButton')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createDialogTitle')}</DialogTitle>
              <DialogDescription>
                {t('createDialogDescription')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="key-name">{t('keyNameLabel')}</Label>
                <Input
                  id="key-name"
                  placeholder={t('keyNamePlaceholder')}
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  disabled={creating}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
                disabled={creating}
              >
                {t('cancel')}
              </Button>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? t('creating') : t('create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading || !table.getRowModel() || !columns.length ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <TableRowSkeleton key={index} columns={columns.length || 5} />
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="h-14"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t('noResults')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} className="px-0" />
      </div>
    </div>
  );
}
