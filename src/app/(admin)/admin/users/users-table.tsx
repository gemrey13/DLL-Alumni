"use client";

import { useState } from "react";
import { updateUserStatus, updateUserRole } from "./actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Shield, User } from "lucide-react";
import { toast } from "sonner";

interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  role: "admin" | "alumni";
  status: "active" | "inactive";
  avatar_url: string | null;
  created_at: string;
}

interface UsersTableProps {
  users: UserRow[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusToggle(userId: string, currentStatus: "active" | "inactive") {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setLoadingId(userId);

    const result = await updateUserStatus(userId, newStatus);

    if (!result.success) {
      toast.error(result.error as string);
    } else {
      toast.success(
        newStatus === "active"
          ? "User activated successfully."
          : "User deactivated."
      );
    }

    setLoadingId(null);
  }

  async function handleRoleToggle(userId: string, currentRole: "admin" | "alumni") {
    const newRole = currentRole === "admin" ? "alumni" : "admin";
    setLoadingId(userId);

    const result = await updateUserRole(userId, newRole);

    if (!result.success) {
      toast.error(result.error as string);
    } else {
      toast.success(`Role changed to ${newRole}.`);
    }

    setLoadingId(null);
  }

  return (
    <div className="rounded-lg border border-stroke bg-white overflow-hidden">
      {/* Summary bar */}
      <div className="flex items-center gap-4 border-b border-stroke px-6 py-3 bg-whiten">
        <span className="text-sm text-body">
          Total: <strong className="text-[#1C2434]">{users.length}</strong>
        </span>
        <span className="text-sm text-body">
          Active:{" "}
          <strong className="text-brand-success">
            {users.filter((u) => u.status === "active").length}
          </strong>
        </span>
        <span className="text-sm text-body">
          Pending:{" "}
          <strong className="text-brand-warning">
            {users.filter((u) => u.status === "inactive").length}
          </strong>
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stroke bg-whiten/50">
              <th className="px-6 py-3 text-left font-medium text-bodydark2">Name</th>
              <th className="px-6 py-3 text-left font-medium text-bodydark2">Role</th>
              <th className="px-6 py-3 text-left font-medium text-bodydark2">Status</th>
              <th className="px-6 py-3 text-left font-medium text-bodydark2">Registered</th>
              <th className="px-6 py-3 text-right font-medium text-bodydark2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-stroke last:border-0 hover:bg-whiten/30 transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-semibold text-xs shrink-0">
                      {user.first_name?.[0]}
                      {user.last_name?.[0]}
                    </div>
                    <div>
                      <p className="font-medium text-[#1C2434]">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4">
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      user.role === "admin"
                        ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    )}
                  >
                    {user.role === "admin" ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <User className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </Badge>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      user.status === "active"
                        ? "bg-green-50 text-brand-success border-green-200"
                        : "bg-amber-50 text-brand-warning border-amber-200"
                    )}
                  >
                    {user.status === "active" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {user.status === "active" ? "Active" : "Pending"}
                  </Badge>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-body">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant={user.status === "active" ? "outline" : "default"}
                      className={cn(
                        "text-xs h-7",
                        user.status === "inactive" &&
                          "bg-brand-success hover:bg-brand-success/90 text-white"
                      )}
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      disabled={loadingId === user.id}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleRoleToggle(user.id, user.role)}
                      disabled={loadingId === user.id}
                    >
                      {user.role === "admin" ? "Set Alumni" : "Set Admin"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
