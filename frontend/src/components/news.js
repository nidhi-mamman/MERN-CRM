import { useEffect, useState } from "react"
import { Navbar } from "./navbar"

export const News = () => {
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("General")
    const [body, setBody] = useState("")
    const [announcements, setAnnouncements] = useState([])
    const usertype = (localStorage.getItem("userType") || "").toLowerCase()
    const isalumni = usertype === "alumni"

    const loadAnnouncements = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/announcements")
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setAnnouncements(result.Data || [])
                }
            }
        } catch (error) {
            console.error("Error loading announcements:", error)
        }
    }

    useEffect(() => {
        loadAnnouncements()
    }, [])

    const handleAddAnnouncement = async () => {
        if (isalumni) {
            alert("Alumni users cannot add announcements.")
            return
        }

        if (!title.trim() || !body.trim()) return

        try {
            const res = await fetch("http://localhost:9000/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body, category }),
            })

            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setAnnouncements([result.Data, ...announcements])
                    setTitle("")
                    setCategory("General")
                    setBody("")
                    setShowModal(false)
                }
            }
        } catch (error) {
            console.error("Error creating announcement:", error)
        }
    }

    const handleDeleteAnnouncement = (id) => {
        setAnnouncements(announcements.filter((item) => item._id !== id))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <Navbar />
                </div>
                <div className="col-lg-10 right-panel">
                    <main id="main">
                        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
                            <div>
                                <div className="page-label">News</div>
                                <h1 className="page-title">Announcements</h1>
                                <p className="page-subtitle">Latest updates and news from the network.</p>
                            </div>
                            <button
                                className={`btn btn-viewall ${isalumni ? "btn-template-disabled" : ""}`}
                                onClick={() => {
                                    if (isalumni) {
                                        alert("Alumni users cannot add announcements.")
                                        return
                                    }
                                    setShowModal(true)
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                New Announcement
                            </button>
                        </div>

                        <div id="cardsList">
                            {announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <div className="announcement-card mb-3" key={announcement._id}>
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <span className="tag-badge">{announcement.category}</span>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="card-date">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <button className="delete-btn" onClick={() => handleDeleteAnnouncement(announcement._id)}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6l-1 14H6L5 6" />
                                                        <path d="M10 11v6" />
                                                        <path d="M14 11v6" />
                                                        <path d="M9 6V4h6v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-title">{announcement.title}</div>
                                        <div className="card-body-text">{announcement.body}</div>
                                        <div className="card-author">{announcement.author}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    No announcements yet. 
                                </div>
                            )}
                        </div>
                    </main>

                    <div className={`modal-overlay ${showModal ? "open" : ""}`}>
                        <div className="modal-box">
                            <div className="modal-title">New Announcement</div>

                            <label className="form-label-custom">Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Announcement title"
                            />

                            <label className="form-label-custom">Category</label>
                            <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="General">General</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Events">Events</option>
                                <option value="Jobs">Jobs</option>
                            </select>

                            <label className="form-label-custom">Message</label>
                            <textarea
                                className="form-input"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Write your announcement..."
                            ></textarea>

                            <div className="modal-actions">
                                <button className="btn-cancel" type="button" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn-submit" type="button" onClick={handleAddAnnouncement}>
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
