import type { Client } from '@/interfaces/client.interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusColor } from '../lib/get-status-color';

interface Props {
  client: Client;
}

export const ClientDetails = ({ client }: Props) => {
  return (
    <div className="md:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{client.name}</CardTitle>
          <CardDescription>{client.company}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-slate-500 font-medium">Status</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(client.status)}`}
            >
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Email</p>
            <a
              href={`mailto:${client.email}`}
              className="text-slate-900 hover:text-slate-700 break-all"
            >
              {client.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Phone</p>
            <a href={`tel:${client.phone}`} className="text-slate-900 hover:text-slate-700">
              {client.phone || 'N/A'}
            </a>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Added</p>
            <p className="text-slate-900">{new Date(client.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
