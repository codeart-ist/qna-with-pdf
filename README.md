# QNA With PDF
Now you can qna with your pdf files.

## Example Usage

Sample code is as follows.

```js
const { QNAWithPDF } = require('./') 
// or ES6 remove the comment 
// import { QNAWithPDF } from './index.js'

const qnaWithPDF = new QNAWithPDF('./config.json');

qnaWithPDF.init('./invoice.pdf').then(qna => {
    qna.answer("How much is the total cost of the invoice ?")
        .then(result => {
            return result; // You will see the result here.
        })
        .catch(e => {
            throw new Error(e);
        })
})
```

if you want run with `javascript` run this folowing command in your command line;

```sh
    npm run build
``` 

And you will see in your directory a dist folder. Now you will run this project with `javascript`.

> Note: Don't forget the import changes. You should import from `dist` folder.  

## Config File
The sample configuration file is included in the library. You can see the default content of the config file below.

```json
    {
    "chroma": {
        "collectionName": "collection_name", // change your chroma collection name
        "url": "http://localhost:8000" // change your chroma server url
    },
    "textSplitter": { // text splitter initial values
        "chunkSize": 100,
        "chunkOverlap": 50
    },
    "inference": { // HuggingFaceInference Class initial values
        "apiKey": "-", // hugging face api key
        "temperature": 1.0,
        "maxTokens": 50,
        "model": "-" // provide a model in hugging face 
    },
    "inferenceEmbeddings": { // HuggingFaceInferenceEmbeddings initial values
        "apiKey": "-" // provide a hugging face api key
    }
}
```

>You can find the model that suits you on [Hugging Face](https://huggingface.co/models?pipeline_tag=text-generation&sort=trending).

## Dependencies

### Pyhton

You should have python version >= 3.11.6 

### Chroma DB

You must have a chroma db on your project.

```sh 
    npm install --save chromadb
    # or 
    yarn add chromadb
```

and follow this command

```sh
    pip install chromadb
```

last step

```sh
    #if your location equals to db path you can write and run only chroma run
    chroma run --path /db_path
```

For more informations <a href="https://docs.trychroma.com/">click here. </a>


###  Hugging Face
You must have a hugging face access token. And you must add to access token for `config.json` file.


## Suggestions
Please make sure you provide the fields in the config file content. 

## Next Features
- [ ] Multiple PDF support
- [ ] Memory support
- [ ] Less dependency and modularity
