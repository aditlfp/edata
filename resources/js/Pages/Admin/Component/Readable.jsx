
import Footer from "./Footer";
import Header from "/public/assets/header.png";

function encodeSVG(svg) {
  // URL-encode to ensure special chars don’t break the URI
  return encodeURIComponent(svg)
    // common replacements for better compression/compatibility
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
}

export default function Readable({ props }) {
  const dataUri = `data:image/svg+xml;utf8,${encodeSVG(props.ttd)}`;
  const dataUri2 = `data:image/svg+xml;utf8,${encodeSVG(props.ttd_atasan)}`;

    return(
        <>
        {/* Hal 3 */}
        <div className="w-[8.5in] min-h-[11in] bg-white flex flex-col">
          <img src={Header} alt="header" className="mt-[-6pt] px-[20pt]" />
          <div className="mx-[70pt] leading-tight flex-grow">
            <p className="font-bold text-center">
              Pasal 5 <br />
              TUNJANGAN - TUNJANGAN
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>5.1.</td>
                  <td>
                    Tunjangan Hari Raya (THR) <br />
                    PIHAK KEDUA berhak atas THR sebesar 1 (satu) bulan Gaji
                    Pokok apabila telah bekerja selama 12 (dua belas) bulan
                    berturut –turut. Apabila kurang dari 12 (dua belas) bulan
                    setelah masa percobaan <i>(training)</i> maka perhitungan
                    THR dilakukan secara prorata dan pembayaran THR akan
                    diberikan selambat- lambatnya 10 (sepuluh) hari sebelum Hari
                    Raya.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>5.2.</td>
                  <td>
                    Jaminan Sosial <br />
                    Programjaminan sosial yang diberikan sebagaifasilitas tenaga
                    kerja adalah jaminan sosial yang diberikan oleh Badan
                    Penyelenggara Jaminan Sosial (BPJS) Kesehatan dan BPJS
                    Ketenagakerjaan.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>5.3.</td>
                  <td>
                    Dana Sosial <br />
                    Dana sosial yang diberikan sesuai dengan peraturan
                    perusahaan.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 6 <br />
              WAKTU KERJA DAN LEMBUR
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>6.1.</td>
                  <td>
                    Jam kerja karyawan yaitu berdasarkan jadwal yang telah
                    ditetapkan oleh PERUSAHAAN
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>6.2.</td>
                  <td>
                    Jika dipandang perlu PERUSAHAAN dapat menugaskan PIHAK KEDUA
                    untuk bekerja di luar jam kerja dengan ketentuan yang
                    berlaku.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>6.3.</td>
                  <td>
                    Jika PIHAK KEDUA melaksanakan kerja lembur, maka PIHAK KEDUA
                    berhak atas upah lembur berdasarkan aturan dan ketentuan
                    pada PERUSAHAAN. Pelaksanaan lembur harus berdasarkan
                    perintah lembur dari atasan yang berwenang di PERUSAHAAN.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 7 <br />
              SANKSI DAN EVALUASI
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>7.1.</td>
                  <td>
                    PIHAK PERTAMA melakukan evaluasi kinerja PIHAK KEDUA setiap
                    3 (tiga) bulan sekali.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>7.2.</td>
                  <td>
                    PIHAK PERTAMA dapat melakukan evaluasi secara mendadak
                    apabila terjadi beberapa kondisi sebagai berikut :
                    <table>
                      <tbody>
                        <tr>
                          <td
                            style={{ verticalAlign: "top" }}
                            className="w-[20pt]"
                          >
                            a.
                          </td>
                          <td>
                            Mangkir selama 2 (dua) hari berturut-turut tanpa
                            memberikan keterangan yang sah kepada PERUSAHAAN
                            dan/atau PIHAK PERTAMA.
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top" }}>b.</td>
                          <td>
                            PIHAK KEDUA tidak dapat menjalankan tugas yang
                            berkaitan dengan tanggung jawabnya atau melalaikan
                            tanggung jawabnya.
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top" }}>c.</td>
                          <td>
                            Kondisi lain yang dapat merugikan PIHAK PERTAMA.{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>7.3.</td>
                  <td>
                    PIHAK PERTAMA akan memberikan surat peringatan (SP I/II/III)
                    kepada PIHAK KEDUA dengan melihat jenis pelanggaran sesuai
                    dengan Peraturan Perusahaan
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>7.4.</td>
                  <td>
                    PIHAK PERTAMA dapat memberikan sanksi Pengakhiran Hubungan
                    Kerja kepada PIHAK KEDUA tanpa peringatan (SP I/II/III)
                    terlebih dahulu apabila terbukti PIHAK KEDUA telah melakukan
                    kesalahan berat dan/atau membahayakan perusahaan sebagaimana
                    dimaksud dalam Undang-undang dan peraturan Ketenagakerjaan
                    yang berlaku
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>7.5.</td>
                  <td>
                    Dalam Hal apabila PIHAK KEDUA mengakhiri kontrak secara
                    sepihak sebelum masa kerja selesai, maka PIHAK KEDUA akan
                    dikenakan denda dengan mengganti seluruh kompensasi senilai
                    masa kontrak yang tersisa.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Footer/>

        </div>
        {/* Hal 4 */}
        <div className="w-[8.5in] min-h-[11in] bg-white flex flex-col">
          <img src={Header} alt="header" className="mt-[-6pt] px-[20pt]" />
          <div className="mx-[70pt] leading-tight flex-grow">
            <p className="font-bold text-center">
              Pasal 8 <br />
              PENGAKHIRAN DAN PERPANJANGAN MASA KERJA
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>8.1.</td>
                  <td>
                    Pengakhiran masa kerja anatar KEDUA PIHAK terjadi apabila :
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            a.
                          </td>
                          <td>PIHAK KEDUA Meninggal dunia</td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            b.
                          </td>
                          <td>Masa perjanjian telah berakhir</td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            c.
                          </td>
                          <td>
                            Adanya putusan pengadilan dan/atau putusan atau
                            penetapan lembaga penyelesaian perselisihan hubungan
                            industrial yang telah mempunyai kekuatan hukum tetap
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            d.
                          </td>
                          <td>
                            Terjadi kondisi darurat <i>(Force Majure)</i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>8.2.</td>
                  <td>
                    PIHAK KEDUA dapat mengakhiri kontrak lebih awal dengan
                    melakukan kewajiban sebagai berikut:
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            a.
                          </td>
                          <td>
                            Mengajukan permohonan pengunduran diri tertulis
                            minimal 30 (tiga puluh) hari sebelumnya
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            b.
                          </td>
                          <td>
                            Mengembalikan seluruh seragam yang telah diterima
                          </td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            c.
                          </td>
                          <td>Mendapatkan persetujuan pimpinan</td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top", width: "20pt" }}>
                            d.
                          </td>
                          <td>
                            Menyelesaikan semua kewajiban tertulis diluar
                            perjanjian ini bilamana ada
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>8.3.</td>
                  <td>
                    Bilamana PIHAK KEDUA akan memperpanjang Perjanjian Kerja,
                    maka PIHAK KEDUA diwajibkan mengajukan permohonan
                    perpanjangan kepada PIHAK PERTAMA paling lambat 7 (tujuh)
                    hari sebelum Perjanjian Kerja ini berakhir dan dengan
                    kesepakatan kedua belah pihak dibuatkan perpanjangan
                    Perjanjian Kerja.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>8.4.</td>
                  <td>
                    Dalam hal Perjanjian Kerja ini tidak diperpanjang maka
                    sesuai kesepakatan antara PIHAK PERTAMA dan PIHAK KEDUA,
                    maka Perjanjian Kerja ini akan putus demi hukum pada tanggal
                    yang telah disepakati, sehingga kedua belah pihak berakhir
                    dengan sendirinya.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 9 <br />
              <i>FORCE MAJURE</i>
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>9.1.</td>
                  <td>
                    Kegagalan salah satu pihak untuk melaksanakan perjanjian
                    kerja ini yang disebabkan oleh <i>force majure</i> tidak
                    dianggap sebagai pelanggaran terhadap perjanjian ini. FORCE
                    MAJURE adalah segala keadaan atau peristiwa yang terjadi di
                    luar batas kekuasaan KEDUA PIHAK, termasuk akan tetapi tidak
                    terbatas pada huru hara, epidemic, kebakaran, banjir gempa
                    bumi, pemogokan, perang, keputusan pemerintah yang
                    menghalangi KEDUA PIHAK secara langsung untuk melaksanakan
                    kewajiban-kewajiban sesuai peraturan terjadi.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>9.2.</td>
                  <td>
                    Dalam hal terjadinya satu atau beberapa kejadian atau
                    peristiwa Force Majure, pihak yang menderita berkewajiban
                    untuk memberitahukan secara tertulis kepada pihak lainnya
                    saat kejadian terjadi.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>9.3.</td>
                  <td>
                    Jika kondisi Force Majure terjadi selama jangka waktu lebih
                    dari 60 (Enam Puluh) hari maka salah satu pihak berhak untuk
                    mengakhiri Perjanjian.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-bold text-center">
              Pasal 10 <br />
              PENYELESAIAN PERSELISIHAN
            </p>
            <p>
              KEDUA PIHAK setuju untuk menyelesaikan secara kekeluargaan setiap
              perselisihan hubungan industrial dalam hal perselisihan hak,
              perselisihan kepentingan dan perselisihan PHK yang berkaitan
              dengan pelaksanaan perjanjian ini.
            </p>
          </div>
          <Footer/>

        </div>
        {/* Hal 5 */}
        <div className="w-[8.5in] min-h-[11in] bg-white flex flex-col">
          <img src={Header} alt="header" className="mt-[-6pt] px-[20pt]" />
          <div className="mx-[70pt] leading-tight flex-grow">
            <p className="font-bold text-center">
              Pasal 11 <br />
              PENUTUP
            </p>
            <table className=" table-fixed">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>11.1.</td>
                  <td>
                    Surat perjanjian kerja ini dibuat dan ditandatangani oleh
                    KEDUA PIHAK dengan tanpa ada pengaruh dan paksaan dari
                    siapapun serta mengikat KEDUA PIHAK untuk menaati dan
                    melaksanakan dengan penuh tanggungjawab.
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top", width: "22pt" }}>11.2.</td>
                  <td>
                    Apabila dikemudian hari Surat Perjanjian ini ternyata masih
                    terdapat hal – hal yang sekiranya bertentangan dengan
                    peraturan perundang – undangan, ketenagakerjaan Republik
                    Indonesia dan atau perkembangan Peraturan Perusahaan, maka
                    akan diadakan peninjauan dan penyesuaian atas persetujuan
                    KEDUA PIHAK.
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="">
              Surat Perjanjian ini dibuat dan ditandatangani oleh KEDUA PIHAK di
              PONOROGO pada tanggal, bulan dan tahun tersebut di atas dalam
              rangkap 2 (dua) yang memiliki kekuatan hukum yang sama dan
              dipegang oleh masing – masing pihak
            </p>
            <div className="flex justify-around mt-[70pt]">
              <div className="text-center">
                <p>PIHAK PERTAMA</p>
                <p
                  className="font-bold underline underline-offset-[2.7pt]"
                  style={{ textDecorationThickness: "2pt" }}
                >
                  {/* TTD ATASAN */}
                  <img src={dataUri2} alt={'Tanda Tangan Atasan'} className="w-[180px] h-auto" />
                  {props.nama_pk_ptm}. <br />
                </p>
                <span className="no-underline font-bold">{props.jabatan_pk_ptm}</span>
              </div>
              <div className="text-center">
                <p >PIHAK KEDUA</p>
                <p
                  className="font-bold underline underline-offset-[2.7pt]"
                  style={{ textDecorationThickness: "2pt" }}
                >
                  {/* TTD */}
                  <img src={dataUri} alt={'Tanda Tangan'} className="w-[180px] h-auto" />
                  {props.nama_pk_kda}
                </p>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
        </>
    )
}