import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 py-8">
      <Link
        href="/"
        className="mb-8 text-2xl font-bold text-white hover:text-brand-accent transition-colors"
      >
        DLL Alumni Association
      </Link>
      <div className="w-full max-w-md">{children}</div>
      <p className="mt-8 text-sm text-bodydark2">
        &copy; {new Date().getFullYear()} Dalubhasaan ng Lungsod ng Lucena
      </p>
    </div>
  );
}
