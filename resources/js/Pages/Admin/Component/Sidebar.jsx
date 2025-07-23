import { Link, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BiChevronsRight,
  BiSolidLockOpenAlt,
  BiUserCheck,
} from "react-icons/bi";
import { BiCreditCard, BiDetail, BiExtension } from "react-icons/bi/index.esm";

function Sidebar({ link, value, children, open, props }) {
  const { post } = useForm({});

  const signOut = () => {
    post(route("logout"));
  };
  return (
    <>
      <div className="w-full flex items-center relative">
        <div className="bg-orange-100 w-full drop-shadow-sm min-h-screen justify-start items-start px-3">
          <div className="text-center font-black text-lg sm:text-xl bg-orange-600 p-5 rounded-b-lg shadow-sm text-white">
            <span>E-DATA</span>
          </div>
          <Link
            href={route(`${link}`)}
            className="bg-orange-300 flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm justify-between text-xs sm:text-sm cursor-pointer"
          >
            <div className="text-lg">{children}</div>
            {value}
          </Link>
          <Link
            href={route("accept-employe.index")}
            className="relative flex items-center justify-between bg-orange-300 hover:bg-orange-400 transition-all ease-in-out duration-150 rounded-md px-4 py-3 gap-x-4 text-sm font-semibold text-gray-800 hover:text-white"
          >
            <div className="flex items-center gap-x-2">
              <BiUserCheck className="text-xl" />
              <div className="flex flex-col leading-tight">
                <span>Verifikasi</span>
                <span className="-mt-1">Data</span>
              </div>
            </div>

            {props > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold uppercase text-white bg-rose-500 rounded-full shadow">
                {props} New
              </span>
            )}
          </Link>

          <Link
            href={route("slip-gaji.index")}
            className="bg-orange-300 flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm justify-between text-xs sm:text-sm cursor-pointer"
          >
            <div className="text-lg">{<BiCreditCard />}</div>
            Slip Gaji Bulanan
          </Link>
          <Link
            href={route("contracts.index")}
            className="bg-orange-300 flex justify-between hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm text-xs sm:text-sm cursor-pointer"
          >
            <div className="text-lg">{<BiDetail />}</div>
            Ajukan Kontrak
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="btn btn-sm rounded-sm text-xs sm:text-sm text-red-900 bg-red-400 hover:bg-red-500 w-full hover:text-white"
          >
            <BiSolidLockOpenAlt />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
