import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useForm, Link } from "@inertiajs/react";
import "react";
import { BiCreditCard, BiDetail, BiSolidLockOpenAlt } from "react-icons/bi/index.esm.js";
function Sidebar({ link, value, children, open }) {
  const { post } = useForm({});
  const signOut = () => {
    post(route("logout"));
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex items-center relative", children: /* @__PURE__ */ jsxs("div", { className: "bg-orange-100 w-full drop-shadow-sm min-h-screen justify-start items-start px-3", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center font-black text-lg sm:text-xl bg-orange-600 p-5 rounded-b-lg shadow-sm text-white", children: /* @__PURE__ */ jsx("span", { children: "E-DATA" }) }),
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route(`${link}`),
        className: "bg-orange-300 flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm justify-between text-xs sm:text-sm cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg", children }),
          value
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("slip-gaji.index"),
        className: "bg-orange-300 flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm justify-between text-xs sm:text-sm cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg", children: /* @__PURE__ */ jsx(BiCreditCard, {}) }),
          "Slip Gaji Bulanan"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("contracts.index"),
        className: "bg-orange-300 flex justify-between hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm text-xs sm:text-sm cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg", children: /* @__PURE__ */ jsx(BiDetail, {}) }),
          "Ajukan Kontrak"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => signOut(),
        className: "btn btn-sm rounded-sm text-xs sm:text-sm text-red-900 bg-red-400 hover:bg-red-500 w-full hover:text-white",
        children: [
          /* @__PURE__ */ jsx(BiSolidLockOpenAlt, {}),
          "Sign Out"
        ]
      }
    )
  ] }) }) });
}
export {
  Sidebar as default
};
