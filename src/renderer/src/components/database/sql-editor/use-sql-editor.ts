import { useState } from 'react'
import { useTheme } from 'next-themes'
import {actionsProxy} from '@/lib/action-proxy'
import {useActiveConnectionId} from '@/pages/database/hooks'
import {QueryDatabaseResult} from 'src/shared/types'

const useSqlEditor = () => {
  const [code, setCode] = useState(`SELECT * FROM users`);
  const [results, setResults] = useState<QueryDatabaseResult[]>([]);
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { mutateAsync: queryDatabase, isPending } = actionsProxy.queryDatabase.useMutation();
  const activeConnectionId = useActiveConnectionId();


  const handleRunQuery = async () => {
    const resp = await queryDatabase({
      connectionId: activeConnectionId,
      query: code
    })
    console.info(resp)
    setResults(resp);
  }

  return {
    code,
    setCode,
    isDarkMode,
    handleRunQuery,
    isPending,
    results,
  }
}

export default useSqlEditor
