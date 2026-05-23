import { Router, Request, Response } from 'express';

const router = Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen3-235b-a22b-2507';

const SYSTEM_PROMPT = `You are the Umbrella Seychelles project assistant — an AI helping users understand biodiversity monitoring, conservation, and environmental management in the Seychelles archipelago.

You know about:
- The Seychelles archipelago — 115+ islands spread across the Indian Ocean, grouped into Inner Islands (Mahé, Praslin, La Digue, Silhouette, etc.) and Outer Islands (Aldabra, Cosmoledo, Farquhar, Amirantes, etc.)
- The Global Environment Facility (GEF/FEM) — principal funder for biodiversity and environmental projects
- The United Nations Environment Programme (UNEP/PNUE) — executing agency and partner
- Biodiversity monitoring and conservation efforts across the Seychelles
- Endemic species — Seychelles is home to numerous endemic species including the Coco de Mer (Lodoicea maldivica), Seychelles Giant Tortoise (Aldabrachelys gigantea), Seychelles Warbler (Acrocephalus sechellensis), Seychelles Blue Pigeon, and many more
- Marine conservation — coral reef monitoring, marine protected areas (MPAs), and sustainable fisheries
- Aldabra Atoll — a UNESCO World Heritage Site and one of the largest raised coral atolls in the world
- The Geoportal with WMS layers for environmental monitoring: Land Cover, Land Cover Change, Land Productivity, Soil Organic Carbon, SDG 15.3.1, and other geospatial data layers
- National institutions: Ministry of Environment, Seychelles Islands Foundation (SIF), Seychelles Fishing Authority (SFA), Seychelles Climate Change Department, National Parks Authority
- The project targets SDG 15 (Life on Land) and SDG 14 (Life Below Water)
- The unique challenge of conservation across 115+ scattered islands
- Climate change impacts: sea level rise, coral bleaching, coastal erosion affecting low-lying islands

RULES:
- Answer ONLY based on the project context provided above or documents you have access to.
- If you don't have reliable data on a question, say: "I don't have reliable data on this topic. Please consult official project documents or visit the Geoportal for spatial data."
- Never fabricate statistics, partner names, or project details.
- Respond in the same language the user writes in (English, French, Seychellois Creole, etc.).
- Be concise and helpful. If the user asks about the Geoportal, guide them to visit the /geoportail page.
- You are not a general-purpose assistant. Stay within the domain of the Umbrella Seychelles project, biodiversity monitoring, conservation efforts, and related environmental topics in the Seychelles archipelago and the Western Indian Ocean region.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * POST /api/chat
 * Streaming proxy to OpenRouter.
 * Body: { messages: ChatMessage[] }
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const requestTime = Date.now();
  console.log(`\n[CHAT] === New request at ${new Date().toISOString()} ===`);
  console.log(`[CHAT] API key configured: ${!!OPENROUTER_API_KEY}`);
  console.log(`[CHAT] Model: ${MODEL}`);

  if (!OPENROUTER_API_KEY) {
    console.error('[CHAT] ERROR: No API key');
    res.status(500).json({ error: 'OpenRouter API key not configured on the server.' });
    return;
  }

  const { messages } = req.body as { messages?: ChatMessage[] };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    console.error('[CHAT] ERROR: No messages provided');
    res.status(400).json({ error: 'Messages array is required.' });
    return;
  }

  console.log(`[CHAT] Messages count: ${messages.length}`);
  console.log(`[CHAT] Last user message: "${messages[messages.length - 1]?.content?.slice(0, 80)}..."`);

  // Prepend system prompt
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    console.log('[CHAT] Sending request to OpenRouter...');
    const openrouterStart = Date.now();

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://umbrella-sc.org',
        'X-Title': 'Umbrella Seychelles',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: fullMessages,
        stream: true,
      }),
    });

    console.log(`[CHAT] OpenRouter responded: ${response.status} in ${Date.now() - openrouterStart}ms`);

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`[CHAT] OpenRouter error (${response.status}):`, errBody);
      res.status(response.status).json({ error: `OpenRouter error: ${response.status}` });
      return;
    }

    // Stream SSE back to client
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

    const reader = response.body?.getReader();
    if (!reader) {
      console.error('[CHAT] ERROR: No reader from OpenRouter response');
      res.status(500).json({ error: 'Failed to read OpenRouter response stream.' });
      return;
    }

    const decoder = new TextDecoder();
    let chunkCount = 0;
    let contentChunks = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log(`[CHAT] Stream ended. Total raw chunks: ${chunkCount}, content chunks: ${contentChunks}, total time: ${Date.now() - requestTime}ms`);
          break;
        }

        chunkCount++;
        const chunk = decoder.decode(value, { stream: true });

        if (chunkCount <= 3) {
          console.log(`[CHAT] Raw chunk #${chunkCount} (${value.byteLength} bytes):`, chunk.slice(0, 200));
        }

        // Parse SSE lines from OpenRouter
        const lines = chunk.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;

          const jsonStr = trimmed.slice(6); // Remove "data: " prefix
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              contentChunks++;
              if (contentChunks <= 5) {
                console.log(`[CHAT] Content chunk #${contentChunks}: "${content.slice(0, 50)}"`);
              }
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch {
            // Skip malformed JSON chunks
          }
        }
      }

      console.log(`[CHAT] Sending [DONE] to client. Total content chunks sent: ${contentChunks}`);
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (streamErr) {
      console.error('[CHAT] Stream read error:', streamErr);
      res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('[CHAT] Route error:', error);
    res.status(500).json({ error: 'Failed to connect to AI service.' });
  }
});

export default router;
