"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PackageSearch,
  ListChecks,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image" // Para o logo

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/equipamentos", icon: PackageSearch, label: "Equipamentos" },
  { href: "/admin/categorias", icon: ListChecks, label: "Categorias" },
  { href: "/admin/orcamentos", icon: FileText, label: "Orçamentos" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false) // Estado para desktop

  // Efeito para fechar menu mobile ao navegar
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Efeito para fechar menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const SidebarContent = () => (
    <>
      <div
        className={cn(
          "p-4 border-b border-slate-700 flex items-center",
          isSidebarCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isSidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder-logo.svg" alt="GB Locações Logo" width={32} height={32} />
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-white">GB Locações</h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </Link>
        )}
        {isSidebarCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full py-2">
            <Image src="/placeholder-logo.svg" alt="GB Locações Logo" width={32} height={32} />
          </Link>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href) // Usar startsWith para sub-rotas

          return (
            <li key={item.href} className="list-none">
              <Link
                href={item.href}
                title={item.label}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ease-in-out group",
                  "text-slate-300 hover:bg-slate-800 hover:text-white",
                  isActive && "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                  isSidebarCollapsed && "justify-center",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white",
                  )}
                />
                {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            </li>
          )
        })}
      </nav>

      <div className={cn("p-3 border-t border-slate-700 mt-auto", isSidebarCollapsed && "flex justify-center")}>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors w-full group",
            isSidebarCollapsed && "justify-center w-auto",
          )}
          title="Sair"
        >
          <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-400" />
          {!isSidebarCollapsed && <span className="text-sm font-medium">Sair</span>}
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Header & Hamburger */}
      <header className="md:hidden sticky top-0 z-40 bg-slate-900 text-white p-3 flex items-center justify-between border-b border-slate-700">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image src="/placeholder-logo.svg" alt="GB Locações Logo" width={28} height={28} />
          <span className="font-semibold text-md">GB Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Sidebar (Overlay) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex-col transition-transform duration-300 ease-in-out md:hidden flex",
          isMobileMenuOpen ? "translate-x-0 shadow-xl" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out relative",
          isSidebarCollapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapse}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-white rounded-full h-8 w-8 border-2 border-slate-900 shadow-lg"
          title={isSidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          {isSidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
        </Button>
      </aside>
    </>
  )
}
