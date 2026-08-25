interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1C2434]">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-body">{description}</p>
        )}
      </div>
      {children && <div className="mt-3 sm:mt-0">{children}</div>}
    </div>
  );
}
