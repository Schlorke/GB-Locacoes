"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, PackageSearch, ListChecks, FileText, LogOut, Menu, UserCircle, Building } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/equipamentos", icon: PackageSearch, label: "Equipamentos" },
  { href: "/admin/categorias", icon: ListChecks, label: "Categorias" },
  { href: "/admin/orcamentos", icon: FileText, label: "Orçamentos" },
]

export default function AdminMobileHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900 md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo e Título */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Building className="h-6 w-6 text-orange-500 flex-shrink-0" />
          <span className="font-semibold text-white truncate">GB Admin</span>
        </Link>

        {/* Menu Hambúrguer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <div className="flex flex-col h-full">
              {/* Header do Sheet */}
              <SheetHeader className="p-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Image src="/placeholder-logo.svg" alt="Logo" width={32} height={32} className="flex-shrink-0" />
                  <div className="text-left">
                    <SheetTitle className="text-lg font-bold">GB Locações</SheetTitle>
                    <p className="text-sm text-muted-foreground">Painel Administrativo</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Navegação */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.startsWith(item.href)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium border",
                          "hover:bg-slate-100 active:bg-slate-200",
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary/20"
                            : "bg-slate-50/80 text-slate-700 border-slate-200/60 hover:border-slate-300/80",
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </nav>

              {/* Seção do Usuário */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle className="h-10 w-10 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{session?.user?.name || "Administrador"}</p>
                    {/* @ts-ignore */}
                    <p className="text-sm text-slate-500 truncate">{session?.user?.role || "ADMIN"}</p>
                  </div>
                </div>

                <Separator className="mb-4" />

                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false)
                    signOut({ callbackUrl: "/admin/login" })
                  }}
                  className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200/60 hover:border-red-300/80"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair do Sistema</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
