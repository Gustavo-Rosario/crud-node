# crud-node

## Requisistos
Para instalar e rodar a aplicação, tenha previamente instalado em sua máquina:
- NODE.js v10.15.3 - É recomendado o uso de NVM para gerenciamento de versão; 
- GIT;
- POSTMAN ou similar - Para realizar as requisições.

> Obs: O tutorial levará em consideração o conhecimento prévio das ferramentas em questão. 


## INSTALAÇÂO
- Clone o projeto em uma nova pasta. Utilize a branch **master**;
- Instale o projeto com o comando:
    ```
    $ npm install
    ```

## MODO DE USO
Para rodar o projeto, execute o comando:
```
$ npm start
```
Por padrão, é necessário fazer autenticação para acessar as rotas principais da api. No entanto, o projeto apresenta no arquivo **config.json** a opção **noToken** para desabilitar a validação do token de acesso.


### Com validação
Para isso, realize uma requisição **POST** para a seguinte URL *127.0.0.1:3001/auth/generate-token*, fornecendo o *JSON* a seguir:
```javascript
// POST - 127.0.0.1:3001/auth/generate-token
{
    "login": "lorem",
	"pwd": "ipsum"
}
```
Será retornado um *JSON* como resposta, contendo o *TOKEN* que será utilizado para acessar a api.

Exemplo de retorno:
```javascript
{
    "success": true,
    "token": "..."
}
```

Copie o conteúdo do campo **token**. Insira o valor nos headers de todas as requisições com o nome `x-access-token`.
```javascript
//HEADERS
x-access-token : ...
```

## MÉTODOS 
Tipo | URL | Descrição
--- | --- | ---
GET | /api/animal | Retorna uma lista de animais
GET | /api/animal/**[id]** | Retorna um animal em específico a partir do id
GET | /api/animal/search/**[nome]** | Realiza uma busca por nome do animal
POST | /api/animal | Insere um novo animal na base. Todos os campos são obrigatórios
PUT | /api/animal/**[id]** | Altera informações de um animal a partir de id
DELETE | /api/animal/**[id]** | Exclui um animal com base no id

## Collection Animal 
Nome | Tipo | Descrição
--- | --- | ---
**_id** | ObjectId | Sequência auto gerada 
**nome** | String | Nome único do animal. Não é permitido inserir animais com nomes iguais
**peso** | Number | Peso do animal em KG
**idade** | Number | Idade em meses do animal
**tipo** | String | Tipo do animal. É necessário ser um dos 3 tipos a seguir: *TIPO1*, *TIPO2*, *TIPO3*

> Obs: Todos os campos são obrigatórios para inserção


## Exemplos
```javascript
// GET - 127.0.0.1:3001/api/animal
// Retorno
{
    "success": true,
    "data": [
        {
            "_id": "5e29bbe9d078ad634e3ceec7",
            "nome": "Boi 1",
            "peso": 130,
            "idade": 10,
            "tipo": "TIPO2",
            "__v": 0
        },
        {
            "_id": "5e29bd78bcbc17651ba890fb",
            "nome": "Boi 2",
            "peso": 200,
            "idade": 28,
            "tipo": "TIPO1",
            "__v": 0
        }
    ]
}

// POST - 127.0.0.1:3001/api/animal
// Corpo requisição
{
    "nome": "Boi 3",
    "peso": 100,
    "idade": 3,
    "tipo": "TIPO1",
}
//Retorno
{
    "success": true,
    "data": {
        "_id": "5e29bbe9d078ad634e3ceec7",
        "nome": "Boi 3",
        "peso": 100,
        "idade": 3,
        "tipo": "TIPO1",
        "__v": 0
    }
}


// PUT - 127.0.0.1:3001/api/animal/5e29bbe9d078ad634e3ceec7
// Corpo requisição
{
    "tipo": "TIPO3",
}
//Retorno
{
    "success": true,
    "data": {
        "_id": "5e29bbe9d078ad634e3ceec7",
        "nome": "Boi 3",
        "peso": 100,
        "idade": 3,
        "tipo": "TIPO3",
        "__v": 0
    }
}
```