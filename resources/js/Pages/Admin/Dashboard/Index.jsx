import AdminLayout from "@/Layouts/AdminLayout";
import { Chart } from "chart.js/auto";
import { Head } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { BiBarChartAlt2, BiGroup, BiUser } from "react-icons/bi";

function Index(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // To store the chart instance

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    const employeeCounts = new Array(12).fill(0);
    props.employeesByMonth.forEach((item) => {
      employeeCounts[item.month - 1] = item.employee_count; // Assuming "month" is 1-12
    });

    // Check if a chart instance already exists, destroy it to prevent reuse of the canvas
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create the new chart instance and store it in chartInstanceRef
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ],
        datasets: [
          {
            label: "Jumlah karyawan",
            data: employeeCounts,
            backgroundColor: "#f97316",
            borderRadius: 6,
            maxBarThickness: 34,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);
  const totalEmployees = (props.employeesByMonth || []).reduce(
    (sum, item) => sum + Number(item.employee_count || 0),
    0,
  );

  return (
    <AdminLayout overflow="overflow-auto">
      <Head title="Admin Dashboard" />
      <main className="mx-auto max-w-7xl px-2 py-4 sm:px-4 sm:py-6">
        <section className="rounded-2xl bg-gradient-to-br from-orange-600 to-orange-500 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-medium text-orange-100">
            Ringkasan operasional
          </p>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">
            Dashboard Admin
          </h1>
          <p className="mt-2 text-sm text-orange-100">
            Pantau pertumbuhan data karyawan sepanjang tahun.
          </p>
        </section>
        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <BiGroup className="mb-3 rounded-lg bg-orange-100 p-2 text-4xl text-orange-600" />
            <p className="text-sm text-slate-500">Total data karyawan</p>
            <p className="mt-1 text-3xl font-black text-slate-800">
              {props.totalEmploye ?? 0}
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <BiUser className="mb-3 rounded-lg bg-slate-100 p-2 text-4xl text-slate-700" />
            <p className="text-sm text-slate-500">Total users</p>
            <p className="mt-1 text-3xl font-black text-slate-800">
              {props.totalUsers ?? 0}
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <BiBarChartAlt2 className="mb-3 rounded-lg bg-slate-100 p-2 text-4xl text-slate-700" />
            <p className="text-sm text-slate-500">Periode laporan</p>
            <p className="mt-1 text-lg font-bold text-slate-800">
              {new Date().getFullYear()}
            </p>
          </article>
        </section>
        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="font-bold text-slate-800">Pertumbuhan karyawan</h2>
            <p className="mt-1 text-sm text-slate-500">
              Jumlah data berdasarkan bulan.
            </p>
          </div>
          <div className="relative h-[320px] sm:h-[380px]">
            <canvas ref={chartRef} />
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}

export default Index;
