import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as Header } from "./header-BmokhI03.js";
import Footer from "./Footer-DSnh824x.js";
function Fillable({ props, day, dateContract }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[8.5in] min-h-[11in] bg-white flex flex-col", children: [
      /* @__PURE__ */ jsx("img", { src: Header, alt: "header", className: "mt-[-6pt] px-[20pt]" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-[70pt] leading-tight flex-grow", children: [
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "text-center font-bold underline underline-offset-[2.64pt]",
            style: { textDecorationThickness: "1.5pt" },
            children: [
              "SURAT PERJANJIAN KERJA WAKTU ",
              /* @__PURE__ */ jsx("br", {}),
              " TERTENTU (KONTRAK)"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-center", children: [
          "Nomor : ",
          props.no_srt
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-justify", children: [
          /* @__PURE__ */ jsxs("p", { className: "mt-[20pt]", children: [
            "Pada hari ini, ",
            day,
            ", telah dibuat dan disepakati perjanjian kerja antara:"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-[10pt]", children: [
            /* @__PURE__ */ jsx("table", { className: "table-auto w-full", children: /* @__PURE__ */ jsxs("tbody", { children: [
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", { className: "w-[16pt]", children: "I." }),
                /* @__PURE__ */ jsx("td", { className: "w-[120pt]", children: "Nama" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.nama_pk_ptm
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { children: "Alamat" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.alamat_pk_ptm
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { children: "Jabatan" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.jabatan_pk_ptm
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { colSpan: 2, children: /* @__PURE__ */ jsxs("p", { className: "mt-[12pt]", children: [
                  "Dalam hal ini bertindak untuk dan atas nama",
                  " ",
                  /* @__PURE__ */ jsx("b", { children: "PT Surya Amanah Cendekia Ponorogo" }),
                  " yang selanjutnya disebut sebagai ",
                  /* @__PURE__ */ jsx("b", { children: " PIHAK PERTAMA." })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("table", { className: " table-auto w-full mt-[12pt]", children: /* @__PURE__ */ jsxs("tbody", { children: [
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", { className: "w-[16pt]", children: "II." }),
                /* @__PURE__ */ jsx("td", { className: "w-[120pt]", children: "Nama" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.nama_pk_kda
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { children: "Tempat/ Tgl Lahir" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.tempat_lahir_pk_kda,
                  ", ",
                  props.tgl_lahir_pk_kda
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { children: "NIK" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.nik_pk_kda
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "table-row", children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsx("td", { children: "Alamat" }),
                /* @__PURE__ */ jsxs("td", { children: [
                  ": ",
                  props.alamat_pk_kda,
                  " "
                ] })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", {}),
                /* @__PURE__ */ jsxs("td", { colSpan: 2, children: [
                  /* @__PURE__ */ jsxs("p", { className: "mt-[12pt]", children: [
                    "Dalam hal ini bertindak untuk dan atas nama diri sendiri. Selanjutnya dalam Perjanjian ini disebut",
                    " ",
                    /* @__PURE__ */ jsx("b", { children: "PIHAK KEDUA." })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-[12pt] text-justify", children: "PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut KEDUA PIHAK." })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-center mt-[10pt]", children: [
            "Pasal 1 ",
            /* @__PURE__ */ jsx("br", {}),
            "LATAR BELAKANG"
          ] }),
          /* @__PURE__ */ jsx("table", { className: " table-fixed", children: /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top", width: "22pt" }, children: "1.1" }),
              /* @__PURE__ */ jsx("td", { children: "PIHAK PETAMA merupakan perusahan yang bergerak dibidang perdagangan dan pelayanan umum" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "1.2" }),
              /* @__PURE__ */ jsx("td", { children: "Bahwa setelah diadakan penilaian oleh PIHAK PERTAMA, PIHAK KEDUA dinyatakan memenuhi persyaratan dan bersedia bekerja dalam jangka waktu tertentu." })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "1.3" }),
              /* @__PURE__ */ jsx("td", { children: "PIHAK PERTAMA dengan ini memperkerjakan PIHAK KEDUA untuk jangka waktu tertentu." })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "1.4" }),
              /* @__PURE__ */ jsx("td", { children: "Bahwa PIHAK KEDUA menyetujui bekerja selama jangka waktu tertentu sebagaimana dimaksud dalam perjanjian ini untuk PIHAK PERTAMA." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("p", { children: "Setelah memperhatikan pertimbangan tersebut di atas dengan ini dicapai kata sepakat antara KEDUA PIHAK untuk mengikatkan diri dalam mengadakan Perjanjian Kerja Waktu Tertentu (Selanjutnya disebut dengan Perjanjian) dengan ketentuan dan syarat - syarat sebagai berikut:" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[8.5in] min-h-[11in] bg-white flex flex-col", children: [
      /* @__PURE__ */ jsx("img", { src: Header, alt: "header", className: "mt-[-6pt] px-[20pt]" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-[70pt] leading-tight flex-grow", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-center", children: [
          "Pasal 2 ",
          /* @__PURE__ */ jsx("br", {}),
          "RUANG LINGKUP PEKERJAAN DAN PENEMPATAN"
        ] }),
        /* @__PURE__ */ jsx("table", { className: " table-fixed", children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top", width: "22pt" }, children: "2.1" }),
            /* @__PURE__ */ jsxs("td", { children: [
              "PIHAK PERTAMA menetapkan PIHAK KEDUA untuk bekerja di PT Surya Amanah Cendekia Ponorogo sebagai:",
              /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "w-[20pt]", children: "a." }),
                  /* @__PURE__ */ jsx("td", { className: "w-[94pt]", children: "Jabatan" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ": ",
                    props.jabatan_pk_kda
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "b." }),
                  /* @__PURE__ */ jsx("td", { children: "Status" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ": ",
                    props.status_pk_kda
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "c." }),
                  /* @__PURE__ */ jsx("td", { children: "Unit Kerja" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ": ",
                    props.unit_pk_kda
                  ] })
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "2.2" }),
            /* @__PURE__ */ jsxs("td", { children: [
              "Perjanjian ini dibuat untuk jangka waktu 1 (satu) tahun terhitung mulai dari ",
              dateContract,
              ". Perjanjian ini dapat diperpanjang lagi sesuai dengan ketentuan yang berlaku."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "2.3" }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA menyadari sepenuhnya dan menyetujui untuk dikaryakan pada PERUSAHAAN tersebut di atas sesuai dengan kondisi dan ketentuan dalam perjanjian ini" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-center", children: [
          "Pasal 3 ",
          /* @__PURE__ */ jsx("br", {}),
          "TUGAS DAN TANGGUNGJAWAB"
        ] }),
        /* @__PURE__ */ jsx("table", { className: " table-fixed", children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top", width: "22pt" }, children: "3.1." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK PERTAMA menempatkan PIHAK KEDUA sebagai tenaga PERUSAHAAN dengan rincian tugas sebagaimana yang diatur oleh PERUSAHAAN." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.2." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA wajib bertanggungjawab atas segala sikap dan perilaku dalam menjalankan tugas, serta wajib mentaati semua peraturan dan tata tertib yang berlaku di PERUSAHAAN." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.3." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA bersedia tunduk dan melaksanakan seluruh ketentuan yang telah diatur dalam Peraturan Perusahaan dan tata tertib perusahaan maupun ketentuan lain yang menjadi keputusan Direksi dan Manajemen Perusahaan. PIHAK KEDUA bersedia menyimpan dan menjaga kerahasiaan baik dokumen maupun informasi milik PIHAK PERTAMA dan tidak dibenarkan memberikan dokumen atau informasi yang diketahui baik secara lisan maupun tertulis kepada pihak lain." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.4." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK PERTAMA berhak memutasikan PIHAK KEDUA untuk bekerja di tempat dan posisi yang lain selain yang tercantum di dalam perjanjian ini selama masa perjanjian ini berlangsung dianggap perlu." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.5." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA bertanggungjawab penuh terhadap peralatan kerja milik PIHAK PERTAMA." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.6." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA wajib membaca, mengerti, memahami, mematuhi dan menaati sepenuhnya setiap ketentuan dan peraturan yang berlaku pada PIHAK PERTAMA dan ketentuan yang berlaku pada PERUSAHAAN." })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "3.7." }),
            /* @__PURE__ */ jsx("td", { children: "PIHAK KEDUA berkewajiban menyelesaikan masa kontrak yang telah di tandatangani." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-center", children: [
          "Pasal 4 ",
          /* @__PURE__ */ jsx("br", {}),
          "KOMPENSASI"
        ] }),
        /* @__PURE__ */ jsx("table", { className: " table-fixed", children: /* @__PURE__ */ jsxs("tbody", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top", width: "22pt" }, children: "4.1." }),
            /* @__PURE__ */ jsxs("td", { children: [
              "Atas pekerjaan ini PIHAK KEDUA berhak untuk memperoleh Kompensasi sebagai berikut:",
              /* @__PURE__ */ jsx("table", { className: "ml-[12pt]", children: /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "w-[20pt]", children: "a." }),
                  /* @__PURE__ */ jsx("td", { children: "Gaji Pokok" }),
                  /* @__PURE__ */ jsx("td", { children: ": Rp" }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    " ",
                    props.g_pok,
                    ",- / bulan"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "b." }),
                  /* @__PURE__ */ jsx("td", { children: "Tunjangan Kehadiran" }),
                  /* @__PURE__ */ jsx("td", { children: ": Rp" }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    " ",
                    props.tj_hadir,
                    ",- / bulan"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "c." }),
                  /* @__PURE__ */ jsx("td", { children: "Kinerja" }),
                  /* @__PURE__ */ jsx("td", { children: ": Rp" }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    " ",
                    props.kinerja,
                    ",- / bulan"
                  ] })
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { style: { verticalAlign: "top" }, children: "4.2." }),
            /* @__PURE__ */ jsx("td", { children: "Pembayaran kompensasi dilakukan setiap tanggal 1 (satu) pada bulan berjalan, yang apabila jatuh pada hari libur maka akan dimajukan pada hari kerja terdekat.(per/bulan)" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  Fillable as default
};
