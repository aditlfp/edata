import { Head, Link, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import AdminLayout from "@/Layouts/AdminLayout";
import { FormatRupiah } from "@arismun/format-rupiah";
import { toast } from "react-toastify";
import { MdInfoOutline } from "react-icons/md";
import EachUtils from "@/lib/utils/EachUtils";
import {
  IoChevronBackCircleOutline,
  IoChevronBackCircleSharp,
} from "react-icons/io5";
import { RiSendInsLine } from "react-icons/ri";
export default function CreateSlip(props) {
  // console.log("props.users[0]", props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    users: props.users.map((us) => ({
      nama_lengkap: us.user?.nama_lengkap,
      devisi_id: us.user?.devisi_id,
      formasi: us.user?.divisi?.name,
      user_id: us.user?.id,
      bulan_tahun: props.bulan,
      gaji_pokok: "",
      gaji_lembur: "",
      tj_jabatan: "",
      tj_kehadiran: "",
      tj_kinerja: "",
      tj_lain: "",
      absen: "",
      bpjs: "",
      pinjaman: "",
      lain_lain: "",
      mk: "",
      total: 0,
    })),
  });

  // function handleChange(e) {
  //   const key = e.target.id;
  //   const value = e.target.value;
  //   setData((values) => ({
  //     ...values.users,
  //     [key]: value,
  //   }));
  // }

  const calculateTotal = (user) => {
    const {
      gaji_pokok,
      gaji_lembur,
      tj_jabatan,
      tj_kehadiran,
      tj_kinerja,
      tj_lain,
      absen,
      bpjs,
      pinjaman,
      lain_lain,
    } = user;

    return (
      (parseFloat(gaji_pokok) || 0) +
      (parseFloat(gaji_lembur) || 0) +
      (parseFloat(tj_jabatan) || 0) +
      (parseFloat(tj_kehadiran) || 0) +
      (parseFloat(tj_kinerja) || 0) +
      (parseFloat(tj_lain) || 0) +
      (parseFloat(absen) || 0) +
      (parseFloat(bpjs) || 0) +
      (parseFloat(pinjaman) || 0) +
      (parseFloat(lain_lain) || 0)
    ).toFixed(2);
  };

  const handleChange = (index, field, value) => {
    const newUsers = [...data.users];
    newUsers[index][field] = value;
    newUsers[index].total = calculateTotal(newUsers[index]);
    setData("users", newUsers);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("slip-gaji.store"), {
      onSuccess: () =>
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored",
        }),
    });
  };
  const btnSubmit = (e) => {
    submit();
  };
  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Create" />
        <HeadNavigation title={"Slip Gaji - Create"} />
        <div className="m-6 flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row items-center sm:justify-between">
          <div>
            <p className="text-xl font-black tracking-tight text-slate-800">
              Tambah Slip Gaji
            </p>
            <p className="font-bold text-base">
              Mitra: {props.client.client.name}
            </p>
            <p className="font-bold text-base">Bulan: {props.bulan}</p>
          </div>
          <div className="flex justify-start">
            <Link
              href={route("slip-gaji.index")}
              className="group btn btn-sm bg-orange-600 text-white hover:bg-white hover:text-orange-600 rounded-sm transition-colors"
            >
              <IoChevronBackCircleOutline className="text-lg group-hover:hidden" />
              <IoChevronBackCircleSharp className="hidden text-lg group-hover:block" />
              Kembali
            </Link>
          </div>
        </div>

        {props.message && (
          <div
            role="alert"
            className="m-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-900 shadow-sm"
          >
            <MdInfoOutline
              className="mt-0.5 shrink-0 text-xl text-green-600"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">Data sudah lengkap</p>
              <p className="text-sm">{props.message}</p>
            </div>
          </div>
        )}

        <div className="m-6">
          <form onSubmit={submit}>
            <div className="max-h-[calc(100vh-260px)] overflow-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="table table-zebra table-sm min-w-[1100px] text-center">
                <thead className="sticky top-0 z-20 text-[10px]">
                  <tr className="bg-orange-600 text-white capitalize">
                    <th
                      className="border-x-[1px] border-orange-300"
                      colSpan={3}
                    >
                      Data Karyawan
                    </th>
                    <th
                      className="border-x-[1px] border-orange-300"
                      colSpan={2}
                    >
                      Gaji
                    </th>
                    <th
                      className="border-x-[1px] border-orange-300"
                      colSpan={4}
                    >
                      Tunjangan
                    </th>
                    <th
                      className="border-x-[1px] border-orange-300"
                      colSpan={4}
                    >
                      Potongan
                    </th>
                    <th
                      className="border-x-[1px] border-orange-300"
                      colSpan={1}
                    >
                      Total
                    </th>
                  </tr>
                  <tr className="bg-orange-600 text-white capitalize">
                    <th className="border-x-[1px] border-orange-300">
                      Karyawan
                    </th>
                    <th className="border-x-[1px] border-orange-300">
                      Formasi
                    </th>
                    <th className="border-x-[1px] border-orange-300">MK</th>
                    <th className="border-x-[1px] border-orange-300">Pokok</th>
                    <th className="border-x-[1px] border-orange-300">Lembur</th>
                    <th className="border-x-[1px] border-orange-300">
                      Jabatan
                    </th>
                    <th className="border-x-[1px] border-orange-300">
                      Kehadiran
                    </th>
                    <th className="border-x-[1px] border-orange-300">
                      Kinerja
                    </th>
                    <th className="border-x-[1px] border-orange-300">
                      Lain Lain
                    </th>
                    <th className="border-x-[1px] border-orange-300">BPJS</th>
                    <th className="border-x-[1px] border-orange-300">
                      Pinjaman
                    </th>
                    <th className="border-x-[1px] border-orange-300">Absen</th>
                    <th className="border-x-[1px] border-orange-300">
                      Lain-lain
                    </th>
                    <th className="border-x-[1px] border-orange-300">Total</th>
                  </tr>
                </thead>
                <tbody className="text-[10px]">
                  {/* <div className="max-h-screen overflow-y-auto">  */}
                  <EachUtils
                    colspan={14}
                    of={data.users}
                    render={(us, index) => (
                      <tr
                        key={index}
                        className="border-[1px] border-orange-300 "
                      >
                        <td className="border-[1px] border-orange-300">
                          {us.nama_lengkap}
                        </td>
                        <td className="border-[1px] border-orange-300">
                          <span>{us.formasi}</span>
                        </td>
                        {/* MK */}

                        {[
                          "mk",
                          "gaji_pokok",
                          "gaji_lembur",
                          "tj_jabatan",
                          "tj_kehadiran",
                          "tj_kinerja",
                          "tj_lain",
                          "bpjs",
                          "pinjaman",
                          "absen",
                          "lain_lain",
                        ].map((field) => (
                          <td
                            key={field}
                            className="border-[1px] border-orange-300 min-w-[95px]"
                          >
                            <input
                              id={us[field]}
                              type="number"
                              className="input input-xs input-bordered w-full"
                              value={us[field]}
                              inputMode="numeric"
                              onWheel={(e) => e.currentTarget.blur()}
                              onChange={(e) =>
                                handleChange(index, field, e.target.value)
                              }
                            />
                            {errors[field] && (
                              <span className="text-red-500">
                                {errors[field]}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="border-[1px] border-orange-300">
                          <FormatRupiah value={us.total} />
                        </td>
                      </tr>
                    )}
                  />
                  {/* </div> */}
                </tbody>
              </table>
            </div>
            <div className="absolute bottom-0 z-10 flex justify-end mb-5">
              <button
                type="submit"
                className="btn btn-sm border-0 bg-sky-600 px-6 text-white hover:bg-sky-700"
              >
                <div className="flex items-center gap-x-2">
                  <RiSendInsLine className="text-lg font-bold" />
                  <span>Simpan</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        ::-webkit-scrollbar {
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ea580c;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a33b04;
        }
      `}</style>
    </>
  );
}
