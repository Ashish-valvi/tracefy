import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        type: 'message', // 'message' or 'feature'
        subject: '',
        content: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert(`Thank you! Your ${formData.type} has been sent.`);
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row gap-8 p-4">
            
            {/* Left Column: Interactive Form */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                <p className="text-gray-500 mb-6 text-sm">Have a question or a suggestion for a new feature?</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex gap-4 p-1 bg-gray-100 rounded-lg mb-4">
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'message'})}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${formData.type === 'message' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                        >
                            Send Message
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'feature'})}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${formData.type === 'feature' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                        >
                            Request Feature
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1">Subject</label>
                        <input 
                            type="text" 
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50"
                            placeholder={formData.type === 'feature' ? "What feature should we add?" : "How can we help?"}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-600 mb-1">Details</label>
                        <textarea 
                            rows="5"
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50"
                            placeholder="Write your message here..."
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
                    >
                        {formData.type === 'feature' ? "Submit Request" : "Send Message"}
                    </button>
                </form>
            </div>

            {/* Right Column: About & Developer Info */}
            <div className="w-full md:w-80 space-y-6">
                
                {/* Software Info Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-600 text-white p-2 rounded-lg font-black text-xl">T</div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Tracefy</h3>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">v1.0</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Advanced CDR analysis tool designed for speed, security, and deep data insights.
                    </p>
                    <a 
                        href="https://www.valvi.io/tracefy" 
                        target="_blank" 
                        rel="noreferrer"
                        className="block text-center text-sm font-bold text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Download Latest
                    </a>
                </div>

                {/* Developer Info Card */}
                <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Developers</h3>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm font-medium">Ashish Valvi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm font-medium">Aryan Valvi</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 space-y-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase">Support Email</span>
                            <a href="mailto:ashishvalvi300@gmail.com" className="text-sm hover:text-blue-400 truncate">ashishvalvi300@gmail.com</a>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase">Domain</span>
                            <a href="https://www.valvi.io" target="_blank" rel="noreferrer" className="text-sm hover:text-blue-400">www.valvi.io</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ContactUs;