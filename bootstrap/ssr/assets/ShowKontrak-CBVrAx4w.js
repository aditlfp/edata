import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import Fillable from "./Fillable--shmwKfY.js";
import Readable from "./Readable-D81Hgf8P.js";
import { Helmet } from "react-helmet";
import "./header-BmokhI03.js";
import "./Footer-Dcgp9gxy.js";
function ShowKontrak(props) {
  useEffect(() => {
    window.print();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Kontrak - SAC" }),
      /* @__PURE__ */ jsx("style", { children: `
      @page {
        // size: 8.5in 11in;
        margin: 0in; /* Use 'in' instead of 'rem' for print layout */
        line-height: 1;
      }

      body {
        font-family: "Times", serif;
        font-size: 11pt;
        font-weight: 500;
        font-stretch: condensed;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      img {
        height: 4.1cm;
        width: 20.4cm;
        object-fit: contain;
      }

      p {
        margin: 0;
      }

      td {
        line-height: 1.25;
      }

      @media print {
        /* Add print-specific styles here if needed */
      }
    ` })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "bg-black flex flex-col justify-center items-center font-serif w-full font-medium subpixel-antialiased text-justify flex-grow", children: [
      /* @__PURE__ */ jsx(
        Fillable,
        {
          props: props.contract,
          day: props.day,
          dateContract: props.day_contract
        }
      ),
      /* @__PURE__ */ jsx(Readable, { props: props.contract })
    ] }) })
  ] });
}
export {
  ShowKontrak as default
};
