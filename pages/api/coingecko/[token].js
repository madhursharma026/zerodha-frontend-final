export default async function handler(req, res) {
  const { token } = req.query
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${token}?localization=false&tickers=false&market_data=true`
    )
    if (!response.ok) {
      return res.status(response.status).json({ error: 'CoinGecko fetch failed' })
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server fetch error' })
  }
}
