import { API_URL } from "../config";
import { useEffect, useState } from "react"
import { Navbar } from "./navbar"

export const Events = () => {
    const [events, setevents] = useState([])
    const [showmodal, setshowmodal] = useState(false)
    const usertype = (localStorage.getItem("userType") || "").toLowerCase()
    const isalumni = usertype === "alumni"

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [location, setlocation] = useState("")
    const [capacity, setcapacity] = useState("")
    const [type, settype] = useState("Meetup")

    const getevents = async () => {
        try {
            const res = await fetch(`${API_URL}/api/events`)

            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setevents(result.Data || [])
                } else {
                    alert(result.Msg)
                }
            }
        } catch (error) {
            console.error("Error fetching events:", error)
        }
    }

    useEffect(() => {
        getevents()
    }, [])

    const formateventdate = (eventdate) => {
        if (!eventdate) {
            return ""
        }

        const newdate = new Date(eventdate)
        if (Number.isNaN(newdate.getTime())) {
            return eventdate
        }

        return newdate.toLocaleDateString()
    }

    const resetform = () => {
        settitle("")
        setdescription("")
        setdate("")
        settime("")
        setlocation("")
        setcapacity("")
        settype("Meetup")
    }

    const createevent = async () => {
        if (isalumni) {
            alert("Alumni users cannot add events.")
            return
        }

        const data = {
            title: title,
            description: description,
            date: date,
            time: time,
            location: location,
            capacity: capacity ? Number(capacity) : 0,
            type: type,
            createdBy: "Admin"
        }

        try {
            const res = await fetch(`${API_URL}/api/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    alert(result.Msg)
                    resetform()
                    setshowmodal(false)
                    getevents()
                } else {
                    alert(result.Msg)
                }
            }
        } catch (error) {
            console.error("Error creating event:", error)
        }
    }

    return (
        <>
            <div className="container-fluid events-page">
                <div className="row">
                    <div className="col-lg-2">
                        <Navbar />
                    </div>
                    <div className="col-lg-10 right-panel">
                        <main className="main">
                            <div className="page-hd">
                                <div>
                                    <div className="page-eyebrow">Events</div>
                                    <h1 className="page-title">Events &amp; Reunions</h1>
                                    <p className="page-sub">Discover and attend alumni events.</p>
                                </div>
                                <button
                                    className={`btn btn-viewall btn-new-event ${isalumni ? "btn-template-disabled" : ""}`}
                                    onClick={() => {
                                        if (isalumni) {
                                            alert("Alumni users cannot add events.")
                                            return
                                        }
                                        setshowmodal(true)
                                    }}
                                >
                                    <i className="bi bi-plus-lg"></i> New Event
                                </button>
                            </div>

                            <div className="events-list" id="eventsList">
                                {events.length > 0 ? (
                                    events.map((item) => (
                                        <div className="ev-card" key={item._id}>
                                            <span className="ev-badge">{item.type}</span>
                                            <h2 className="ev-title">{item.title}</h2>
                                            <p className="ev-desc">{item.description}</p>

                                            <div className="ev-meta">
                                                <div className="ev-meta-row"><i className="bi bi-calendar3"></i> {formateventdate(item.date)}</div>
                                                {item.time ? <div className="ev-meta-row"><i className="bi bi-clock"></i> {item.time}</div> : null}
                                                {item.location ? <div className="ev-meta-row"><i className="bi bi-geo-alt"></i> {item.location}</div> : null}
                                                <div className="ev-meta-row">
                                                    <i className="bi bi-people"></i>
                                                    <span>{item.capacity || 0} seats</span>
                                                </div>
                                            </div>

                                            <div className="ev-footer">
                                                <span className="ev-author">By {item.createdBy || "Admin"}</span>
                                                <button className="btn btn-viewall btn-rsvp" onClick={() => alert("RSVP feature coming soon")}>RSVP</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="mt-4" style={{ color: "var(--muted)" }}>No events available right now.</p>
                                )}
                            </div>
                        </main>

                        {showmodal ? (
                            <>
                                <div className="modal-backdrop fade show"></div>
                                <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Create New Event</h5>
                                                <button type="button" className="btn-close" onClick={() => setshowmodal(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="fl">Event Title *</label>
                                                    <input className="fc" type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="e.g. Annual Reunion 2026" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="fl">Description</label>
                                                    <textarea className="fc" rows="3" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Brief description"></textarea>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-12 col-sm-6">
                                                        <label className="fl">Date *</label>
                                                        <input className="fc" type="date" value={date} onChange={(e) => setdate(e.target.value)} />
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <label className="fl">Time</label>
                                                        <input className="fc" type="time" value={time} onChange={(e) => settime(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="fl">Location</label>
                                                    <input className="fc" type="text" value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Venue / Address" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="fl">Capacity</label>
                                                    <input className="fc" type="number" min="1" value={capacity} onChange={(e) => setcapacity(e.target.value)} placeholder="Max attendees" />
                                                </div>
                                                <div>
                                                    <label className="fl">Type</label>
                                                    <select className="fc" value={type} onChange={(e) => settype(e.target.value)}>
                                                        <option>Meetup</option>
                                                        <option>Conference</option>
                                                        <option>Workshop</option>
                                                        <option>Reunion</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer gap-2">
                                                <button className="btn btn-viewall btn-m-cancel" onClick={() => setshowmodal(false)}>Cancel</button>
                                                <button className="btn btn-viewall btn-m-create" onClick={createevent}>Create Event</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
