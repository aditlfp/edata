import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import HeadNavigation from '../Admin/Component/HeadNavigation'
import { toast } from 'react-toastify'

function CreateKontrak( props ) {
  
  const {data, setData, processing ,errors, post, reset} = useForm({
    no_srt: "",
    tgl_dibuat: "",
    nama_pk_ptm: "",
    alamat_pk_ptm: "",
    jabatan_pk_ptm: "",
    nama_pk_kda: "-",
    tempat_lahir_pk_kda: "-",
    tgl_lahir_pk_kda: "1900-01-01",
    nik_pk_kda: "-",
    alamat_pk_kda: "-",
    jabatan_pk_kda: "",
    status_pk_kda: "",
    unit_pk_kda: "",
    tgl_mulai_kontrak: "",
    tgl_selesai_kontrak: "",
    g_pok: "",
    tj_hadir: "",
    kinerja: "",
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
          'kinerja'
        ),
          toast.success("Berhasil Menambahkan Data !", {
            theme: "colored",
          });
      }
    })
  }

  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("contracts.index");
  };

  return (
    <AdminLayout>
      <Head title="Pengajuan Kontrak - Create" />
      <HeadNavigation title={"Pengajuan Kontrak - Create"} />
      <div>
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
            <span className="label-text required">Jabatan : </span>
            <input
              id="jabatan_pk_kda"
              name="jabatan_pk_kda"
              required
              type='text'
              value={data.jabatan_pk_kda}
              placeholder='Masukkan Jabatan Pihak Kedua....'
              onChange={(e) => setData("jabatan_pk_kda", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />

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
            <select name="unit_pk_kda" id="unit_pk_kda" required className='input input-sm text-xs rounded-sm input-bordered' onChange={(e) => setData("unit_pk_kda", e.target.value)}>
              <option defaultValue={0} disabled selected>Unit Kerja</option>
              {props.client.map((item, index) => {
                return (
                  <option key={index} value={item.name}>{item.name}</option>
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