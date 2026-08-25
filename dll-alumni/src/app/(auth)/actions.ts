"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types";
import type { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from "@/lib/validators/auth";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validators/auth";

export async function login(data: LoginFormData): Promise<ActionResponse<string>> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: "Invalid email or password" };
  }

  // Get user role for redirect
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Authentication failed" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = (profile as { role: string } | null)?.role ?? "alumni";
  return { success: true, data: role };
}

export async function signup(data: RegisterFormData): Promise<ActionResponse> {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { success: false, error: "An account with this email already exists" };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function forgotPassword(data: ForgotPasswordFormData): Promise<ActionResponse> {
  const parsed = forgotPasswordSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid email" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function resetPassword(data: ResetPasswordFormData): Promise<ActionResponse> {
  const parsed = resetPasswordSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function logout(): Promise<ActionResponse> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return { success: true };
}
