// =================================================================
// ChainMind API Service Layer
// All API keys are loaded from environment variables at build time,
// never exposed in the frontend bundle.
// =================================================================

const LLM_BASE = 'https://openrouter.ai/api/v1';
const NINJAS_BASE = 'https://api.api-ninjas.com/v1';

// Keys injected at build via VITE_ env vars — never committed to repo
const getLLMKey = () => import.meta.env.VITE_LLM_API_KEY || '';
const getNinjasKey = () => import.meta.env.VITE_NINJAS_API_KEY || '';

// ─── LLM (OpenRouter) ───────────────────────────────────────────
export async function chatLLM(messages, systemPrompt) {
  const key = getLLMKey();
  if (!key) return { error: 'LLM API key not configured. Add VITE_LLM_API_KEY to .env' };
  try {
    const res = await fetch(`${LLM_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ChainMind AI',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt || 'You are ChainMind, an AI supply chain intelligence agent. Provide detailed, data-driven analysis. Be concise but thorough.' },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (data.error) return { error: data.error.message || 'LLM request failed' };
    return { text: data.choices?.[0]?.message?.content || 'No response generated.' };
  } catch (e) {
    return { error: e.message };
  }
}

// ─── OCR (API Ninjas Image-to-Text) ─────────────────────────────
export async function ocrImage(imageFile) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch(`${NINJAS_BASE}/imagetotext`, {
      method: 'POST',
      headers: { 'X-Api-Key': key },
      body: formData,
    });
    const data = await res.json();
    return { text: Array.isArray(data) ? data.map(d => d.text).join('\n') : JSON.stringify(data) };
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Earnings ───────────────────────────────────────────────────
export async function fetchEarnings(ticker, year, period) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const params = new URLSearchParams({ ticker });
    if (year) params.append('year', year);
    if (period) params.append('period', period);
    const res = await fetch(`${NINJAS_BASE}/earnings?${params}`, {
      headers: { 'X-Api-Key': key },
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Stock Price ────────────────────────────────────────────────
export async function fetchStockPrice(ticker) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const res = await fetch(`${NINJAS_BASE}/stockprice?ticker=${ticker}`, {
      headers: { 'X-Api-Key': key },
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Web Scraper ────────────────────────────────────────────────
export async function scrapeURL(url) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const res = await fetch(`${NINJAS_BASE}/webscraper?url=${encodeURIComponent(url)}`, {
      headers: { 'X-Api-Key': key },
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Weather ────────────────────────────────────────────────────
export async function fetchWeather(lat, lon) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const res = await fetch(`${NINJAS_BASE}/weather?lat=${lat}&lon=${lon}`, {
      headers: { 'X-Api-Key': key },
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Commodity Prices ───────────────────────────────────────────
export async function fetchCommodity(symbol) {
  const key = getNinjasKey();
  if (!key) return { error: 'API Ninjas key not configured' };
  try {
    const res = await fetch(`${NINJAS_BASE}/commodityprice?name=${encodeURIComponent(symbol)}`, {
      headers: { 'X-Api-Key': key },
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

// ─── RSS News Feeds ─────────────────────────────────────────────
const RSS_FEEDS = [
  'http://newsrss.bbc.co.uk/rss/newsonline_world_edition/americas/rss.xml',
  'http://rss.cnn.com/rss/cnn_topstories.rss',
];

export async function fetchRSSFeeds() {
  const results = [];
  for (const url of RSS_FEEDS) {
    try {
      // Use a CORS proxy for RSS feeds in browser
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const items = xml.querySelectorAll('item');
      items.forEach(item => {
        results.push({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          description: item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '') || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
          source: url.includes('bbc') ? 'BBC News' : 'CNN',
        });
      });
    } catch (e) {
      console.warn('RSS fetch error:', e.message);
    }
  }
  return results.slice(0, 30);
}
