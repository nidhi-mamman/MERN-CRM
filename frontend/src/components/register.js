import { API_URL } from "../config";

import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"


export const Register = () => {

const [name,setname]=useState("")
const [email,setemail]=useState("")
const [pass,setpass]=useState("")
const [cpass,setcpass]=useState("")
const [department,setdepartment]=useState("")
const [batchyear,setbatchyear]=useState("")

const resetform=()=>{
    setname("")
    setemail("")
    setdepartment("")
    setbatchyear("")
    setpass("")
    setcpass("")
}


const Submit=async(e)=>{
    e.preventDefault()
if(pass!==cpass){
    alert("Passwords do not match")
    return
}else{
try{
    const data={Name:name,Email:email,Password:pass,Department:department,BatchYear:batchyear}
    const res=await fetch(`${API_URL}/api/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })


    if(res.ok){
    const result=await res.json()
    if(result.Statuscode===1){
        alert(result.Msg)
        resetform()
    }else if(result.Statuscode===2){
        alert(result.Msg)
    }
    else{
        alert(result.Msg)
    }
    }
}
catch(error){
    console.error("Error:", error)
}
}






}





    return (
        <>
        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 form-reg">
                        <Link to="/" className="btn btn-viewall">Back to Home</Link>
                        <h4 className="my-4">AlumniNet</h4>
                        <h3 className="mb-0">Join AlumNet</h3>
                        <p className="">Create your account to connect with alumni.</p>

                        <div >
                            <label className="w-100 my-2"><p>Full Name</p>
                            <input type="text" value={name} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md"  onChange={(e)=>setname(e.target.value)} />
                           </label>
                            <label className="w-100 my-2"    ><p>Email</p>
                            <input type="email" value={email} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md"  onChange={(e)=>setemail(e.target.value)} />
                            </label>
                            <label className="w-100 my-2"><p>Department</p>
                            <select value={department} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md" onChange={(e)=>setdepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Business">Business</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Arts">Arts</option>
                            </select>
                            </label>
                            <label className="w-100 my-2"><p>Batch Year</p>
                            <select value={batchyear} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md" onChange={(e)=>setbatchyear(e.target.value)}>
                                <option value="">Select Batch Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                            </label>
                            <label className="w-100 my-2"><p>Password</p>
                            <input type="password" value={pass} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md"  onChange={(e)=>setpass(e.target.value)} />
                           </label>
                            <label className="w-100 my-2"><p>Confirm Password</p>
                            <input type="password" value={cpass} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md"  onChange={(e)=>setcpass(e.target.value)} />
                            </label>
                            <button className="btn btn-viewall w-100 py-2 rounded-md mt-4" onClick={Submit}>Register</button>
                            <p className="mt-2">Already have an account? <Link to="/login" className="text-alum-blue hover:underline">Login here</Link></p>
                        </div>




                    </div>
                    <div className="col-lg-6 d-none d-lg-block bg-reg-right p-0">
                        <div className="bg-reg-right-color">

                            <h2 className="text-white">Building bridges between your past and future.</h2>
                            <p className="text-white">Join a thriving community of professionals.</p>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}
