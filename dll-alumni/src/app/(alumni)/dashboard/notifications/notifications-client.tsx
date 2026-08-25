"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { formatRelativeTime, cn } from "@/lib/utils";

interface Props {
  notifications: any[];
  userId: string;
}

export function NotificationsClient({ notifications: initial, userId }: Props) {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications(userId);
  const router = useRouter();

  // Use real-time data if available, otherwise fallback to server-fetched
  const items = notifications.length > 0 ? notifications : initial;

  function handleClick(notif: any) {
    if (!notif.read) {
      markAsRead(notif.id);
    }
    if (notif.metadata?.link) {
      router.push(notif.metadata.link as string);
    }
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-1">
            <Check className="h-3 w-3" /> Mark all as read
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((notif: any) => (
          <button
            key={notif.id}
            onClick={() => handleClick(notif)}
            className={cn(
              "w-full text-left rounded-lg border p-4 transition-colors",
              notif.read
                ? "border-stroke bg-white"
                : "border-brand-primary/20 bg-brand-primary/5"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "mt-0.5 h-2 w-2 rounded-full shrink-0",
                notif.read ? "bg-transparent" : "bg-brand-primary"
              )} />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-[#1C2434]">{notif.title}</h4>
                {notif.body && (
                  <p className="text-xs text-body mt-0.5 line-clamp-2">{notif.body}</p>
                )}
                <p className="text-xs text-bodydark2 mt-1">{formatRelativeTime(notif.created_at)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
