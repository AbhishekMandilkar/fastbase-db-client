import {Button} from './ui/button'
import {PowerIcon} from 'lucide-react'
import {useNavigate, useParams} from 'react-router'
import {actionsProxy} from '@/lib/action-proxy'
import {useMutation} from '@tanstack/react-query'
import {Connection} from 'src/shared/schema/app-schema'

const DisconnectButton = () => {
  const navigate = useNavigate()
  const {connectionId} = useParams();

  if (!connectionId) {
    return null
  }

  const {mutateAsync: disconnectDatabase} = useMutation({
    mutationFn: (connectionId: Connection['id']) => actionsProxy.disconnectDatabase.invoke({connectionId})
  });

  const handleDisconnect = async () => {
    await disconnectDatabase(connectionId)
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
