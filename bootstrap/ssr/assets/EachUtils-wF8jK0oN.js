import { jsx } from "react/jsx-runtime";
import { Children } from "react";
const EachUtils = ({ of, render, colspan }) => {
  if (of.length <= 0) {
    return /* @__PURE__ */ jsx("tr", { className: "w-full", children: /* @__PURE__ */ jsx("td", { colSpan: colspan ? colspan : 0, className: "text-center italic text-gray-400 text-lg border-[1px] border-orange-300 ", children: "- Data Saat Ini Masih Belum Tersedia -" }) });
  }
  return Children.toArray(of.map((item, index) => render(item, index)));
};
const EachUtils$1 = EachUtils;
export {
  EachUtils$1 as E
};
