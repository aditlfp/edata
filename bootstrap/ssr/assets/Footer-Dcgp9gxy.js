import { jsx, Fragment, jsxs } from "react/jsx-runtime";
function Footer() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "footer",
    {
      style: { pageBreakInside: "avoid" },
      className: "w-full text-center py-4 fixed bottom-0",
      children: /* @__PURE__ */ jsxs("table", { className: "table-auto mx-auto border-collapse border", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "w-[70pt] border border-slate-600 font-normal", children: "Pihak 1" }),
          /* @__PURE__ */ jsx("th", { className: "w-[70pt] border border-slate-600 font-normal", children: "Pihak 2" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "h-[20pt] border border-slate-600" }),
          /* @__PURE__ */ jsx("td", { className: "h-[20pt] border border-slate-600" })
        ] }) })
      ] })
    }
  ) });
}
export {
  Footer as default
};
