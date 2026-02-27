import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useFetchClients } from '@/lead-track/hooks/useFetchClients';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Button } from '@/components/ui/button';
import { ClientsFormDialog } from '@/lead-track/components/ClientsFormDialog';
import { ClientsTable } from '@/lead-track/components/ClientsTable';
import { CustomJumbotron } from '@/lead-track/components/CustomJumbotron';
import type { Client } from '@/interfaces/client.interface';

export const ClientsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientSelected, setClientSelected] = useState<Client | null>();

  const { data, isLoading } = useFetchClients();

  if (isLoading) return <CustomFullScreenLoading />;

  const handleOpenDialog = (client: Client) => {
    setIsDialogOpen(true);
    setClientSelected(client);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setClientSelected(null);
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
      />

      <ClientsFormDialog
        client={clientSelected || null}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};
