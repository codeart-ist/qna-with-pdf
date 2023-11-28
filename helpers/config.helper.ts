import * as fs from 'fs'
import { ChatWithPDFConfig } from "../types/config";

/**
 * Generate a config file for chat with pdf class
 */
export class ConfigGenerate {

    config: ChatWithPDFConfig;

    constructor(configPath: string) {
        try {
            this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        } catch (e) {
            console.error(e);
            throw new Error('Configuration could not be loaded !')
        }
    }

    getConfig() {
        return this.config;
    }

}