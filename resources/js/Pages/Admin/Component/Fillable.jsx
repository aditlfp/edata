import Header from "/public/assets/header.png";
import Footer from "./Footer";

export default function Fillable({props, day, dateContract}) {
    
    return (
        <>
        {/* Hal 1 */}
        <div className="w-[8.5in] min-h-[11in] bg-white flex flex-col">
          <img src={Header} alt="header" className="mt-[-6pt] px-[20pt]" />
          <div className="mx-[70pt] leading-tight flex-grow">
            <p
              className="text-center font-bold underline underline-offset-[2.64pt]"
              style={{ textDecorationThickness: "1.5pt" }}
            >
              SURAT PERJANJIAN KERJA WAKTU <br /> TERTENTU (KONTRAK)
            </p>
            <p className="text-center">Nomor : {props.no_srt}</p>
            <div className="text-justify">
              <p className="mt-[20pt]">
                Pada hari ini, {day}, telah
                dibuat dan disepakati perjanjian kerja antara:
              </p>
              <div className="ml-[10pt]">
                <table className="table-auto w-full">
                  <tbody>
                    <tr className="table-row">
                      <td className="w-[16pt]">I.</td>
                      <td className="w-[120pt]">Nama</td>
                      <td>: {props.nama_pk_ptm}</td>
                    </tr>
                    <tr className="table-row">
                      <td></td>
                      <td>Alamat</td>
                      <td>: {props.alamat_pk_ptm}</td>
                    </tr>
                    <tr className="table-row">
                      <td></td>
                      <td>Jabatan</td>
                      <td>: {props.jabatan_pk_ptm}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td colSpan={2}>
                        <p className="mt-[12pt]">
                          Dalam hal ini bertindak untuk dan atas nama{" "}
                          <b>PT Surya Amanah Cendekia Ponorogo</b> yang
                          selanjutnya disebut sebagai <b> PIHAK PERTAMA.</b>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className=" table-auto w-full mt-[12pt]">
                  <tbody>
                    <tr className="table-row">
                      <td className="w-[16pt]">II.</td>
                      <td className="w-[120pt]">Nama</td>
                      <td>: {props.nama_pk_kda}</td>
                    </tr>
                    <tr className="table-row">
                      <td></td>
                      <td>Tempat/ Tgl Lahir</td>
                      <td>: {props.tempat_lahir_pk_kda}, {props.tgl_lahir_pk_kda}</td>
                    </tr>
                    <tr className="table-row">
                      <td></td>
                      <td>NIK</td>
                      <td>: {props.nik_pk_kda}</td>
                    </tr>
                    <tr className="table-row">
                      <td></td>
                      <td>Alamat</td>
                      <td>
                        : {props.alamat_pk_kda}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td colSpan={2}>
                        <p className="mt-[12pt]">
                          Dalam hal ini bertindak untuk dan atas nama diri
                          sendiri. Selanjutnya dalam Perjanjian ini disebut{" "}
                          <b>PIHAK KEDUA.</b>
                        </p>
                        <p className="mt-[12pt] text-justify">
                          PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama
                          disebut KEDUA PIHAK.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-bold text-center mt-[10pt]">
                Pasal 1 <br />
                LATAR BELAKANG
              </p>
              <table className=" table-fixed">
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top", width: "22pt" }}>1.1</td>
                    <td>
                      PIHAK PETAMA merupakan perusahan yang bergerak dibidang
                      perdagangan dan pelayanan umum
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>1.2</td>
                    <td>
                      Bahwa setelah diadakan penilaian oleh PIHAK PERTAMA, PIHAK
                      KEDUA dinyatakan memenuhi persyaratan dan bersedia bekerja
                      dalam jangka waktu tertentu.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>1.3</td>
                    <td>
                      PIHAK PERTAMA dengan ini memperkerjakan PIHAK KEDUA untuk
                      jangka waktu tertentu.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>1.4</td>
                    <td>
                      Bahwa PIHAK KEDUA menyetujui bekerja selama jangka waktu
                      tertentu sebagaimana dimaksud dalam perjanjian ini untuk
                      PIHAK PERTAMA.
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                Setelah memperhatikan pertimbangan tersebut di atas dengan ini
                dicapai kata sepakat antara KEDUA PIHAK untuk mengikatkan diri
                dalam mengadakan Perjanjian Kerja Waktu Tertentu (Selanjutnya
                disebut dengan Perjanjian) dengan ketentuan dan syarat - syarat
                sebagai berikut:
              </p>
            </div>
          </div>
          <Footer/>

        </div>
        {/* Hal 2 */}
        <div className="w-[8.5in] min-h-[11in] bg-white flex flex-col">
          <img src={Header} alt="header" className="mt-[-6pt] px-[20pt]" />
          <div className="mx-[70pt] leading-tight flex-grow">
            <p className="font-bold text-center">
              Pasal 2 <br />
              RUANG LINGKUP PEKERJAAN DAN PENEMPATAN
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>2.1</td>
                  <td>
                    PIHAK PERTAMA menetapkan PIHAK KEDUA untuk bekerja di PT
                    Surya Amanah Cendekia Ponorogo sebagai:
                    <table>
                      <tbody>
                        <tr>
                          <td className="w-[20pt]">a.</td>
                          <td className="w-[94pt]">Jabatan</td>
                          <td>: {props.jabatan_pk_kda}</td>
                        </tr>
                        <tr>
                          <td>b.</td>
                          <td>Status</td>
                          <td>: {props.status_pk_kda}</td>
                        </tr>
                        <tr>
                          <td>c.</td>
                          <td>Unit Kerja</td>
                          <td>: {props.unit_pk_kda}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.2</td>
                  <td>
                    Perjanjian ini dibuat untuk jangka waktu 1 (satu) tahun
                    terhitung mulai dari {dateContract}. Perjanjian ini dapat diperpanjang lagi
                    sesuai dengan ketentuan yang berlaku.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>2.3</td>
                  <td>
                    PIHAK KEDUA menyadari sepenuhnya dan menyetujui untuk
                    dikaryakan pada PERUSAHAAN tersebut di atas sesuai dengan
                    kondisi dan ketentuan dalam perjanjian ini
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 3 <br />
              TUGAS DAN TANGGUNGJAWAB
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>3.1.</td>
                  <td>
                    PIHAK PERTAMA menempatkan PIHAK KEDUA sebagai tenaga
                    PERUSAHAAN dengan rincian tugas sebagaimana yang diatur oleh
                    PERUSAHAAN.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.2.</td>
                  <td>
                    PIHAK KEDUA wajib bertanggungjawab atas segala sikap dan
                    perilaku dalam menjalankan tugas, serta wajib mentaati semua
                    peraturan dan tata tertib yang berlaku di PERUSAHAAN.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.3.</td>
                  <td>
                    PIHAK KEDUA bersedia tunduk dan melaksanakan seluruh
                    ketentuan yang telah diatur dalam Peraturan Perusahaan dan
                    tata tertib perusahaan maupun ketentuan lain yang menjadi
                    keputusan Direksi dan Manajemen Perusahaan. PIHAK KEDUA
                    bersedia menyimpan dan menjaga kerahasiaan baik dokumen
                    maupun informasi milik PIHAK PERTAMA dan tidak dibenarkan
                    memberikan dokumen atau informasi yang diketahui baik secara
                    lisan maupun tertulis kepada pihak lain.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.4.</td>
                  <td>
                    PIHAK PERTAMA berhak memutasikan PIHAK KEDUA untuk bekerja
                    di tempat dan posisi yang lain selain yang tercantum di
                    dalam perjanjian ini selama masa perjanjian ini berlangsung
                    dianggap perlu.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.5.</td>
                  <td>
                    PIHAK KEDUA bertanggungjawab penuh terhadap peralatan kerja
                    milik PIHAK PERTAMA.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.6.</td>
                  <td>
                    PIHAK KEDUA wajib membaca, mengerti, memahami, mematuhi dan
                    menaati sepenuhnya setiap ketentuan dan peraturan yang
                    berlaku pada PIHAK PERTAMA dan ketentuan yang berlaku pada
                    PERUSAHAAN.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>3.7.</td>
                  <td>
                    PIHAK KEDUA berkewajiban menyelesaikan masa kontrak yang
                    telah di tandatangani.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 4 <br />
              KOMPENSASI
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>4.1.</td>
                  <td>
                    Atas pekerjaan ini PIHAK KEDUA berhak untuk memperoleh
                    Kompensasi sebagai berikut:
                    <table className="ml-[12pt]">
                      <tbody>
                        <tr>
                          <td className="w-[20pt]">a.</td>
                          <td>Gaji Pokok</td>
                          <td>: Rp</td>
                          <td className="text-end"> {props.g_pok},- / bulan</td>
                        </tr>
                        <tr>
                          <td>b.</td>
                          <td>Tunjangan Kehadiran</td>
                          <td>: Rp</td>
                          <td className="text-end"> {props.tj_hadir},- / bulan</td>
                        </tr>
                        <tr>
                          <td>c.</td>
                          <td>Kinerja</td>
                          <td>: Rp</td>
                          <td className="text-end"> {props.kinerja},- / bulan</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>4.2.</td>
                  <td>
                    Pembayaran kompensasi dilakukan setiap tanggal 1 (satu) pada
                    bulan berjalan, yang apabila jatuh pada hari libur maka akan
                    dimajukan pada hari kerja terdekat.(per/bulan)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Footer/>

        </div>
        </>
    )
}