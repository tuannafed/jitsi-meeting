import { Icons } from '@/components/icons';

type CardWrapperHeaderProps = {
  title?: string;
  label: string;
};

export const CardWrapperHeader = ({ title, label }: CardWrapperHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <Icons.video className="w-10 h-10 mr-1" />
        <h1 className="text-3xl font-semibold text-primary">{title || 'Auth'}</h1>
      </div>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
