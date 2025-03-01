import {AppSidebar} from '@/components/app-sidebar'
import {Outlet, useNavigate, useParams} from 'react-router'
import ErrorBoundary from '@/components/error-boundry'
import DatabaseError from './database-error'
import useConnectDatabase from './hooks/use-connect-database'
import {Loader2} from 'lucide-react'
import {useDBConnection} from './hooks/use-db-connection'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Database = () => {

  const {err} = useDBConnection()
  const nav = useNavigate();

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
        {err && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Database Disconnected!</AlertDialogTitle>
                <AlertDialogDescription className='max-w-[90%] text-wrap'>
                  {err || `Something went wrong`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => nav('/')}>Ok</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    )
}

export default Database