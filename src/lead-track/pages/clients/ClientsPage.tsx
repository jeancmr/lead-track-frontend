import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useClients } from '@/lead-track/hooks/useClients';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Button } from '@/components/ui/button';
import { ClientsFormDialog } from '@/lead-track/components/ClientsFormDialog';
import { ClientsTable } from '@/lead-track/components/ClientsTable';
import { CustomJumbotron } from '@/lead-track/components/CustomJumbotron';
import type { Client } from '@/interfaces/client.interface';
import type { ClientFormValues } from '@/lead-track/schemas/client-base.schema';

export const ClientsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientSelected, setClientSelected] = useState<Client | null>();

  const { data, isLoading, mutation, deleteMutation } = useClients();

  if (isLoading) return <CustomFullScreenLoading />;

  const handleOpenDialog = (client: Client) => {
    setIsDialogOpen(true);
    setClientSelected(client);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setClientSelected(null);
  };

  const handleSubmit = async (clientData: ClientFormValues) => {
    await mutation.mutateAsync(clientData, {
      onSuccess: (data) => {
        handleCloseDialog();
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteClient = async (client: Client) => {
    await deleteMutation.mutateAsync(client.id, {
      onSuccess: () => toast.success(`Client ${client.name} deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <div className="space-y-6">
      <CustomJumbotron title="Clients" subtitle="Manage your client list and track their status">
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </CustomJumbotron>

      {isLoading && <CustomFullScreenLoading />}

      <ClientsTable
        clients={data?.clients || []}
        totalClients={data?.meta.total || 0}
        onOpenDialog={handleOpenDialog}
        onDeleteClient={handleDeleteClient}
      />

      <ClientsFormDialog
        client={clientSelected || null}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleCloseDialog={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
