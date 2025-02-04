import React from 'react'
import { Button } from './ui/button'
import { PowerIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import {actionsProxy} from '@/lib/action-proxy'
import {useDatabase} from '@/pages/database/slice/database-slice'

const DisconnectButton = () => {
  const navigate = useNavigate()
  const {connectionId} = useParams();

  if (!connectionId) {
    return null
  }

  const {mutateAsync: deleteConnection} = actionsProxy.deleteConnection.useMutation();

  const handleDisconnect = async () => {
    await deleteConnection({
      id: connectionId
    })
    navigate('/', {
      replace: true
    })
  }

  return (
    <Button
      variant="destructive"
      size={'icon'}
      className="size-8"
      onClick={handleDisconnect}
    >
      <PowerIcon />
    </Button>
  )
}

export default DisconnectButton
