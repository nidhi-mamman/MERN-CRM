import { Link } from "react-router-dom"

export const Homepage = () => {
    return (

        <>

            <div className="container-fluid header position-fixed top-0 z-2 ">
                <div className="container">
                    <div className="row py-3 d-flex align-items-center justify-content-between">
                        <div className="col-auto fw-bold" >AlumNet </div>
                        <div className="col-auto d-flex justify-content-end gap-1"><Link to="/login" className="btn btn-viewall">Sign in</Link><Link to="/register" className="btn btn-viewall">Join Network</Link></div>

                    </div>
                </div>
            </div>

            <div className="container-fluid hero-bg ">
                <div className="row hero-bg-color d-flex align-items-center justify-content-between "> 

                    <div className="col-lg-5 pt-5 hero-content"><p className="top-heading">Alumni Network Platform</p>
                        <h1><span className="text-white">Where Graduates</span><br></br>
                           <span className="heading-bottom">Stay Connected</span> </h1>
                        <p className="text-white " style={{fontSize:"18px"}}>Reconnect with classmates, discover career opportunities, and stay engaged with your alma mater through our unified alumni platform.</p>
                        <Link to="/register" className="btn btn-viewall">Join the Network  <span className="ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-3 h-3 ml-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span></Link> <Link to="/login" className="btn btn-viewall">Sign in</Link>
                    </div>
                    <div className="col-lg-6 pt-5 hero-images">
                        <div className="row d-flex justify-content-end">
                            <div className="col-lg-6 pb-3">
                                <img src="/assets/images/hero-right-1.jpeg" alt="Hero Image" className="img-fluid hero-img"  style={{height:"191px",width:"300px",borderRadius:"10px"}}/>
                                <div className="p-3 text-white herotext mt-2 " ><p className="m-0" style={{fontSize:"30px"}}>10k+</p>
                                <p className="m-0" style={{margin:"0px"}}>Active Alumni</p></div>

                            </div>
                            <div className="col-lg-6 pt-3">
                                <div className="p-3 text-white herotext mb-2 " ><p className="m-0" style={{fontSize:"30px"}}>500+</p>
                                <p className="m-0 " style={{margin:"0px"}}>Job Opportunities</p></div>
                                <img src="/assets/images/hero-right-2.webp" alt="Hero Image" className="img-fluid hero-img"  style={{height:"191px",width:"300px", borderRadius:"10px"}}/>
                                
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="container py-5 my-lg-5">
                <p className="m-0">What We Offer</p>
                <h2 className="m-0">Everything You Need to Stay Connected</h2>
                <div className="cards  d-flex  mt-4 gap-3">
                    
                          <Link to="/directory" className="card text-decoration-none text-dark">
                            <div className="card-body">
                                 <p className="main-icon-alumni"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6 text-alum-blue group-hover:text-alum-gold transition-colors duration-300" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg></p>
                        <h5>Alumni Directory</h5>
                        <p>Search and connect with fellow alumni across batches, departments, and locations.</p>
                            </div>
                       
                    </Link>
                          <Link to="/events" className="card text-decoration-none text-dark">
                            <div className="card-body">
                                 <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days w-6 h-6 text-alum-blue group-hover:text-alum-gold transition-colors duration-300" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg></p>
                        <h5>Events & Reunions</h5>
                        <p>Stay updated on upcoming meetups, webinars, and reunions. RSVP in one click.</p>
                            </div>
                       
                    </Link>
                          <Link to="/jobs" className="card text-decoration-none text-dark">
                            <div className="card-body">
                                 <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase w-6 h-6 text-alum-blue group-hover:text-alum-gold transition-colors duration-300" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg></p>
                        <h5>Job Opportunities</h5>
                        <p>Exclusive job opportunities posted by alumni for alumni. Grow your career.</p>
                            </div>
                       
                    </Link>
                          <Link to="/news" className="card text-decoration-none text-dark">
                            <div className="card-body">
                                 <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone w-6 h-6 text-alum-blue group-hover:text-alum-gold transition-colors duration-300" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg></p>
                        <h5>News & Updates</h5>
                        <p>Latest announcements, achievements, and institutional news all in one place.</p>
                            </div>
                       
                    </Link>
                   
                  
                  
                   
                </div>


            </div>
            <div className="readytoconnect text-center px-3 mt-5">
                <h2 className="text-white">Ready to Reconnect?</h2>
                <p className="my-4">Join thousands of alumni who are already building meaningful connections <br className="d-none d-md-inline"></br> through AlumNet.</p>
                <Link to="/register" className="btn btn-viewall">Get Started Today   <span className="ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-3 h-3 ml-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></span></Link>
            </div>
            <div className="container-fluid footmain ">
                <div className="container  py-4">
                    <div className=" foot ">
                      <p>Alumni</p>
                   <p>Alumni Management System. Built with care.</p>

                    </div>
                </div>
            </div>
                  
        </>
        
    )
}
