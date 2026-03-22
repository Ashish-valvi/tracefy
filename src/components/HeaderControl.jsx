import React, { useState } from 'react';
import { HeaderObject } from "./extraData.js";

function HeaderControl() {
    const [checkedItems, setCheckedItems] = useState(
        Object.keys(HeaderObject).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    const handleCheckboxChange = (key) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <>
        <div className="p-6 bg-white min-h-100">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
                
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Filter Columns</h1>
                    <button 
                        onClick={() => console.log("Active Filters:", checkedItems)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Grid Layout: Responsively switches from 1 column to 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(HeaderObject).map((key) => (
                        <div 
                            key={key} 
                            className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                                checkedItems[key] ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'
                            }`}
                        >
                            <input 
                                type="checkbox" 
                                id={key} 
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                checked={checkedItems[key]} 
                                onChange={() => handleCheckboxChange(key)} 
                            />
                            <label 
                                htmlFor={key} 
                                className="ml-3 text-sm font-medium text-gray-700 cursor-pointer select-none truncate"
                                title={key} // Shows full name on hover
                            >
                                {key}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
          
        </div>
        </>
    );
}

export default HeaderControl;