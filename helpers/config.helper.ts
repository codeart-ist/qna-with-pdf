import * as fs from 'fs'
import { QNAWithPDFConfig } from "../types/config";

/**
 * Generate a config file for QNAWithPDF class
 */
export class ConfigGenerate {

    config: QNAWithPDFConfig;

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