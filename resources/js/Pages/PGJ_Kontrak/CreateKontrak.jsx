import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import HeadNavigation from '../Admin/Component/HeadNavigation'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function CreateKontrak( props ) {
  // console.log(props.employe.data);
  const convertToDateInputFormat = (value) => {
    if (!value) return "";
    const [day, month, year] = value.split("-");
    return `${year}-${month}-${day}`;
  };
  
  const {data, setData, processing ,errors, post, reset} = useForm({
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
    lain_lain: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("contracts.store"), {
      data,
      onSuccess: () => {
        reset(
          'no_srt',
          'tgl_dibuat',
          'nama_pk_ptm',
          'alamat_pk_ptm',
          'jabatan_pk_ptm',
          'nama_pk_kda',
          'tempat_lahir_pk_kda',
          'tgl_lahir_pk_kda',
          'nik_pk_kda',
          'alamat_pk_kda',
          'jabatan_pk_kda',
          'status_pk_kda',
          'unit_pk_kda',
          'tgl_mulai_kontrak',
          'tgl_selesai_kontrak',
          'g_pok',
          'tj_hadir',
          'kinerja',
          'lain_lain'
        ),
          toast.success("Berhasil Menambahkan Data !", {
            theme: "colored",
          });
      }
    })
  }

 const handleBirthData = (value) => {
    if (!value || typeof value !== "string" || value.toLowerCase().includes("null")) {
          return { tempat_lahir: "", tanggal_lahir: "" };
    }

    const [place = "", date = ""] = value.split(",").map((str) => str.trim());

    return {
      tempat_lahir: place,
      tanggal_lahir: date,
    };
  };


  const autoSelect = () => {
    const selectedUser = props?.users.find(
      (item) => item.nama_lengkap === data.nama_pk_kda
    );

    const selectEmploye = props?.employe?.data.find(
      (item) =>  item.name === data.nama_pk_kda
    );

    const birth = handleBirthData(selectEmploye?.ttl);

    
    if (selectedUser && selectEmploye) {
     setData({
        ...data, // Keep existing fields
        jabatan_pk_kda: selectedUser.jabatan?.name_jabatan || "",
        unit_pk_kda: selectedUser.client?.name || "",
        nik_pk_kda: selectEmploye?.no_ktp,
        tempat_lahir_pk_kda: birth.tempat_lahir,
        tgl_lahir_pk_kda: convertToDateInputFormat(birth.tanggal_lahir),
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

  return (
    <AdminLayout>
      <Head title="Pengajuan Kontrak - Create" />
      <HeadNavigation title={"Pengajuan Kontrak - Create"} />
      <div>
        {/* <span>{data.unit_pk_kda}</span> */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-2 w-full"
        >
        <div className='flex flex-col gap-y-2'>
        <span className='text-center font-semibold'>Section Surat</span>
        
        <div className='flex flex-col gap-y-2'>
          <div className="form-control">
            <span className="label-text required">Masukkan No Surat : </span>
            <input
              id="no_srt"
              name="no_srt"
              required
              value={data.no_srt}
              onChange={(e) => setData("no_srt", e.target.value)}
              placeholder={props.contracts ? props.contracts.no_srt : "000/SAC/VI/2024"}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.no_srt &&<span className="text-red-500">{errors.no_srt}</span>}
          </div>

          <div className="form-control">
            <span className="label-text required">Tgl Surat Di buat/sepakati : </span>
            <input
              id="tgl_dibuat"
              name="tgl_dibuat"
              required
              type='date'
              value={data.tgl_dibuat}
              onChange={(e) => setData("tgl_dibuat", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.tgl_dibuat &&<span className="text-red-500">{errors.tgl_dibuat}</span>}
          </div>
          </div>
        <hr className='border border-amber-600'/>

          <div className="form-control">
            <span className="label-text required">Tgl Mulai Kontrak : </span>
            <input
              id="tgl_mulai_kontrak"
              name="tgl_mulai_kontrak"
              required
              type='date'
              value={data.tgl_mulai_kontrak}
              onChange={(e) => setData("tgl_mulai_kontrak", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.tgl_mulai_kontrak &&<span className="text-red-500">{errors.tgl_mulai_kontrak}</span>}
          </div>

          <div className="form-control">
            <span className="label-text required">Tgl Selesai Kontrak : </span>
            <input
              id="tgl_selesai_kontrak"
              name="tgl_selesai_kontrak"
              required
              type='date'
              value={data.tgl_selesai_kontrak}
              onChange={(e) => setData("tgl_selesai_kontrak", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.tgl_selesai_kontrak &&<span className="text-red-500">{errors.tgl_selesai_kontrak}</span>}
          </div>

          <hr className='border border-amber-600'/>

          <div className='w-full flex flex-col'>
            <span className='text-center font-semibold text-sm'>Gaji Dan Tunjangan</span>
            <div className="form-control">
              <span className="label-text required">Gaji Pokok : </span>
              <input
                id="g_pok"
                name="g_pok"
                required
                type='text'
                value={data.g_pok}
                onChange={(e) => setData("g_pok", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
              />

              {errors.g_pok &&<span className="text-red-500">{errors.g_pok}</span>}
            </div>
            <div className="form-control">
              <span className="label-text required">Tunjangan Kehadiran : </span>
              <input
                id="tj_hadir"
                name="tj_hadir"
                required
                type='text'
                value={data.tj_hadir}
                onChange={(e) => setData("tj_hadir", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
              />

              {errors.tj_hadir &&<span className="text-red-500">{errors.tj_hadir}</span>}
            </div>
            <div className="form-control">
              <span className="label-text required">Kinerja : </span>
              <input
                id="kinerja"
                name="kinerja"
                required
                type='text'
                value={data.kinerja}
                onChange={(e) => setData("kinerja", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
              />

              {errors.kinerja &&<span className="text-red-500">{errors.kinerja}</span>}
            </div>
            <div className="form-control">
              <span className="label-text">Lain Lain : </span>
              <input
                id="lain_lain"
                name="lain_lain"
                type='text'
                value={data.lain_lain}
                onChange={(e) => setData("lain_lain", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
              />

              {errors.lain_lain &&<span className="text-red-500">{errors.lain_lain}</span>}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
        <span className='text-center font-semibold'>Pihak Pertama</span>
        <div className="form-control">
            <span className="label-text required">Nama : </span>
            <input
              id="nama_pk_ptm"
              name="nama_pk_ptm"
              required
              type='text'
              value={data.nama_pk_ptm}
              placeholder='Masukkan Nama Pihak Pertama....'
              onChange={(e) => setData("nama_pk_ptm", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.nama_pk_ptm &&<span className="text-red-500">{errors.nama_pk_ptm}</span>}
          </div>
        <div className="form-control">
            <span className="label-text required">Alamat : </span>
            <input
              id="alamat_pk_ptm"
              name="alamat_pk_ptm"
              required
              type='text'
              value={data.alamat_pk_ptm}
              placeholder='Masukkan Alamat Pihak Pertama....'
              onChange={(e) => setData("alamat_pk_ptm", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.alamat_pk_ptm &&<span className="text-red-500">{errors.alamat_pk_ptm}</span>}
          </div>
        <div className="form-control">
            <span className="label-text required">Jabatan : </span>
            <input
              id="jabatan_pk_ptm"
              name="jabatan_pk_ptm"
              required
              type='text'
              value={data.jabatan_pk_ptm}
              placeholder='Masukkan Jabatan Pihak Pertama....'
              onChange={(e) => setData("jabatan_pk_ptm", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.jabatan_pk_ptm &&<span className="text-red-500">{errors.jabatan_pk_ptm}</span>}
          </div>

        <span className='text-center font-semibold mb-2'>Pihak Kedua</span>
        
        <div className="form-control">
            <span className="label-text required">Nama : </span>
            <select name="nama_pk_kda" id="" className='select select-sm rounded-sm input-bordered text-sm' onChange={(e) => setData("nama_pk_kda", e.target.value)}>
            <option defaultValue={0} disabled selected>Nama Pihak Kedua</option>
            {props?.users.map((item, index) => {
              const hasActiveContract = props.allContracts?.some(contract =>
                contract.nama_pk_kda == item.nama_lengkap &&
                 new Date().toISOString().split('T')[0] <= contract.tgl_selesai_kontrak
              );

              if (item.nama_lengkap == 'admin' || hasActiveContract) return null;

              return (
                <option key={index} value={item.nama_lengkap}>
                  {item.nama_lengkap}
                </option>
              );
            })}

            </select>
            {errors.nama_pk_kda &&<span className="text-red-500">{errors.nama_pk_kda}</span>}
        </div>
        <div className='flex gap-x-2'>
            <div className="form-control">
                <span className="label-text required">Tempat : </span>
                <input
                id="tempat_lahir_pk_kda"
                name="tempat_lahir_pk_kda"
                required
                type='text'
                value={data.tempat_lahir_pk_kda}
                placeholder='Masukkan Tempat Lahir Pihak Pertama....'
                onChange={(e) => setData("tempat_lahir_pk_kda", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
                />

                {errors.tempat_lahir_pk_kda &&<span className="text-red-500">{errors.tempat_lahir_pk_kda}</span>}
            </div>
            <div className="form-control">
                <span className="label-text required">Tanggal Lahir : </span>
                <input
                id="tgl_lahir_pk_kda"
                name="tgl_lahir_pk_kda"
                required
                type='date'
                value={data.tgl_lahir_pk_kda}
                onChange={(e) => setData("tgl_lahir_pk_kda", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
                />

                {errors.tgl_lahir_pk_kda &&<span className="text-red-500">{errors.tgl_lahir_pk_kda}</span>}
            </div>
          </div>
         <div className="form-control">
                <span className="label-text required">NIK : </span>
                <input
                id="nik_pk_kda"
                name="nik_pk_kda"
                required
                type='text'
                readOnly
                value={data.nik_pk_kda}
                placeholder='Masukkan NIK Pihak Pertama....'
                onChange={(e) => setData("nik_pk_kda", e.target.value)}
                className="input input-sm rounded-sm input-bordered"
                />

                {errors.nik_pk_kda &&<span className="text-red-500">{errors.nik_pk_kda}</span>}
            </div>
        <div className="form-control">
            <span className="label-text required">Alamat : </span>
            <input
              id="alamat_pk_kda"
              name="alamat_pk_kda"
              required
              type='text'
              value={data.alamat_pk_kda}
              placeholder='Masukkan Alamat Pihak Kedua....'
              onChange={(e) => setData("alamat_pk_kda", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.alamat_pk_kda &&<span className="text-red-500">{errors.alamat_pk_kda}</span>}
        </div>
        <div className="form-control">
            <span className="label-text required">Jabatan : </span>
            <select name="jabatan_pk_kda" id="jabatan_pk_kda" disabled className='select select-sm rounded-sm input-bordered text-sm' onChange={(e) => setData("jabatan_pk_kda", e.target.value)}>
            <option defaultValue={0} disabled selected>Jabatan Pihak Kedua</option>
            {props?.jabatan.map((item, index) => {
              return (
                <option key={index} selected={item.name_jabatan == data.jabatan_pk_kda && true} value={item.name_jabatan}>{item.name_jabatan}</option>
              )
            })}
            </select>

            {errors.jabatan_pk_kda &&<span className="text-red-500">{errors.jabatan_pk_kda}</span>}
        </div>
        <div className="form-control">
            <span className="label-text required">Status : </span>
            <input
              id="status_pk_kda"
              name="status_pk_kda"
              required
              type='text'
              value={data.status_pk_kda}
              placeholder='Masukkan Status Pihak Kedua....'
              onChange={(e) => setData("status_pk_kda", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

            {errors.status_pk_kda &&<span className="text-red-500">{errors.status_pk_kda}</span>}
        </div>
        <div className="form-control">
            <span className="label-text required">Unit Kerja : </span>
            <select name="unit_pk_kda" id="unit_pk_kda" disabled required className='input input-sm text-xs rounded-sm input-bordered' onChange={(e) => setData("unit_pk_kda", e.target.value)}>
              <option defaultValue={0} disabled selected>Unit Kerja</option>
              {props?.client.map((item, index) => {
                return (
                  <option key={index} selected={item.name == data.unit_pk_kda && true} value={item.name}>{item.name}</option>
                )
              })}
            </select>
            {errors.unit_pk_kda &&<span className="text-red-500">{errors.unit_pk_kda}</span>}
        </div>
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
        </form>
      </div>
    </AdminLayout>
  )
}

export default CreateKontrak