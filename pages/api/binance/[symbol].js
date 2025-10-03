export default async function handler(req, res) {
  const { symbol, interval = '1d', limit = 50 } = req.query
  if (!symbol) return res.status(400).json({ error: 'Symbol required' })

  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`
    )
    if (!response.ok) {
      console.error('Binance fetch failed:', await response.text())
      return res.status(500).json({ error: 'Failed to fetch Binance data' })
    }

    const data = await response.json()
    if (!Array.isArray(data)) {
      console.error('Binance response not an array:', data)
      return res.status(500).json({ error: 'Binance API did not return an array' })
    }

    res.status(200).json(data)
  } catch (err) {
    console.error('Error in API route:', err)
    res.status(500).json({ error: 'Failed to fetch Binance data' })
  }
}
