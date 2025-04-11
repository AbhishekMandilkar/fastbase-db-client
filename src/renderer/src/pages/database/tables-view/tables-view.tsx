
import TableList from '@/components/database/table-list/table-list'
import ErrorBoundary from '@/components/error-boundry'
import {Outlet, useParams} from 'react-router'
import DatabaseError from '../database-error'
const TablesView = () => {
  const {tableName} = useParams();
  return (
    <div className={`flex flex-1 h-screen overflow-y-hidden min-w-[calc(100vw-3rem)]`}>
      <TableList />
      <ErrorBoundary
        key={tableName}
        fallback={(err, errInfo) => <DatabaseError error={err} errorInfo={errInfo} />}
      >
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}

export default TablesView