// Pipeline RAG:
// 1 - receber pergunta
// 2 - criar embedding
// 3 - buscar chunks similares
// 4 - montar contexto
// 5 - enviar para LLM

export function ragPipeline(question:string){
 return {
   question,
   context:[]
 }
}