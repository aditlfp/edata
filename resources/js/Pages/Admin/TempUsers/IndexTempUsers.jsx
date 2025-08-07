import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";
import HeadNavigation from "../Component/HeadNavigation";
import { BiCheckDouble } from "react-icons/bi/index.esm";
import { FaTrashCan } from "react-icons/fa6";
import { MdCancel } from "react-icons/md/index.esm";
import axios from "axios";
import Modal from "../../Admin/Component/Modal";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import EachUtils from "@/lib/utils/EachUtils";

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
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Pads month with leading 0 (months are zero-indexed)
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
    delete: destroy,
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
    placehoders: "0000",
  });

  const getInitials = (name) => {
    // Remove any text inside parentheses, including the parentheses themselves
    const match = name.match(/\(.*?\)/g, "");
    let nameWithoutParentheses = name.replace(/\(.*?\)/g, "").trim();
    // console.log("AKU PARENTIS", nameWithoutParentheses);
    if (match && match[0]) {
      nameWithoutParentheses += match[0]
        .trim()
        .split(" ")
        .map((word) => {
          let r = word[1];

          let ok = " " + r;
          return ok;
        })
        .join("");
    }

    // Split the name into words and take the first letter of each word
    return nameWithoutParentheses
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
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
      id: datas.id,
    });
  };

  const remove = () => {
    if (checkedItems.length <= 0) {
      destroy(route(`accept-employe.destroy`, data.id), {
        onSuccess: () => {
          toast.warning("Berhasil Menghapus Data Karyawan!", {
            theme: "colored",
          });
          setModal(false);
        },
        onError: (error) => {
          console.error("Error removing user:", error);
          toast.error("Gagal Menghapus Data Karyawan!", {
            theme: "colored",
          });
        },
      });
    } else {
      try {
        axios
          .post(route("accept-employe.bulk-delete"), {
            ids: checkedItems,
          })
          .then((response) => {
            if (response.status === 200) {
              toast.warning("Berhasil Menghapus Data Karyawan!", {
                theme: "colored",
              });
              router.reload({ only: ["tempUsers"], preserveState: false });
              setModal(false);
              setCheckedItems([]); // Clear checked items after successful deletion
            }
          });
      } catch (error) {
        console.error("Error removing users:", error);
        toast.error("Gagal Menghapus Data Karyawan!", {
          theme: "colored",
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
      return true; // 'all'
    });
    const start = currentPage * tempUsersPage;
    return filtered.slice(start, start + tempUsersPage);
  }, [props.tempUsers, statusFilter, currentPage, tempUsersPage]);

  const accept = (id) => {
    props.tempUsers.find((user) => {
      if (user.id === id) {
        setIds(user.id);
        setModal(true); // Open the modal when a user is found
        const clientId = user.client.id; // Assuming client_id is available in the user object

        const initials = getInitials(user.client.name);

        // Update the data state with both client_id and initials
        setData({
          ...data,
          img: user.image,
          img_ktp_dpn: user.img_ktp_dpn,
          name: user.nama_lengkap,
          ttl: user.ttl,
          no_ktp: user.nik,
          no_kk: user.nik,
          client_id: clientId,
          initials: initials,
        });
      }
    });
  };

  const fetchData = async () => {
    try {
      const res = await axios
        .get(`employes/api/${data.client_id}`)
        .then((response) => {
          // console.log(response.data);
          if (response.data?.client_id != null) {
            const num = +response.data.numbers + 1;
            const str = String(num).padStart(4, "0");
            setData("numbers", str); // Set the data when a match is found
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
          status: 1,
        },
        {
          onSuccess: () => {
            post(
              route("employes.store"),
              {
                data,
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
                },
              }
            ),
              toast.success("Akun Has been Approved!", {
                theme: "colored",
              });
            closeModal();
          },
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
            status: 2,
          });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedItems(paginatedData.map((item) => item.id)); // check all
    } else {
      setCheckedItems([]); // uncheck all
    }
  };

  const handleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isChackedAll = paginatedData.every((item) =>
    checkedItems.includes(item.id)
  );

  const bulkDelete = () => {
    if (checkedItems.length === 0) {
      toast.error("Please select at least one user to delete.", {
        theme: "colored",
      });
      return;
    }

    setModal(true);
    setTitle("Do You Want To Remove Selected Users ?");
    setContent("You are about to remove " + checkedItems.length + " users.");
    setButton(true);

    // Set the data for bulk deletion
  };
  // console.log("Checked Items:", props);

  return (
    <AdminLayout>
      <Head title="Konfirmasi Karyawan Baru - Home" />
      <HeadNavigation title={"Konfirmasi Karyawan Baru - Home"} />
      <h2 className="font-bold text-lg my-5">
        Confirmation New Employes Data !
      </h2>
      <div className="flex items-center mb-4 gap-x-2">
        <div className="btn-group mb-4">
          <button
            className={`btn btn-sm rounded-sm border-r-0 rounded-r-none ${
              statusFilter === "all"
                ? "btn-warning"
                : "border-r-0 outline-r-none rounded-r-none btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"
            }`}
            onClick={() => {
              setStatusFilter("all");
              setCurrentPage(0);
            }}
          >
            All
          </button>
          <button
            className={`btn btn-sm rounded-none border-r-0 border-l-0 ${
              statusFilter === "pending"
                ? "btn-warning"
                : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"
            }`}
            onClick={() => {
              setStatusFilter("pending");
              setCurrentPage(0);
            }}
          >
            Pending
          </button>
          <button
            className={`btn btn-sm rounded-none border-r-0 border-l-0 ${
              statusFilter === "approved"
                ? "btn-warning"
                : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"
            }`}
            onClick={() => {
              setStatusFilter("approved");
              setCurrentPage(0);
            }}
          >
            Approved
          </button>
          <button
            className={`btn btn-sm rounded-sm border-l-0 rounded-l-none ${
              statusFilter === "rejected"
                ? "btn-warning"
                : "btn-outline border-amber-500 hover:border-amber-600 hover:bg-amber-500 hover:text-white"
            }`}
            onClick={() => {
              setStatusFilter("rejected");
              setCurrentPage(0);
            }}
          >
            Rejected
          </button>
        </div>
        <div className="mb-4">
          <button
            disabled={checkedItems.length <= 0}
            className={`btn btn-sm rounded-sm border-amber-500 ${
              checkedItems.length > 0
                ? "btn-outline hover:border-amber-600 hover:bg-amber-500 hover:text-white"
                : "btn-outline"
            }`}
            onClick={() => bulkDelete()}
          >
            <FaTrashCan />
            Remove
          </button>
        </div>
      </div>

      <table className="table table-zebra table-xs w-full mb-5">
        <thead className="sticky top-0">
          <tr className="bg-orange-600 text-white capitalize">
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              <input
                type="checkbox"
                className="checkbox checkbox-warning checkbox-sm"
                checked={isChackedAll}
                onChange={(e) => handleCheckboxChange(e)}
              />
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              #
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Foto Profil
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Nama Lengkap
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Password
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              No HP (Aktif)
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Email
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Tgl. Input
            </th>
            <th className="border-x-[1px] border-orange-300 sticky top-0 text-center">
              Status
            </th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <EachUtils
            colspan={8}
            of={paginatedData}
            render={(item, i) => {
              return (
                <tr key={i}>
                                                
                  {" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                                                      
                    {" "}
                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning checkbox-sm"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheck(item.id)}
                    />
                                                  
                  </td>
                                                
                    />{" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {i + 1}    {" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                                                      
                    {" "}
                    <div className="ml-6">
                                                            
                      {" "}
                      <img
                        src={
                          `https://absensi-sac.sac-po.com/public/storage/user/` +
                          item.image
                        }
                        alt={item.nama_lengkap}
                        className="w-10 h-10 rounded-full"
                      />
                                                        
                    </div>
                                                  
                  </td>
                                                
                      />{" "}
                    </div>{" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                                                        {item.nama_lengkap}     
                                            
                  </td>
                                                
                    {item.nama_lengkap}    {" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {" "}
                    {item.pw ? item.pw : "Kosong"}    {" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {item.no_hp}{" "}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {item.email}{" "}
                  </td>
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {item.created_at}
                  </td>{" "}
                  <td className="border-x-[1px] border-orange-300 text-center">
                    {" "}
                    {item.status == 0 ? (
                      <span className="badge badge-sm rounded-sm badge-warning text-white p-2">
                        Pending
                      </span>
                    ) : item.status == 1 ? (
                      <span className="badge badge-sm rounded-sm badge-success text-white p-2">
                        Approve
                      </span>
                    ) : (
                      <span className="badge badge-sm rounded-sm badge-error text-white p-2">
                        Rejected
                      </span>
                    )}{" "}
                  </td>{" "}
                  <td className="text-center flex justify-center items-center gap-2">
                    {" "}
                    {/* Add your action buttons here */}{" "}
                    <button
                      disabled={item.status == 1}
                      onClick={() => accept(item.id)}
                      className="btn btn-sm btn-success rounded-sm text-white text-xl"
                    >
                      <BiCheckDouble />
                    </button>{" "}
                    <button
                      disabled={item.status == 1 || item.status == 2}
                      onClick={() => reject(item.id)}
                      className="btn btn-sm btn-warning rounded-sm text-white text-xl"
                    >
                      <MdCancel />
                    </button>{" "}
                    <button
                      onClick={() => removeUser(item)}
                      className="btn btn-sm btn-error rounded-sm text-white text-lg"
                    >
                      <FaTrashCan />
                    </button>{" "}
                  </td>{" "}
                </tr>
              );
            }}
          />
        </tbody>
      </table>
      <ReactPaginate
        containerClassName="join shadow-md mb-10"
        previousLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        pageLinkClassName="join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        nextLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        disabledLinkClassName="join-item btn btn-sm btn-disabled text-white rounded-sm"
        activeLinkClassName="join-item btn btn-sm btn-disabled text-white rounded-sm"
        previousLabel={"Previous"}
        breakLinkClassName="join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white"
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        renderOnZeroPageCount={null}
      />

      {modal && (
        <Modal props={modal}>
          <div className="flex flex-col">
            <h2 className="text-lg text-gray-900 font-extrabold">
              {title ? title : "Apakah Anda Yakin Untuk Memverifikasi Akun ?"}
              <div className="bg-sky-100 p-5 rounded-sm mt-2">
                {content ? (
                  content
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <td className="font-bold">Nama Lengkap</td>
                        <td className="px-2">:</td>
                        <td>{data.name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">TTL</td>
                        <td className="px-2">:</td>
                        <td>{data.ttl}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">No KTP</td>
                        <td className="px-2">:</td>
                        <td>{data.no_ktp}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">No KK</td>
                        <td className="px-2">:</td>
                        <td>{data.no_kk}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </h2>
            <div className="flex justify-end gap-x-1 mt-5  items-center">
              <button
                disabled={processing}
                className={
                  processing
                    ? "btn btn-disabled hover:cursor-not-allowed btn-sm rounded-sm"
                    : "btn btn-primary btn-sm rounded-sm"
                }
                onClick={(e) => (button ? remove(e) : submit(e))}
              >
                Confirm
              </button>
              <button
                onClick={() => closeModal()}
                className="btn uppercase btn-error btn-sm rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

export default IndexTempUsers;
