import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {toast} from 'sonner'

export const useDBConnection = () => {
  const navigate = useNavigate()
  const {connectionId} = useParams();
  const [err, setErr] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleDisconnection = (_event: any, data: { connectionId: string, error: string }) => {
      if (data.connectionId === connectionId) {
        // Show error notification
        toast.error('Database connection lost. Redirecting to home...')
        setErr(data.error);
      }
    }

    // Listen for disconnection events
    window.electron.ipcRenderer.on('database-disconnected', handleDisconnection)

    return () => {
      // Clean up listener
      window.electron.ipcRenderer.on('database-disconnected', handleDisconnection)
      setErr(undefined)
    }
  }, [connectionId])

  return {err}
}