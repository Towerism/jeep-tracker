import axios from "axios";
const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();

export async function getPdfContent(url) {
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const extracted = await pdfExtract.extractBuffer(Buffer.from(data, "binary"));
  return extracted?.pages[0]?.content || [];
}