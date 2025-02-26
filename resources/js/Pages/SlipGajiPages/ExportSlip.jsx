import React, { useEffect } from 'react'

function ExportSlip({ slip, base64 }) {
    const totalPenghasilan =
    (parseFloat(slip.gaji_pokok) || 0) +
    (parseFloat(slip.gaji_lembur) || 0) +
    (parseFloat(slip.tj_jabatan) || 0) +
    (parseFloat(slip.tj_kehadiran) || 0) +
    (parseFloat(slip.tj_kinerja) || 0) +
    (parseFloat(slip.tj_lain) || 0) 

  const totalPotongan =
  (parseFloat(slip.bpjs) || 0) +
  (parseFloat(slip.pinjaman) || 0) + (parseFloat(slip.absen) || 0) + (parseFloat(slip.lain_lain) || 0);

  const totalBersih =
    totalPotongan > 0
      ? totalPenghasilan - totalPotongan
      : totalPenghasilan + totalPotongan;

  // Utility function
  const toRupiah = (angka) => {
    if (!angka) return "Rp. 0";
    return `Rp. ${Number(angka).toLocaleString("id-ID", {
      style: "decimal",
      maximumFractionDigits: 2,
    })}`;
  };

  // Month formatting
  const formattedMonth = slip?.bulan_tahun
    ? new Date(slip.bulan_tahun).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
      })
    : "";  

    useEffect(() => {
        window.print()
    }, [])


  return (
    <div
    className="rounded-md relative"
    style={{ userSelect: "none", position: "relative" }}
  >
    <img
      src={base64}
      alt="Slip background"
      className="rounded-md"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
    />

    <div
      style={{
        zIndex: 10,
        position: "absolute",
        inset: 0,
      }}
      className="absolute inset-0 container-data"
    >
      {/* Month */}
      <p
        id="bulan"
        className="absolute font-semibold"
        style={{
          left: "51.1%",
          top: "31.5%",
          fontSize: "20px",
        }}
      >
        {formattedMonth}
      </p>

      {/* Personal Data */}
      <p
        id="nama"
        className="absolute font-semibold"
        style={{
          left: "20%",
          top: "34%",
          fontSize: "20px",
          textTransform: "capitalize",
        }}
      >
        {slip?.karyawan}
      </p>
      <p
        id="jabatan"
        className="absolute font-semibold"
        style={{
          left: "20%",
          top: "36.8%",
          fontSize: "20px",
        }}
      >
        {slip?.formasi}
      </p>
      <p
        id="mitra"
        className="absolute uppercase font-semibold"
        style={{
          left: "20%",
          top: "39.5%",
          fontSize: "20px",
        }}
      >
        {slip?.employe?.client?.name}
      </p>
      <p
        id="status"
        className="absolute font-semibold"
        style={{
          left: "20%",
          top: "41.8%",
          fontSize: "20px",
        }}
      >
        {slip?.status ? "Kontrak" : "Training"}
      </p>

      {/* Income */}
      <p
        id="gaji_pokok"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "51.9%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.gaji_pokok)}
      </p>
      <p
        id="gaji_lembur"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "54.3%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.gaji_lembur || 0)}
      </p>
      <p
        id="tj_jabatan"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "56.9%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.tj_jabatan || 0)}
      </p>
      <p
        id="tj_kehadiran"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "59.5%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.tj_kehadiran || 0)}
      </p>
      <p
        id="tj_kinerja"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "62.1%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.tj_kinerja || 0)}
      </p>
      <p
        id="tj_lain"
        className="absolute font-semibold"
        style={{
          left: "25%",
          top: "64.6%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.tj_lain || 0)}
      </p>


      {/* End Income */}
      <p
        id="total_penghasilan"
        className="absolute font-bold"
        style={{
          left: "25%",
          top: "69.3%",
          fontSize: "20px",
        }}
      >
        {toRupiah(totalPenghasilan)}
      </p>

      {/* Deductions */}
      <p
        id="bpjs"
        className="absolute font-semibold"
        style={{
          left: "77%",
          top: "51.5%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.bpjs || 0)}
      </p>
      <p
        id="pinjaman"
        className="absolute font-semibold"
        style={{
          left: "77%",
          top: "54.1%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.pinjaman || 0)}
      </p>
      <p
        id="absen"
        className="absolute font-semibold"
        style={{
          left: "77%",
          top: "56.8%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.absen || 0)}
      </p>
      <p
        id="lain_lain"
        className="absolute font-semibold"
        style={{
          left: "77%",
          top: "59.3%",
          fontSize: "20px",
        }}
      >
        {toRupiah(slip?.lain_lain || 0)}
      </p>
      <p
        id="total_potongan"
        className="absolute font-bold"
        style={{
          left: "77%",
          top: "69.3%",
          fontSize: "20px",
        }}
      >
        {toRupiah(totalPotongan)}
      </p>

      {/* Net Total */}
      <p
        id="total_bersih"
        className="absolute font-black"
        style={{
          left: "39%",
          top: "73.4%",
          fontSize: "20px",
        }}
      >
        {toRupiah(totalBersih)}
      </p>
    </div>
  </div>
  )
}

export default ExportSlip