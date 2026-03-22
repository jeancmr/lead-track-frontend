import { CustomAlertDialogDelete } from '@/components/custom/CustomAlertDialogDelete';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Client } from '@/interfaces/client.interface';
import { Edit2, Search, Trash2 } from 'lucide-react';
import { getStatusColor } from '../lib/get-status-color';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { useRef, type KeyboardEvent } from 'react';
import { Link, useSearchParams } from 'react-router';

interface Props {
  clients: Client[];
  totalClients: number;
  totalPages: number;
  onOpenDialog: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
}

export const ClientsTable = ({
  clients,
  totalClients,
  totalPages,
  onOpenDialog,
  onDeleteClient,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const search = searchParams.get('search') || '';

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const search = inputRef.current?.value;

    const newSearchParams = new URLSearchParams();

    if (!search) {
      newSearchParams.delete('search');
    } else {
      newSearchParams.set('search', search);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client List</CardTitle>
        <CardDescription>
          {totalClients} client{totalClients !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, or company..."
              ref={inputRef}
              onKeyDown={handleSearch}
              defaultValue={search}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {totalClients === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No clients yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                clients?.map((client) => (
                  <tr key={client.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      <Link to={`/clients/${client.id}`} className="hover:underline">
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{client.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{client.company}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{client.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}
                      >
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => onOpenDialog(client)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <CustomAlertDialogDelete
                        itemName={client.name}
                        onDeleteItem={() => onDeleteClient(client)}
                      >
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </CustomAlertDialogDelete>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      <CustomPagination totalPages={totalPages} />
    </Card>
  );
};
