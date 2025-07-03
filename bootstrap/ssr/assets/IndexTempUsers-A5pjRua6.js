import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-oLkvHzfQ.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { BiCheckDouble } from "react-icons/bi/index.esm.js";
import { FaTrashCan } from "react-icons/fa6/index.esm.js";
import { MdCancel } from "react-icons/md/index.esm.js";
import axios from "axios";
import Modal from "./Modal-Br3a30kf.js";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { E as EachUtils } from "./EachUtils-Buu20C5d.js";
import "./Sidebar-Cm1FAR-6.js";
import "framer-motion";
function IndexTempUsers(props) {
  const [ids, setIds] = useState(null);
  const [modal, setModal] = useState(false);
  const tempUsersPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [button, setButton] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}`;
  };
  const {
    data,
    setData,
    post,
    get,
    processing,
    errors,
    reset,
    delete: destroy
  } = useForm({
    from_temp: true,
    user_id: "",
    name: "",
    ttl: "",
    no_kk: "",
    no_ktp: "",
    client_id: "",
    img: null,
    img_ktp_dpn: "",
    jenis_bpjs: [],
    no_bpjs_kesehatan: "",
    file_bpjs_kesehatan: "",
    no_bpjs_ketenaga: "",
    file_bpjs_ketenaga: "",
    initials: "",
    numbers: "0000",
    date_year: formatDate(new Date(Date.now())),
    placehoders: "0000"
  });
  const getInitials = (name) => {
    const match = name.match(/\(.*?\)/g, "");
    let nameWithoutParentheses = name.replace(/\(.*?\)/g, "").trim();
    if (match && match[0]) {
      nameWithoutParentheses += match[0].trim().split(" ").map((word) => {
        let r = word[1];
        let ok = " " + r;
        return ok;
      }).join("");
    }
    return nameWithoutParentheses.split(" ").map((word) => word[0].toUpperCase()).join("");
  };
  const closeModal = () => {
    setModal(false);
  };
  const removeUser = (datas) => {
    setModal(true);
    setTitle("Do You Want To Remove : ");
    setContent(datas.nama_lengkap);
    setButton(true);
    setData({
      id: datas.id
    });
  };
  const remove = () => {
    if (checkedItems.length <= 0) {
      destroy(route(`accept-employe.destroy`, data.id), {
        onSuccess: () => {
          toast.warning("Berhasil Menghapus Data Karyawan!", {
            theme: "colored"
          });
          setModal(false);
        },
        onError: (error) => {
          console.error("Error removing user:", error);
          toast.error("Gagal Menghapus Data Karyawan!", {
            theme: "colored"
          });
        }
      });
    } else {
      try {
        axios.post(route("accept-employe.bulk-delete"), {
          ids: checkedItems
        }).then((response) => {
          if (response.status === 200) {
            toast.warning("Berhasil Menghapus Data Karyawan!", {
              theme: "colored"
            });
            router.reload({ only: ["tempUsers"], preserveState: false });
            setModal(false);
            setCheckedItems([]);
          }
        });
      } catch (error) {
        console.error("Error removing users:", error);
        toast.error("Gagal Menghapus Data Karyawan!", {
          theme: "colored"
        });
      }
    }
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const pageCount = useMemo(() => {
    const totalFiltered = props.tempUsers.filter((user) => {
      if (statusFilter === "pending") return user.status === 0;
      if (statusFilter === "approved") return user.status === 1;
      if (statusFilter === "rejected") return user.status === 2;
      return true;
    }).length;
    return Math.ceil(totalFiltered / tempUsersPage);
  }, [props.tempUsers, statusFilter, tempUsersPage]);
  const paginatedData = useMemo(() => {
    const filtered = props.tempUsers.filter((user) => {
      if (statusFilter === "pending") return user.status === 0;
      if (statusFilter === "approved") return user.status === 1;
      if (statusFilter === "rejected") return user.status === 2;
      return true;
    });
    const start = currentPage * tempUsersPage;
    return filtered.slice(start, start + tempUsersPage);
  }, [props.tempUsers, statusFilter, currentPage, tempUsersPage]);
  const accept = (id) => {
    props.tempUsers.find((user) => {
      if (user.id === id) {
        setIds(user.id);
        setModal(true);
        const clientId = user.client.id;
        const initials = getInitials(user.client.name);
        setData({
          ...data,
          img: user.image,
          img_ktp_dpn: user.img_ktp_dpn,
          name: user.nama_lengkap,
          ttl: user.ttl,
          no_ktp: user.nik,
          no_kk: user.nik,
          client_id: clientId,
          initials
        });
      }
    });
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`employes/api/${data.client_id}`).then((response) => {
        var _a;
        if (((_a = response.data) == null ? void 0 : _a.client_id) != null) {
          const num = +response.data.numbers + 1;
          const str = String(num).padStart(4, "0");
          setData("numbers", str);
        } else {
          setData("numbers", "0000");
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (data.client_id) {
      fetchData();
    }
  }, [data.client_id]);
  const submit = (e) => {
    e.preventDefault();
    try {
      router.post(
        route("accept-employe.update", ids),
        {
          _method: "PATCH",
          status: 1
        },
        {
          onSuccess: () => {
            post(
              route("employes.store"),
              {
                data
              },
              {
                onSuccess: () => {
                  reset(
                    "user_id",
                    "client_id",
                    "file_bpjs_kesehatan",
                    "img",
                    "img_ktp_dpn",
                    "jenis_bpjs",
                    "name",
                    "no_bpjs_kesehatan",
                    "no_bpjs_ketenaga",
                    "no_kk",
                    "no_ktp",
                    "ttl",
                    "initials",
                    "numbers",
                    "date_year"
                  );
                  router.reload({ only: ["tempUsers"], preserveState: false });
                }
              }
            ), toast.success("Akun Has been Approved!", {
              theme: "colored"
            });
            closeModal();
          }
        }
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  const reject = (id) => {
    props.tempUsers.find((user) => {
      if (user.id === id) {
        console.log("User found:", user);
        try {
          router.post(route("accept-employe.update", user.id), {
            _method: "PATCH",
            status: 2
          });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    });
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedItems(paginatedData.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };
  const handleCheck = (id) => {
    setCheckedItems(
      (prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const isChackedAll = paginatedData.every(
    (item) => checkedItems.includes(item.id)
  );
  const bulkDelete = () => {
    if (checkedItems.length === 0) {
      toast.error("Please select at least one user to delete.", {
        theme: "colored"
      });
      return;
    }
    setModal(true);
    setTitle("Do You Want To Remove Selected Users ?");
    setContent("You are about to remove " + checkedItems.length + " users.");
    setButton(true);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Konfirmasi Karyawan Baru - Home" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Konfirmasi Karyawan Baru - Home" }),
    /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg my-5", children: "Confirmation New Employes Data !" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4 gap-x-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "btn-group mb-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn btn-sm rounded-sm border-r-0 rounded-r-none ${statusFilter === "all" ? "btn-warning" : "border-r-0 outline-r-none rounded-r-none btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"}`,
            onClick: () => {
              setStatusFilter("all");
              setCurrentPage(0);
            },
            children: "All"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn btn-sm rounded-none border-r-0 border-l-0 ${statusFilter === "pending" ? "btn-warning" : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"}`,
            onClick: () => {
              setStatusFilter("pending");
              setCurrentPage(0);
            },
            children: "Pending"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn btn-sm rounded-none border-r-0 border-l-0 ${statusFilter === "approved" ? "btn-warning" : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"}`,
            onClick: () => {
              setStatusFilter("approved");
              setCurrentPage(0);
            },
            children: "Approved"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn btn-sm rounded-sm border-l-0 rounded-l-none ${statusFilter === "rejected" ? "btn-warning" : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"}`,
            onClick: () => {
              setStatusFilter("rejected");
              setCurrentPage(0);
            },
            children: "Rejected"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: checkedItems.length <= 0,
          className: `btn btn-sm rounded-sm border-amber-500 ${checkedItems.length > 0 ? "btn-outline hover:border-amber-600 hover:bg-amber-500 hover:text-white" : "btn-outline"}`,
          onClick: () => bulkDelete(),
          children: [
            /* @__PURE__ */ jsx(FaTrashCan, {}),
            "Remove"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "table table-zebra table-xs w-full mb-5", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "checkbox checkbox-warning checkbox-sm",
            checked: isChackedAll,
            onChange: (e) => handleCheckboxChange(e)
          }
        ) }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "#" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Foto Profil" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Nama Lengkap" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Password" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "No HP (Aktif)" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0 text-center", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "text-center", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx(
        EachUtils,
        {
          colspan: 8,
          of: paginatedData,
          render: (item, i) => {
            return /* @__PURE__ */ jsxs("tr", { children: [
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                " ",
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "checkbox checkbox-warning checkbox-sm",
                    checked: checkedItems.includes(item.id),
                    onChange: () => handleCheck(item.id)
                  }
                ),
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                i + 1,
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                " ",
                /* @__PURE__ */ jsxs("div", { className: "ml-6", children: [
                  " ",
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `https://absensi-sac.sac-po.com/public/storage/user/` + item.image,
                      alt: item.nama_lengkap,
                      className: "w-10 h-10 rounded-full"
                    }
                  ),
                  " "
                ] }),
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                item.nama_lengkap,
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                " ",
                item.pw ? item.pw : "Kosong",
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                item.no_hp,
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                item.email,
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "border-x-[1px] border-orange-300 text-center", children: [
                " ",
                item.status == 0 ? /* @__PURE__ */ jsx("span", { className: "badge badge-sm rounded-sm badge-warning text-white p-2", children: "Pending" }) : item.status == 1 ? /* @__PURE__ */ jsx("span", { className: "badge badge-sm rounded-sm badge-success text-white p-2", children: "Approve" }) : /* @__PURE__ */ jsx("span", { className: "badge badge-sm rounded-sm badge-error text-white p-2", children: "Rejected" }),
                " "
              ] }),
              " ",
              /* @__PURE__ */ jsxs("td", { className: "text-center flex justify-center items-center gap-2", children: [
                " ",
                " ",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    disabled: item.status === 1,
                    onClick: () => accept(item.id),
                    className: "btn btn-sm btn-success rounded-sm text-white text-xl",
                    children: /* @__PURE__ */ jsx(BiCheckDouble, {})
                  }
                ),
                " ",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    disabled: item.status === 1 || item.status === 2,
                    onClick: () => reject(item.id),
                    className: "btn btn-sm btn-warning rounded-sm text-white text-xl",
                    children: /* @__PURE__ */ jsx(MdCancel, {})
                  }
                ),
                " ",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => removeUser(item),
                    className: "btn btn-sm btn-error rounded-sm text-white text-lg",
                    children: /* @__PURE__ */ jsx(FaTrashCan, {})
                  }
                ),
                " "
              ] }),
              " "
            ] }, i);
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        containerClassName: "join shadow-md mb-10",
        previousLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        pageLinkClassName: "join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        nextLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        disabledLinkClassName: "join-item btn btn-sm btn-disabled text-white rounded-sm",
        activeLinkClassName: "join-item btn btn-sm btn-disabled text-white rounded-sm",
        previousLabel: "Previous",
        breakLinkClassName: "join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white",
        nextLabel: "Next",
        breakLabel: "...",
        pageCount,
        marginPagesDisplayed: 0,
        pageRangeDisplayed: 5,
        onPageChange: handlePageClick,
        forcePage: currentPage,
        renderOnZeroPageCount: null
      }
    ),
    modal && /* @__PURE__ */ jsx(Modal, { props: modal, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg text-gray-900 font-extrabold", children: [
        title ? title : "Apakah Anda Yakin Untuk Memverifikasi Akun ?",
        " ",
        /* @__PURE__ */ jsx("div", { className: "bg-sky-100 p-5 rounded-sm mt-2", children: content ? content : /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "font-bold", children: "Nama Lengkap" }),
            /* @__PURE__ */ jsx("td", { className: "px-2", children: ":" }),
            /* @__PURE__ */ jsx("td", { children: data.name })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "font-bold", children: "TTL" }),
            /* @__PURE__ */ jsx("td", { className: "px-2", children: ":" }),
            /* @__PURE__ */ jsx("td", { children: data.ttl })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "font-bold", children: "No KTP" }),
            /* @__PURE__ */ jsx("td", { className: "px-2", children: ":" }),
            /* @__PURE__ */ jsx("td", { children: data.no_ktp })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "font-bold", children: "No KK" }),
            /* @__PURE__ */ jsx("td", { className: "px-2", children: ":" }),
            /* @__PURE__ */ jsx("td", { children: data.no_kk })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-x-1 mt-5  items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: processing,
            className: processing ? "btn btn-disabled hover:cursor-not-allowed btn-sm rounded-sm" : "btn btn-primary btn-sm rounded-sm",
            onClick: (e) => button ? remove() : submit(e),
            children: "CONFIRM"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => closeModal(),
            className: "btn uppercase btn-error btn-sm rounded-sm",
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  IndexTempUsers as default
};
