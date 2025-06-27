import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import bcrypt from "bcryptjs"

async function updateUser(formData: FormData) {
  'use server'
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const data: any = { name, email }
  if (password) {
    const hashed = await bcrypt.hash(password, 10)
    data.password = hashed
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data,
  })
}

export default async function DadosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meus Dados</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateUser} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" defaultValue={user?.name ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" defaultValue={user?.email ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </CardContent>
    </Card>
  )
}
