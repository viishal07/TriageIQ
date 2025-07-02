import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

console.log("🔑 GROQ API KEY:", process.env.GROQ_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
  const { symptom } = req.body;

  if (!symptom || symptom.trim().length < 5) {
    return res.status(400).json({ error: 'Symptom description is too short.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a reliable medical triage assistant. For a given patient symptom description, provide:
- Possible Cause(s)
- Urgency Level (Low, Medium, or High)
- Next Steps (in simple language, no medicine names)`
          },
          {
            role: 'user',
            content: `Patient says: ${symptom}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("Raw Groq response:", data);

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response from Groq');
    }

    const aiMessage = data.choices[0].message.content.trim();
    res.json({ result: aiMessage });

  } catch (err) {
    console.error('Groq API error:', err.message);
    res.status(500).json({ error: 'AI failed: ' + err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
