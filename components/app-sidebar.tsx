"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "نوبت های من",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "تعریف اعضای خانواده",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "نظرسنجی خدمات",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "انتقادات و پیشنهادات",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "ثبت مهارت من ",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "تنظیمات",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "پشتیبانی",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "جستجو",
      url: "#",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">سفارت من</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
