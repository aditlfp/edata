import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-oLkvHzfQ.js";
import { useState, useEffect } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { useForm, Head, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Sidebar-Cm1FAR-6.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function EditEmploye(props) {
  var _a;
  const [jenisBpjs, setJenisBpjs] = useState({
    jkk: false,
    jkm: false,
    jht: false,
    jp: false,
    jkp: false
  });
  const { data, setData, put, processing, errors } = useForm({
    user_id: props.employe.user_id,
    name: props.employe.name,
    ttl: props.employe.ttl,
    no_kk: props.no_kk,
    no_ktp: props.no_ktp,
    client_id: props.employe.client_id,
    jenis_bpjs: props.employe.jenis_bpjs,
    no_bpjs_kesehatan: props.employe.no_bpjs_kesehatan,
    no_bpjs_ketenaga: props.employe.no_bpjs_ketenaga,
    img: "",
    img_ktp_dpn: "",
    file_bpjs_kesehatan: "",
    file_bpjs_ketenaga: "",
    oldimage: props.employe.img ? props.employe.img : "",
    oldktp: props.employe.img_ktp_dpn ? props.employe.img_ktp_dpn : "",
    oldFileBpjs: props.employe.file_bpjs_kesehatan ? props.employe.file_bpjs_kesehatan : "",
    oldKetenaga: props.employe.file_bpjs_ketenaga ? props.employe.file_bpjs_ketenaga : "",
    initials: props.employe.initials ? props.employe.initials : "",
    numbers: props.employe.numbers,
    date_year: props.employe.date_real
  });
  const getInitials = (name) => {
    let nameWithoutParentheses = name.replace(/\(.*?\)/g, "").trim();
    return nameWithoutParentheses.split(" ").map((word) => {
      var _a2;
      return (_a2 = word[0]) == null ? void 0 : _a2.toUpperCase();
    }).join("");
  };
  const handleSelectChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = props.clients.find(
      (client) => client.id == clientId
    );
    if (selectedClient) {
      const initials = getInitials(selectedClient.name);
      setData({
        ...data,
        client_id: clientId,
        initials
      });
    }
  };
  const setInitials = () => {
    if (props.employe && props.employe.client_id) {
      const selectedClient = props.clients.find(
        (client) => client.id == props.employe.client_id
      );
      if (selectedClient) {
        const initials = getInitials(selectedClient.name);
        setData({
          ...data,
          client_id: selectedClient.id,
          initials
        });
      }
    }
  };
  useEffect(() => {
    setInitials();
  }, []);
  console.log(data.initials);
  const fetchData = async () => {
    if (!data.client_id) return;
    const routers = route("api-edit-emplo", { client_id: data.client_id });
    try {
      const response = await axios.get(routers).then((res) => {
        console.log(res);
        if (res.status == 200) {
          const getHigherNumber = res.data.sort((a, b) => {
            return parseInt(b.numbers) - parseInt(a.numbers);
          });
          const emp = res.data.find((d) => d.name == data.name);
          if (emp) {
            setData((prevData) => ({
              ...prevData,
              numbers: emp.numbers
            }));
          } else if (res.data.length > 0) {
            const num = Number(getHigherNumber[0].numbers) + 1;
            const str = String(num).padStart(4, "0");
            setData((prevData) => ({
              ...prevData,
              numbers: str
            }));
          } else {
            setData((prevData) => ({
              ...prevData,
              numbers: "0000"
            }));
          }
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
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      jenis_bpjs: Array.isArray(prevData.jenis_bpjs) ? checked ? [...prevData.jenis_bpjs, name] : prevData.jenis_bpjs.filter((item) => item !== name) : []
      // Fallback to empty array if not iterable
    }));
  };
  const updatedJenisBpjs = Object.keys(jenisBpjs).reduce((acc, key) => {
    var _a2;
    acc[key] = (_a2 = data.jenis_bpjs) == null ? void 0 : _a2.includes(key);
    return acc;
  }, {});
  const [newImg, setNewImg] = useState(null);
  const [newKtp, setNewKtp] = useState(null);
  const [newBpjs, setNewBpjs] = useState(null);
  const [newKetenaga, setNewKetenaga] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("employes.update", props.employe.id), {
      _method: "PATCH",
      user_id: data.user_id,
      name: data.name,
      ttl: data.ttl,
      no_kk: data.no_kk,
      no_ktp: data.no_ktp,
      client_id: data.client_id,
      jenis_bpjs: data.jenis_bpjs,
      no_bpjs_kesehatan: data.no_bpjs_kesehatan,
      no_bpjs_ketenaga: data.no_bpjs_ketenaga,
      img: newImg,
      img_ktp_dpn: newKtp,
      file_bpjs_kesehatan: newBpjs,
      file_bpjs_ketenaga: newKetenaga,
      oldimage: data.oldimage,
      oldktp: data.oldktp,
      oldFileBpjs: data.oldFileBpjs,
      oldKetenaga: data.oldKetenaga,
      initials: data.initials,
      numbers: data.numbers,
      date_year: data.date_year
    }, {
      onSuccess: () => {
        toast.success("Berhasil Mengupdate Data !", {
          theme: "colored"
        });
        window.location.href = route("employes.index");
      }
    });
  };
  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("employes.index");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Update" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Update" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        encType: "multipart/form-data",
        className: "gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-4",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Masukkan Nama : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "Nama",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.name })
          ] }),
          data.initials ? /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text required", children: "No Induk Karyawan : " }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2", children: [
              /* @__PURE__ */ jsx("input", { type: "text", className: "input input-sm input-bordered rounded-sm w-1/4", disabled: true, value: data.initials, readOnly: true }),
              /* @__PURE__ */ jsx("input", { type: "text", className: "input input-sm input-bordered rounded-sm w-1/3", value: data.numbers ? data.numbers : "0000", onChange: (e) => setData("numbers", e.target.value) }),
              /* @__PURE__ */ jsx("input", { type: "month", className: "input input-sm input-bordered rounded-sm w-1/3", value: data.date_year, onChange: (e) => setData("date_year", e.target.value) })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col mt-5", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "No Induk Karyawan : " }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold required italic text-red-600", children: "Pilih Mitra Terlebih Dahulu " })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Tempat Tanggal Lahir : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "ttl",
                value: data.ttl,
                onChange: (e) => setData("ttl", e.target.value),
                placeholder: "Tempat Tanggal Lahir",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.ttl && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.ttl })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Masukkan No KK : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "no_kk",
                value: data.no_kk,
                onChange: (e) => setData("no_kk", e.target.value),
                placeholder: "Nomor KK",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.no_kk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_kk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Masukkan No KTP : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "no_ktp",
                  value: data.no_ktp,
                  onChange: (e) => setData("no_ktp", e.target.value),
                  placeholder: "Nomor KTP",
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.no_ktp && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_ktp })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "img_ktp_dpn",
                  className: "flex justify-center items-center rounded-sm ",
                  children: props.employe.img_ktp_dpn ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${props.ziggy.url}/storage/images/${props.employe.img_ktp_dpn}`,
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      width: 150,
                      className: "rounded-sm drop-shadow-md"
                    }
                  ) : newKtp && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: URL.createObjectURL(newKtp),
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      className: "rounded-sm drop-shadow-md"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "Foto KTP (Depan) : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    name: "img_ktp_dpn",
                    onChange: (e) => {
                      setNewKtp(e.target.files[0]);
                    },
                    className: "file-input file-input-sm rounded-sm file-input-bordered"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Pilih Mitra* : " }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  defaultValue: data.client_id,
                  onChange: handleSelectChange,
                  className: "select select-bordered select-sm text-sm rounded-sm",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: 0, disabled: true, children: "Pilih Mitra" }),
                    (_a = props == null ? void 0 : props.clients) == null ? void 0 : _a.map((client, index) => /* @__PURE__ */ jsx("option", { value: client.id, children: client.name }, index))
                  ]
                }
              ),
              errors.client_id && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.client_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "img",
                  className: "flex justify-center items-center rounded-sm ",
                  children: props.employe.img ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `${props.ziggy.url}/storage/images/${props.employe.img}`,
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      width: 150,
                      className: "rounded-sm drop-shadow-md"
                    }
                  ) : newImg && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: URL.createObjectURL(newImg),
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      width: 150,
                      className: "rounded-sm drop-shadow-md"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Foto : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  name: "img",
                  onChange: (e) => {
                    setNewImg(e.target.files[0]);
                  },
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "No BPJS Kesehatan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "no_bpjs_kesehatan",
                  value: data.no_bpjs_kesehatan,
                  onChange: (e) => setData("no_bpjs_kesehatan", e.target.value),
                  placeholder: "Nomor BPJS Kesehatan",
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.no_bpjs_kesehatan && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_bpjs_kesehatan })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "File BPJS Kesehatan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: ".pdf",
                  name: "file_bpjs_kesehatan",
                  onChange: (e) => {
                    setNewBpjs(e.target.files[0]);
                  },
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              ),
              errors.file_bpjs_kesehatan && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.file_bpjs_kesehatan })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "No BPJS Ketenaga Kerjaan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "no_bpjs_ketenaga",
                  value: data.no_bpjs_ketenaga,
                  onChange: (e) => setData("no_bpjs_ketenaga", e.target.value),
                  placeholder: "Nomor BPJS Ketenaga Kerjaan",
                  className: "input input-sm rounded-sm input-bordered"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Jenis BPJS : " }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-flow-col grid-cols-1", children: /* @__PURE__ */ jsxs("div", { className: " bg-white rounded-sm outline-2 outline-lime-100", children: [
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "JKK" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "jkk",
                    defaultChecked: updatedJenisBpjs.jkk,
                    chacked: jenisBpjs.jkk,
                    onChange: handleCheckboxChange,
                    type: "checkbox",
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JKM" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jkm",
                    defaultChecked: updatedJenisBpjs.jkm,
                    chacked: jenisBpjs.jkm,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JHT" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jht",
                    defaultChecked: updatedJenisBpjs.jht,
                    chacked: jenisBpjs.jht,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JP" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jp",
                    defaultChecked: updatedJenisBpjs.jp,
                    chacked: jenisBpjs.jp,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JKP" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jkp",
                    defaultChecked: updatedJenisBpjs.jkp,
                    chacked: jenisBpjs.jkp,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "File BPJS Ketenaga Kerjaan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  name: "file_bpjs_ketenaga",
                  onChange: (e) => {
                    setNewKetenaga(e.target.files[0]);
                  },
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full my-10 sm:my-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150",
                children: "Simpan"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => cancel(e),
                className: "btn btn-sm w-1/2 rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  EditEmploye as default
};
