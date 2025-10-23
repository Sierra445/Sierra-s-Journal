const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hard-coded chatbot logic
function getChatbotReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes('happy') || lower.includes('good')) {
    return "I'm glad to hear you're feeling good today!";
  } else if (lower.includes('sad') || lower.includes('down')) {
    return "I'm sorry you're feeling sad. Remember, better days are ahead.";
  } else if (lower.includes('stress') || lower.includes('tired')) {
    return "It sounds like you’ve had a lot on your mind. Try to rest and breathe a little.";
  } else if (lower.includes('angry') || lower.includes('upset')) {
    return "It’s okay to feel angry sometimes. Try to express it calmly or write it out.";
  } else if (lower.includes('thank')) {
    return "You're very welcome! I’m always here to listen.";
  } else {
    return "Thanks for sharing that with me. Would you like to talk more about it?";
  }
}

// Endpoint for journal entries
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const reply = getChatbotReply(userMessage);
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
