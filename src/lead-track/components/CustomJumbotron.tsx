import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle: string;
  children?: ReactNode;
}
export const CustomJumbotron = ({ title, subtitle, children }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      {children}
    </div>
  );
};
