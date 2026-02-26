import { Button } from '@/components/ui/button';
import { getClientsAction } from '@/lead-track/actions/get-clients.action';

export const ClientsPage = () => {
  const listClients = async () => {
    await getClientsAction();
  };

  return (
    <div>
      <h2>ClientsPage</h2>
      <Button onClick={listClients}>Get clients</Button>
    </div>
  );
};
