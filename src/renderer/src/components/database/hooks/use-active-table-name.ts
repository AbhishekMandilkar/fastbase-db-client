import React from 'react'
import {useParams} from 'react-router'

const useActiveTableName = () => {
  const {tableName} = useParams()

  if (!tableName) {
    throw new Error('No table name found')
    
  }

  return tableName
}

export default useActiveTableName