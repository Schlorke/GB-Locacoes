import { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function MinhaContaLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }

  const nav = [
    { href: "/minha-conta/dados", label: "Dados" },
    { href: "/minha-conta/orcamentos", label: "Orçamentos" },
    { href: "/minha-conta/favoritos", label: "Favoritos" },
  ]

  return (
    <div className="container mx-auto py-8 flex flex-col md:flex-row gap-6">
      <aside className="md:w-1/4">
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
