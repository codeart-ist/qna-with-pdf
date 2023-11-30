import { RetrievalQAChain } from "langchain/chains"
import { Document } from "langchain/dist/document"
import { Embeddings } from "langchain/dist/embeddings/base"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf"
import { HuggingFaceInference } from "langchain/llms/hf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { Chroma } from "langchain/vectorstores/chroma"
import { QNAWithPDFConfig } from "./types/config"
import { ConfigGenerate } from "./helpers/config.helper"


export class QNAWithPDF {

    config: QNAWithPDFConfig;
    embeddings: Embeddings;
    private textSplitter: RecursiveCharacterTextSplitter;
    chromaDB: Chroma;
    chain: RetrievalQAChain

    constructor(configFilePath: string) {
        this._precheck(configFilePath)
            .then((config: QNAWithPDFConfig) => {
                this.config = config;
                this.embeddings = new HuggingFaceInferenceEmbeddings(this.config.inferenceEmbeddings);
                this.textSplitter = new RecursiveCharacterTextSplitter(this.config.textSplitter);
            }).catch(e => {
                throw new Error(e)
            })
    }

    /**
     * Load config file or run any pre process function
     * 
     * @returns {Promise<QNAWithPDFConfig>}
     */
    _precheck(configFilePath: string): Promise<QNAWithPDFConfig> {
        return new Promise((resolve, reject) => {
            try {
                const generatedConfig = new ConfigGenerate(configFilePath);
                return resolve(generatedConfig.getConfig());
            } catch (e) {
                reject(e)
            }
        })
    }

    /**
     * Load a pdf file with file path
     * 
     * @param {string} pdfPath - file path
     * @returns {Promise<Document<Record<string, any>>[]>}
     */
    async loadPDFFlie(pdfPath: string): Promise<Document<Record<string, any>>[]> {
        const loader = new PDFLoader(pdfPath);
        const documents = await loader.load();

        return documents;
    }

    /**
     * This function can splitting loaded file's data 
     * 
     * @param {Document<Record<string, any>>[]} loadedPDF 
     * @returns {Document<Record<string, any>>[]}
     */
    async processPDFFile(loadedPDF: Document<Record<string, any>>[]): Promise<Document<Record<string, any>>[]> {
        const records = await this.textSplitter.splitDocuments(loadedPDF);
        return records;
    }

    /**
     * For create a chroma DB and created documents upload to ChromaDB
     * 
     * @param {Document<Record<string, any>>[]} documents - Parsed PDF text chunks
     * @returns {Promise<Chroma>}
     */
    async createAChromaDB(documents: Document<Record<string, any>>[]): Promise<Chroma> {

        this.chromaDB = await Chroma.fromDocuments(
            documents,
            this.embeddings,
            this.config.chroma
        )

        return this.chromaDB;
    }

    /**
     * Genereate a chain with retriver and llm.
     * 
     * @returns {void}
     */
    async generateLLM() {
        const retriever = this.chromaDB.asRetriever();
        const llm = new HuggingFaceInference(this.config.inference);

        this.chain = RetrievalQAChain.fromLLM(llm, retriever);
    }

    /**
     * Human message for Answer
     * 
     * @param {string} question - A human message
     * @returns {string}
     */
    async answer(question: string, returnKey: string = "answer"): Promise<{ [key: string]: string }> {
        const chainAnswer = await this.chain.run(question);

        return {
            [returnKey]: chainAnswer
        }

    }

    /**
     * QNA with pdf initialization;
     * 
     * @param {string} pdfPath
     * @returns {Promise<QNAWithPDF>}
     */
    async init(pdfPath: string): Promise<QNAWithPDF> {
        const pdfDocuments = await this.loadPDFFlie(pdfPath);
        const records = await this.processPDFFile(pdfDocuments);
        await this.createAChromaDB(records);
        await this.generateLLM();

        return this;
    }
}