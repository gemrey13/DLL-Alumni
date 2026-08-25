"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/actions";

interface AdminHeaderProps {
  user: {
    first_name: string;
    last_name: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : "A";

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stroke bg-white px-4 md:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-bodydark2 hidden md:block">
          Admin Panel
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Link
          href="/admin/notifications"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "relative"
          )}
        >
          <Bell className="h-5 w-5 text-body" />
          <span className="sr-only">Notifications</span>
        </Link>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 rounded-lg hover:bg-muted outline-none transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-primary text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm font-medium text-[#1C2434]">
              {user?.first_name} {user?.last_name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard")}>
              <User className="h-4 w-4 mr-2" /> Alumni View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
