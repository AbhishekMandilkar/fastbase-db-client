import useSqlQuery from '../../hooks/use-sql-query';
import {useParams} from 'react-router';
import {useDatabase} from '@/pages/database/slice/database-slice';
import {useQuery} from '@tanstack/react-query';

const TableActionView = () => {
  const {handleQuery, isPending} = useSqlQuery();
  const {tableName} = useParams();
  const {selectedSchema} = useDatabase();
 
  const {data: totalRows} = useQuery({
    queryKey: ['total-rows', tableName, selectedSchema],
    queryFn: () => handleQuery(`SELECT COUNT(*) FROM "${selectedSchema}"."${tableName}"`)
  })

  const totalRowsCount = totalRows?.[0]?.rows[0]?.count as string;

  return (
    <div className="flex items-center space-x-2">
      {totalRows && (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
          Total Rows: {totalRowsCount}
        </code>
      )}
    </div>
  )
}

export default TableActionView