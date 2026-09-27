import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "password"
  )
);

export default driver;


export async function testConnection() {
  const session = driver.session();

  try {
    const result = await session.run(
      "RETURN 'Neo4j conectado com sucesso!' AS message"
    );

    console.log(result.records[0].get("message"));

  } finally {
    await session.close();
  }
}