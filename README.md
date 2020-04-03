# PASSO A PASSO

## Inserção manual

- É recomendavel seguir o fluxo de inserção

### 1. Cadastrar usuários

#### Obs: 

- o campo status deve ser: 'true'
- o campo evaluatedPrjs deve ser tratado como string normal, sendo somente um campo sem valor agregado

### 2. Cadastrar projetos

#### Obs:

- o campo members deve ser preenchido com o nome dos alunos seguido de vírgula (Ex.: Aluno 1,Aluno 2,Aluno 3)

### 3. Cadastrar relações usuário - projeto

### 4. Cadastrar seções

### 5. Cadastrar critérios

### 6. Cadastrar relações seção - critério

### 7. Cadastrar relações projeto - seção

## Execução da pasta Frontend

### Executar o comando: npm install express

## Execução da pasta Backend

### 1. Executar o comando: npm install --save sequelize

### 2. Executar o comando: npx sequelize db:migrate