import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Edit2, LogOut, User, Mail, Lock, Camera, Save } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const email = localStorage.getItem('email');

    // Logout function
    const logout = () => {
        localStorage.removeItem('email');
        alert("Profile logged out");
        navigate('/login');
    };

    useEffect(() => {
        if (email) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://ds-movie-afba.onrender.com/profile/${email}`);
                    setProfile(response.data);
                    setEditedProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    navigate('/login');
                }
            };
            fetchUserData();
        } else {
            setProfile(null);
            navigate('/login');
        }
    }, [email, navigate]);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle edit mode
    const toggleEdit = () => {
        if (isEditing) {
            // Save changes
            axios.put(`https://ds-movie-afba.onrender.com/profile/${email}`, editedProfile)
                .then(() => {
                    setProfile(editedProfile);
                    setIsEditing(false);
                    alert('Profile updated successfully');
                })
                .catch(error => {
                    console.error('Error updating profile:', error);
                    alert('Failed to update profile');
                });
        } else {
            // Enter edit mode
            setIsEditing(true);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Profile Header */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center overflow-hidden">
                                    <User className="h-16 w-16 text-gray-400" />
                                </div>
                                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors">
                                    <Camera className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-6 text-center">
                        <h2 className="text-2xl font-bold text-white mb-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProfile.name}
                                    onChange={handleChange}
                                    className="bg-gray-700 text-white px-3 py-1 rounded-md text-center"
                                />
                            ) : (
                                profile.name || 'User Profile'
                            )}
                        </h2>
                        <p className="text-gray-400">Member since 2024</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Personal Information */}
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <User className="h-5 w-5 mr-2 text-blue-500" />
                            Personal Information
                        </h3>
                        
                        <div className="space-y-6">
                            {/* Email Field (Unchangeable) */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-400">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Address
                                </label>
                                <div className="bg-gray-700/50 rounded-xl px-4 py-3 text-gray-100">
                                    {email}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-400">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Password
                                </label>
                                <div className="relative">
                                    {isEditing ? (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={editedProfile.password}
                                            onChange={handleChange}
                                            className="bg-gray-700 text-white px-4 py-3 rounded-xl w-full"
                                        />
                                    ) : (
                                        <div className="bg-gray-700/50 rounded-xl px-4 py-3 text-gray-100 pr-12">
                                            {showPassword ? profile.password : '••••••••'}
                                        </div>
                                    )}
                                    <button
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <Edit2 className="h-5 w-5 mr-2 text-blue-500" />
                            Account Actions
                        </h3>
                        
                        <div className="space-y-4">
                            <button 
                                onClick={toggleEdit}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center font-medium"
                            >
                                {isEditing ? <Save className="h-5 w-5 mr-2" /> : <Edit2 className="h-5 w-5 mr-2" />}
                                {isEditing ? "Save Changes" : "Edit Profile"}
                            </button>
                            
                            <button 
                                onClick={logout} 
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25 flex items-center justify-center font-medium"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
