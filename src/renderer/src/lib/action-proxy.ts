import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query'
import { queryClient } from './query-client'
import { ActionsProxy } from 'src/shared/lib/actions.d'

export const actionsProxy = new Proxy<ActionsProxy>({} as any, {
  get: (_, prop) => {
    const invoke = (input: any) => {
      console.log('invoke', prop.toString(), input)
      return window.electron.ipcRenderer.invoke(prop.toString(), input)
    }
    return {
      invoke,
    }
  }
})