import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../api/api";

function EditProfile() {
    const { isLoggedIn, user, getUserById } = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username);
    const [collegeName, setCollegeName] = useState(user?.collegeName || "");
    const [thaparEmail, setThaparEmail] = useState(user?.thaparEmail);
    const [email, setEmail] = useState(user?.email);
    // const [password, setPassword] = useState(user?.password);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [rollNo, setRollNo] = useState(user?.rollNo);
    const [year, setYear] = useState(user?.year);  // State for year selection
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn])

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Call register function from context
        const result = await api.patch(`/users/${user.id}`, { username, collegeName, thaparEmail, email, phoneNumber, rollNo, year });
        // console.log(result);

        // Handle response
        if (result) {
            toast.success("Profile Updated successful!");
            getUserById(user.id);
            navigate("/profile");
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6">Update Your Profile</h1>

                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-lg font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter Your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* College Name */}
                    <div>
                        <label htmlFor="collegeName" className="block text-lg font-semibold mb-2">College Name</label>
                        <input
                            type="text"
                            id="collegeName"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Thapar University"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Thapar Email */}
                    <div>
                        <label htmlFor="thaparEmail" className="block text-lg font-semibold mb-2">Thapar Email</label>
                        <input
                            type="email"
                            id="thaparEmail"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="john1@thapar.edu"
                            value={thaparEmail}
                            onChange={(e) => setThaparEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="mail1@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="123256780"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Roll Number */}
                    <div>
                        <label htmlFor="rollNo" className="block text-lg font-semibold mb-2">Roll Number</label>
                        <input
                            type="text"
                            id="rollNo"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="102"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            required
                        />
                    </div>

                    {/* Year Dropdown */}
                    <div>
                        <label htmlFor="year" className="block text-lg font-semibold mb-2">Year</label>
                        <select
                            id="year"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    {/* Password */}
                    {/* <div>
                        <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="w-full mt-4 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
