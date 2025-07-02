import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import React, { useMemo, useState } from "react";
import {
  BiEraser,
  BiSearchAlt,
  BiShowAlt,
  BiSolidEdit,
} from "react-icons/bi/index.esm";
import Modal from "../Admin/Component/Modal";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import EachUtils from "@/lib/utils/EachUtils";
import { RiMailSendFill } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

export default function IndexKontrak(props) {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState("");
  const employeesPerPage = 25;

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    setData,
    delete: destroy,
    get,
  } = useForm({
    id: "",
    name: "",
    jbt_name: "",
    search: "",
  });

  const handleDelete = (id) => {
    setModal(true);
    const c = props.contract.data.find((item) => item.data.id === id);
    setDataModal(c);
  };

  const closeModal = () => {
    setModal(false);
  };

  const newContract = () => {
    get(route("contracts.create"));
  };

  const showContract = (id) => {
    const url = `/contracts/${id}`;
    window.open(url, "_blank");
  };

  // Calculate the total number of pages
  const pageCount = useMemo(() => {
    return Math.ceil(props.contract.data.length / employeesPerPage);
  }, [props.contract.data.length, employeesPerPage]);

  // Paginated employees data
  const paginatedData = useMemo(() => {
    const start = currentPage * employeesPerPage;
    const end = start + employeesPerPage;
    return props.contract.data.slice(start, end);
  }, [currentPage, employeesPerPage, props.contract.data]);

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const confirmDelete = (id) => {
    destroy(route(`contracts.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Pengajuan Kontrak!", {
          theme: "colored",
        });

        setTimeout(() => {
          get(route("contracts.index"), {
            replace: true,
            preserveScroll: true,
          });
        }, 2000);
      },
    });
    setModal(!modal);
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    get(route("contracts.index"), {
      search: data.search,
    });
  };
  const day = new Date();
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleEdit = (id) => {
    get(route("contracts.edit", id));
  };

  const handleSendToOperator = (id) => {
    router.post(
      route("sendToOperator", id),
      {
        _method: "PATCH", // spoofing PATCH method
        id: id,
      },
      {
        onSuccess: () => {
          toast.success("Berhasil Mengirim Pengajuan Kontrak!", {
            theme: "colored",
          });
          router.get(
            route("contracts.index"),
            {},
            {
              replace: true,
              preserveScroll: true,
              preserveState: true,
            }
          );
        },
      }
    );
  };

  function convertToDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  return (
    <AdminLayout>
      <Head title="Pengajuan Kontrak - Home" />
      <HeadNavigation title={"Pengajuan Kontrak - Home"} />
      <div className="flex justify-between items-center">
        <div className="flex">
          <div>
            <span className="px-2.5 bg-red-600 rounded-full mr-2"></span> :
            Contracts Experied{" "}
          </div>
        </div>
        <div className="flex gap-x-2">
          <form onSubmit={searchSubmit} className="flex items-center gap-x-2">
            <select
              onChange={(e) => setData("search", e.target.value)}
              className="select select-sm rounded-sm text-sm border-orange-600 focus:border-orange-600 focus:outline-orange-600/50"
            >
              <option defaultValue={0} disabled selected>
                Filter
              </option>
              {props.client.map((item, i) => {
                return (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <button
              type="submit"
              className="btn btn-sm rounded-sm bg-sky-600 text-white hover:text-sky-600 text-lg"
            >
              <FiFilter />
            </button>
          </form>

          <form onSubmit={searchSubmit} className="flex items-center gap-x-2">
            <input
              onChange={(e) => setData("search", e.target.value)}
              type="text"
              placeholder="Search..."
              className="input input-bordered input-sm rounded-sm border-orange-600 focus:border-orange-600 focus:outline-orange-600/50"
            />
            <button
              type="submit"
              className="btn btn-sm rounded-sm bg-sky-600 text-white hover:text-sky-600 text-lg"
            >
              <BiSearchAlt />
            </button>
          </form>

          <button
            onClick={() => newContract()}
            className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
          >
            + Ajukan Kontrak Baru
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[550px] my-5">
        <table className="table table-zebra table-xs w-full">
          <thead className="sticky top-0">
            <tr className="bg-orange-600 text-white capitalize">
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                No Surat
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                Nama Pihak Kedua
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                NIK
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                Jabatan
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                Unit Kerja
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                Status
              </th>
              <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
                Tanggal Kontrak
              </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody
            className="text-center"
            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <EachUtils
              colspan={8}
              of={paginatedData}
              render={(items, i) => {
                const a = convertToDate(day.toLocaleDateString("en-GB"));
                const b = new Date(paginatedData[0].data.tgl_selesai_kontrak);
                const hasSend =
                  items.data.send_to_atasan === "0" &&
                  items.data.send_to_operator === "0";
                // console.log(items)
                return (
                  <tr
                    className={`border-[1px] border-orange-300 ${
                      a.getTime() >= b.getTime() && "text-red-600 font-semibold"
                    }`}
                    key={i}
                  >
                    <td className="border-[1px] border-orange-300">
                      {items.data.no_srt}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {items.data.nama_pk_kda}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {items.data.nik_pk_kda}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {items.data.jabatan_pk_kda}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {items.data.unit_pk_kda}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {items.data.status_pk_kda}
                    </td>
                    <td className="border-[1px] border-orange-300">
                      {formatDate(items.data.tgl_mulai_kontrak)} -{" "}
                      {formatDate(items.data.tgl_selesai_kontrak)}
                    </td>
                    <td>
                      <div className="flex gap-x-2 justify-start items-center">
                        <button
                          onClick={() => showContract(items.data.id)}
                          className="btn btn-sm rounded-sm text-2xl bg-sky-500/20 hover:bg-sky-500 hover:text-white border-0 text-sky-500"
                        >
                          <BiShowAlt />
                        </button>
                        <button
                          onClick={() => handleDelete(items.data.id)}
                          className="btn btn-sm rounded-sm text-2xl bg-red-500/20 hover:bg-red-500 hover:text-white border-0 text-red-500"
                        >
                          <BiEraser />
                        </button>
                        <button
                          onClick={() => handleEdit(items.data.id)}
                          className="btn btn-sm rounded-sm text-2xl bg-amber-500/20 hover:bg-amber-500 hover:text-white border-0 text-amber-500"
                        >
                          <BiSolidEdit />
                        </button>
                        {hasSend ? (
                          <button
                            onClick={() => handleSendToOperator(items.data.id)}
                            className="btn btn-sm rounded-sm text-2xl bg-green-500/20 hover:bg-green-500 hover:text-white border-0 text-green-500"
                          >
                            <RiMailSendFill />
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-sm rounded-sm text-2xl bg-green-500/20 hover:bg-green-500 hover:text-white border-0 text-green-500 hover:cursor-not-allowed"
                          >
                            <RiMailSendFill />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }}
            />
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal>
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-900">
              Apakah Anda Yakin Untuk Menghapus Pengajuan Kontrak{" "}
              {dataModal.data ? dataModal.data.nama_pk_kda : ""}?
            </h2>
            <div className="flex justify-end gap-x-1 mt-5 items-center">
              <button
                className="btn btn-error btn-sm rounded-sm"
                onClick={() => confirmDelete(dataModal.data.id)}
              >
                DELETE
              </button>
              <button
                onClick={() => closeModal()}
                className="btn uppercase btn-primary btn-sm rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <ReactPaginate
        containerClassName="join shadow-md mb-10"
        previousLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        pageLinkClassName="join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        nextLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        previousLabel={"Previous"}
        breakLinkClassName="join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white"
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        activeClassName={"active"}
        renderOnZeroPageCount={null}
      />
    </AdminLayout>
  );
}
