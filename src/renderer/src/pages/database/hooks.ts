import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setSelectedTable } from './slice/database-slice'
import { Connection } from 'src/shared/types'
import { setConnection } from './slice/database-slice'
import { useQuery } from '@tanstack/react-query'
import { actionsProxy } from '@/lib/action-proxy'
import {useParams} from 'react-router'

export const useDatabase = () => {
  const database = useSelector((state: RootState) => state.database)
  return database
}

export const useDatabaseDispatch = () => {
  const dispatch = useDispatch()
  return {
    handleSetConnection: (connection: Connection) => dispatch(setConnection(connection)),
    handleSetSelectedTable: (table: string) => dispatch(setSelectedTable(table))
  }
}
export const useSavedQueries = (connectionId: string) => {
  return actionsProxy.getQueries.useQuery({
    connectionId
  })
}

export const useConnections = () => {
  return actionsProxy.getConnections.useQuery()
}

export const useActiveConnectionId = () => {
  const { connectionId } = useParams();

  if (!connectionId) {
    throw new Error('No active connection id')
  }

  return connectionId
}
