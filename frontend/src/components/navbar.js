import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
    const [opensidebar, setopensidebar] = useState(false)
    const [userName, setUserName] = useState("Guest")
    const [userType, setUserType] = useState("Alumni")

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "Guest"
        const storedType = localStorage.getItem("userType") || "Alumni"
        setUserName(storedName)
        setUserType(storedType)
    }, [])

    const getnavclass = ({ isActive }) => {
        return isActive ? "active" : ""
    }

    const togglesidebar = () => {
        setopensidebar(!opensidebar)
    }

    const closesidebar = () => {
        setopensidebar(false)
    }

    const logoutuser = () => {
        localStorage.clear()
        closesidebar()
    }

    useEffect(() => {
        if (opensidebar) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [opensidebar])

    return (
        <>
            <div className="mobile-topbar">
                <div className="mobile-logo">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                    </div>
                    <span className="mobile-logo-text">AlumNet</span>
                </div>

                <button className="hamburger-btn" onClick={togglesidebar} aria-label="Menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            <div className={`sidebar-overlay ${opensidebar ? "show" : ""}`} onClick={closesidebar}></div>

            <aside id="sidebar" className={opensidebar ? "open" : ""}>
                <div className="logo-wrap">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <h1>AlumNet</h1>
                        <p>Alumni Network</p>
                    </div>
                </div>

                <nav>
                    <NavLink to="/admindash" className={getnavclass} onClick={closesidebar}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                    </NavLink>

                    <NavLink to="/directory" className={getnavclass} onClick={closesidebar}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Directory
                    </NavLink>

                    <NavLink to="/events" className={getnavclass} onClick={closesidebar}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Events
                    </NavLink>

                    <NavLink to="/jobs" className={getnavclass} onClick={closesidebar}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        </svg>
                        Job Board
                    </NavLink>

                    <NavLink to="/news" className={getnavclass} onClick={closesidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                        News
                    </NavLink>

                    <NavLink to="/profile" className={getnavclass} onClick={closesidebar}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-row">
                        <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
                        <div className="user-info">
                            <h4 style={{ color: "#b45309" }}>{userName}</h4>
                            <p>{userType}</p>
                        </div>
                    </div>
                    <NavLink to="/login" className="signout" onClick={logoutuser}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                    </NavLink>
                </div>
            </aside>
        </>
    )
}
