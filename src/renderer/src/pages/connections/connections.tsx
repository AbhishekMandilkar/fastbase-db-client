import React from 'react'
import {ConnectionList} from './connection-list'
import CreateConnection from './create-connection'

const Connections = () => {
  return (
    <>
      <ConnectionList />
      <CreateConnection />
    </>
  )
}

export default Connections