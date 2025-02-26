import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import axios from "axios";

function CreateEmploye(props) {
  const [jenisBpjs, setJenisBpjs] = useState({
    jkk: false,
    jkm: false,
    jht: false,
    jp: false,
    jkp: false,
  });

  // console.log(props);



  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // For arrays, we need to handle the change manually
    setData((data) => ({
      ...data,
      jenis_bpjs: checked
        ? [...data.jenis_bpjs, name]
        : data.jenis_bpjs.filter((item) => item !== name),
    }));
  };


  const { data, setData, post, get, processing, errors, reset } = useForm({
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
    initials: '',
    numbers: '0000',
    date_year: '',
    placehoders: '0000',
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pads month with leading 0 (months are zero-indexed)
    const year = d.getFullYear();

    return `${month}-${year}`;
  };

  // console.log(data.initials + " " +  data.numbers + "-" + formatDate(data.date_year));
  // UMP 00001-04-2023
  // PSP 00001 04-2023


  // Function to extract initials from the name
    const getInitials = (name) => {
      // Remove any text inside parentheses, including the parentheses themselves
      const match = name.match(/\(.*?\)/g, '');
      let nameWithoutParentheses = name.replace(/\(.*?\)/g, '').trim();
      // console.log("AKU PARENTIS", nameWithoutParentheses);
      if (match && match[0]) {
        nameWithoutParentheses += match[0]
        .trim()
        .split(' ')
        .map((word) => {
          let r = word[1];

          let ok = ' '+r
          return ok
        })
        .join('');
      }

      // Split the name into words and take the first letter of each word
      return nameWithoutParentheses
        .split(' ')
        .map((word) => word[0].toUpperCase())
        .join('');
    };


  // Handle change for the select input
  const handleSelectChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = props.clients.find(client => client.id == clientId);

    if (selectedClient) {
      const initials = getInitials(selectedClient.name);

      // Update the data state with both client_id and initials
      setData({
        ...data,
        client_id: clientId,
        initials: initials,
      });
    }
  };

  const fetchData = async () => {
    try {
        const res = await axios.get(`api/${data.client_id}`).then((response) => {
        // console.log(response.data);
        if (response.data?.client_id != null) {
          const num = +response.data.numbers + 1;
          const str = String(num).padStart(4, '0');
          setData("numbers", str); // Set the data when a match is found
        }else{
          setData("numbers", '0000')
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

  // console.log(props.emploGetNIK);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    post(route("employes.store"), {
      data,
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
        ),
          toast.success("Berhasil Menambahkan Data !", {
            theme: "colored",
          });
      },
    });
  };
  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("employes.index");
  };

  return (
    <AdminLayout>
      <Head title="Employe - Create" />
      <HeadNavigation title={"Employe - Create"} />
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-3  "
        >
          <div className="form-control">
            <span className="label-text required">Masukkan Nama : </span>
            <input
              list="users"
              id="browser"
              name="name"
              value={data.name}
              required
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nama"
              className="input input-sm rounded-sm input-bordered"
            />

            <datalist id="users" className="dark:text-white">
              {props.users?.map((user, key) => {
                return <option value={user.nama_lengkap} key={key} id={key} />;
              })}
            </datalist>

            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="form-control">
            <span className="label-text">Tempat Tanggal Lahir : </span>
            <input
              name="ttl"
              value={data.ttl}
              onChange={(e) => setData("ttl", e.target.value)}
              placeholder="Tempat Tanggal Lahir"
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.ttl && <span className="text-red-500">{errors.ttl}</span>}
          </div>

          <div className="form-control">
            <span className="label-text required">Masukkan No KK : </span>
            <input
              name="no_kk"
              value={data.no_kk}
              required
              onChange={(e) => setData("no_kk", e.target.value)}
              placeholder="Nomor KK"
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.no_kk && (
              <span className="text-red-500">{errors.no_kk}</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text required">Masukkan No KTP : </span>

              <input
                name="no_ktp"
                value={data.no_ktp}
                required
                onChange={(e) => setData("no_ktp", e.target.value)}
                placeholder="Nomor KTP"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.no_ktp && (
                <span className="text-red-500">{errors.no_ktp}</span>
              )}
            </div>
            <div className="flex flex-col">
              {data.img_ktp_dpn && (
                <div className="mt-2">
                  <label
                    htmlFor="img_ktp_dpn"
                    className="flex justify-center items-center rounded-sm "
                  >
                    <img
                      src={URL.createObjectURL(data.img_ktp_dpn)}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  </label>
                </div>
              )}
              <div className="form-control mt-2">
                <span className="label-text">Foto KTP (Depan) : </span>

                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,*"
                  name="img_ktp_dpn"
                  onChange={(e) => setData("img_ktp_dpn", e.target.files[0])}
                  className="file-input file-input-sm rounded-sm file-input-bordered"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text required">Pilih Mitra : </span>
              <select
                defaultValue={0}
                required
                onChange={handleSelectChange}
                className="select select-bordered select-sm text-sm rounded-sm"
              >
                <option value={0} disabled>
                  Pilih Mitra
                </option>
                {props?.clients?.map((client, index) => (
                  <option key={index} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors.client_id && (
                <span className="text-red-500">{errors.client_id}</span>
              )}

               {/* Display the initials/alias */}
              {data.initials ? (
                <div className="w-full">
                  <span className="label-text required">No Induk Karyawan : </span>
                  <div className="flex gap-x-2">
                    <input type="text" className="input input-sm input-bordered rounded-sm w-1/4" disabled
                      value={data.initials} readOnly/>

                    <input type="text" className="input input-sm input-bordered rounded-sm w-1/3"
                      value={data.numbers}
                      onChange={(e) => setData("numbers", e.target.value)}
                      placeholder={data.numbers}/>

                    <input type="month" className="input input-sm input-bordered rounded-sm w-1/2"
                      value={data.date_year}
                      onChange={(e) => setData("date_year", e.target.value)}/>
                  </div>
                </div>
              ) : (
                  <div className="w-full flex flex-col mt-5">
                    <span className="label-text">No Induk Karyawan : </span>
                    <span className="text-xs font-semibold required italic text-red-600">Pilih Mitra Terlebih Dahulu </span>
                  </div>
              )}


            </div>
            <div className="form-control mt-2">
              {data.img && (
                <div className="mt-2">
                  <label
                    htmlFor="img"
                    className="flex justify-center items-center rounded-sm "
                  >
                    <img
                      src={URL.createObjectURL(data.img)}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  </label>
                </div>
              )}
              <span className="label-text">Foto Profile : </span>
              <input
                type="file"
                name="img"
                accept=".png,.jpg,.jpeg,*"
                onChange={(e) => setData("img", e.target.files[0])}
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
              {errors.img && <span className="text-red-500">{errors.img}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="form-control">
              <span className="label-text">No BPJS Kesehatan : </span>

              <input
                type="text"
                name="no_bpjs_kesehatan"
                value={data.no_bpjs_kesehatan}
                onChange={(e) => setData("no_bpjs_kesehatan", e.target.value)}
                placeholder="Nomor BPJS Kesehatan"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.no_bpjs_kesehatan && (
                <span className="text-red-500">{errors.no_bpjs_kesehatan}</span>
              )}
            </div>
            <div className="form-control mt-2">
              <span className="label-text">File BPJS Kesehatan : </span>

              <input
                type="file"
                name="file_bpjs_kesehatan"
                accept=".pdf,*"
                onChange={(e) =>
                  setData("file_bpjs_kesehatan", e.target.files[0])
                }
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
              {errors.file_bpjs_kesehatan && (
                <span className="text-red-500">
                  {errors.file_bpjs_kesehatan}
                </span>
              )}
            </div>
          </div>

          {/* BPJS */}
          <div className="flex flex-col gap-y-2">
            <div className="form-control">
              <span className="label-text">No BPJS Ketenaga Kerjaan : </span>

              <input
                type="text"
                name="no_bpjs_ketenaga"
                value={data.no_bpjs_ketenaga}
                onChange={(e) => setData("no_bpjs_ketenaga", e.target.value)}
                placeholder="Nomor BPJS Ketenaga Kerjaan"
                className="input input-sm rounded-sm input-bordered"
              />
            </div>

            <div className="form-control">
              <span className="label-text">File BPJS Ketenaga Kerjaan : </span>

              <input
                type="file"
                name="file_bpjs_ketenaga"
                accept=".pdf,*"
                onChange={(e) =>
                  setData("file_bpjs_ketenaga", e.target.files[0])
                }
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
            </div>
            <div className="flex gap-2 w-full my-10 sm:my-0">
              <button
                type="submit"
                disabled={processing}
                className="btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={(e) => cancel(e)}
                className="btn btn-sm w-[10.5rem] rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="form-control">
            <span className="label-text">Jenis BPJS : </span>
            <div className="grid grid-flow-col grid-cols-1">
              <div className=" bg-white rounded-sm outline-2 outline-lime-100">
                <label className="label cursor-pointer">
                  <span className="label-text">JKK</span>
                  <input
                    name="jkk"
                    chacked={jenisBpjs.jkk}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>

                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JKM</span>
                  <input
                    type="checkbox"
                    name="jkm"
                    chacked={jenisBpjs.jkm}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JHT</span>
                  <input
                    type="checkbox"
                    name="jht"
                    chacked={jenisBpjs.jht}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JP</span>
                  <input
                    type="checkbox"
                    name="jp"
                    chacked={jenisBpjs.jp}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JKP</span>
                  <input
                    type="checkbox"
                    name="jkp"
                    chacked={jenisBpjs.jkp}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* BPJS */}
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateEmploye;
