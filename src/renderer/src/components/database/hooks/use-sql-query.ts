import { actionsProxy } from '@/lib/action-proxy'
import React from 'react'
import { useParams } from 'react-router'

const useSqlQuery = () => {
  const { mutateAsync: queryDatabase, isPending } = actionsProxy.queryDatabase.useMutation()
  const { connectionId } = useParams()

  if (!connectionId) {
    throw new Error('No connection id found')
  }

  const handleQuery = React.useCallback(
    async (query: string) => {
      const res = await queryDatabase({
        connectionId: connectionId,
        query: query
      })
      return res
    },
    []
  )

  return {
    handleQuery,
    isPending
  }
}

export default useSqlQuery
