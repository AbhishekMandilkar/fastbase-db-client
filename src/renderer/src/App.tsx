import { ThemeProvider } from 'next-themes'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Connections from './pages/connections/connections'
import { SidebarProvider } from './components/ui/sidebar'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import Database from './pages/database/database'
import { store } from './store/store'
import { Provider } from 'react-redux'
import TablesView from './pages/database/tables-view/tables-view'
import TableExplorer from './components/database/table-explorer/table-explorer'
import SqlQueriesView from './pages/database/sql-queries-view/sql-queries-view'
import ErrorBoundary from './components/error-boundry'
import DatabaseError from './pages/database/database-error'
import {Toaster} from 'sonner'

function App(): JSX.Element {
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
              <SidebarProvider>
                <Routes>
                  <Route path="/" element={<Connections />} />
                  <Route path="/connection/:connectionId" element={<Database />}>
                    <Route index element={<Navigate to="tables" replace />} />
                    <Route path="tables" element={<TablesView />}>
                      <Route path=":tableName" element={<TableExplorer />} />
                    </Route>
                    <Route path="sql-queries" element={<SqlQueriesView />}>
                      <Route path=":queryId" element={null} />
                    </Route>
                  </Route>
                </Routes>
              </SidebarProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
      <Toaster visibleToasts={1} richColors position="bottom-right"/>
    </main>
  )
}

export default App
