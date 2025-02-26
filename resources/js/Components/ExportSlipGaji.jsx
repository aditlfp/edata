import React from "react";

const ExportSlipGaji = ({ slip, imageUrl }) => {
  // Calculate totals
  const totalPenghasilan =
    slip?.gaji_pokok +
    slip?.gaji_lembur +
    slip?.tj_jabatan +
    slip?.tj_kehadiran +
    slip?.tj_kinerja +
    slip?.tj_lain;

  const totalPotongan =
    slip?.bpjs + slip?.pinjaman + slip?.absen + slip?.lain_lain;

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

  return (
    <div
      className="rounded-md relative"
      style={{ userSelect: "none", position: "relative" }}
    >
      <img
        src={imageUrl}
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
            top: "30.33%",
            fontWeight: 400,
            fontSize: "49px",
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
            top: "32.7%",
            fontWeight: 400,
            fontSize: "49px",
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
            top: "35.2%",
            fontWeight: 400,
            fontSize: "49px",
          }}
        >
          {slip?.user?.divisi?.jabatan?.name_jabatan}
        </p>
        <p
          id="mitra"
          className="absolute font-semibold"
          style={{
            left: "20%",
            top: "37.7%",
            fontWeight: 400,
            fontSize: "49px",
          }}
        >
          {slip?.user?.kerjasama?.client?.name}
        </p>
        <p
          id="status"
          className="absolute font-semibold"
          style={{
            left: "20%",
            top: "40.2%",
            fontWeight: 400,
            fontSize: "49px",
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
            top: "49.9%",
            fontWeight: 400,
            fontSize: "49px",
          }}
        >
          {toRupiah(slip?.gaji_pokok)}
        </p>
        <p
          id="total_penghasilan"
          className="absolute font-bold"
          style={{
            left: "25%",
            top: "67.9%",
            fontSize: "49px",
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
            top: "49.9%",
            fontWeight: 400,
            fontSize: "49px",
          }}
        >
          {toRupiah(slip?.bpjs)}
        </p>
        <p
          id="total_potongan"
          className="absolute font-bold"
          style={{
            left: "77%",
            top: "67.9%",
            fontSize: "49px",
          }}
        >
          {toRupiah(totalPotongan)}
        </p>

        {/* Net Total */}
        <p
          id="total_bersih"
          className="absolute font-bold"
          style={{
            left: "39%",
            top: "72.1%",
            fontSize: "49px",
          }}
        >
          {toRupiah(totalBersih)}
        </p>
      </div>
    </div>
  );
};

export default ExportSlipGaji;
