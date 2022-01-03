import React from 'react'

export default function InputField(props) {
    const { id, label, type, name, error, onInput, readOnly, initialValue } = props;
    const [value, setValue] = React.useState(initialValue)
    return (
        <div className="mb-4">
            <label className="block mb-1" htmlFor={id}>
                {label}
            </label>
            <input
            id={id}
            type={type}
            name={name}
            readOnly={readOnly ?? false}
            value={initialValue}
            className={`py-2 px-3 border border-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full ${error && 'border-red-500'}`}
            onChange={(e) => onInput(e.target.value)}
            />
            {
                error && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {error}
                </span>
            }
        </div>
    )
}
