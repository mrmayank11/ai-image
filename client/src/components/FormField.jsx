import React from 'react'

const FormField = ({ labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe }) => {
    return (
        <div className='py-3 my-2'>
            <div className=' flex mb-1 gap-2 '>
                <p className=' text-gray-600 text-md'>{labelName}</p>
                {isSurpriseMe && (
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="font-semibold text-xs bg-slate-200 py-1 px-2 rounded-[5px] text-black"
                    >
                        Surprise me
                    </button>
                )}
            </div>

            <input
                type={type}
                id={name}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#6469ff] outline-none block w-full p-3 "
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    )
}

export default FormField