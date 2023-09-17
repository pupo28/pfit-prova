// Esempio di server Node.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
  const apiKey = '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'; // Sostituisci con la tua chiave API
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const inputText = req.body.text;
  const maxTokens = 50;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: inputText,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const outputText = data.choices[0].text;
    res.json({ response: outputText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella richiesta API' });
  }
});

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});


