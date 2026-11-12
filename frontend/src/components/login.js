import { API_URL } from "../config";
import { useState } from "react"
import{Link, useNavigate} from "react-router-dom"

export const Login=()=>{

const [email,setemail]=useState("")
const [pass,setpass]=useState("")
const navigate=useNavigate()


const Login=async()=>{
    const data={Email:email,
Password:pass
    }
try{
    const response=await fetch(`${API_URL}/api/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
  
    if(response.ok){
        const result=await response.json()
        if(result.Statuscode===1){
            localStorage.setItem("userId", result.Data?.id || "")
            localStorage.setItem("userName", result.Data?.name || "")
            localStorage.setItem("userType", result.Data?.userType || "Alumni")
            alert(result.Msg)
            navigate("/admindash")
        }else if(result.Statuscode===3){
            localStorage.setItem("userId", result.Data?.id || "admin")
            localStorage.setItem("userName", result.Data?.name || "Admin")
            localStorage.setItem("userType", result.Data?.userType || "Admin")
            alert(result.Msg)
            navigate("/admindash")
        }
        else if(result.Statuscode===2){
            alert(result.Msg)
        }
        else{
            alert(result.Msg)
        }
    }
}
catch(error){
    console.error("Error occurred while logging in:", error);
}



}




    return(
          <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 form-reg" style={{padding:"40px 100px 0px"}}>
                        <Link to="/" className="btn btn-viewall">Back to Home</Link>
                        <h4 className="my-4">AlumniNet</h4>
                        <h3 className="mb-0">Welcome Back</h3>
                        <p className="">Sign in to access your alumni network</p>

                        <div >
                          
                            <label className="w-100 my-2"    ><p>Email</p>
                            <input type="email" onChange={(e)=>setemail(e.target.value)} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md" />
                            </label>
                            <label className="w-100 my-2"><p>Password</p>
                            <input type="password" onChange={(e)=>setpass(e.target.value)} className="flex w-100 border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 bg-transparent border-slate-200 focus:border-alum-blue focus:ring-1 focus:ring-alum-blue rounded-md" />
                           </label>
                           
                            <button className="btn btn-viewall w-100 py-2 rounded-md mt-4" onClick={Login}>Login</button>
                            <p className="mt-2">Create  an account? <Link to="/register" className="text-alum-blue hover:underline">Register</Link></p>
                        </div>




                    </div>
                    <div className="col-lg-6 bg-login-right p-0">
                        <div className="bg-reg-login-color">

                            <h2 className="text-white">"The connections I've made through AlumNet have been invaluable for my career growth."</h2>
                            <p className="text-white">- Class of 2020 Alumni</p>
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}
