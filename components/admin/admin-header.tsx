"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Search, Bell, UserCircle, Building } from "lucide-react"
import { useSession } from "next-auth/react"
import AdminSidebar from "./admin-sidebar"

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white">
      <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
        <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden h-[20px] w-[20px] p-0 bg-transparent flex-shrink-0"
              >
                <Menu className="h-3 w-3" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-64 p-0">
              <AdminSidebar />
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-2 font-semibold text-slate-700 min-w-0">
            <Building className="h-5 w-5 text-orange-500 flex-shrink-0" />
            <span className="truncate">Painel GB Locações</span>
          </div>

          <div className="md:hidden flex items-center gap-2 font-semibold text-slate-700 min-w-0">
            <Building className="h-4 w-4 text-orange-500 flex-shrink-0" />
            <span className="truncate">GB Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex flex-shrink-0"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex flex-shrink-0"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="sr-only">Notificações</span>
          </Button>

          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <UserCircle className="h-6 w-6 sm:h-7 sm:w-7 text-gray-500 flex-shrink-0" />
            <div className="hidden sm:block min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-24 lg:max-w-none">
                {session?.user?.name || "Admin"}
              </p>
              {/* @ts-ignore */}
              <p className="text-xs text-gray-500 truncate max-w-24 lg:max-w-none">
                {session?.user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
