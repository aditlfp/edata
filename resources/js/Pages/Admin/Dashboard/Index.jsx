import AdminLayout from "@/Layouts/AdminLayout";
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from "react";

function Index(props) {
 
  
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // To store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const employeeCounts = new Array(12).fill(0);
    props.employeesByMonth.forEach(item => {
      employeeCounts[item.month - 1] = item.employee_count; // Assuming "month" is 1-12
    });

    // Check if a chart instance already exists, destroy it to prevent reuse of the canvas
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the new chart instance and store it in chartInstanceRef
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
          label: 'Count Employe Per Month',
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

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);
  return <AdminLayout overflow={"overflow-hidden"}>
         <canvas ref={chartRef}></canvas>
  </AdminLayout>;
}

export default Index;
