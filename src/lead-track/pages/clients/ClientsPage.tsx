import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getClientsAction } from '@/lead-track/actions/get-clients.action';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { getStatusColor } from '@/lead-track/lib/get-status-color';
import { CustomJumbotron } from '@/lead-track/components/CustomJumbotron';

export const ClientsPage = () => {
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const limit = Number(searchParams.get('limit')) || 9;
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';

  const { data, isLoading } = useQuery({
    queryKey: ['clients', { limit, page, search, status }],
    queryFn: () => getClientsAction({ limit, page, search, status }),
    staleTime: 1000 * 6 * 5,
  });

  const clients = data?.clients;
  const totalClients = data?.meta.total;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <CustomJumbotron title="Clients" subtitle="Manage your client list and track their status">
        <Button onClick={handleOpenDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </CustomJumbotron>

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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {isLoading && <CustomFullScreenLoading />}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {totalClients === 0 && !isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No clients yet. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  clients?.map((client) => (
                    <tr key={client.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {client.name}
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
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>Fill in the details to create a new client</DialogDescription>
          </DialogHeader>
          <form onSubmit={() => console.log('form submmited')} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="lead">Lead</option>
                <option value="contacted">Contacted</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">Create Client</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
