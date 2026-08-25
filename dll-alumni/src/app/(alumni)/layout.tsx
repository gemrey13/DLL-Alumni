import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AlumniHeader } from "@/components/shared/alumni-header";
import { Footer } from "@/components/shared/footer";

export default async function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <AlumniHeader user={user} />
      <main className="flex-1 bg-whiten">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
