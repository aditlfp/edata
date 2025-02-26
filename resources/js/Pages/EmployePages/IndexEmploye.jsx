import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
const NoImageComponent = lazy(() => import("../../Components/NoImageComponent"));
import {
  BiSolidCog,
  BiSolidExtension,
  BiSolidFileFind,
  BiSolidTrash,
  BiSortDown,
  BiSortUp,
  BiSolidDownload,
} from "react-icons/bi";
import Modal from "../Admin/Component/Modal";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import debounce from "lodash/debounce";
import EachUtils from "@/lib/utils/EachUtils";

function IndexEmploye({ employe, clients, auth, users, emploCount, jabatan, errors }) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelect, setFilter] = useState("");
  const [filterjabatan, setFilterJabatan] = useState(null)
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 25;
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState([]);
  
  // console.log(errors.message);
  

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
    const user = users.find(us => us.nama_lengkap.toLowerCase() === employee.name.toLowerCase());
    // console.log(user);
    
    return user ? user.jabatan.name_jabatan : 'Data NotFound In Absensi';
  };

  const combinedFilteredEmployees = useMemo(() => {
    return employe.data.filter((employee) => {
      // Check if the employee matches the search query
      const matchesSearchQuery =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.no_ktp.includes(searchQuery);
  
      // Check if the employee matches the client filter
      const matchesFilterSelect =
        filterSelect.toLowerCase() === "all" ||
        employee.client?.name.toLowerCase().includes(filterSelect.toLowerCase());
  
      // Check if the employee matches the job title filter (filterjabatan)
      const matchesFilterJabatan =
        !filterjabatan || // If no filterjabatan selected, all employees match
        filterjabatan.some((fjbt) => {
          return (
            fjbt.value.toLowerCase() === "all" ||
            getJabatanOnEmploye(employee).toLowerCase().includes(fjbt.value.toLowerCase())
          );
        });
  
      // Return true if the employee matches all filters
      return matchesSearchQuery && matchesFilterSelect && matchesFilterJabatan;
    });
  }, [searchQuery, filterSelect, employe.data, filterjabatan]);
  

  
  const currentEmployees = useMemo(() => {
    const sortedEmployees = [...combinedFilteredEmployees].sort((a, b) =>
      sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
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
          theme: "colored",
        });

        setTimeout(() => {
          get(route("employes.index"), {
            replace: true,
            preserveScroll: true,
          });
        }, 2000);
      },
    });
    setModal(!modal);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pads month with leading 0 (months are zero-indexed)
    const year = d.getFullYear();
    
    return `${month}-${year}`;
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

    return (
      <Suspense fallback={<div>Loading...</div>}>
        {imgSrc ? (
          <img src={imgSrc} width={100} loading="lazy" />
        ) : (
          <NoImageComponent width={100} loading="lazy" />
        )}
      </Suspense>
    );
  };

  const insertDataOption = () => {
    const staticOptions = [
      { value: "All", label: "Semua" },
      { value: "Data NotFound In Absensi", label: "Data NotFound In Absensi" },
    ];

    const newOptions = jabatan.map((jbt) => ({
      value: `${jbt.name_jabatan}`,
      label: `${jbt.name_jabatan}`,
    }));
    setOptions([...staticOptions, ...newOptions]); 
  }
  useEffect(() => {
    insertDataOption()
  }, [])

  const handleChange = (selected) => {
    if (!selected || selected.length === 0) {
      // If nothing is selected, reset to show all data
      setFilterJabatan(null);
      setData("jbt_name", []);
      setData('jbt_str', []);
    } else {
      // Update the selected filters
      setFilterJabatan(selected);
      setData("jbt_name", selected);
      setData("jbt_str", selected.filter((item) => item.value).map((item) => item.value));
    }
  };
  
  const updatedOptions = options.map((option) => ({
    ...option,
    isDisabled:
    data.jbt_str != null &&
      data.jbt_str.some((upjbt) => {
        return (
          (upjbt === "All" || upjbt === "Data NotFound In Absensi")
        )})
    }));
    

  useEffect(() => {
    if (errors.message) {
      toast.error(errors.message);
    }
  }, [errors])

  return (
    <AdminLayout overflow={modal ? "overflow-hidden" : "overflow-auto"}>
      <Head title="Employe - Home" />
      <HeadNavigation title={"Employe - Home"} />
      <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
        <div className="flex flex-row gap-x-5">
          {/* Select Divisi */}
          <div
             className="text-sm rounded-sm"
          >
            <Select
                  required
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={handleChange}
                  options={updatedOptions}
                  isOptionDisabled={(option) => option.isDisabled}
                  placeholder="Select an option"
                />
          </div>

          {/* End Select Divisi */}
          <select
            defaultValue={0}
            required
            onChange={(e) => {
              setFilter(e.target.value);
              setData("name", e.target.value);
            }}
            className="select w-32 select-bordered select-sm text-sm rounded-sm"
          >
            <option value={0} disabled>
              Filter Mitra
            </option>
            <option value="All">Semua</option>
            {clients?.map((client, index) => (
              <option key={index} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={handleDownload}
            className="btn btn-sm rounded-sm bg-green-600 text-green-900 hover:bg-green-500 hover:text-green-800"
          >
            <BiSolidDownload className="text-xl" />
          </button>
        </div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan KTP atau Nama"
            className="input input-sm rounded-sm input-bordered"
          />
        </div>
        <button
          onClick={() => createEmploye()}
          className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
        >
          + New Employe
        </button>
      </div>

      <div className="overflow-x-visible">
        <table className="table table-zebra table-xs my-5 overflow-x-scroll">
          <thead>
            <tr className="bg-orange-600 text-white capitalize">
              <th className="border-x-[1px] border-orange-300">No</th>
              <th className="border-x-[1px] border-orange-300">Foto Profile</th>
              <th className="border-x-[1px] border-orange-300 flex">
                {sortOrder ? (
                  <BiSortDown
                    className="text-lg hover:cursor-pointer"
                    onClick={toggleSortOrder}
                  />
                ) : (
                  <BiSortUp
                    className="text-lg hover:cursor-pointer"
                    onClick={toggleSortOrder}
                  />
                )}
                Nama
              </th>
              <th className="border-x-[1px] border-orange-300">Posisi</th>
              <th className="border-x-[1px] border-orange-300">TTL</th>
              <th className="border-x-[1px] border-orange-300">No. KK</th>
              <th className="border-x-[1px] border-orange-300">No. KTP</th>
              <th className="border-x-[1px] border-orange-300">Mitra</th>
              <th className="border-x-[1px] border-orange-300">No Induk Karyawan</th>
              {auth?.user.role_id == 2 && (
                <th className="border-x-[1px] border-orange-300">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
             <EachUtils colspan={10} of={currentEmployees} render={(emplo,index) => (           
                <tr key={index} className="border-[1px] border-orange-300">
                  <td className="border-[1px] border-orange-300">
                    {currentPage * employeesPerPage + index + 1}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    <EmployeeImage img={emplo.img} />
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo?.name}
                  </td>
                  <td className={`border-[1px] border-orange-300 ${getJabatanOnEmploye(emplo) === "Data NotFound In Absensi" ? 'text-red-500 font-semibold' : ''}`}>
                    {getJabatanOnEmploye(emplo)}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.ttl}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.no_kk}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.no_ktp}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.client?.name}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.initials && emplo.numbers && emplo.date_real ?
                      (
                        emplo.initials + ' ' + emplo.numbers + '-' + emplo.date_real
                      )
                      : 
                      <span className="italic text-red-600">
                          Kode Tidak Ditemukan 
                      </span>
                    }
                  </td>
                  {auth?.user.role_id == 2 && (
                    <td className="border-[1px] border-orange-300">
                      <div className="flex justify-center gap-x-1 items-center">
                        <div className="flex flex-col gap-y-1">
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Edit"
                          >
                            <button
                              onClick={() => editEmploye(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-yellow-500 border-0 text-white bg-yellow-500"
                            >
                              <BiSolidCog />
                            </button>
                          </div>
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Delete"
                          >
                            <button
                              onClick={() => handleDelete(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-red-500 border-0 text-white bg-red-500"
                            >
                              <BiSolidTrash />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Details"
                          >
                            <button
                              onClick={() => showEmploye(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-blue-500 border-0 text-white bg-blue-500"
                            >
                              <BiSolidFileFind />
                            </button>
                          </div>
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Career"
                          >
                            <button
                              onClick={() => createCareer(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-green-500 border-0 text-white bg-green-500"
                            >
                              <BiSolidExtension />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              )} />
          </tbody>
        </table>
      </div>

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
      {modal && (
        <Modal>
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-900">
              Apakah Anda Yakin Untuk Menghapus Karyawan{" "}
              {dataModal.user_id ? dataModal.user.nama_lengkap : dataModal.name}
              ?
            </h2>
            <div className="flex justify-end gap-x-1 mt-5  items-center">
              <button
                className="btn btn-error btn-sm rounded-sm"
                onClick={() => confirmDelete(dataModal.id)}
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
    </AdminLayout>
  );
}

export default IndexEmploye;
