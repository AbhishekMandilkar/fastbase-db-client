import SidebarListing from '@/components/ui/sidebar-listing'
import React from 'react'

const RecentQueries = () => {
  return (
    <SidebarListing
      title="Recent Queries"
      renderItem={() => <div>Recent Queries</div>}
      items={[]}
    />
  )
}

export default RecentQueries