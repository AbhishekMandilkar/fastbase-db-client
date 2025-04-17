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

  const {err, isPending} = useDBConnection()
  const nav = useNavigate();

    return (
      <div className="flex w-full">
        <div className='flex w-full'>
          <AppSidebar className='h-full' />
          <ErrorBoundary
            fallback={(error, errorInfo) => <DatabaseError error={error} errorInfo={errorInfo} />}
          >
            {isPending ? <div>Loading...</div> : <Outlet />}
          </ErrorBoundary>
        </div>
        {err && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Database Disconnected!</AlertDialogTitle>
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