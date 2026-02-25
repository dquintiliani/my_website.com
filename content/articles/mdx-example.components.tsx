'use client'

import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6 text-center">
      <p className="text-lg font-semibold mb-4">Interactive Counter</p>
      <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increase
        </button>
      </div>
    </div>
  )
}

export const InfoBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-lg p-4 my-4">
    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">{title}</h4>
    <div className="text-amber-800 dark:text-amber-200">{children}</div>
  </div>
)
