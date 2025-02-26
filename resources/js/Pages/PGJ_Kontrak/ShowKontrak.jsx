import React, { useEffect } from 'react'
import Fillable from '../Admin/Component/Fillable'
import Readable from '../Admin/Component/Readable'
import { Helmet } from 'react-helmet'

function ShowKontrak(props) {

  useEffect(() => {
    window.print()
  }, [])

  return (
    <>
      <Helmet>
            <style>
                {`
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
                `}
            </style>
      </Helmet>
      <div className="flex flex-col min-h-screen">
      <div className="bg-black flex flex-col justify-center items-center w-full text-[12pt] font-[500] subpixel-antialiased text-justify flex-grow">
        <Fillable props={props.contract} day={props.day} dateContract={props.day_contract}/>
        <Readable props={props.contract}/>
      </div>
    </div>
    </>
  )
}

export default ShowKontrak