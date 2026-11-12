import { API_URL } from "../config";
import { useEffect, useMemo, useState } from "react"
import { Navbar } from "./navbar"

export const Directory=()=>{
    const [users,setusers]=useState([])
    const [search,setsearch]=useState("")
    const [department,setdepartment]=useState("")
    const [batchyear,setbatchyear]=useState("")

    const getusers=async()=>{
        try{
            const res=await fetch(`${API_URL}/api/users`)
            if(res.ok){
                const result=await res.json()
                if(result.Statuscode===1){
                    setusers(result.Data || [])
                }else{
                    alert(result.Msg)
                }
            }
        }
        catch(error){
            console.error("Error fetching users:", error)
        }
    }

    useEffect(()=>{
        getusers()
    },[])

    const departments=useMemo(()=>{
        return [...new Set(users.map((item)=>item.Department).filter(Boolean))]
    },[users])

    const batchyears=useMemo(()=>{
        return [...new Set(users.map((item)=>item.BatchYear).filter(Boolean))].sort()
    },[users])

    const filteredusers=useMemo(()=>{
        return users.filter((item)=>{
            const searchvalue=search.toLowerCase()
            const searchmatch=
                !searchvalue ||
                item.Name?.toLowerCase().includes(searchvalue) ||
                item.Email?.toLowerCase().includes(searchvalue) ||
                item.Department?.toLowerCase().includes(searchvalue) ||
                item.BatchYear?.toLowerCase().includes(searchvalue)

            const departmentmatch=!department || item.Department===department
            const batchmatch=!batchyear || item.BatchYear===batchyear

            return searchmatch && departmentmatch && batchmatch
        })
    },[users,search,department,batchyear])

    return(
        <>
        <div className="container-fluid">
            <div className="row">

                <div className="col-lg-2"> 
                    <Navbar/>
                </div>
                <div className="col-lg-10 right-panel">
                    <main>
                        <div className="page-label">Directory</div>
                        <h2 className="page-title">Alumni Directory</h2>
                        <p className="page-subtitle">Search and connect with fellow alumni.</p>

                        <div className="row g-2 mb-4">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-7">
                                <div className="search-wrap">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"/>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, department, or batch..."
                                        value={search}
                                        onChange={(e)=>setsearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-md-3">
                                <select className="filter-select" value={department} onChange={(e)=>setdepartment(e.target.value)}>
                                    <option value="">Department</option>
                                    {departments.map((item)=>(
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6 col-sm-6 col-md-3">
                                <select className="filter-select" value={batchyear} onChange={(e)=>setbatchyear(e.target.value)}>
                                    <option value="">Batch Year</option>
                                    {batchyears.map((item)=>(
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row g-3" id="alumniGrid">
                            {filteredusers.length>0 ? filteredusers.map((item)=>(
                                <div className="col-12 col-md-6 col-lg-4 alumni-col" key={item._id}>
                                    <div className="alumni-card">
                                        <div className="card-avatar">{item.Name ? item.Name.charAt(0).toUpperCase() : "A"}</div>
                                        <div>
                                            <div className="card-name">{item.Name}</div>
                                            <div style={{fontSize:"13px", color:"var(--text-muted)"}}>{item.Email}</div>
                                            <div style={{fontSize:"13px", color:"var(--text-muted)"}}>
                                                {item.Department || "Department not added"} {item.BatchYear ? `• ${item.BatchYear}` : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )):(
                                <div style={{fontFamily:"sans-serif", color:"var(--text-muted)", fontSize:"14px", padding:"20px 12px"}}>
                                    No alumni found matching your filters.
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
        </>
    )
}
