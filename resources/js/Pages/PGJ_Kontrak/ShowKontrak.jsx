import React, { useEffect } from "react";
import Fillable from "../Admin/Component/Fillable";
import Readable from "../Admin/Component/Readable";
import { Helmet } from "react-helmet";

function ShowKontrak(props) {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <Helmet>
        <title>Kontrak - SAC</title>
        <style>
          {`
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
    `}
        </style>
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <div className="bg-black flex flex-col justify-center items-center font-serif w-full font-medium subpixel-antialiased text-justify flex-grow">
          <Fillable
            props={props.contract}
            day={props.day}
            dateContract={props.day_contract}
          />
          <Readable props={props.contract} />
        </div>
      </div>
    </>
  );
}

export default ShowKontrak;
