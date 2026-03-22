import React, { useState, useRef } from 'react';

function LoadCDR() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle dropped files
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    // Handle file selection via button
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (<>
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upload CDR Data</h2>
                <p className="text-gray-500">Upload your CSV call records to begin analysis.</p>
            </div>

            {/* Drag and Drop Area */}
            <div 
                className={`relative p-12 border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {/* Hidden File Input */}
                <input 
                    ref={inputRef}
                    type="file" 
                    className="hidden" 
                    accept=".csv"
                    onChange={handleChange}
                />

                <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>

                <p className="text-lg font-medium text-gray-700">
                    {file ? file.name : "Drag and drop your file here"}
                </p>
                <p className="text-sm text-gray-400 mb-6">Only .csv files are supported</p>

                <button 
                    onClick={onButtonClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md active:scale-95"
                >
                    Select File
                </button>
            </div>
            <h1>TestS</h1>

            {/* Action Footer */}
            {file && (
                <div className="mt-6 flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                    <span className="text-green-700 text-sm font-medium">Ready to process: {file.name}</span>
                    <button 
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                        onClick={() => setFile(null)}
                    >
                        Remove
                    </button>
                    
                </div>
            )}
           
           
        </div>
        <div>
           <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-4 transition-all shadow-md active:scale-95"
                >
                    Load to DB
                </button>
        </div>
    </>
        
        
    );
}

export default LoadCDR;