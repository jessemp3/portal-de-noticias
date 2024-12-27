# Portal de Notícias

Este é um projeto de portal de notícias simples, desenvolvido com Node.js, CSS, EJS e MongoDB. O projeto está hospedado na AWS, gerenciado pelo PM2 e Nginx.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para servidor.
- **EJS**: Motor de templates usado para gerar HTML com JavaScript.
- **CSS**: Estilização das páginas web.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **PM2**: Gerenciador de processos para aplicações Node.js.
- **Nginx**: Servidor web para servir a aplicação.

## Funcionalidades

- Publicação de notícias.
- Edição e exclusão de notícias.
- Visualização de lista de notícias.
- Pesquisa de notícias por título ou conteúdo.

## Hospedagem

O projeto está hospedado na AWS, utilizando os seguintes serviços:

- **EC2**: Instâncias de computação para execução da aplicação

## Gerenciamento

A aplicação é gerenciada pelo PM2, que facilita o monitoramento e a manutenção do servidor em produção. O Nginx é usado como servidor proxy reverso, direcionando o tráfego para a aplicação Node.js.

## Como Executar

1. Clone o repositório:
   ```sh
   git clone https://github.com/jessemp3/portal-de-noticias.git
   ``` 
2. Instale as dependências:
    ```sh
     cd portal-de-noticias
      npm install
   ``` 
3. Configure as variáveis de ambiente:
    ```sh
     DB_URI=mongodb://<usuário>:<senha>@<host>:<porta>/<database>
   ``` 
4. Inicie a aplicação:
     ```sh
     node index.js
   ``` 
5. Acesse a aplicação no navegador:
    ```sh
     http://localhost:4000
     ``` 

