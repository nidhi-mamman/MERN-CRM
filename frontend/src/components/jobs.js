import { useEffect, useMemo, useState } from "react"
import { Navbar } from "./navbar"

export const Jobs = () => {
    const [jobs, setjobs] = useState([])
    const [search, setsearch] = useState("")
    const [jobtype, setjobtype] = useState("")
    const [showmodal, setshowmodal] = useState(false)
    const usertype = (localStorage.getItem("userType") || "").toLowerCase()
    const isalumni = usertype === "alumni"

    const [title, settitle] = useState("")
    const [company, setcompany] = useState("")
    const [location, setlocation] = useState("")
    const [type, settype] = useState("Full-Time")
    const [description, setdescription] = useState("")
    const [requirements, setrequirements] = useState("")
    const [salary, setsalary] = useState("")
    const [applylink, setapplylink] = useState("")

    const getjobs = async () => {
        try {
            const res = await fetch("http://localhost:9000/api/jobs")

            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setjobs(result.Data || [])
                } else {
                    alert(result.Msg)
                }
            }
        } catch (error) {
            console.error("Error fetching jobs:", error)
        }
    }

    useEffect(() => {
        getjobs()
    }, [])

    const filteredjobs = useMemo(() => {
        return jobs.filter((item) => {
            const searchmatch =
                item.title?.toLowerCase().includes(search.toLowerCase()) ||
                item.company?.toLowerCase().includes(search.toLowerCase())

            const typematch = jobtype === "" || item.type === jobtype

            return searchmatch && typematch
        })
    }, [jobs, search, jobtype])

    const resetform = () => {
        settitle("")
        setcompany("")
        setlocation("")
        settype("Full-Time")
        setdescription("")
        setrequirements("")
        setsalary("")
        setapplylink("")
    }

    const submitjob = async () => {
        if (isalumni) {
            alert("Alumni users cannot add jobs.")
            return
        }

        const data = {
            title: title,
            company: company,
            location: location,
            type: type,
            description: description,
            requirements: requirements,
            salary: salary,
            applyLink: applylink,
            postedBy: "Admin"
        }

        try {
            const res = await fetch("http://localhost:9000/api/jobs", {
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
                    getjobs()
                } else {
                    alert(result.Msg)
                }
            }
        } catch (error) {
            console.error("Error creating job:", error)
        }
    }

    return (
        <div className="container-fluid jobs-page">
            <div className="row">
                <div className="col-lg-2">
                    <Navbar />
                </div>
                <div className="col-lg-10 right-panel">
                    <main className="">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 header-row mb-4">
                            <div>
                                <div className="page-label">Career</div>
                                <h1 className="page-title">Job Board</h1>
                                <p className="page-subtitle">Discover opportunities posted by fellow alumni.</p>
                            </div>
                            <button
                                className={`btn btn-viewall btn-post-job ${isalumni ? "btn-template-disabled" : ""}`}
                                onClick={() => {
                                    if (isalumni) {
                                        alert("Alumni users cannot add jobs.")
                                        return
                                    }
                                    setshowmodal(true)
                                }}
                            >
                                <i className="bi bi-plus-lg"></i> Post a Job
                            </button>
                        </div>

                        <div className="row g-3 search-row">
                            <div className="col-12 col-md-8">
                                <div className="search-input-wrap">
                                    <i className="bi bi-search"></i>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search jobs or companies..."
                                        value={search}
                                        onChange={(e) => setsearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <select
                                    className="type-select"
                                    value={jobtype}
                                    onChange={(e) => setjobtype(e.target.value)}
                                >
                                    <option value="">Job Type</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>
                        </div>

                        {filteredjobs.length > 0 ? (
                            filteredjobs.map((item) => (
                                <div className="job-card" key={item._id}>
                                    <div className="job-title-row">
                                        <span className="job-title">{item.title}</span>
                                        <span className="badge-type">{item.type}</span>
                                    </div>

                                    <div className="job-meta">
                                        <span><i className="bi bi-building"></i> {item.company}</span>
                                        {item.location ? <span><i className="bi bi-geo-alt"></i> {item.location}</span> : null}
                                        {item.salary ? <span className="salary"><i className="bi bi-currency-dollar"></i> {item.salary}</span> : null}
                                    </div>

                                    {item.description ? <div className="job-description">{item.description}</div> : null}
                                    {item.requirements ? <div className="job-requirements">Requirements: {item.requirements}</div> : null}

                                    <div className="job-footer">
                                        <span className="job-posted">Posted by {item.postedBy || "Admin"}</span>
                                        {item.applyLink ? (
                                            <a href={item.applyLink} target="_blank" rel="noreferrer" className="btn btn-viewall btn-apply">
                                                Apply <i className="bi bi-box-arrow-up-right"></i>
                                            </a>
                                        ) : (
                                            <button className="btn btn-viewall btn-apply" onClick={() => alert("No apply link provided.")}>
                                                Apply <i className="bi bi-box-arrow-up-right"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ fontFamily: "sans-serif", color: "var(--text-muted)", fontSize: "14px", padding: "20px 0" }}>
                                No jobs found matching your criteria.
                            </div>
                        )}
                    </main>

                    <div className={`modal-overlay ${showmodal ? "show" : ""}`} onClick={() => setshowmodal(false)}>
                        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setshowmodal(false)} aria-label="Close">&times;</button>
                            <div className="modal-title">Post a New Job</div>

                            <label className="form-label-custom">Job Title <span className="required-star">*</span></label>
                            <input type="text" className="form-control-custom" value={title} onChange={(e) => settitle(e.target.value)} placeholder="e.g. Software Engineer" />

                            <label className="form-label-custom">Company <span className="required-star">*</span></label>
                            <input type="text" className="form-control-custom" value={company} onChange={(e) => setcompany(e.target.value)} placeholder="Company name" />

                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="form-label-custom">Location</label>
                                    <input type="text" className="form-control-custom" value={location} onChange={(e) => setlocation(e.target.value)} placeholder="City, Country" style={{ marginBottom: "0" }} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label-custom">Type</label>
                                    <select className="form-control-custom form-select-custom" value={type} onChange={(e) => settype(e.target.value)} style={{ marginBottom: "0" }}>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginTop: "16px" }}>
                                <label className="form-label-custom">Description <span className="required-star">*</span></label>
                                <textarea className="form-control-custom" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Job description"></textarea>
                            </div>

                            <label className="form-label-custom">Requirements</label>
                            <textarea className="form-control-custom" value={requirements} onChange={(e) => setrequirements(e.target.value)} placeholder="Job requirements"></textarea>

                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="form-label-custom">Salary Range</label>
                                    <input type="text" className="form-control-custom" value={salary} onChange={(e) => setsalary(e.target.value)} placeholder="e.g. $80k-$120k" style={{ marginBottom: "0" }} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label-custom">Apply Link</label>
                                    <input type="url" className="form-control-custom" value={applylink} onChange={(e) => setapplylink(e.target.value)} placeholder="https://..." style={{ marginBottom: "0" }} />
                                </div>
                            </div>

                            <button className="btn btn-viewall btn-submit-job" onClick={submitjob} style={{ marginTop: "16px" }}>Post Job</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
