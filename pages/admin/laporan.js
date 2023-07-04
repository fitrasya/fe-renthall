export const handleConvertToPdf = (json) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head><title>Laporan Pemesanan</title>");
  printWindow.document.write("<style>");
  printWindow.document.write(`
    @media print {
      @page {
        margin: 2cm; /* Set the margin size here */
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
      th, td {
        padding: 8px;
        border: 1px solid black;
        text-align: left;
      }
      
      .col-width-1 {
        width: 20%;
      }
      
      .col-width-2 {
        width: 30%;
      }
      
      .text-align-center {
        text-align: center;
      }
      
      .text-align-right {
        text-align: right;
      }
      
      /* Add more classes and adjust the width and alignment as needed */
    }
  `);
  printWindow.document.write("</style>");
  printWindow.document.write("</head><body>");

  // Create a table element
  printWindow.document.write("<table>");

  // Write table headers
  printWindow.document.write("<tr>");
  const headerNames = [
    "Pemesan",
    "Gedung",
    "Harga Deal",
    "Tanggal Pesan",
  ];
  headerNames.forEach((header, index) => {
    const headerClass = `col-width-${index + 1}`;
    printWindow.document.write(`<th class="${headerClass}">${header}</th>`);
  });
  printWindow.document.write("</tr>");

  // Write table rows
  json.forEach((item) => {
    printWindow.document.write("<tr>");
    const value1 = item["pemesan_nama"] || "";
    const value2 = item["pemesan_kontak"] || "";
    const combinedValue = `${value1}<br/>(${value2})`;
    printWindow.document.write(`<td>${combinedValue}</td>`);
    printWindow.document.write(`<td>${item["gedung_nama"] || ""}</td>`);
    printWindow.document.write(
      `<td class="text-align-right">Rp ${
        new Intl.NumberFormat("id-ID").format(item["harga_deal"]) || ""
      }</td>`
    );
    const tanggalMulai = item["tanggal_mulai"]
      ? new Date(item["tanggal_mulai"]).toLocaleDateString()
      : "";
    const tanggalSelesai = item["tanggal_selesai"]
      ? new Date(item["tanggal_selesai"]).toLocaleDateString()
      : "";
    const combinedValue2 = `${tanggalMulai} -${tanggalSelesai}`;
    printWindow.document.write(`<td>${combinedValue2}</td>`);
    printWindow.document.write("</tr>");
  });

  printWindow.document.write("</table>");

  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};
