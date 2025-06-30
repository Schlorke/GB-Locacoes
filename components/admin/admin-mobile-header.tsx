"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, PackageSearch, ListChecks, FileText, LogOut, Menu, UserCircle } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
          <Image
            src="/placeholder-logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="flex-shrink-0 w-auto h-auto"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-white text-sm truncate">GB Locações</span>
            <span className="text-xs text-slate-400 truncate">Admin Panel</span>
          </div>
        </Link>

        {/* Menu Hambúrguer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0 bg-slate-900 border-slate-700">
            <div className="flex flex-col h-full">
              {/* Header do Sheet */}
              <SheetHeader className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder-logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="flex-shrink-0 w-auto h-auto"
                  />
                  <div className="text-left">
                    <SheetTitle className="text-lg font-bold text-white">GB Locações</SheetTitle>
                    <p className="text-xs text-slate-400">Painel Administrativo</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Navegação */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname.startsWith(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ease-in-out group text-sm",
                        "text-slate-300 hover:bg-slate-800 hover:text-white font-medium",
                        isActive && "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-white",
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Seção do Usuário */}
              <div className="p-4 border-t border-slate-700 mt-auto">
                <div className="flex items-center gap-3 px-3 py-2 mb-3">
                  <UserCircle className="h-9 w-9 text-slate-400 flex-shrink-0" />
                  <div className="flex flex-col text-center min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {session?.user?.name || "Administrador"}
                    </p>
                    {/* @ts-ignore */}
                    <p className="text-xs text-slate-400 truncate">{session?.user?.role || "ADMIN"}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false)
                    signOut({ callbackUrl: "/admin/login" })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors group text-sm font-medium justify-start border border-slate-600 hover:border-red-400/50"
                >
                  <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-400" />
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
