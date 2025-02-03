import {AppSidebar} from '@/components/app-sidebar'
import Breadcrumbs from '@/components/breadcrumbs'
import {Outlet} from 'react-router'

const Database = () => {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <Outlet />
    </div>
  )
}

export default Database