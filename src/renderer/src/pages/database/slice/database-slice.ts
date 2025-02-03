
import 'immer'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Connection} from 'src/shared/types'

export interface DatabaseState {
  connection: Connection | null
  selectedTable: string | null
}

const initialState: DatabaseState = {
  connection: null,
  selectedTable: null,
}

export const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<Connection>) => {
      state.connection = action.payload
    },
    setSelectedTable: (state, action: PayloadAction<string>) => {
      state.selectedTable = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setConnection, setSelectedTable } = databaseSlice.actions

export default databaseSlice.reducer
