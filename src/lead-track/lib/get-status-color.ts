export const getStatusColor = (status: string) => {
  switch (status) {
    case 'lead':
      return 'bg-amber-100 text-amber-800';
    case 'contacted':
      return 'bg-cyan-100 text-cyan-800';
    case 'negotiating':
      return 'bg-orange-100 text-orange-800';
    case 'closed':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};
