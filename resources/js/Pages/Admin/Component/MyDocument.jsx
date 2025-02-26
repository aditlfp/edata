import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    fontSize: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    textAlign: "center",
    fontSize: 5,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 5,
  },
  tableColHeader: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "white",
    fontSize: 5,
  },
  tableColHeaderNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "white",
    fontSize: 5,
  },
  tableCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5,
  },
  tableColNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 8,
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
  },
  tableBpjs: {
    margin: 5,
    fontSize: 8,
    textTransform: "uppercase",
  },
  textRed: {
    color: "red",
    fontWeight: 600,
    fontSize: 9,

  }
});

const MyDocument = ({ props }) => {
  const [datas, setDatas] = useState();
  
  const fetchData = () => {
    const matchingData = [];

    props.employe.data.map((emp) => {
      if (props.oke !== 'Data NotFound In Absensi') {
        props.users.map((usr) => {
          if (emp.name === usr.nama_lengkap) {
            matchingData.push(emp);
          }
        });
      } else {
        matchingData.push(emp);
      }
    });

    setDatas(matchingData);
  };

  useEffect(() => {
    fetchData();
  }, [props.employe.data, props.users]);

  const getJabatanOnEmploye = (emplo) => {
    const user = props.users.find(us => us.nama_lengkap.toLowerCase() === emplo.name.toLowerCase());
    return user ? user.jabatan.name_jabatan : 'Data NotFound In Absensi';
  };

  // Helper function to split data into chunks of 11 items per chunk
  const splitDataIntoPages = (data, itemsPerPage) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      chunks.push(data.slice(i, i + itemsPerPage));
    }
    return chunks;
  };

  const dataChunks = datas ? splitDataIntoPages(datas, 11) : [];

  return (
    <Document>
      {dataChunks.map((chunk, pageIndex) => (
        <Page size="A4" style={styles.page} orientation="landscape" key={pageIndex}>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeaderNo}>
                  <Text style={styles.tableCellHeader}>No</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Name</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Posisi</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>TTL</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>No. KTP</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>No. KK</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>No. Induk Karyawan</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Mitra</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Jenis BPJS</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>NO. BPJS Kesehatan</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>NO. BPJS Ketenaga Kerjaan</Text>
                </View>
              </View>

              {chunk.map((emp, i) => {
                const jabatan = getJabatanOnEmploye(emp);

                console.log(jabatan);
                
                return (
                <View style={styles.tableRow} key={i}>
                  <View style={styles.tableColNo}>
                    <Text style={styles.tableCell}>{i + 1 + pageIndex * 11}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={[ jabatan == 'Data NotFound In Absensi' ? styles.textRed : styles.tableCell ]}>{getJabatanOnEmploye(emp)}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.ttl}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.no_ktp}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.no_kk}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {`${emp.initials || ""} ${emp.numbers || ""} - ${emp.date_real || ""}`}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.client ? emp.client.name : "~"}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableBpjs}>{emp.jenis_bpjs?.length > 0 ? emp.jenis_bpjs.join(", ") : "~"}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.no_bpjs_kesehatan || "~"}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{emp.no_bpjs_ketenaga || "~"}</Text>
                  </View>
                </View>
                )
              })}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default MyDocument;
