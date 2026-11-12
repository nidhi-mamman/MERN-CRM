import { Router ,Route, Routes} from "react-router-dom"
import { Homepage } from "./homepage"
import { Login } from "./login"
import { Register } from "./register"
import { Admindash } from "./admindash"
import { Directory } from "./directory"
import { Events } from "./events"
import { Jobs } from "./jobs"
import { News } from "./news"
import { Profile } from "./profile"

export const Siteroutes=()=>{

return(
    <>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindash" element={<Admindash />} />
        <Route path='/directory' element={<Directory/>}/>
        <Route path="/events" element={<Events />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
)
}
