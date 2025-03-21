
import 'immer'
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ColumnTypeNameMap, DatabaseSchema} from 'src/shared/types'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '@/store/store'

export interface DatabaseState {
  selectedTableConfig: ColumnTypeNameMap
  schemas: DatabaseSchema[]
  selectedSchema: string | null

}

const initialState: DatabaseState = {
  selectedTableConfig: new Map,
  schemas: [],
  selectedSchema: 'public'
}

export const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setSelectedTableConfig: (state, action: PayloadAction<ColumnTypeNameMap>) => {
      state.selectedTableConfig = action.payload
    },
    setSchemas: (state, action: PayloadAction<DatabaseSchema[]>) => {
      state.schemas = action.payload
    },
    setSelectedSchema: (state, action: PayloadAction<string>) => {
      state.selectedSchema = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedTableConfig, setSchemas, setSelectedSchema } = databaseSlice.actions

export default databaseSlice.reducer


export const useDatabase = () => {
  const database = useSelector((state: RootState) => state.database)
  return database
}

export const useDatabaseDispatch = () => {
  const dispatch = useDispatch()
  return {
    handleSetSelectedTableConfig: (table: ColumnTypeNameMap) => dispatch(setSelectedTableConfig(table)),
    handleSetSchemas: (schemas: DatabaseSchema[]) => dispatch(setSchemas(schemas)),
    handleSetSelectedSchema: (schema: string) => dispatch(setSelectedSchema(schema))
  }
}