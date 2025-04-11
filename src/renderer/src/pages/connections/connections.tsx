
import {ConnectionList} from './connection-list'
import CreateConnection from './create-connection'

const Connections = () => {
  return (
    <div className="flex h-full w-full">
      <ConnectionList />
      <CreateConnection />
    </div>
  )
}

export default Connections