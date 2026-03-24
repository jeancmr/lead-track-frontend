import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export const BacktoClientList = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline" onClick={() => navigate('/clients')}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Clients
    </Button>
  );
};
