import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import Fillable from "./Fillable-CD_jadOc.js";
import Readable from "./Readable-mB2VZ-71.js";
import { Helmet } from "react-helmet";
import "./header-BmokhI03.js";
import "./Footer-DSnh824x.js";
function ShowKontrak(props) {
  useEffect(() => {
    window.print();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("style", { children: `
                    @page {
                      size: 7in 10.5in;
		      margin:.5rem 0;
                    }
                    *, body {
                        font-family: 'Times New Roman', Times, serif;
                    }
		    @media print {
			footer {
				page-break-after: always;
			}		    

	            }
                ` }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "bg-black flex flex-col justify-center items-center w-full text-[12pt] font-[500] subpixel-antialiased text-justify flex-grow", children: [
      /* @__PURE__ */ jsx(Fillable, { props: props.contract, day: props.day, dateContract: props.day_contract }),
      /* @__PURE__ */ jsx(Readable, { props: props.contract })
    ] }) })
  ] });
}
export {
  ShowKontrak as default
};
