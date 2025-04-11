import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { actionsProxy } from '@/lib/action-proxy'
import { useMutation } from '@tanstack/react-query'

export const useDBConnection = () => {
  const navigate = useNavigate()
  const { connectionId } = useParams()
  const [err, setErr] = useState<string | undefined>(undefined)

  const handleDisconnection = (_event: any, data: { connectionId: string; error: string }) => {
    if (data.connectionId === connectionId) {
      // Show error notification
      toast.error('Database connection lost. Redirecting to home...')
      setErr(data.error)
    }
  }

  const connectDatabase = useMutation({
    mutationFn: (connectionId: string) => actionsProxy.connectDatabase.invoke({ connectionId })
  })

  useEffect(() => {
    if (!connectionId) {
      return
    }
    connectDatabase.mutate(connectionId)
    // Listen for disconnection events
    window.electron.ipcRenderer.on('database-disconnected', handleDisconnection)

    return () => {
      // Clean up listener
      window.electron.ipcRenderer.on('database-disconnected', handleDisconnection)
      setErr(undefined)
    }
  }, [connectionId])

  return { err, ...connectDatabase }
}
