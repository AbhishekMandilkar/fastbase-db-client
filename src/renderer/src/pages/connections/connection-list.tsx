import * as React from "react"
import { DatabaseZapIcon, GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {Separator} from "../../components/ui/separator"
import {ThemeToggle} from "../../components/theme-switcher"
import {actionsProxy} from "@/lib/action-proxy"
import Brand from "@/components/brand"
import {Connection} from "src/shared/types"
import {useDatabaseDispatch} from "../database/slice/database-slice"
import {useNavigate} from "react-router"
import useConnectDatabase from "../database/hooks/use-connect-database"
import {toast} from "sonner"

// This is sample data.
const data = {
  navMain: [
    {
      title: "RecentConnections",
      url: "#",
    },
    {
      title: "Favorites",
      url: "#",
    }
  ],
}

export function ConnectionList({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data:connections, isLoading} = actionsProxy.getConnections.useQuery();
  const navigate = useNavigate();
  const {handleConnect, isConnecting} = useConnectDatabase();

  const handleSelectDatabase = async (connection: Connection) => {
    toast.promise(
      async () => {
        const { success } = await handleConnect(connection.id)
        if (success) {
          navigate(`/connection/${connection.id}`)
        }
      },
      {
        loading: 'Connecting...',
        success: 'Connected',
        error: 'Failed to connect'
      }
    )
  }

  return (
    <Sidebar {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Brand />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarGroupLabel>
                  <span className="font-medium font-mono">
                    {item.title}
                  </span>
                </SidebarGroupLabel>
                {connections?.length ? (
                  <SidebarMenuSub>
                    {connections.map((item) => (
                      <SidebarMenuSubItem key={item.id}>
                        <SidebarMenuSubButton onClick={() => handleSelectDatabase(item)} className="cursor-pointer">
                          {item.nickname || item.database}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
