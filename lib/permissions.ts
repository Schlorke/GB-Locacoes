import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

export type Module =
  | 'EQUIPMENTS'
  | 'QUOTES'
  | 'RENTALS'
  | 'FINANCIAL'
  | 'MAINTENANCE'
  | 'LOGISTICS'
  | 'CONTRACTS'
  | 'SETTINGS'
  | 'USERS'

export type Action = 'READ' | 'WRITE' | 'DELETE' | 'APPROVE' | 'MANAGE'

/**
 * Verifica se um usuário tem permissão para uma ação específica
 */
export async function hasPermission(
  role: Role,
  module: Module,
  action: Action
): Promise<boolean> {
  // Admin tem todas as permissões
  if (role === 'ADMIN') {
    return true
  }

  // Verificar permissão específica
  const permission = await prisma.permission.findUnique({
    where: {
      role_module_action: {
        role,
        module,
        action,
      },
    },
  })

  return !!permission
}

/**
 * Verifica múltiplas permissões
 */
export async function hasPermissions(
  role: Role,
  permissions: Array<{ module: Module; action: Action }>
): Promise<boolean> {
  if (role === 'ADMIN') {
    return true
  }

  const results = await Promise.all(
    permissions.map((p) => hasPermission(role, p.module, p.action))
  )

  return results.every((result) => result === true)
}

/**
 * Inicializa permissões padrão
 */
export async function initializeDefaultPermissions(): Promise<void> {
  const defaultPermissions = [
    // CLIENT pode ler suas próprias informações
    {
      role: 'CLIENT' as Role,
      module: 'RENTALS' as Module,
      action: 'READ' as Action,
    },
    {
      role: 'CLIENT' as Role,
      module: 'QUOTES' as Module,
      action: 'READ' as Action,
    },
    {
      role: 'CLIENT' as Role,
      module: 'CONTRACTS' as Module,
      action: 'READ' as Action,
    },
  ]

  for (const perm of defaultPermissions) {
    await prisma.permission.upsert({
      where: {
        role_module_action: {
          role: perm.role,
          module: perm.module,
          action: perm.action,
        },
      },
      update: {},
      create: perm,
    })
  }
}

/**
 * Middleware helper para verificar permissões
 */
export function requirePermission(module: Module, action: Action) {
  return async (role: Role): Promise<boolean> => {
    return hasPermission(role, module, action)
  }
}
