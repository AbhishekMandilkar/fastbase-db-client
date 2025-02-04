import {AppSidebar} from '@/components/app-sidebar'
import {Outlet} from 'react-router'
import ErrorBoundary from '@/components/error-boundry'
import DatabaseError from './database-error'
import useConnectDatabase from './hooks/use-connect-database'
import {Loader2} from 'lucide-react'

const Database = () => {
    return (
      <div className="flex h-screen w-full">
        <>
            <AppSidebar />
            <ErrorBoundary
              fallback={(error, errorInfo) => <DatabaseError error={error} errorInfo={errorInfo} />}
            >
              <Outlet />
            </ErrorBoundary>
          </>
      </div>
    )
}

export default Database