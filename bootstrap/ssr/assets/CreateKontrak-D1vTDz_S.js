import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BmQ_mfkc.js";
import { useForm, Head } from "@inertiajs/react";
import { useEffect } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { toast } from "react-toastify";
import "./Sidebar-k6Fk2Fmb.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function CreateKontrak(props) {
  const convertToDateInputFormat = (value) => {
    if (!value)
      return "";
    const [day, month, year] = value.split("-");
    return `${year}-${month}-${day}`;
  };
  const { data, setData, processing, errors, post, reset } = useForm({
    no_srt: "",
    tgl_dibuat: "",
    nama_pk_ptm: "",
    alamat_pk_ptm: "",
    jabatan_pk_ptm: "",
    nama_pk_kda: "",
    tempat_lahir_pk_kda: "-",
    tgl_lahir_pk_kda: "1900-01-01",
    nik_pk_kda: "",
    alamat_pk_kda: "",
    jabatan_pk_kda: "",
    status_pk_kda: "",
    unit_pk_kda: "",
    tgl_mulai_kontrak: "",
    tgl_selesai_kontrak: "",
    g_pok: "",
    tj_hadir: "",
    kinerja: "",
    lain_lain: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("contracts.store"), {
      data,
      onSuccess: () => {
        reset(
          "no_srt",
          "tgl_dibuat",
          "nama_pk_ptm",
          "alamat_pk_ptm",
          "jabatan_pk_ptm",
          "nama_pk_kda",
          "tempat_lahir_pk_kda",
          "tgl_lahir_pk_kda",
          "nik_pk_kda",
          "alamat_pk_kda",
          "jabatan_pk_kda",
          "status_pk_kda",
          "unit_pk_kda",
          "tgl_mulai_kontrak",
          "tgl_selesai_kontrak",
          "g_pok",
          "tj_hadir",
          "kinerja",
          "lain_lain"
        ), toast.success("Berhasil Menambahkan Data !", {
          theme: "colored"
        });
      }
    });
  };
  const handleBirthData = (value) => {
    if (!value || typeof value !== "string" || value.toLowerCase().includes("null")) {
      return { tempat_lahir: "", tanggal_lahir: "" };
    }
    const [place = "", date = ""] = value.split(",").map((str) => str.trim());
    return {
      tempat_lahir: place,
      tanggal_lahir: date
    };
  };
  const autoSelect = () => {
    var _a, _b, _c;
    const selectedUser = props == null ? void 0 : props.users.find(
      (item) => item.nama_lengkap === data.nama_pk_kda
    );
    const selectEmploye = (_a = props == null ? void 0 : props.employe) == null ? void 0 : _a.data.find(
      (item) => item.name === data.nama_pk_kda
    );
    const birth = handleBirthData(selectEmploye == null ? void 0 : selectEmploye.ttl);
    if (selectedUser && selectEmploye) {
      setData({
        ...data,
        // Keep existing fields
        jabatan_pk_kda: ((_b = selectedUser.jabatan) == null ? void 0 : _b.name_jabatan) || "",
        unit_pk_kda: ((_c = selectedUser.client) == null ? void 0 : _c.name) || "",
        nik_pk_kda: selectEmploye == null ? void 0 : selectEmploye.no_ktp,
        tempat_lahir_pk_kda: birth.tempat_lahir,
        tgl_lahir_pk_kda: convertToDateInputFormat(birth.tanggal_lahir)
      });
    }
  };
  useEffect(() => {
    autoSelect();
  }, [data.nama_pk_kda]);
  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("contracts.index");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pengajuan Kontrak - Create" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Pengajuan Kontrak - Create" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        encType: "multipart/form-data",
        className: "gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-2 w-full",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-center font-semibold", children: "Section Surat" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Masukkan No Surat : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "no_srt",
                    name: "no_srt",
                    required: true,
                    value: data.no_srt,
                    onChange: (e) => setData("no_srt", e.target.value),
                    placeholder: props.contracts ? props.contracts.no_srt : "000/SAC/VI/2024",
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.no_srt && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_srt })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tgl Surat Di buat/sepakati : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "tgl_dibuat",
                    name: "tgl_dibuat",
                    required: true,
                    type: "date",
                    value: data.tgl_dibuat,
                    onChange: (e) => setData("tgl_dibuat", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.tgl_dibuat && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tgl_dibuat })
              ] })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "border border-amber-600" }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tgl Mulai Kontrak : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "tgl_mulai_kontrak",
                  name: "tgl_mulai_kontrak",
                  required: true,
                  type: "date",
                  value: data.tgl_mulai_kontrak,
                  onChange: (e) => setData("tgl_mulai_kontrak", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.tgl_mulai_kontrak && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tgl_mulai_kontrak })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tgl Selesai Kontrak : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "tgl_selesai_kontrak",
                  name: "tgl_selesai_kontrak",
                  required: true,
                  type: "date",
                  value: data.tgl_selesai_kontrak,
                  onChange: (e) => setData("tgl_selesai_kontrak", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.tgl_selesai_kontrak && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tgl_selesai_kontrak })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "border border-amber-600" }),
            /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-center font-semibold text-sm", children: "Gaji Dan Tunjangan" }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Gaji Pokok : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "g_pok",
                    name: "g_pok",
                    required: true,
                    type: "text",
                    value: data.g_pok,
                    onChange: (e) => setData("g_pok", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.g_pok && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.g_pok })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tunjangan Kehadiran : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "tj_hadir",
                    name: "tj_hadir",
                    required: true,
                    type: "text",
                    value: data.tj_hadir,
                    onChange: (e) => setData("tj_hadir", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.tj_hadir && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tj_hadir })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Kinerja : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "kinerja",
                    name: "kinerja",
                    required: true,
                    type: "text",
                    value: data.kinerja,
                    onChange: (e) => setData("kinerja", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.kinerja && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.kinerja })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "Lain Lain : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "lain_lain",
                    name: "lain_lain",
                    type: "text",
                    value: data.lain_lain,
                    onChange: (e) => setData("lain_lain", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.lain_lain && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.lain_lain })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-center font-semibold", children: "Pihak Pertama" }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Nama : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "nama_pk_ptm",
                  name: "nama_pk_ptm",
                  required: true,
                  type: "text",
                  value: data.nama_pk_ptm,
                  placeholder: "Masukkan Nama Pihak Pertama....",
                  onChange: (e) => setData("nama_pk_ptm", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.nama_pk_ptm && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.nama_pk_ptm })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Alamat : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "alamat_pk_ptm",
                  name: "alamat_pk_ptm",
                  required: true,
                  type: "text",
                  value: data.alamat_pk_ptm,
                  placeholder: "Masukkan Alamat Pihak Pertama....",
                  onChange: (e) => setData("alamat_pk_ptm", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.alamat_pk_ptm && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.alamat_pk_ptm })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Jabatan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "jabatan_pk_ptm",
                  name: "jabatan_pk_ptm",
                  required: true,
                  type: "text",
                  value: data.jabatan_pk_ptm,
                  placeholder: "Masukkan Jabatan Pihak Pertama....",
                  onChange: (e) => setData("jabatan_pk_ptm", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.jabatan_pk_ptm && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.jabatan_pk_ptm })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-center font-semibold mb-2", children: "Pihak Kedua" }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Nama : " }),
              /* @__PURE__ */ jsxs("select", { name: "nama_pk_kda", id: "", className: "select select-sm rounded-sm input-bordered text-sm", onChange: (e) => setData("nama_pk_kda", e.target.value), children: [
                /* @__PURE__ */ jsx("option", { defaultValue: 0, disabled: true, selected: true, children: "Nama Pihak Kedua" }),
                props == null ? void 0 : props.users.map((item, index) => {
                  var _a;
                  const hasActiveContract = (_a = props.allContracts) == null ? void 0 : _a.some(
                    (contract) => contract.nama_pk_kda == item.nama_lengkap && (/* @__PURE__ */ new Date()).toISOString().split("T")[0] <= contract.tgl_selesai_kontrak
                  );
                  if (item.nama_lengkap == "admin" || hasActiveContract)
                    return null;
                  return /* @__PURE__ */ jsx("option", { value: item.nama_lengkap, children: item.nama_lengkap }, index);
                })
              ] }),
              errors.nama_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.nama_pk_kda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tempat : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "tempat_lahir_pk_kda",
                    name: "tempat_lahir_pk_kda",
                    required: true,
                    type: "text",
                    value: data.tempat_lahir_pk_kda,
                    placeholder: "Masukkan Tempat Lahir Pihak Pertama....",
                    onChange: (e) => setData("tempat_lahir_pk_kda", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.tempat_lahir_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tempat_lahir_pk_kda })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Tanggal Lahir : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "tgl_lahir_pk_kda",
                    name: "tgl_lahir_pk_kda",
                    required: true,
                    type: "date",
                    value: data.tgl_lahir_pk_kda,
                    onChange: (e) => setData("tgl_lahir_pk_kda", e.target.value),
                    className: "input input-sm rounded-sm input-bordered"
                  }
                ),
                errors.tgl_lahir_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.tgl_lahir_pk_kda })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "NIK : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "nik_pk_kda",
                  name: "nik_pk_kda",
                  required: true,
                  type: "text",
                  readOnly: true,
                  value: data.nik_pk_kda,
                  placeholder: "Masukkan NIK Pihak Pertama....",
                  onChange: (e) => setData("nik_pk_kda", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.nik_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.nik_pk_kda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Alamat : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "alamat_pk_kda",
                  name: "alamat_pk_kda",
                  required: true,
                  type: "text",
                  value: data.alamat_pk_kda,
                  placeholder: "Masukkan Alamat Pihak Kedua....",
                  onChange: (e) => setData("alamat_pk_kda", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.alamat_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.alamat_pk_kda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Jabatan : " }),
              /* @__PURE__ */ jsxs("select", { name: "jabatan_pk_kda", id: "jabatan_pk_kda", disabled: true, className: "select select-sm rounded-sm input-bordered text-sm", onChange: (e) => setData("jabatan_pk_kda", e.target.value), children: [
                /* @__PURE__ */ jsx("option", { defaultValue: 0, disabled: true, selected: true, children: "Jabatan Pihak Kedua" }),
                props == null ? void 0 : props.jabatan.map((item, index) => {
                  return /* @__PURE__ */ jsx("option", { selected: item.name_jabatan == data.jabatan_pk_kda && true, value: item.name_jabatan, children: item.name_jabatan }, index);
                })
              ] }),
              errors.jabatan_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.jabatan_pk_kda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Status : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "status_pk_kda",
                  name: "status_pk_kda",
                  required: true,
                  type: "text",
                  value: data.status_pk_kda,
                  placeholder: "Masukkan Status Pihak Kedua....",
                  onChange: (e) => setData("status_pk_kda", e.target.value),
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.status_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.status_pk_kda })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Unit Kerja : " }),
              /* @__PURE__ */ jsxs("select", { name: "unit_pk_kda", id: "unit_pk_kda", disabled: true, required: true, className: "input input-sm text-xs rounded-sm input-bordered", onChange: (e) => setData("unit_pk_kda", e.target.value), children: [
                /* @__PURE__ */ jsx("option", { defaultValue: 0, disabled: true, selected: true, children: "Unit Kerja" }),
                props == null ? void 0 : props.client.map((item, index) => {
                  return /* @__PURE__ */ jsx("option", { selected: item.name == data.unit_pk_kda && true, value: item.name, children: item.name }, index);
                })
              ] }),
              errors.unit_pk_kda && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.unit_pk_kda })
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
                className: "btn btn-sm w-[10.5rem] rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150",
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
  CreateKontrak as default
};
