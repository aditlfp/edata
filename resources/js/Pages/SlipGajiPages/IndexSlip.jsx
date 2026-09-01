import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { useEffect, useRef, useState } from "react";
import { FaCalendarCheck, FaCheck, FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import EachUtils from "@/lib/utils/EachUtils";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BsShieldFillExclamation } from "react-icons/bs";
import { FaCalendarXmark, FaCircleCheck } from "react-icons/fa6";
import { RiCloseCircleFill, RiFileCloseFill } from "react-icons/ri";
import { MdRadioButtonChecked } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidCloudDownload } from "react-icons/bi";

export default function IndexSlip(props) {
  const { data, setData, post, get, errors } = useForm({
    mitra: null,
    bulan: null,
    route: "",
    file: "",
  });
  const { flash } = usePage().props;
  useEffect(() => {
    if (flash?.success) toast.success(flash.success, { theme: "colored" });
    if (flash?.error) toast.error(flash.error, { theme: "colored" });
  }, [flash]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const monthNames = [
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
  ];
  const selectedMonth = data.bulan?.split("-")[1];
  const selectedYear = data.bulan?.split("-")[0];
  const [mitraSearch, setMitraSearch] = useState("");
  const [mitraOpen, setMitraOpen] = useState(false);
  const mitraRef = useRef(null);
  const monthPickerRef = useRef(null);

  useEffect(() => {
    const closePickers = (event) => {
      if (!mitraRef.current?.contains(event.target)) setMitraOpen(false);
      if (!monthPickerRef.current?.contains(event.target))
        setMonthPickerOpen(false);
    };
    document.addEventListener("mousedown", closePickers);
    return () => document.removeEventListener("mousedown", closePickers);
  }, []);

  const chooseFile = (file) => {
    if (!file) return;
    const allowed = ["xls", "xlsx", "csv"];
    if (!allowed.includes(file.name.split(".").pop().toLowerCase())) {
      toast.error("Pilih file Excel atau CSV.", { theme: "colored" });
      return;
    }
    setSelectedFile(file);
    setData("file", file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files[0]);
  };
  const pageCache = useRef(new Map());
  const [employeePage, setEmployeePage] = useState(props.employe);
  const filteredEmployees = employeePage.data ?? employeePage;

  useEffect(() => {
    setEmployeePage(props.employe);
    pageCache.current.set(window.location.href, props.employe);
  }, [props.employe]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    pageCache.current.clear();
    router.get(
      route("slip-gaji.index"),
      { search: value },
      { replace: true, preserveState: true, preserveScroll: true },
    );
  };

  // console.log(filteredEmployees[0].slip_gaji);

  const create = (e) => {
    e.preventDefault();
    if (data.route == "create") {
      get(route("slip-gaji.create"));
    } else if (data.route == "edit") {
      get(route("editSlip", data.mitra));
    } else if (data.route == "download") {
      // get(route("downSlip"))
      window.open(
        `/slipgaji/data_download?mitra=${data.mitra}&bulan=${data.bulan}&route=download&file=`,
        "_blank",
      );
      // exportDownload()
      // http://localhost:8000/slipgaji/data_download?mitra=1&bulan=2024-10&route=download&file=
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(
      "slipgaji/import",
      { ...data, file: data.file },
      {
        forceFormData: true,
        preserveScroll: true,
      },
    );
  };

  // console.log("mitra :",data.mitra == null, "bulan:", data.bulan == null)

  const download = async () => {
    if (data.mitra == 0 || (data.mitra == null && data.bulan == null)) {
      toast.error("Mitra & Bulan Cannot Be Empty !", {
        theme: "colored",
      });
    } else {
      fetch(route("download.template", data), {
        method: "GET",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((response) => {
          // console.log("then('response')",response);

          if (response.ok) {
            return response.blob(); // Convert the response to a Blob
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "slip.xlsx"; // Adjust the filename as needed
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  };

  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Home" />
        <div className="ml-6">
          <HeadNavigation title={"Slip Gaji - Home"} />
        </div>
        <p className="m-6 text-sm text-slate-500">
          Kelola import, pembuatan, dan pengunduhan slip gaji.
        </p>
        <div className="m-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <input
              id="search_input"
              type="text"
              placeholder="Cari berdasarkan Formasi atau Nama"
              className="input input-sm w-full rounded-lg border-slate-300 bg-white shadow-sm sm:w-72"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="m-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="mb-1 font-semibold text-slate-800">
              Import slip gaji
            </p>
            <p className="mb-4 text-xs text-slate-500">
              Gunakan file Excel sesuai template.
            </p>
            <div className="form-group flex flex-col gap-3 sm:flex-row sm:items-end">
              <span className="flex flex-col">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  File Excel
                </label>
                <label
                  htmlFor="file"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex min-h-[6.5rem] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-4 text-center transition-colors ${isDragging ? "border-orange-600 bg-orange-50" : "border-slate-300 hover:border-orange-500 hover:bg-orange-50/50"}`}
                >
                  <FaFileUpload className="mb-1 text-xl text-orange-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    Tarik file ke sini atau klik
                  </span>
                  <span className="text-xs text-slate-500">
                    .xls, .xlsx, .csv
                  </span>
                  {selectedFile && (
                    <span className="mt-1 max-w-full truncate text-xs text-emerald-700">
                      {selectedFile.name}
                    </span>
                  )}
                  <input
                    type="file"
                    id="file"
                    accept=".xls,.xlsx,.csv"
                    className="sr-only"
                    onChange={(e) => chooseFile(e.target.files[0])}
                  />
                </label>
              </span>
              <span className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="btn btn-md flex rounded-lg border-0 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <FaFileUpload className="text-lg" />
                  <span>Import</span>
                </button>
                <button
                  type="button"
                  onClick={() => download()}
                  className="btn btn-md rounded-lg border-0 bg-orange-500 text-white hover:bg-orange-600"
                >
                  <BiSolidCloudDownload className="text-lg" />
                  <span>Download template</span>
                </button>
              </span>
            </div>
            {errors.file && <span className="text-red-500">{errors.file}</span>}
          </form>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-1 font-semibold text-slate-800">
              Kelola slip gaji
            </p>
            <p className="mb-4 text-xs text-slate-500">
              Pilih mitra, periode, dan aksi.
            </p>
            <form
              onSubmit={create}
              className="grid items-end gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.4fr_auto]"
            >
              <div>
                <label className="required mb-1 flex h-5 items-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pilih Mitra
                </label>
                <div ref={mitraRef} className="relative">
                  <input
                    value={mitraSearch}
                    onChange={(e) => {
                      setMitraSearch(e.target.value);
                      setData("mitra", null);
                      setMitraOpen(true);
                    }}
                    onFocus={() => setMitraOpen(true)}
                    placeholder="Cari mitra..."
                    className="input input-bordered input-sm w-full rounded-lg border-slate-300 bg-white text-xs shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    required={!data.mitra}
                  />
                  {mitraOpen && (
                    <div className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                      {props.mitra.filter((mit) =>
                        mit?.client?.name
                          ?.toLowerCase()
                          .includes(mitraSearch.toLowerCase()),
                      ).length > 0 ? (
                        props.mitra
                          .filter((mit) =>
                            mit?.client?.name
                              ?.toLowerCase()
                              .includes(mitraSearch.toLowerCase()),
                          )
                          .map((mit) => (
                            <button
                              type="button"
                              key={mit.id}
                              onClick={() => {
                                setData("mitra", mit.id);
                                setMitraSearch(mit?.client?.name ?? "");
                                setMitraOpen(false);
                              }}
                              className="block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-orange-50"
                            >
                              {mit?.client?.name}
                            </button>
                          ))
                      ) : (
                        <p className="px-3 py-2 text-xs text-slate-500">
                          Mitra tidak ditemukan.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="bulan"
                  className="mb-1 flex h-5 items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  <span className="required">Pilih Bulan</span>
                </label>
                <div ref={monthPickerRef} className="relative">
                  <button
                    id="bulan"
                    type="button"
                    onClick={() => setMonthPickerOpen((open) => !open)}
                    className="input input-bordered input-sm flex w-full items-center justify-between rounded-lg border-slate-300 bg-white px-3 text-left text-xs shadow-sm transition hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    aria-haspopup="dialog"
                    aria-expanded={monthPickerOpen}
                  >
                    <span
                      className={
                        data.bulan ? "text-slate-700" : "text-slate-400"
                      }
                    >
                      {data.bulan
                        ? `${monthNames[Number(selectedMonth) - 1]} ${selectedYear}`
                        : "Pilih bulan"}
                    </span>
                    <FaRegCalendarAlt className="text-orange-600" />
                  </button>
                  {monthPickerOpen && (
                    <div
                      className="absolute z-40 mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 shadow-xl"
                      role="dialog"
                      aria-label="Pilih bulan"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs"
                          onClick={() => setPickerYear((year) => year - 1)}
                          aria-label="Tahun sebelumnya"
                        >
                          ‹
                        </button>
                        <strong className="text-sm text-slate-700">
                          {pickerYear}
                        </strong>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs"
                          onClick={() => setPickerYear((year) => year + 1)}
                          aria-label="Tahun berikutnya"
                        >
                          ›
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {monthNames.map((month, index) => {
                          const value = `${pickerYear}-${String(index + 1).padStart(2, "0")}`;
                          return (
                            <button
                              type="button"
                              key={month}
                              onClick={() => {
                                setData("bulan", value);
                                setMonthPickerOpen(false);
                              }}
                              className={`btn btn-xs ${data.bulan === value ? "btn-warning" : "btn-ghost"}`}
                            >
                              {month.slice(0, 3)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <input
                    type="text"
                    tabIndex={-1}
                    value={data.bulan || ""}
                    onChange={() => {}}
                    required
                    className="sr-only"
                    aria-hidden="true"
                  />
                  {/* <p className="mt-1 text-[11px] text-slate-400">Pilih periode pembayaran slip gaji.</p> */}
                </div>
              </div>
              <div>
                <label className="required mb-1 flex h-5 items-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pilih Aksi
                </label>
                <div className="flex items-center gap-x-1">
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      id="create"
                      name="aksi"
                      value="create"
                      className="radio radio-sm"
                      onClick={(e) => setData("route", e.target.value)}
                    />
                    <label htmlFor="create" className="label text-sm">
                      Create
                    </label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      id="edit"
                      name="aksi"
                      value="edit"
                      className="radio radio-sm"
                      onClick={(e) => setData("route", e.target.value)}
                    />
                    <label htmlFor="edit" className="label text-sm">
                      Edit
                    </label>
                  </div>
                  <div className="flex gap-1 items-center">
                    <input
                      type="radio"
                      id="download"
                      name="aksi"
                      value="download"
                      className="radio radio-sm"
                      onClick={(e) => setData("route", e.target.value)}
                    />
                    <label htmlFor="download" className="label text-sm">
                      Download
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-end mx-5 h-full">
                <button
                  type="submit"
                  className="btn btn-md rounded-lg border-0 bg-orange-600 text-white hover:bg-orange-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {flash.messege && (
          <div
            role="status"
            className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-green-800 shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-green-800 font-medium">{flash.messege}</span>
          </div>
        )}

        <div className="m-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="max-h-[500px] overflow-auto">
            <table className="table table-zebra table-sm w-full min-w-[760px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-800 text-white capitalize">
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    No
                  </th>
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    Nama
                  </th>
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    Formasi
                  </th>
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    Status
                  </th>
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    Terakhir Gajian
                  </th>
                  <th className="border-x-[1px] border-orange-300 sticky top-0">
                    Status Slip Gaji ( Bulan Ini )
                  </th>
                </tr>
              </thead>
              <tbody
                className=""
                style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
              >
                <EachUtils
                  colspan={6}
                  of={filteredEmployees}
                  render={(us, index) => (
                    <tr key={index} className="border-[1px] border-orange-300 ">
                      <td className="border-[1px] border-orange-300">
                        {index + 1}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.name}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.user ? us.user.divisi.name : "~ Formasi Kosong ~"}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.user?.temp_ban == "false" ? (
                          <span className="text-white rounded-sm badge badge-info badge-sm gap-2 py-4">
                            <IoShieldCheckmarkSharp className="text-lg" />
                            Active
                          </span>
                        ) : (
                          <span className="text-white rounded-sm badge badge-error badge-sm gap-2 py-4">
                            <BsShieldFillExclamation className="text-lg" />
                            Diblokir
                          </span>
                        )}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.latest_slip_gaji ? (
                          <span className="badge badge-success gap-2 py-4 rounded-sm border-none text-white text-xs">
                            <FaCalendarCheck className="text-lg" />
                            {us.latest_slip_gaji.bulan_tahun}
                          </span>
                        ) : (
                          <span className="badge badge-error gap-2 py-4 rounded-sm border-none text-white text-xs">
                            <RiFileCloseFill className="text-lg" />
                            Data Tidak Ditemukan
                          </span>
                        )}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.slip_gaji?.bulan_tahun == props.latestMonth ? (
                          <span className="badge badge-accent bg-green-500 rounded-sm border-none text-white text-xs gap-2 py-4">
                            <span className="relative flex size-4 z-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                              <FaCircleCheck className="relative inline-flex size-4 rounded-full" />
                            </span>
                            Sudah Dibuat
                          </span>
                        ) : (
                          <span className="badge badge-accent bg-red-500 rounded-sm border-none text-white text-xs py-4 gap-2">
                            <RiCloseCircleFill className="size-4" />
                            Belum Dibuat
                          </span>
                        )}
                      </td>
                    </tr>
                  )}
                />
              </tbody>
            </table>
          </div>
          {filteredEmployees.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Tidak ada data karyawan yang sesuai.
            </div>
          )}
          {employeePage.links && (
            <nav
              className="flex flex-wrap justify-center gap-2 p-4"
              aria-label="Pagination"
            >
              {employeePage.links.map((link, index) => {
                const label = link.label
                  .replace(/&laquo;|&raquo;/g, "")
                  .replace("pagination.previous", "Sebelumnya")
                  .replace("pagination.next", "Berikutnya");
                return (
                  <button
                    key={`${label}-${index}`}
                    disabled={!link.url || link.active}
                    onClick={() => {
                      if (!link.url) return;
                      const cached = pageCache.current.get(link.url);
                      if (cached) {
                        setEmployeePage(cached);
                        window.history.pushState({}, "", link.url);
                      } else {
                        router.get(
                          link.url,
                          {},
                          { preserveState: true, preserveScroll: true },
                        );
                      }
                    }}
                    className={`btn btn-xs ${link.active ? "btn-warning" : "btn-ghost"}`}
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                );
              })}
            </nav>
          )}
        </div>
      </AdminLayout>
      <style jsx>{`
        table tr td:nth-child(n + 3) {
          text-align: center;
        }
        table thead tr th:nth-child(n + 3) {
          text-align: center;
        }
      `}</style>
    </>
  );
}
