"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, UserCircle, Building } from "lucide-react";
import { useSession } from "next-auth/react";
import AdminSidebar from "./admin-sidebar";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-700 bg-slate-900">
      <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
        <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 flex-shrink-0"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-64 p-0">
              <AdminSidebar />
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-2 font-semibold text-white min-w-0">
            <Building className="h-5 w-5 text-orange-500 flex-shrink-0" />
            <span className="truncate">Painel GB Locações</span>
          </div>

          <div className="md:hidden flex items-center gap-2 font-semibold text-white min-w-0">
            <Building className="h-4 w-4 text-orange-500 flex-shrink-0" />
            <span className="truncate text-sm">GB Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex flex-shrink-0 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex flex-shrink-0 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Notificações</span>
          </Button>

          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <UserCircle className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400 flex-shrink-0" />
            <div className="hidden sm:block min-w-0">
              <p className="text-xs sm:text-sm font-medium text-slate-200 truncate max-w-24 lg:max-w-none">
                {session?.user?.name || "Admin"}
              </p>
              {/* @ts-ignore */}
              <p className="text-xs text-slate-400 truncate max-w-24 lg:max-w-none">
                {session?.user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
