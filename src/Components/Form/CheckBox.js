import React from 'react'

export default function CheckBox(props) {

    const {labelText, id, checked, onInput} = props;

    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                onChange={(e) => onInput(e.target.checked)}
                checked={checked}
                className="border border-gray-300 text-red-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label
                htmlFor={id}
                className="ml-2 block text-sm leading-5 text-gray-900"
            >
                {labelText}
            </label>
        </div>
    )
}
