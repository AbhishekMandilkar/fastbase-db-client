import { actionsProxy } from '@/lib/action-proxy'
import { useQuery } from '@tanstack/react-query'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import {useDatabaseDispatch} from '../slice/database-slice'
import {toast} from 'sonner'

const useConnectDatabase = () => {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (connectionId: string) => {
    try {
      setIsConnecting(true)
      await actionsProxy.connectDatabase.invoke({ connectionId })
      return {success: true}
    } catch (error) {
      toast.error('Failed to connect to database', {
        description: error instanceof Error ? error.message : 'Unknown error'
      })
      return {success: false}
    } finally {
      setIsConnecting(false)
    }
  }

  return { handleConnect, isConnecting }
}

export default useConnectDatabase
