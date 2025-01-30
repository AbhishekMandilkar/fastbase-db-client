import { ThemeProvider } from 'next-themes'
import { BrowserRouter, Route, Routes } from "react-router";
import Connections from './pages/connections/connections';
import {SidebarProvider} from './components/ui/sidebar';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './lib/query-client';
function App(): JSX.Element {
  return (
    <main>
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Connections />} />
            </Routes>
          </SidebarProvider>
        </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  )
}

export default App
