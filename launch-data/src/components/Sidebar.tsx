import { Link } from "react-router-dom"

const Sidebar = () => {

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">🚀 LaunchParty</h1>
            <Link to="/" className="sidebar-link">🏠 Dashboard</Link>
            <Link to="/graph" className="sidebar-link">🔎 Graph</Link>
            <Link to="/about" className="sidebar-link">🤟 About</Link>
        </div>
    )
}

export default Sidebar