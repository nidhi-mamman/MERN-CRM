import { API_URL } from "../config";
import { useEffect, useState } from "react"
import { Navbar } from "./navbar"

export const Profile = () => {
    const [profile, setProfile] = useState({
        Name: "",
        Email: "",
        Department: "",
        BatchYear: "",
    })
    const [initialProfile, setInitialProfile] = useState(profile)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [readonly, setReadonly] = useState(true)
    const [status, setStatus] = useState("")
    const userId = localStorage.getItem("userId")

    const loadProfile = async () => {
        if (!userId) {
            setStatus("You need to login to see your profile.")
            return
        }

        if (userId === "admin") {
            const adminProfile = {
                Name: localStorage.getItem("userName") || "Admin",
                Email: "",
                Department: "",
                BatchYear: "",
            }
            setProfile(adminProfile)
            setInitialProfile(adminProfile)
            return
        }

        try {
            const res = await fetch(`${API_URL}/api/users/${userId}`)
            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    const data = result.Data
                    setProfile({
                        Name: data.Name || "",
                        Email: data.Email || "",
                        Department: data.Department || "",
                        BatchYear: data.BatchYear || "",
                    })
                    setInitialProfile({
                        Name: data.Name || "",
                        Email: data.Email || "",
                        Department: data.Department || "",
                        BatchYear: data.BatchYear || "",
                    })
                } else {
                    setStatus(result.Msg || "Unable to load profile.")
                }
            }
        } catch (error) {
            setStatus("Error loading profile. Please try again.")
            console.error(error)
        }
    }

    useEffect(() => {
        loadProfile()
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProfile((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditClick = () => {
        setStatus("")
        setReadonly(false)
    }

    const handleCancel = () => {
        setProfile(initialProfile)
        setNewPassword("")
        setConfirmPassword("")
        setReadonly(true)
        setStatus("")
    }

    const handleSave = async () => {
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setStatus("Passwords do not match.")
                return
            }
        }

        if (userId === "admin") {
            setInitialProfile(profile)
            setNewPassword("")
            setConfirmPassword("")
            setReadonly(true)
            setStatus("Admin profile updated locally.")
            return
        }

        try {
            const payload = { ...profile }
            if (newPassword) {
                payload.Password = newPassword
            }

            const res = await fetch(`${API_URL}/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                const result = await res.json()
                if (result.Statuscode === 1) {
                    setInitialProfile(result.Data)
                    setProfile({
                        Name: result.Data.Name || "",
                        Email: result.Data.Email || "",
                        Department: result.Data.Department || "",
                        BatchYear: result.Data.BatchYear || "",
                    })
                    setReadonly(true)
                    setStatus("Profile updated successfully.")
                } else {
                    setStatus(result.Msg || "Could not update profile.")
                }
            }
        } catch (error) {
            setStatus("Error updating profile. Please try again.")
            console.error(error)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <Navbar />
                </div>
                <div className="col-lg-10 right-panel">
                    <main>
                        <div className="page-label">Profile</div>
                        <h1 className="page-title">My Profile</h1>
                        <p className="page-subtitle">Your alumni profile details are shown below. Click Update Profile to make changes.</p>

                        <div className="profile-card">
                            <div className="profile-grid">
                                <div className="profile-field">
                                    <label htmlFor="Name">Full Name</label>
                                    <input
                                        id="Name"
                                        name="Name"
                                        value={profile.Name}
                                        onChange={handleInputChange}
                                        readOnly={readonly}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label htmlFor="Email">Email Address</label>
                                    <input
                                        id="Email"
                                        name="Email"
                                        type="email"
                                        value={profile.Email}
                                        onChange={handleInputChange}
                                        readOnly={readonly}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label htmlFor="Department">Department</label>
                                    <input
                                        id="Department"
                                        name="Department"
                                        value={profile.Department}
                                        onChange={handleInputChange}
                                        readOnly={readonly}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label htmlFor="BatchYear">Batch Year</label>
                                    <input
                                        id="BatchYear"
                                        name="BatchYear"
                                        value={profile.BatchYear}
                                        onChange={handleInputChange}
                                        readOnly={readonly}
                                    />
                                </div>
                            </div>

                            <div className="profile-grid" style={{ marginTop: "20px" }}>
                                <div className="profile-field">
                                    <label htmlFor="NewPassword">New Password</label>
                                    <input
                                        id="NewPassword"
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        readOnly={readonly}
                                        placeholder={readonly ? "********" : "Enter new password"}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                                    <input
                                        id="ConfirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        readOnly={readonly}
                                        placeholder={readonly ? "********" : "Repeat new password"}
                                    />
                                </div>
                            </div>

                            <div className="profile-actions">
                                {readonly ? (
                                    <button className="btn btn-viewall" type="button" onClick={handleEditClick}>
                                        Update Profile
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-viewall" type="button" onClick={handleSave}>
                                            Save Changes
                                        </button>
                                        <button className="btn btn-template-disabled" type="button" onClick={handleCancel}>
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>

                            {status ? <p className="profile-status">{status}</p> : null}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
