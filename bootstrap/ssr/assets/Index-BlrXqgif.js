import { jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BmQ_mfkc.js";
import { Chart } from "chart.js/auto";
import { useRef, useEffect } from "react";
import "./Sidebar-k6Fk2Fmb.js";
import "@inertiajs/react";
import "react-icons/bi/index.esm.js";
import "framer-motion";
import "react-toastify";
function Index(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const employeeCounts = new Array(12).fill(0);
    props.employeesByMonth.forEach((item) => {
      employeeCounts[item.month - 1] = item.employee_count;
    });
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        datasets: [{
          label: "Count Employe Per Month",
          data: employeeCounts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);
  return /* @__PURE__ */ jsx(AdminLayout, { overflow: "overflow-hidden", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) });
}
export {
  Index as default
};
