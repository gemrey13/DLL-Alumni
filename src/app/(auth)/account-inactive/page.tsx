"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, LogOut, Mail } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function AccountInactivePage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <Card className="border-stroke/20 bg-white/95 backdrop-blur-sm text-center">
      <CardHeader className="pb-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-warning/10 mb-4">
          <Clock className="h-8 w-8 text-brand-warning" />
        </div>
        <h1 className="text-2xl font-bold text-[#1C2434]">
          Account Pending Verification
        </h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-body text-sm leading-relaxed">
          Your account is awaiting verification by the alumni office. An admin
          will review and activate your account once your alumni status is
          confirmed.
        </p>

        <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-left">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            What happens next?
          </h3>
          <ul className="text-xs text-blue-800 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              The admin will verify your identity against the alumni records.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              Once confirmed, your account will be activated automatically.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              You&apos;ll then have full access to the alumni portal features.
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-whiten border border-stroke p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-body">
            <Mail className="h-4 w-4 text-bodydark2" />
            <span>
              Need help? Contact{" "}
              <a
                href="mailto:alumni@dll.edu.ph"
                className="text-brand-primary font-medium hover:underline"
              >
                alumni@dll.edu.ph
              </a>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center pt-2">
        <Button
          onClick={handleLogout}
          variant="outline"
          disabled={isLoggingOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </Button>
      </CardFooter>
    </Card>
  );
}
