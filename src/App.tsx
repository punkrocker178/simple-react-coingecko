import './App.css'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
