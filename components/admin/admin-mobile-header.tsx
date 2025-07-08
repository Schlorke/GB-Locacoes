"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AdminSidebar } from "./admin-sidebar"

export function AdminMobileHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background md:hidden">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">GB</span>
        </div>
        <div>
          <h1 className="font-semibold text-lg">GB Locações</h1>
          <p className="text-sm text-muted-foreground">Painel Administrativo</p>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0">
          <SheetHeader className="p-6 pb-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GB</span>
              </div>
              <div>
                <SheetTitle className="text-left">GB Locações</SheetTitle>
                <p className="text-sm text-muted-foreground">Painel Administrativo</p>
              </div>
            </div>
          </SheetHeader>
          <div className="px-6 pt-6">
            <AdminSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
