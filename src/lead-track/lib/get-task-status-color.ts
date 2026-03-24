export const getTaskStatusColor = (status: string) => {
  switch (status) {
    case 'to-do':
      return 'text-slate-500';
    case 'in-progress':
      return 'text-amber-500';
    case 'done':
      return 'text-emerald-500';
    default:
      return 'text-slate-400';
  }
};
