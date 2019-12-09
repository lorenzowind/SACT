# SACT API

## 1 - Informações Iniciais: 

- Linguagem: JavaScript (NodeJS);
- Banco de dados: MySQL;
- Biblioteca para uso do banco de dados: Sequelize. 

## 2 - Estrutura de pastas:

- src: Pasta que possui todos os códigos escritos pelos desenvolvedores;
- src/index.js: Arquivo principal da API que faz a mesma funcionar;
- src/routes.js: Arquivo de rotas da API;
- src/.env: Arquivo com as configurações de variáveis da API;
- src/app: Pasta com os Middlewares, Models e Controllers;
- src/config/database.js: Arquivo de configuração do banco de dados;
- src/database: Pasta com subpastas de preenchimento do banco de dados;
- src/database/migrations: migrações do banco de dados;
- src/database/seeders: seeders do banco de dados.

## 3 - Rotas:
***OBS:*** Todas as entradas/saídas são em formato JSON. 
### 3.1 - Critérios 
#### Criar
       POST: _/criteria_
      
       ```
       Entrada esperada: 

       {
           "name": "nome do critério",
           "rate": noto critério (double)
       }
       ---

       Saída esperada:

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída:

       {
           "error": "mensagem de erro"
       }

       Status da requisição: 500
       ```
       
 #### Mostrar todos
       GET: _/criteria_
       ```
       Saída esperada: 
       [
           {
               "id": 1,
               "name": "nome de exemplo",
               "rate": 10,
               "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
               "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
           },
           {
               "id": 2,
               "name": "nome de exemplo",
               "rate": 8,
               "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
               "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
           },
           ...
       ]

       Status da requisição: 200 OK
       ---

       Erro na saída: 

       {
           "error": "exemplo de erro"
       }
       ```
 #### Mostrar um
       GET: _/criteria/id_
       ```
       Saída esperada: 
       {
            "id": 1,
            "name": "nome de exemplo",
            "rate": 10,
            "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
            "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
        }

       Status da requisição: 200 OK
       ---

       Erro na saída: 

       {
           "error": "exemplo de erro"
       }
       ```
#### Atualizar
       PUT: _/criteria/id_
       ```
       Entrada esperada: 

       {
           "name": "nome do critério",
           "rate": noto critério (double)
       }
       ---

       Saída esperada:

       Um JSON com os novos dados do critério será retornado. 

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída:

       {
           "error": "mensagem de erro"
       }

       Status da requisição: 500
       ```
#### Remover
       DELETE: _/criteria/id_
       ```
       Saída esperada: 

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída: 

       {
           "error":"mensagem de erro"
       }
       ```
### 3.2 - Seção 
#### Criar
       POST: _/sections_
       ```
       Entrada esperada: 

       {
           "name": "nome da seção",
           "criteria": [1,2,3,...] 

           > Para adicionar critério(s) à seção, é necessário passar o(s) id(s) dos critério em um array. O campo de critérios (criteria) não é obrigartório.
       }
       ---

       Saída esperada:

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída:

       {
           "error": "mensagem de erro"
       }

       Status da requisição: 500
       ```
#### Mostrar todos
       GET: _/sections_
       ```
       Saída esperada: 
       [
           {
               "id": 1,
               "name": "nome de exemplo",
               "criteria": [
                   {
                       "id": 1,
                       "name": "nome do critério dessa seção",
                       "rate": 10,
                       "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
                       "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
                   },
                   ...
               ],
               "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
               "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
           },
           {
               "id": 2,
               "name": "nome de exemplo",
               "criteria": [
                   {
                       "id": 1,
                       "name": "nome do critério dessa seção",
                       "rate": 10,
                       "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
                       "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
                   },
                   ...
               ],
               "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
               "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
           },
           ...
       ]

       Status da requisição: 200 OK
       ---

       Erro na saída: 

       {
           "error": "exemplo de erro"
       }
       ```
 #### Mostrar um
       GET: _/sections/id_
       ```
       Saída esperada: 
       {
            "id": 1,
            "name": "nome de exemplo",
            "criteria": [
                    {
                       "id": 1,
                       "name": "nome do critério dessa seção",
                       "rate": 10,
                       "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
                       "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
                   },
                   ...
            ],
            "createdAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE",
            "updatedAt": "YEAR-MONTH-HOUR:MINUTE:SECOND.ZONE"
        }

       Status da requisição: 200 OK
       ---

       Erro na saída: 

       {
           "error": "exemplo de erro"
       }
       ```
 #### Atualizar
       PUT: _/sections/id_
       ```
       Entrada esperada: 

       {
           "name": "nome do critério",
           "criteria": [1,2,3,4,5,...] (não obrigatório)
       }
       ---

       Saída esperada:

       Um JSON com os novos dados da seção será retornado. 

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída:

       {
           "error": "mensagem de erro"
       }

       Status da requisição: 500
       ```
 #### Remover
       DELETE: _/sections/id_
       ```
       Saída esperada: 

       Status da requisição: 204 NO CONTENT
       ---

       Erro na saída: 

       {
           "error":"mensagem de erro"
       }
       ```
