import dotenv from "dotenv";

dotenv.config();


export interface EmbeddingProvider {

  createEmbedding(
    text: string
  ): Promise<number[]>;

}



class MockEmbeddingProvider implements EmbeddingProvider {


  async createEmbedding(
    text: string
  ): Promise<number[]> {


    console.log(
      "Criando embedding para:",
      text.substring(0,50)
    );


    /*
      Temporariamente geramos um vetor falso.

      Depois vamos substituir por:
      - OpenAI Embeddings
      - Ollama Embeddings
    */


    return Array.from(
      { length: 10 },
      () => Math.random()
    );

  }

}



const provider =
  new MockEmbeddingProvider();



export async function createEmbedding(
  text:string
){

  return provider.createEmbedding(
    text
  );

}