import { useEffect, useState } from 'react'
import './App.css'

type UserSummary = {
  _id: string
  name: string
  email: string
  points: number
  team: string
  fitnessLevel: string
}

type ActivitySummary = {
  _id: string
  userId: string
  type: string
  durationMinutes: number
  pointsEarned: number
  notes?: string
}

function getApiBaseUrl() {
  const codespaceName =
    import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  if (typeof window !== 'undefined' && window.location.hostname.includes('app.github.dev')) {
    const match = window.location.hostname.match(/^([a-z0-9-]+)-5173\.app\.github\.dev$/i)
    if (match) {
      return `https://${match[1]}-8000.app.github.dev`
    }
  }

  return 'http://localhost:8000'
}

function App() {
  const [users, setUsers] = useState<UserSummary[]>([])
  const [activities, setActivities] = useState<ActivitySummary[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl()

    async function loadData() {
      try {
        const [usersResponse, activitiesResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/api/users`),
          fetch(`${apiBaseUrl}/api/activities`),
        ])

        if (!usersResponse.ok || !activitiesResponse.ok) {
          throw new Error('Unable to load OctoFit data from the API.')
        }

        const [userData, activityData] = await Promise.all([
          usersResponse.json() as Promise<UserSummary[]>,
          activitiesResponse.json() as Promise<ActivitySummary[]>,
        ])

        setUsers(userData)
        setActivities(activityData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>OctoFit Tracker</h1>
      <p>API base URL: {getApiBaseUrl()}</p>

      {loading && <p>Loading data…</p>}
      {error && <p role="alert">{error}</p>}

      <section>
        <h2>Leaderboard</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} — {user.points} pts · {user.team} · {user.fitnessLevel}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent activities</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              {activity.type} · {activity.durationMinutes} min · {activity.pointsEarned} pts
              {activity.notes ? ` · ${activity.notes}` : ''}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
