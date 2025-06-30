"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, UserCircle, Building } from "lucide-react"
import { useSession } from "next-auth/react"
import AdminSidebar from "./admin-sidebar"

export default function AdminMobileHeader() {
  const { data: session } = useSession()

  return (
    <header className="md:hidden flex items-center justify-between h-16 px-4 bg-slate-900 border-b border-slate-700">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg border border-slate-600/50 bg-slate-800/50 hover:bg-slate-700/80 hover:border-slate-500 transition-all duration-200 backdrop-blur-sm"
            >
              <Menu className="h-5 w-5 text-slate-200" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-64 p-0 bg-slate-900">
            <AdminSidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 font-semibold text-slate-200 min-w-0">
          <Building className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <span className="truncate">GB Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <UserCircle className="h-7 w-7 text-slate-400 flex-shrink-0" />
        <div className="hidden sm:block min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate max-w-24">{session?.user?.name || "Admin"}</p>
          {/* @ts-ignore */}
          <p className="text-xs text-slate-400 truncate max-w-24">{session?.user?.role}</p>
        </div>
      </div>
    </header>
  )
}
