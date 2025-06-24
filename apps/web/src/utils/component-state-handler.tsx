interface IComponentStateHandlerProps {
  length?: string | undefined;
  error?: string | undefined;
  loading?: string | undefined;
}

export const ComponentStateHandler = ({ length, error, loading }: IComponentStateHandlerProps) => {
  const message = loading ?? error ?? length;

  if (!message) return null;

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[50dvh]">
      <p className="font-mono font-semibold">{message}</p>
    </div>
  );
};
