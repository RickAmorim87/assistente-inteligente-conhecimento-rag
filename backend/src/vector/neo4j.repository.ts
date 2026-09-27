import driver from "../database/neo4j";


export async function saveChunk(
  content: string,
  source: string,
  embedding: number[]
) {

  const session = driver.session();


  try {

    await session.run(
      `
      CREATE (c:Chunk {
        content: $content,
        source: $source,
        embedding: $embedding,
        createdAt: datetime()
      })
      `,
      {
        content,
        source,
        embedding
      }
    );


  } finally {

    await session.close();

  }

}