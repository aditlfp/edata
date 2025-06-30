import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BmQ_mfkc.js";
import { useForm, Head } from "@inertiajs/react";
import { lazy, useState, useMemo, useEffect, Suspense } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { BiSolidDownload, BiSortDown, BiSortUp, BiSolidCog, BiSolidTrash, BiSolidFileFind, BiSolidExtension } from "react-icons/bi/index.esm.js";
import Modal from "./Modal-Br3a30kf.js";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import debounce from "lodash/debounce.js";
import { E as EachUtils } from "./EachUtils-wF8jK0oN.js";
import "./Sidebar-k6Fk2Fmb.js";
import "framer-motion";
const NoImageComponent = lazy(() => import("./NoImageComponent-Dusf2B3Q.js"));
function IndexEmploye({ employe, clients, auth, users, emploCount, jabatan, errors }) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelect, setFilter] = useState("");
  const [filterjabatan, setFilterJabatan] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 25;
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState([]);
  const { data, setData, delete: destroy, get } = useForm({
    id: "",
    name: "",
    jbt_name: [],
    jbt_str: []
  });
  const handleDelete = (id) => {
    setModal(true);
    const employeData = employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
  };
  const closeModal = () => {
    setModal(!modal);
  };
  const getJabatanOnEmploye = (employee) => {
    const user = users.find((us) => us.nama_lengkap.toLowerCase() === employee.name.toLowerCase());
    return user ? user.jabatan.name_jabatan : "Data NotFound In Absensi";
  };
  const combinedFilteredEmployees = useMemo(() => {
    return employe.data.filter((employee) => {
      var _a;
      const matchesSearchQuery = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || employee.no_ktp.includes(searchQuery);
      const matchesFilterSelect = filterSelect.toLowerCase() === "all" || ((_a = employee.client) == null ? void 0 : _a.name.toLowerCase().includes(filterSelect.toLowerCase()));
      const matchesFilterJabatan = !filterjabatan || // If no filterjabatan selected, all employees match
      filterjabatan.some((fjbt) => {
        return fjbt.value.toLowerCase() === "all" || getJabatanOnEmploye(employee).toLowerCase().includes(fjbt.value.toLowerCase());
      });
      return matchesSearchQuery && matchesFilterSelect && matchesFilterJabatan;
    });
  }, [searchQuery, filterSelect, employe.data, filterjabatan]);
  const currentEmployees = useMemo(() => {
    const sortedEmployees = [...combinedFilteredEmployees].sort(
      (a, b) => sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    const offset = currentPage * employeesPerPage;
    return sortedEmployees.slice(offset, offset + employeesPerPage);
  }, [combinedFilteredEmployees, currentPage, employeesPerPage, sortOrder]);
  const handleDownload = () => {
    get(route("download.employe", data));
  };
  const pageCount = useMemo(() => {
    return Math.ceil(combinedFilteredEmployees.length / employeesPerPage);
  }, [combinedFilteredEmployees.length, employeesPerPage]);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const confirmDelete = (id) => {
    destroy(route(`employes.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Data Karyawan!", {
          theme: "colored"
        });
        setTimeout(() => {
          get(route("employes.index"), {
            replace: true,
            preserveScroll: true
          });
        }, 2e3);
      }
    });
    setModal(!modal);
  };
  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };
  const createEmploye = () => {
    get(route("employes.create"));
  };
  const showEmploye = (id) => {
    get(route("employes.show", id));
  };
  const editEmploye = (id) => {
    get(route("employes.edit", id));
  };
  const createCareer = (id) => {
    get(route("careers.show", id));
  };
  const debouncedSearch = useMemo(() => debounce(setSearchQuery, 300), []);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  const checkImageExists = async (img) => {
    try {
      const response = await fetch(`/storage/images/${img}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  const EmployeeImage = ({ img }) => {
    const [imgSrc, setImgSrc] = useState(null);
    useEffect(() => {
      const verifyImage = async () => {
        if (img) {
          const exists = await checkImageExists(img);
          setImgSrc(exists ? `/storage/images/${img}` : null);
        }
      };
      verifyImage();
    }, [img]);
    return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: imgSrc ? /* @__PURE__ */ jsx("img", { src: imgSrc, width: 100, loading: "lazy" }) : /* @__PURE__ */ jsx(NoImageComponent, { width: 100, loading: "lazy" }) });
  };
  const insertDataOption = () => {
    const staticOptions = [
      { value: "All", label: "Semua" },
      { value: "Data NotFound In Absensi", label: "Data NotFound In Absensi" }
    ];
    const newOptions = jabatan.map((jbt) => ({
      value: `${jbt.name_jabatan}`,
      label: `${jbt.name_jabatan}`
    }));
    setOptions([...staticOptions, ...newOptions]);
  };
  useEffect(() => {
    insertDataOption();
  }, []);
  const handleChange = (selected) => {
    if (!selected || selected.length === 0) {
      setFilterJabatan(null);
      setData("jbt_name", []);
      setData("jbt_str", []);
    } else {
      setFilterJabatan(selected);
      setData("jbt_name", selected);
      setData("jbt_str", selected.filter((item) => item.value).map((item) => item.value));
    }
  };
  const updatedOptions = options.map((option) => ({
    ...option,
    isDisabled: data.jbt_str != null && data.jbt_str.some((upjbt) => {
      return upjbt === "All" || upjbt === "Data NotFound In Absensi";
    })
  }));
  useEffect(() => {
    if (errors.message) {
      toast.error(errors.message);
    }
  }, [errors]);
  return /* @__PURE__ */ jsxs(AdminLayout, { overflow: modal ? "overflow-hidden" : "overflow-auto", children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Home" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Home" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-x-5", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-sm rounded-sm",
            children: /* @__PURE__ */ jsx(
              Select,
              {
                required: true,
                closeMenuOnSelect: false,
                components: animatedComponents,
                isMulti: true,
                onChange: handleChange,
                options: updatedOptions,
                isOptionDisabled: (option) => option.isDisabled,
                placeholder: "Select an option"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            defaultValue: 0,
            required: true,
            onChange: (e) => {
              setFilter(e.target.value);
              setData("name", e.target.value);
            },
            className: "select w-32 select-bordered select-sm text-sm rounded-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: 0, disabled: true, children: "Filter Mitra" }),
              /* @__PURE__ */ jsx("option", { value: "All", children: "Semua" }),
              clients == null ? void 0 : clients.map((client, index) => /* @__PURE__ */ jsx("option", { value: client.name, children: client.name }, index))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleDownload,
          className: "btn btn-sm rounded-sm bg-green-600 text-green-900 hover:bg-green-500 hover:text-green-800",
          children: /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-xl" })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Cari berdasarkan KTP atau Nama",
          className: "input input-sm rounded-sm input-bordered"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => createEmploye(),
          className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
          children: "+ New Employe"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-visible", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra table-xs my-5 overflow-x-scroll", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Foto Profile" }),
        /* @__PURE__ */ jsxs("th", { className: "border-x-[1px] border-orange-300 flex", children: [
          sortOrder ? /* @__PURE__ */ jsx(
            BiSortDown,
            {
              className: "text-lg hover:cursor-pointer",
              onClick: toggleSortOrder
            }
          ) : /* @__PURE__ */ jsx(
            BiSortUp,
            {
              className: "text-lg hover:cursor-pointer",
              onClick: toggleSortOrder
            }
          ),
          "Nama"
        ] }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Posisi" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "TTL" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KK" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KTP" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Mitra" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No Induk Karyawan" }),
        (auth == null ? void 0 : auth.user.role_id) == 2 && /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx(EachUtils, { colspan: 10, of: currentEmployees, render: (emplo, index) => {
        var _a;
        return /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300", children: [
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: currentPage * employeesPerPage + index + 1 }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsx(EmployeeImage, { img: emplo.img }) }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo == null ? void 0 : emplo.name }),
          /* @__PURE__ */ jsx("td", { className: `border-[1px] border-orange-300 ${getJabatanOnEmploye(emplo) === "Data NotFound In Absensi" ? "text-red-500 font-semibold" : ""}`, children: getJabatanOnEmploye(emplo) }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.ttl }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_kk }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_ktp }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: (_a = emplo.client) == null ? void 0 : _a.name }),
          /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.initials && emplo.numbers && emplo.date_real ? emplo.initials + " " + emplo.numbers + "-" + emplo.date_real : /* @__PURE__ */ jsx("span", { className: "italic text-red-600", children: "Kode Tidak Ditemukan" }) }),
          (auth == null ? void 0 : auth.user.role_id) == 2 && /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-x-1 items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                  "data-tip": "Edit",
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => editEmploye(emplo.id),
                      className: "btn btn-xs rounded-sm hover:text-yellow-500 border-0 text-white bg-yellow-500",
                      children: /* @__PURE__ */ jsx(BiSolidCog, {})
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                  "data-tip": "Delete",
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(emplo.id),
                      className: "btn btn-xs rounded-sm hover:text-red-500 border-0 text-white bg-red-500",
                      children: /* @__PURE__ */ jsx(BiSolidTrash, {})
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                  "data-tip": "Details",
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => showEmploye(emplo.id),
                      className: "btn btn-xs rounded-sm hover:text-blue-500 border-0 text-white bg-blue-500",
                      children: /* @__PURE__ */ jsx(BiSolidFileFind, {})
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                  "data-tip": "Career",
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => createCareer(emplo.id),
                      className: "btn btn-xs rounded-sm hover:text-green-500 border-0 text-white bg-green-500",
                      children: /* @__PURE__ */ jsx(BiSolidExtension, {})
                    }
                  )
                }
              )
            ] })
          ] }) })
        ] }, index);
      } }) })
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
    ),
    modal && /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900", children: [
        "Apakah Anda Yakin Untuk Menghapus Karyawan",
        " ",
        dataModal.user_id ? dataModal.user.nama_lengkap : dataModal.name,
        "?"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-x-1 mt-5  items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-error btn-sm rounded-sm",
            onClick: () => confirmDelete(dataModal.id),
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
    ] }) })
  ] });
}
export {
  IndexEmploye as default
};
