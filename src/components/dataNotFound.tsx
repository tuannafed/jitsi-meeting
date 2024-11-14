import { FileQuestion } from 'lucide-react';

interface IDataNotFoundProps {
  message?: string;
  suggestion?: string;
}

export function DataNotFound({
  message = 'No data found',
  suggestion = 'Try adjusting your search or filters',
}: IDataNotFoundProps = {}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileQuestion className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-primary mb-1">{message}</h2>
      <p className="text-muted-foreground text-sm">{suggestion}</p>
    </div>
  );
}
