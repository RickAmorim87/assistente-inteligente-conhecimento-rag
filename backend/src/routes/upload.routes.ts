import { Router } from "express";
import multer from "multer";

import { loadDocument } from "../documents/document.loader";
import { createChunks } from "../rag/chunker";
import { saveChunk } from "../vector/neo4j.repository";
import { createEmbedding } from "../embeddings/embedding.service";


const router = Router();


const upload = multer({
  dest: "uploads/"
});


router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    console.log("=================================");
    console.log("🚀 INÍCIO DO UPLOAD");
    console.log("=================================");


    try {

      console.log("1️⃣ Verificando arquivo recebido");


      if (!req.file) {

        console.log("❌ Nenhum arquivo recebido");

        return res.status(400).json({
          error: "Arquivo não enviado"
        });

      }


      console.log("✅ Arquivo recebido:");
      console.log({
        nome: req.file.originalname,
        caminho: req.file.path,
        tamanho: req.file.size
      });



      console.log("2️⃣ Iniciando leitura do documento");


      const document = await loadDocument(
       req.file.path,
       req.file.originalname
      );


      console.log("✅ Documento carregado");

      console.log({
        arquivo: document.file,
        caracteres: document.content.length
      });



      console.log("3️⃣ Criando chunks");


      const chunks = createChunks(
        document.content
      );


      console.log("✅ Chunks criados:");
      console.log({
        quantidade: chunks.length
      });



      console.log("4️⃣ Salvando chunks no Neo4j");


      let saved = 0;


     for (const chunk of chunks) {


  console.log("Gerando embedding do chunk");


  const embedding = await createEmbedding(
    chunk
  );


  await saveChunk(
    chunk,
    req.file.originalname,
    embedding
  );


        saved++;

        console.log(
          `✅ Chunk ${saved}/${chunks.length} salvo`
        );

      }



      console.log("=================================");
      console.log("🎉 DOCUMENTO PROCESSADO COM SUCESSO");
      console.log("=================================");



      res.json({

        message:
        "Documento processado com sucesso",

        file:
        req.file.originalname,

        chunks:
        chunks.length

      });



    } catch(error){


      console.error("==============================");
      console.error("❌ ERRO COMPLETO:");
      console.error(error);
      console.error("==============================");


     res.status(500).json({

  error:
  error instanceof Error ? error.message : String(error)


      });

    }

  }
);


export default router;