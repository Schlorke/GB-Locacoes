import { requireAdminAuth } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const session = await requireAdminAuth()

    // Verificar se é especificamente ADMIN (não apenas OPERATOR ou FINANCIAL)
    if (session.user.role !== 'ADMIN') {
      redirect('/admin')
    }
  } catch (_error) {
    redirect('/admin/login')
  }

  return <>{children}</>
}
