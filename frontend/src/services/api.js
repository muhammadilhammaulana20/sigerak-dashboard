const API = import.meta.env.VITE_API_URL || '/api'

async function get(path) {
  const r = await fetch(`${API}${path}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

async function post(path, body) {
  const r = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const fetchSummary = () => get('/summary')
export const fetchEvPool = (status) => get(`/v2g/ev-pool${status ? `?status=${status}` : ''}`)
export const fetchVppCapacity = () => get('/v2g/vpp-capacity')
export const fetchDispatchHistory = () => get('/v2g/dispatch-history')
export const fetchGradingHistory = () => get('/grading/history')
export const fetchGradingDistribution = () => get('/grading/distribution')
export const fetchTrends = () => get('/analysis/trends')
export const fetchDataSources = () => get('/data/sources')
export const predictSoh = (data) => post('/ml/predict/soh', data)
export const predictRul = (data) => post('/ml/predict/rul', data)
export const predictMobilityRisk = (data) => post('/ml/predict/mobility-risk', data)
