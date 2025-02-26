import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-CQyBQfjp.js";
import { useForm, Head } from "@inertiajs/react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { useState, useMemo } from "react";
import { BiSearchAlt, BiShowAlt, BiEraser, BiSolidEdit } from "react-icons/bi/index.esm.js";
import Modal from "./Modal-DmMYx0rx.js";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { E as EachUtils } from "./EachUtils-sRFHlwPj.js";
import "./Sidebar-DxOhayto.js";
import "framer-motion";
function IndexKontrak(props) {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState("");
  const employeesPerPage = 25;
  const [currentPage, setCurrentPage] = useState(0);
  const { data, setData, delete: destroy, get } = useForm({
    id: "",
    name: "",
    jbt_name: "",
    search: ""
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
    get(route("contracts.show", id));
  };
  const pageCount = useMemo(() => {
    return Math.ceil(props.contract.data.length / employeesPerPage);
  }, [props.contract.data.length, employeesPerPage]);
  const paginatedData = useMemo(() => {
    const start = currentPage * employeesPerPage;
    const end = start + employeesPerPage;
    return props.contract.data.slice(start, end);
  }, [currentPage, employeesPerPage, props.contract.data]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const confirmDelete = (id) => {
    destroy(route(`contracts.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Pengajuan Kontrak!", {
          theme: "colored"
        });
        setTimeout(() => {
          get(route("contracts.index"), {
            replace: true,
            preserveScroll: true
          });
        }, 2e3);
      }
    });
    setModal(!modal);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    get(route("contracts.index"), {
      search: data.search
    });
  };
  const day = /* @__PURE__ */ new Date();
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(date));
  };
  const handleEdit = (id) => {
    get(route("contracts.edit", id));
  };
  function convertToDate(dateStr) {
    const [day2, month, year] = dateStr.split("/");
    return /* @__PURE__ */ new Date(`${year}-${month}-${day2}`);
  }
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pengajuan Kontrak - Home" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Pengajuan Kontrak - Home" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-x-2 items-center", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => newContract(),
          className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
          children: "+ Ajukan Kontrak Baru"
        }
      ),
      /* @__PURE__ */ jsxs("form", { onSubmit: searchSubmit, className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx("input", { onChange: (e) => setData("search", e.target.value), type: "text", placeholder: "Search...", className: "input input-bordered input-sm rounded-sm border-orange-600 focus:border-orange-600 focus:outline-orange-600/50" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-sm rounded-sm bg-sky-600 text-white hover:text-sky-600 text-lg", children: /* @__PURE__ */ jsx(BiSearchAlt, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "px-2.5 bg-red-600 rounded-full mr-2" }),
      " : Contracts Experied "
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto h-[365px] my-5", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra table-xs w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "No Surat" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Nama Pihak Kedua" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "NIK" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Jabatan" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Unit Kerja" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Tanggal Kontrak" }),
        /* @__PURE__ */ jsx("th", { className: "text-center", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "text-center", style: { maxHeight: "calc(100vh - 200px)", overflowY: "auto" }, children: /* @__PURE__ */ jsx(EachUtils, { colspan: 8, of: paginatedData, render: (items, i) => {
        const a = convertToDate(day.toLocaleDateString("en-GB"));
        const b = new Date(paginatedData[0].data.tgl_selesai_kontrak);
        return /* @__PURE__ */ jsxs("tr", { className: `border-[1px] border-orange-300 ${a.getTime() >= b.getTime() && "text-red-600 font-semibold"}`, children: [
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.no_srt }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.nama_pk_kda }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.nik_pk_kda }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.jabatan_pk_kda }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.unit_pk_kda }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: items.data.status_pk_kda }),
          /* @__PURE__ */ jsxs("td", { className: "border-[1px] border-orange-300", children: [
            formatDate(items.data.tgl_mulai_kontrak),
            " - ",
            formatDate(items.data.tgl_selesai_kontrak)
          ] }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2 justify-center", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => showContract(items.data.id),
                className: "btn btn-sm rounded-sm text-2xl bg-sky-500/20 hover:bg-sky-500 hover:text-white border-0 text-sky-500",
                children: /* @__PURE__ */ jsx(BiShowAlt, {})
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(items.data.id),
                className: "btn btn-sm rounded-sm text-2xl bg-red-500/20 hover:bg-red-500 hover:text-white border-0 text-red-500",
                children: /* @__PURE__ */ jsx(BiEraser, {})
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEdit(items.data.id),
                className: "btn btn-sm rounded-sm text-2xl bg-amber-500/20 hover:bg-amber-500 hover:text-white border-0 text-amber-500",
                children: /* @__PURE__ */ jsx(BiSolidEdit, {})
              }
            )
          ] }) })
        ] }, i);
      } }) })
    ] }) }),
    modal && /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900", children: [
        "Apakah Anda Yakin Untuk Menghapus Pengajuan Kontrak",
        " ",
        dataModal.data ? dataModal.data.nama_pk_kda : "",
        "?"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-x-1 mt-5 items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-error btn-sm rounded-sm",
            onClick: () => confirmDelete(dataModal.data.id),
            children: "DELETE"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => closeModal(),
            className: "btn uppercase btn-primary btn-sm rounded-sm",
            children: "Cancel"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        containerClassName: "join shadow-md mb-10",
        previousLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        pageLinkClassName: "join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        nextLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        previousLabel: "Previous",
        breakLinkClassName: "join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white",
        nextLabel: "Next",
        breakLabel: "...",
        pageCount,
        marginPagesDisplayed: 0,
        pageRangeDisplayed: 5,
        onPageChange: handlePageClick,
        activeClassName: "active",
        renderOnZeroPageCount: null
      }
    )
  ] });
}
export {
  IndexKontrak as default
};
