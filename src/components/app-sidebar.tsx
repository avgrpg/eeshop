"use client"

import * as React from "react"
import {
  ShoppingBag,
  SquarePlus,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { TeamSwitcher } from "~/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/admin/products",
        },
        {
          title: "Tags",
          url: "/admin/tags",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: SquarePlus,
      isActive: true,
      items: [
        {
          title: "Parent Category",
          url: "/admin/categories",
        },
        {
          title: "Subcategory",
          url: "/admin/categories/sub",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
