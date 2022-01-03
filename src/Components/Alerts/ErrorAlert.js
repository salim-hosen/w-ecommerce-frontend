import React from 'react'

export default function ErrorAlert(props) {
    return (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span className="font-medium">Error!</span> {props.message}
        </div>
    )
}
