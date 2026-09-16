import { Link } from "react-router";

function Home() {
    return (
        <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Overview
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Welcome to Simple React Coingecko
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                    This crypto application is built for learning React and ECharts. It is a
                    simple dashboard for exploring digital assets, visualizing market data, and
                    practicing modern frontend development with interactive charts.
                </p>

                <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Tech Stack
                    </h2>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li>
                            <strong>Frontend:</strong> React + TypeScript + Vite
                        </li>
                        <li>
                            <strong>React version:</strong> React 19
                        </li>
                        <li>
                            <strong>Charts:</strong> ECharts for market visuals and analytics
                        </li>
                        <li>
                            <strong>API layer:</strong> Nitro server for handling API
                            routes and frontend data access
                        </li>
                        <li>
                            <strong>UI:</strong> Tailwind CSS and reusable components
                        </li>
                    </ul>
                </div>

                <div>
                    <Link className="text-blue-500 hover:underline" to="/dashboard">
                        Go to dashboard
                    </Link>                    
                </div>
            </div>
        </section>
    );
}

export default Home;