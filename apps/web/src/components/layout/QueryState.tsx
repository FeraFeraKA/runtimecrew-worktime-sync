import { Button } from "@/components/ui/button";

interface IQueryStateProps {
  error?: unknown;
  onRetry?: () => void;
}

export const QueryLoadingState = () => {
  return (
    <section className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
      Загрузка данных...
    </section>
  );
};

export const QueryErrorState = ({ error, onRetry }: IQueryStateProps) => {
  const message = error instanceof Error ? error.message : "Не удалось загрузить данные";

  return (
    <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 text-center">
      <div>
        <h2 className="text-lg font-semibold">Не удалось загрузить данные</h2>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          Повторить
        </Button>
      ) : null}
    </section>
  );
};
