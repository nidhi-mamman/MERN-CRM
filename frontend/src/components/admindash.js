import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "./navbar"

export const Admindash = () => {
    const [users, setusers] = useState([])
    const [jobs, setjobs] = useState([])
    const [events, setevents] = useState([])
    const [announcements, setAnnouncements] = useState([])
    const [latestAnnouncement, setLatestAnnouncement] = useState(null)
    const [userName, setUserName] = useState("Admin")

    useEffect(() => {
        const storedName = localStorage.getItem("userName")
        if (storedName) {
            setUserName(storedName)
        }
    }, [])

    const getusers = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/users")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setusers(result.Data || [])
                }
            }
        }
        catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    const getjobs = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/jobs")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setjobs(result.Data || [])
                }
            }
        }
        catch (error) {
            console.error("Error fetching jobs:", error)
        }
    }

    const getevents = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/events")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setevents(result.Data || [])
                }
            }
        }
        catch (error) {
            console.error("Error fetching events:", error)
        }
    }

    const getLatestAnnouncement = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/announcements/latest")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setLatestAnnouncement(result.Data)
                }
            }
        } catch (error) {
            console.error("Error fetching latest announcement:", error)
        }
    }

    const getAnnouncements = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/announcements")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setAnnouncements(result.Data || [])
                }
            }
        } catch (error) {
            console.error("Error fetching announcements:", error)
        }
    }

    useEffect(() => {
        getusers()
        getjobs()
        getevents()
        getLatestAnnouncement()
        getAnnouncements()
    }, [])

    const latestEvent = events.length > 0 ? events[0] : null
    const latestJob = jobs.length > 0 ? jobs[0] : null

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-lg-2 sidebar px-0 ">
                    <Navbar />
                </div>
                <div className="col-lg-10 right-panel py-3 px-5 sidebar">
                    <p className="m-0 " style={{ color: " #b45309", fontSize: "12px" }}>DASHBOARD</p>
                    <h2 className="m-0 fw-bolder fs-2">Welcome back, {userName}</h2>
                    <p style={{ color: " #a3a2a1" }}>Here's what's happening in your alumni network.</p>

                    <div className="card-dash-main my-4 mb-5">
                        <Link to="/directory" className="text-decoration-none text-dark">
                            <div className="card-dash p-3 pe-5">
                                <span className="p-1" style={{ backgroundColor: " hsl(213.75deg 100% 96.86%)", color: "blue" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <p className="card-text mt-3 mb-0 pe-5 fs-5 fw-bolder">{users.length}</p>
                                <h5 className="card-title pe-5 fs-6">Total Alumni</h5>
                            </div>
                        </Link>

                        <Link to="/events" className="text-decoration-none text-dark">
                            <div className="card-dash p-3 pe-5">
                                <span className="p-1" style={{ color: "rgb(217 ,119, 6 )", backgroundColor: "rgb(255, 251, 235,1)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 2v4"></path>
                                        <path d="M16 2v4"></path>
                                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                        <path d="M3 10h18"></path>
                                        <path d="M8 14h.01"></path>
                                        <path d="M12 14h.01"></path>
                                        <path d="M16 14h.01"></path>
                                        <path d="M8 18h.01"></path>
                                        <path d="M12 18h.01"></path>
                                        <path d="M16 18h.01"></path>
                                    </svg>
                                </span>
                                <p className="card-text mt-3 mb-0 pe-5 fs-5 fw-bolder">{events.length}</p>
                                <h5 className="card-title pe-5 fs-6">Total Events</h5>
                            </div>
                        </Link>

                        <Link to="/jobs" className="text-decoration-none text-dark">
                            <div className="card-dash p-3 pe-5">
                                <span className="p-1" style={{ backgroundColor: "rgb(236, 253, 245 ,1)", color: "rgb(5, 150, 105 , 1)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                                    </svg>
                                </span>
                                <p className="card-text mt-3 mb-0 pe-5 fs-5 fw-bolder">{jobs.length}</p>
                                <h5 className="card-title pe-5 fs-6">Total Jobs</h5>
                            </div>
                        </Link>

                        <Link to="/news" className="text-decoration-none text-dark">
                            <div className="card-dash p-3 pe-5">
                                <span className="p-1" style={{ backgroundColor: "rgb(250, 245, 255)", color: "rgb(145, 110, 180)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                                    </svg>
                                </span>
                                <p className="card-text mt-3 mb-0 pe-5 fs-5 fw-bolder">{announcements.length}</p>
                                <h5 className="card-title pe-5 fs-6"> Announcements</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="events-jobs ">
                        <div className="events bg-white mb-lg-5 mb-sm-0 ">
                            <div className="row p-3 pb-0 d-flex justify-content-between ">
                                <div className="col-4 fw-bolder">Recent Events</div>
                                <div className="col-4 d-flex justify-content-end fs-6">
                                    <Link to="/events" className="btn d-flex py-1" id="viewall">
                                        view All
                                        <span className="ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-3 pt-2">
                                {latestEvent ? (
                                    <div className="d-flex justify-content-start align-items-start mb-3">
                                        <div className="me-3">
                                            <span className="p-1" style={{ color: "rgb(217 ,119, 6 )", backgroundColor: "rgb(255, 251, 235,1)" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M8 2v4"></path>
                                                    <path d="M16 2v4"></path>
                                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                    <path d="M3 10h18"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div>
                                            <p className="mb-0 fs-6">{latestEvent.title}</p>
                                            <p className="mb-0" style={{ color: "#8c8c8c", fontSize: "14px" }}>
                                                {latestEvent.date} {latestEvent.location ? `• ${latestEvent.location}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ color: "#8c8c8c" }}>No events added yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="events bg-white w-md-100 mb-5">
                            <div className="row p-3 pb-0 d-flex justify-content-between ">
                                <div className="col-4 fw-bolder">Recent Jobs</div>
                                <div className="col-4 d-flex justify-content-end">
                                    <Link to="/jobs" className="btn d-flex py-1 " id="viewall">
                                        view All
                                        <span className="ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-3 pt-2">
                                {latestJob ? (
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="d-flex justify-content-start">
                                            <div className="me-3">
                                                <span className="p-1" style={{ backgroundColor: "rgb(236, 253, 245 ,1)", color: "rgb(5, 150, 105 , 1)" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div>
                                                <p className="mb-0 fs-6 fw-lighter">{latestJob.title}</p>
                                                <p className="mb-0" style={{ color: "#8c8c8c", fontSize: "14px" }}>
                                                    {latestJob.company} {latestJob.salary ? `• ${latestJob.salary}` : ""}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="fs-6 fw-lighter px-2 mb-0" style={{ backgroundColor: "rgb(236, 253, 245 ,1)", color: "rgb(5, 150, 105 , 1)", height: "25px" }}>
                                            {latestJob.type || "available"}
                                        </p>
                                    </div>
                                ) : (
                                    <p style={{ color: "#8c8c8c" }}>No jobs posted yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="anoucement bg-white mb-4 ">
                        <div className="row p-3 pb-0 d-flex justify-content-between ">
                            <div className="col-3 fw-bolder">Latest Announcement</div>
                            <div className="col-3 d-flex justify-content-end">
                                <Link to="/news" className="btn d-flex py-1" id="viewall">view All</Link>
                            </div>
                        </div>
                        <div className="row p-3 mt-2 pt-0 d-flex justify-content-between">
                            <div className="col-8">
                                {latestAnnouncement ? (
                                    <div className="d-flex justify-content-start g-2">
                                        <div className="col-1">
                                            <p className="mb-0">
                                                <span className="p-1" style={{ backgroundColor: "rgb(250, 245, 255)", color: "rgb(145, 110, 180)" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                                                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                                                    </svg>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-8 ms-2">
                                            <p className="mb-0">{latestAnnouncement.title}</p>
                                            <p style={{ color: "#8c8c8c" }}>{latestAnnouncement.category} • {new Date(latestAnnouncement.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
                                            <p style={{ color: "#8c8c8c" }}>{latestAnnouncement.body}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-start g-2">
                                        <div className="col-1">
                                            <p className="mb-0">
                                                <span className="p-1" style={{ backgroundColor: "rgb(250, 245, 255)", color: "rgb(145, 110, 180)" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="m3 11 18-5v12L3 14v-3z"></path>
                                                        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                                                    </svg>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-8 ms-2">
                                            <p className="mb-0">No announcements available yet.</p>
                                            <p style={{ color: "#8c8c8c" }}>Create one from the News page.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-4 pe-4 d-flex justify-content-end">
                                <p className="p-1" style={{ backgroundColor: "grey", color: "rgb(70, 67, 67)", height: "25px", fontSize: "14px" }}>info</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
