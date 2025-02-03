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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Connections",
      url: "#",
      items: [
        {
          title: "PostgreSQL",
          url: "#",
        },
        {
          title: "MySQL",
          url: "#",
        },
      ]
    },
  ],
}

export function ConnectionList({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data:connections, isLoading} = actionsProxy.getConnections.useQuery();
  return (
    <Sidebar {...props}>
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
                        <SidebarMenuSubButton asChild>
                          <a href={`/connection/${item.id}`}>{item.nickname || item.database}</a>
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
