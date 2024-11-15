const express = require('express');   // Importa o Express
const bodyParser = require('body-parser'); // Importa o body-parser para tratar requisições POST
const db = require('./db');           // Importa a configuração do banco de dados (db.js)
const path = require('path');

const app = express();                // Cria uma instância do Express

app.use(bodyParser.urlencoded({ extended: true })); // Configura o body-parser
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

//

// Middleware para parse do body
app.use(bodyParser.urlencoded({ extended: true }));

// Configura a pasta 'public' como pasta estática
app.use(express.static('public'));

// Rota para o cadastro
app.post('/register', (req, res) => {
  const { firstname, email, password } = req.body;
  
  // Insere os dados do formulário na tabela tb_proprietario
  const query = 'INSERT INTO tb_proprietario (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [firstname, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao cadastrar.');
    } else {
      console.log('Dados inseridos com sucesso:', result);
      res.send('Cadastro realizado com sucesso!');
    }
  });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
// Middleware para parse do body
app.use(bodyParser.urlencoded({ extended: true }));

// Configura a pasta 'public' como pasta estática
app.use(express.static('public'));

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Rota para processar o formulário de cadastro
app.post('/register', (req, res) => {
  const { firstname, email, password } = req.body;

  const query = 'INSERT INTO tb_proprietario (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [firstname, email, password], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao cadastrar.');
    } else {
      console.log('Dados inseridos com sucesso:', result);
      res.send('Cadastro realizado com sucesso!');
    }
  });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});