const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ⚠️ IMPORTANT: Your API key here looks like a Google API key format (AIzaSy...), not an OpenAI key.
// Make sure you replace it with your actual OpenAI API key!
const OPENAI_API_KEY = 'AIzaSyC6xBgilGB6rr50lOE8sY6nSIK2cS-m_KM';

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        messages: [
          { role: 'system', content: 'You are a helpful journal chatbot.' },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content.trim();

    res.json({ reply: botReply });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
