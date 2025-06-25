"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Search, Bell, UserCircle, Building } from "lucide-react"
import { useSession } from "next-auth/react"
import AdminSidebar from "./admin-sidebar" // Import for mobile sidebar content

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            {/* Re-use AdminSidebar content for mobile */}
            <AdminSidebar />
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Building className="h-6 w-6 text-orange-500" />
          <span>Painel GB Locações</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5 text-gray-600" />
          <span className="sr-only">Buscar</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="sr-only">Notificações</span>
        </Button>
        <div className="flex items-center gap-2">
          <UserCircle className="h-7 w-7 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">{session?.user?.name || "Admin"}</p>
            {/* @ts-ignore */}
            <p className="text-xs text-gray-500">{session?.user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
