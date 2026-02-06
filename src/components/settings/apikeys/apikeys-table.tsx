'use client';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ApiKey } from '@/db/types';
import { formatDate } from '@/lib/formatter';
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

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

interface ApiKeysTableProps {
  data: ApiKey[];
  total: number;
  pageIndex: number;
  pageSize: number;
  loading?: boolean;
  creating?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onDelete: (keyId: string) => void;
  onCreate: (name: string) => void;
}

export function ApiKeysTable({
  data,
  total,
  pageIndex,
  pageSize,
  loading,
  creating,
  onPageChange,
  onPageSizeChange,
  onDelete,
  onCreate,
}: ApiKeysTableProps) {
  const t = useTranslations('Dashboard.settings.apiKeys');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Table columns definition
  const columns: ColumnDef<ApiKey>[] = useMemo(
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
        id: 'start',
        accessorKey: 'start',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} label={t('columns.prefix')} />
        ),
        cell: ({ row }) => {
          const start = row.original.start;
          return (
            <div className="flex items-center gap-2">
              {start ? (
                <Badge variant="outline" className="font-mono text-xs">
                  {start}...
                </Badge>
              ) : (
                '-'
              )}
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
                onClick={() => onDelete(keyId)}
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
    [t, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      sorting,
      columnFilters: [],
      columnVisibility,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      if (next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
        if (pageIndex !== 0) onPageChange(0);
      } else if (next.pageIndex !== pageIndex) {
        onPageChange(next.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: false,
  });

  const handleCreate = () => {
    if (!newKeyName.trim()) return;
    onCreate(newKeyName.trim());
    setNewKeyName('');
    setCreateDialogOpen(false);
  };

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
              {loading ? (
                // show skeleton rows while loading
                Array.from({ length: pageSize }).map((_, index) => (
                  <TableRowSkeleton key={index} columns={columns.length} />
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
