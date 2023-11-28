import { BaseLLMParams } from "langchain/dist/llms/base"
import { HuggingFaceInferenceEmbeddingsParams } from "langchain/embeddings/hf"
import { HFInput } from "langchain/llms/hf"
import { RecursiveCharacterTextSplitterParams } from "langchain/text_splitter"
import { ChromaLibArgs } from "langchain/vectorstores/chroma"


export type ChatWithPDFConfig = {
    chroma: ChromaLibArgs;
    textSplitter?: Partial<RecursiveCharacterTextSplitterParams>;
    inference?: (Partial<HFInput> & BaseLLMParams);
    inferenceEmbeddings?: HuggingFaceInferenceEmbeddingsParams;
}