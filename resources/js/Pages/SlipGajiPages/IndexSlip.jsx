import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import EachUtils from "@/lib/utils/EachUtils";


export default function IndexSlip(props) {
  const { data, setData, post, get, processing, errors, reset } = useForm({
    mitra: null,
    bulan: null,
    route: "",
    file: ""
  });
  const { flash } = usePage().props
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(props.employe); // Assuming it's props.employees, not props.employe

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = props.employe.filter((employee) => {
      const nameMatch =
        employee.name &&
        employee.name.toLowerCase().includes(value);
      const divisionMatch = props.divisi.some(
        (dev) =>
          employee.user?.divisi?.id === dev.id &&
          dev.name.toLowerCase().includes(value)
      );
      return nameMatch || divisionMatch;
    });

    setFilteredEmployees(filtered);
  };

  // console.log(filteredEmployees[0].slip_gaji);

  const create = (e) => {
    e.preventDefault();
    if (data.route == "create") {
      get(route("slip-gaji.create"));
    } else if (data.route == "edit") {
      get(route("editSlip", data.mitra));
    }else if (data.route == 'download'){
      // get(route("downSlip"))
      window.open(`/slipgaji/data_download?mitra=${data.mitra}&bulan=${data.bulan}&route=download&file=`, '_blank')
      // exportDownload()
      // http://localhost:8000/slipgaji/data_download?mitra=1&bulan=2024-10&route=download&file=
    }
  };

   const handleSubmit = (e) => {
    post("slipgaji/import",data.file, {
      onSuccess: () => {
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored",
        }),
        window.location.reload();
      },
    });
  };

    // console.log("mitra :",data.mitra == null, "bulan:", data.bulan == null)

  const download = async () => {
  
    if(data.mitra == 0 || data.mitra == null && data.bulan == null)
    {
        toast.error("Mitra & Bulan Cannot Be Empty !", {
          theme: "colored",
        })

    }else{
      fetch(route('download.template', data), {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
          // console.log("then('response')",response);
          
            if (response.ok) {
                return response.blob(); // Convert the response to a Blob
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'slip.xlsx'; // Adjust the filename as needed
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });  
    }
    


  }


  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Home" />
        <HeadNavigation title={"Slip Gaji - Home"} />
        <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
          
          <div>
            <input
              id="search_input"
              type="text"
              placeholder="Cari berdasarkan Formasi atau Nama"
              className="input input-sm rounded-sm input-bordered"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex">
            <div className="form-group flex items-end gap-x-1">
            <span className="flex flex-col">
                  <label htmlFor="file" className="label">Excel File: </label>
                  <input type="file" id="file" className="file-input rounded-sm file-input-bordered file-input-sm" 
                  onChange={(e) => setData("file", e.target.files[0])} />
            </span>
              <span className="flex gap-x-1">
                  <button type="submit" className="btn btn-sm btn-success rounded-sm"><FaFileUpload className="text-green-950"/></button>
                  <a onClick={() => download()} className="btn btn-sm rounded-sm  bg-orange-500 font-semibold text-sm hover:text-gray-200 uppercase  hover:bg-orange-700 border-none text-white">download template</a>
              </span>
              </div>
                {errors.file && <span className="text-red-500">{errors.file}</span>}
        </form>
        <div className="flex gap-2  w-fit">
          <form onSubmit={create} className="flex items-center gap-2">
            <div>
              <label className="label">Pilih Mitra</label>
              <select
                className="select select-sm select-bordered rounded-sm text-xs"
                onChange={(e) => setData("mitra", e.target.value)}
                required
              >
                <option value="0" key="0">
                  ~ Mitra ~
                </option>
                {props.mitra.map((mit, i) => (
                  <option value={mit.id} key={i}>
                    {mit?.client?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Pilih Bulan</label>
              <input
                type="month"
                className="input input-sm input-bordered rounded-sm"
                onChange={(e) => setData("bulan", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Pilih Aksi: </label>
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
            <div className="flex items-center mx-5 h-full">
              <button
                type="submit"
                className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {/*alert*/}
        {flash.messege && (
          <div role="alert" className="alert bg-green-400/90 border-none mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-green-800 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-green-800 font-medium">{ flash.messege }</span>
          </div>
        )}
        
        {/*end alert*/}
        <div className="overflow-y-auto h-[400pt] my-5">

          <table className="table table-zebra table-xs w-full">
            <thead className="sticky top-0">
              <tr className="bg-orange-600 text-white capitalize">
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
              <EachUtils colspan={6} of={filteredEmployees} render={(us, index) => (
                  <tr key={index} className="border-[1px] border-orange-300 ">
                    <td className="border-[1px] border-orange-300">
                      {index + 1}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {us.name}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {us.user ? us.user.divisi.name : '~ Formasi Kosong ~'}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {us.user?.temp_ban == "false" ? (
                        <span className="text-white rounded-sm badge badge-success badge-sm">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-900 rounded-sm badge badge-error badge-sm">
                          Temp Ban
                        </span>
                      )}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {us.slip_gaji ? 
                        (
                          <span className="badge badge-accent bg-sky-500 rounded-sm border-none text-white text-xs">
                            {us.slip_gaji.bulan_tahun}
                          </span>) : (
                        <span className="badge badge-accent bg-red-500 rounded-sm border-none text-white text-xs">Data Tidak Ditemukan</span>
                      )}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {us.slip_gaji?.bulan_tahun == props.currentMonth ? (
                        <span className="badge badge-accent bg-green-500 rounded-sm border-none text-white text-xs">Sudah Dibuat</span>
                      ) : (
                        <span className="badge badge-accent bg-red-500 rounded-sm border-none text-white text-xs">Belum Dibuat</span>
                      )}
                    </td>
                  </tr>
              )}/>
            </tbody>
          </table>
        </div>
      </AdminLayout>
      <style jsx>{`
        table tr td:nth-child(n+3) {
            text-align: center;
        }
        table thead tr th:nth-child(n+3){
            text-align: center;
        }
      `}</style>
    </>
  );
}
