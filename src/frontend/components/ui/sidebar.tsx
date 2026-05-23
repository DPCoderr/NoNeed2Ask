"use client"

import * as React from "react"
import { Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Slot } from "radix-ui"

import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

type SidebarContextValue = {
  isMobile: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  children,
  className,
  defaultOpen = true,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
}) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(defaultOpen)
  const toggleSidebar = React.useCallback(() => setOpen((value) => !value), [])

  return (
    <SidebarContext.Provider
      value={{ isMobile, open, setOpen, toggleSidebar }}
    >
      <div
        data-slot="sidebar-wrapper"
        data-collapsible={open ? "" : "icon"}
        className={cn(
          "group/sidebar-wrapper flex min-h-screen w-full bg-background",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  children,
  className,
  ...props
}: React.ComponentProps<"aside">) {
  const { open } = useSidebar()

  return (
    <aside
      data-slot="sidebar"
      data-state={open ? "expanded" : "collapsed"}
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex md:flex-col",
        "overflow-hidden",
        open ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  )
}

function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      aria-label="Toggle sidebar"
      className={className}
      onClick={toggleSidebar}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      <HugeiconsIcon icon={Menu01Icon} />
    </Button>
  )
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-3",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 text-xs font-medium uppercase text-sidebar-foreground/60 transition-opacity group-data-[collapsible=icon]/sidebar-wrapper:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  asChild = false,
  className,
  isActive,
  size = "default",
  tooltip,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  size?: "default" | "sm" | "lg"
  tooltip?: string
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-active={isActive}
      data-size={size}
      data-slot="sidebar-menu-button"
      title={tooltip}
      className={cn(
        "flex h-9 w-full items-center gap-2 rounded-lg px-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[size=lg]:h-12 data-[size=lg]:px-3 data-[size=sm]:h-8 [&_svg]:size-4 [&_svg]:shrink-0",
        "group-data-[collapsible=icon]/sidebar-wrapper:justify-center group-data-[collapsible=icon]/sidebar-wrapper:px-0 group-data-[collapsible=icon]/sidebar-wrapper:[&_span]:sr-only",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuAction({
  className,
  showOnHover,
  ...props
}: React.ComponentProps<"button"> & {
  showOnHover?: boolean
}) {
  return (
    <button
      data-show-on-hover={showOnHover}
      data-slot="sidebar-menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex size-6 items-center justify-center rounded-md text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "data-[show-on-hover=true]:opacity-0 group-hover/menu-item:opacity-100",
        className
      )}
      type="button"
      {...props}
    />
  )
}

function SidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]/sidebar-wrapper:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  className,
  isActive,
  size = "md",
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  isActive?: boolean
  size?: "sm" | "md"
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-active={isActive}
      data-size={size}
      data-slot="sidebar-menu-sub-button"
      className={cn(
        "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground/80 outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:text-sidebar-accent-foreground data-[size=sm]:text-xs [&>span:last-child]:truncate",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
