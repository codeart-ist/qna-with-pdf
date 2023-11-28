# QNA With PDF
Now you can chat with your pdf files.

## Dependencies

### Pyhton

You have python version >= 3.11.6 

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


### Hugging Face
You must have a hugging face access token. And you must add to access token for `config.json` file.


## Suggestions
Please make sure you provide the fields in the config file content. 