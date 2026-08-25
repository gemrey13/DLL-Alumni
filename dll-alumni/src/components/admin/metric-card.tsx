import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: "primary" | "success" | "warning" | "secondary";
  trend?: number | null;
}

const colorClasses = {
  primary: "bg-brand-primary/10 text-brand-primary",
  success: "bg-brand-success/10 text-brand-success",
  warning: "bg-brand-warning/10 text-brand-warning",
  secondary: "bg-brand-secondary/10 text-brand-secondary",
};

export function MetricCard({ title, value, icon, color = "primary", trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-stroke bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-bodydark2">{title}</h3>
          <p className="mt-2 text-2xl font-bold text-[#1C2434]">
            {value.toLocaleString()}
          </p>
          {trend !== undefined && trend !== null && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend >= 0 ? "text-brand-success" : "text-brand-danger"
              )}
            >
              {trend >= 0 ? "+" : ""}{trend.toFixed(1)}% from last year
            </p>
          )}
        </div>
        <div className={cn("rounded-full p-3", colorClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
