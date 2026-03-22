import React, { useState } from 'react';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', mobile: '', email: '', 
        password: '', department: '', rank: '', terms: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLogin ? "Logging in..." : "Signing up...", formData);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all">
            {/* Toggle Header */}
            <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-xl">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                >
                    Sign Up
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
                {isLogin ? "Please enter your details to sign in." : "Fill in the information below to register."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600 mb-1">First Name</label>
                                <input name="firstName" type="text" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                                <input name="lastName" type="text" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" required />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-600 mb-1">Mobile Number</label>
                            <input name="mobile" type="tel" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600 mb-1">Department</label>
                                <input name="department" type="text" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600 mb-1">Rank</label>
                                <input name="rank" type="text" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1">Email ID</label>
                    <input name="email" type="email" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" required />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-600 mb-1">Password</label>
                    <input name="password" type="password" onChange={handleInputChange} className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50" required />
                </div>

                {!isLogin && (
                    <div className="flex items-center gap-2 mt-2">
                        <input name="terms" type="checkbox" onChange={handleInputChange} className="w-4 h-4 rounded text-blue-600 cursor-pointer" required />
                        <label className="text-xs text-gray-500">I agree to the Terms and Conditions</label>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-4 transition-all shadow-md active:scale-95"
                >
                    {isLogin ? "Log In" : "Create Account"}
                </button>
            </form>
        </div>
    );
}

export default Login;