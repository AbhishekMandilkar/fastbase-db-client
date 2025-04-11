import React from 'react'
import { Button } from './ui/button'
import { PowerIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import {actionsProxy} from '@/lib/action-proxy'
import {useDatabase} from '@/pages/database/slice/database-slice'
import {useMutation} from '@tanstack/react-query'
import {Connection} from 'src/shared/schema/app-schema'

const DisconnectButton = () => {
  const navigate = useNavigate()
  const {connectionId} = useParams();

  if (!connectionId) {
    return null
  }

  const {mutateAsync: deleteConnection} = useMutation({
    mutationFn: (connectionId: Connection['id']) => actionsProxy.deleteConnection.invoke(connectionId)
  });

  const handleDisconnect = async () => {
    await deleteConnection(connectionId)
    navigate('/', {
      replace: true
    })
  }

  return (
    <Button
      variant="destructive"
      size={'icon'}
      className="size-8 cursor-pointer"
      onClick={handleDisconnect}
    >
      <PowerIcon />
    </Button>
  )
}

export default DisconnectButton
