import RecentQueries from '@/components/database/recent-queries/recent-queries';
import SqlEditor from '@/components/database/sql-editor/sql-editor';
import {Outlet, useParams} from 'react-router';

function SqlQueriesView() {
  const {} = useParams();
  
  return (
    <div className="flex flex-1">
      <RecentQueries />
      <SqlEditor />
      <Outlet />
    </div>
  )
}

export default SqlQueriesView
