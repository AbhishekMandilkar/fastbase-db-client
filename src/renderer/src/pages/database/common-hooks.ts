import {actionsProxy} from '@/lib/action-proxy'
import {useParams} from 'react-router'


export const useSavedQueries = (connectionId: string) => {
  return actionsProxy.getQueries.useQuery({
    connectionId
  })
}

export const useConnections = () => {
  return actionsProxy.getConnections.useQuery()
}

export const useActiveConnection = () => {
  const { connectionId } = useParams();

  if (!connectionId) {
    throw new Error('No active connection id')
  }

  return actionsProxy.connectDatabase.useQuery({ connectionId })
}

