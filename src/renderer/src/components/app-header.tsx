import React from 'react'

const AppHeader = (props: { title: string; right?: React.ReactNode }) => {
  return (
    <div className=" flex justify-between items-center space-x-2 px-4 py-2 border-b">
      <h2 className="text-lg font-semibold">{props.title}</h2>
      <div className="ml-auto flex space-x-2 sm:justify-end">{props.right}</div>
    </div>
  )
}

export default AppHeader