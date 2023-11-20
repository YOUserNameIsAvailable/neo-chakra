import axios from 'axios'

export const fetchRates = async currencyOne => {
  const { data } = await axios.get(
    `https://api.apilayer.com/fixer/latest?base=${currencyOne}&apikey=${process.env.NEXT_APP_API_KEY}`,
  )
  return data
}

export const fetchSymbols = async () => {
  const { data } = await axios.get(
    `https://api.apilayer.com/fixer/symbols?apikey=${process.env.NEXT_APP_API_KEY}`,
  )
  return data
}
