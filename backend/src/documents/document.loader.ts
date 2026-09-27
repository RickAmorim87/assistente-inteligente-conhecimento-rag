import fs from "fs";
import path from "path";
import pdf from "pdf-parse";


export async function loadDocument(
  filePath: string,
  originalName?: string
) {

  const extension = path.extname(
    originalName || filePath
  ).toLowerCase();


  console.log("Arquivo recebido:");
  console.log({
    filePath,
    originalName,
    extension
  });



  // Leitura de PDF
  if (extension === ".pdf") {

    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    return {
      file: originalName || filePath,
      content: data.text
    };

  }



  // Leitura de TXT
  if (extension === ".txt") {

    const text = fs.readFileSync(
      filePath,
      "utf-8"
    );

    return {
      file: originalName || filePath,
      content: text
    };

  }


  throw new Error(
    `Formato de arquivo não suportado: ${extension}`
  );

}