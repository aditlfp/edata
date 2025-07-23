export default function Footer() {
  return (
    <>
      <footer
        style={{ pageBreakInside: "avoid" }}
        className="w-full text-center py-4 fixed bottom-0"
      >
        <table className="table-auto mx-auto border-collapse border">
          <thead>
            <tr>
              <th className="w-[70pt] border border-slate-600 font-normal">
                Pihak 1
              </th>
              <th className="w-[70pt] border border-slate-600 font-normal">
                Pihak 2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="h-[20pt] border border-slate-600"></td>
              <td className="h-[20pt] border border-slate-600"></td>
            </tr>
          </tbody>
        </table>
      </footer>
    </>
  );
}
