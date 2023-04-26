# Desafio-front-end-vue-js

Para acessar o projeto corretamente, é necessário estar na branch **"LeonardoJaques"** e ter o 
**Node.js versão 19 instalado**. 
O projeto utiliza Vue.js versão 3 com typescript e 
o framework de CSS Tailwind. 
Para iniciar o projeto, basta digitar o comando "npm start" no terminal.

Além disso, para executar o projeto corretamente, é necessário ter algumas dependências instaladas, que podem ser encontradas no arquivo package.json. Algumas das dependências incluem o json-server para simular uma API, o Sass para compilar arquivos CSS, e o eslint para manter a consistência do código.

Ao digitar "npm start", o comando concurrently será executado, permitindo que tanto o servidor quanto o projeto Vue sejam iniciados simultaneamente. O servidor será executado na porta 3001, enquanto o projeto Vue será executado na porta 8080.

Por fim, o projeto Vue contém componentes para a exibição de dados de pacientes, bem como um formulário de cadastro. Os dados inseridos no formulário são armazenados no arquivo db.json, que é acessado através da API simulada pelo json-server. É possível adicionar novos pacientes ao preencher o formulário de cadastro e clicar no botão "Cadastrar". Além disso, é possível visualizar os pacientes já cadastrados na página de listagem de pacientes.
