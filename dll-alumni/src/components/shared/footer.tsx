import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stroke bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-[#1C2434] mb-2">
              DLL Alumni Association
            </h3>
            <p className="text-sm text-body">
              Dalubhasaan ng Lungsod ng Lucena — Empowering Education,
              Connecting Alumni.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1C2434] mb-2">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-1">
              <Link href="/news" className="text-sm text-body hover:text-brand-primary">
                News &amp; Updates
              </Link>
              <Link href="/events" className="text-sm text-body hover:text-brand-primary">
                Events
              </Link>
              <Link href="/login" className="text-sm text-body hover:text-brand-primary">
                Sign In
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#1C2434] mb-2">
              Contact
            </h4>
            <p className="text-sm text-body">
              Dalubhasaan ng Lungsod ng Lucena
              <br />
              Lucena City, Quezon Province
              <br />
              Philippines
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-stroke pt-4 text-center">
          <p className="text-xs text-bodydark2">
            &copy; {new Date().getFullYear()} DLL Alumni Association. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
