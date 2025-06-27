import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function OrcamentosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const quotes = await prisma.quote.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Orçamentos</CardTitle>
      </CardHeader>
      <CardContent>
        {quotes.length === 0 ? (
          <p>Nenhum orçamento encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li key={q.id} className="border-b pb-2">
                <div className="font-medium">{q.name}</div>
                <div className="text-sm text-slate-600">{q.status}</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
