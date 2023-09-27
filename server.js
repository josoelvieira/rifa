// server.js
const express = require('express');
const cors = require('cors'); // Importe o pacote cors
const data = require('./src/app/api/data');
const app = express();
const port = process.env.PORT || 3001;

// Use o middleware cors para permitir solicitações de qualquer origem durante o desenvolvimento
app.use(cors());

app.get('/api/dados', (req, res) => {
  res.json({ dados: data });
});

app.get('/api/dados/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dado = data.find((d) => d.id === id);
  if (!dado) {
    res.status(404).json({ message: 'Dado não encontrado' });
  } else {
    res.json({ dado });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
