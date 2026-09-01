import { Link, useForm } from "@inertiajs/react";
import { BiSolidLockOpenAlt, BiCreditCard, BiHome } from "react-icons/bi";

function Sidebar() {
  const { post } = useForm({});

  const signOut = () => {
    post(route("logout"));
  };
  return (
    <>
      <div className="w-full flex items-center relative">
        <div className="bg-orange-100 w-full drop-shadow-sm min-h-screen justify-start items-start px-3">
          <div className="flex min-h-screen w-full flex-col bg-orange-50 px-3 pb-4">
            <div className="-mx-3 rounded-b-xl bg-orange-600 px-4 py-5 text-center text-xl font-black tracking-wide text-white shadow-sm">
              E-DATA
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-orange-100">
                Admin Panel
              </p>
            </div>
            <nav aria-label="Admin navigation" className="mt-8 space-y-2">
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700/70">
                Menu utama
              </p>
              <Link
                href={route("admin.dashboard")}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm ${route().current("admin.dashboard") ? "bg-orange-600 text-white shadow-sm" : "text-slate-700 hover:bg-orange-200"}`}
              >
                <BiHome className="shrink-0 text-xl" />
                Dashboard
              </Link>
              <Link
                href={route("slip-gaji.index")}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm ${route().current("slip-gaji.*") || route().current("editSlip") ? "bg-orange-600 text-white shadow-sm" : "text-slate-700 hover:bg-orange-200"}`}
              >
                <BiCreditCard className="shrink-0 text-xl" />
                Slip Gaji Bulanan
              </Link>
            </nav>
            <div className="mt-auto pt-8">
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-100 px-3 py-2.5 text-xs font-bold text-red-800 transition-colors hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm"
              >
                <BiSolidLockOpenAlt className="text-lg" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
