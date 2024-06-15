'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='center-flex flex-col w-screen h-[calc(100vh-100px)] gap-10'>
            <h2 className='text-2xl font-bold'>Uh oh! Something went wrong!</h2>
            <button className='px-4 py-2 bg-blue-900 rounded-lg hover:bg-blue-950' onClick={() => reset()}>
                Try again
            </button>
        </div>
    )
}