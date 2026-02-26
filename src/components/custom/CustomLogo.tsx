import { Link } from 'react-router';

export const CustomLogo = () => {
  return (
    <Link to="/" className="shrink-0 flex items-center">
      <h1 className="text-xl font-bold text-slate-900">Lead Track</h1>
    </Link>
  );
};
