'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AdminCard } from '@/components/admin/admin-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import {
  Shield,
  Save,
  User,
  Package,
  DollarSign,
  Wrench,
  Truck,
  FileText,
  BarChart,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'

interface Permission {
  id: string
  role: string
  module: string
  action: string
}

const modules = [
  { id: 'EQUIPMENT', label: 'Equipamentos', icon: Package },
  { id: 'RENTAL', label: 'Locações', icon: FileText },
  { id: 'QUOTE', label: 'Orçamentos', icon: DollarSign },
  { id: 'MAINTENANCE', label: 'Manutenção', icon: Wrench },
  { id: 'LOGISTICS', label: 'Logística', icon: Truck },
  { id: 'FINANCIAL', label: 'Financeiro', icon: DollarSign },
  { id: 'ANALYTICS', label: 'Analytics', icon: BarChart },
  { id: 'SETTINGS', label: 'Configurações', icon: Settings },
]

const actions = [
  { id: 'READ', label: 'Visualizar' },
  { id: 'WRITE', label: 'Criar/Editar' },
  { id: 'DELETE', label: 'Excluir' },
  { id: 'APPROVE', label: 'Aprovar' },
  { id: 'MANAGE', label: 'Gerenciar' },
]

const roles = [
  {
    id: 'ADMIN',
    label: 'Administrador',
    description: 'Acesso total ao sistema',
  },
  { id: 'OPERATOR', label: 'Operador', description: 'Operações básicas' },
  {
    id: 'FINANCIAL',
    label: 'Financeiro',
    description: 'Acesso ao módulo financeiro',
  },
  {
    id: 'LOGISTICS',
    label: 'Logística',
    description: 'Acesso ao módulo de logística',
  },
  {
    id: 'MAINTENANCE',
    label: 'Manutenção',
    description: 'Acesso ao módulo de manutenção',
  },
]

export default function AdminPermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedRole, setSelectedRole] = useState<string>('ADMIN')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchPermissions = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/permissions')
      if (!response.ok) throw new Error('Erro ao carregar permissões')

      const data = await response.json()
      setPermissions(data.permissions || [])
    } catch (error) {
      console.error('Error fetching permissions:', error)
      toast.error('Erro ao carregar permissões')
      setPermissions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPermissions()
  }, [fetchPermissions])

  const hasPermission = (role: string, module: string, action: string) => {
    return permissions.some(
      (p) => p.role === role && p.module === module && p.action === action
    )
  }

  const togglePermission = (role: string, module: string, action: string) => {
    const exists = hasPermission(role, module, action)
    if (exists) {
      setPermissions(
        permissions.filter(
          (p) =>
            !(p.role === role && p.module === module && p.action === action)
        )
      )
    } else {
      setPermissions([
        ...permissions,
        {
          id: `temp_${Date.now()}`,
          role,
          module,
          action,
        },
      ])
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/permissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissions: permissions.filter((p) => p.role === selectedRole),
        }),
      })

      if (!response.ok) throw new Error('Erro ao salvar permissões')

      toast.success('Permissões salvas com sucesso')
      fetchPermissions()
    } catch (error) {
      console.error('Error saving permissions:', error)
      toast.error('Erro ao salvar permissões')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12 max-w-7xl mx-auto">
        <AdminPageHeader
          title="Gerenciar Permissões"
          subtitle="Controle de acesso granular por módulo e ação"
          icon={<Shield className="w-8 h-8" />}
          className="mb-8"
        />

        {/* Seleção de Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-0 shadow-xl bg-white backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-base font-semibold mb-4 block">
                Selecione o Perfil
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedRole === role.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-semibold">{role.label}</p>
                        {role.description && (
                          <p className="text-sm text-gray-500">
                            {role.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabela de Permissões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <AdminCard
            title={`Permissões - ${roles.find((r) => r.id === selectedRole)?.label}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Módulo
                    </th>
                    {actions.map((action) => (
                      <th
                        key={action.id}
                        className="text-center p-4 font-semibold text-gray-700"
                      >
                        {action.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => {
                    const ModuleIcon = module.icon
                    return (
                      <tr
                        key={module.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <ModuleIcon className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{module.label}</span>
                          </div>
                        </td>
                        {actions.map((action) => (
                          <td key={action.id} className="p-4 text-center">
                            <Checkbox
                              checked={hasPermission(
                                selectedRole,
                                module.id,
                                action.id
                              )}
                              onCheckedChange={() =>
                                togglePermission(
                                  selectedRole,
                                  module.id,
                                  action.id
                                )
                              }
                              disabled={selectedRole === 'ADMIN'} // Admin tem todas as permissões
                            />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {selectedRole === 'ADMIN' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> O perfil Administrador tem acesso total
                  a todos os módulos e ações. As permissões não podem ser
                  modificadas.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving || selectedRole === 'ADMIN'}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Salvando...' : 'Salvar Permissões'}
              </Button>
            </div>
          </AdminCard>
        </motion.div>
      </div>
    </div>
  )
}
