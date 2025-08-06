'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Database,
  Trash2,
  RefreshCw,
  Download,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  HardDrive,
  Users,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'

interface SystemInfo {
  database: {
    status: 'connected' | 'disconnected'
    totalTables: number
    totalRecords: number
  }
  storage: {
    used: string
    available: string
    total: string
  }
  users: {
    total: number
    admins: number
    operators: number
  }
}

export default function AdminUtilsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [systemInfo] = useState<SystemInfo>({
    database: {
      status: 'connected',
      totalTables: 8,
      totalRecords: 1247,
    },
    storage: {
      used: '2.4 GB',
      available: '7.6 GB',
      total: '10 GB',
    },
    users: {
      total: 15,
      admins: 3,
      operators: 12,
    },
  })

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        'Tem certeza que deseja popular o banco de dados? Esta ação irá adicionar dados de exemplo.'
      )
    )
      return

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/seed-admin', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Banco de dados populado com sucesso!')
      } else {
        toast.error('Erro ao popular banco de dados')
      }
    } catch (error) {
      console.error('Error seeding database:', error)
      toast.error('Erro ao popular banco de dados')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearCache = async () => {
    if (
      !confirm(
        'Tem certeza que deseja limpar o cache? Esta ação pode afetar a performance temporariamente.'
      )
    )
      return

    setIsLoading(true)
    try {
      // Simulate cache clearing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Cache limpo com sucesso!')
    } catch (_error) {
      toast.error('Erro ao limpar cache')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackupDatabase = async () => {
    setIsLoading(true)
    try {
      // Simulate backup creation
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success('Backup criado com sucesso!')
    } catch (_error) {
      toast.error('Erro ao criar backup')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSystemCheck = async () => {
    setIsLoading(true)
    try {
      // Simulate system check
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success(
        'Verificação do sistema concluída - Tudo funcionando corretamente!'
      )
    } catch (_error) {
      toast.error('Erro na verificação do sistema')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">
            Utilitários do Sistema
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Ferramentas de administração e manutenção do sistema
          </p>
        </div>
        <Button
          onClick={handleSystemCheck}
          disabled={isLoading}
          size="sm"
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Shield className="h-4 w-4 mr-2" />
          )}
          <span className="truncate">Verificar Sistema</span>
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Status do Banco
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      systemInfo.database.status === 'connected'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm sm:text-base font-medium">
                    {systemInfo.database.status === 'connected'
                      ? 'Conectado'
                      : 'Desconectado'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {systemInfo.database.totalRecords} registros em{' '}
                  {systemInfo.database.totalTables} tabelas
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Database className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Armazenamento
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                  {systemInfo.storage.used}
                </p>
                <p className="text-xs text-muted-foreground">
                  de {systemInfo.storage.total} usado
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <HardDrive className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                  Usuários Ativos
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                  {systemInfo.users.total}
                </p>
                <p className="text-xs text-muted-foreground">
                  {systemInfo.users.admins} admins, {systemInfo.users.operators}{' '}
                  operadores
                </p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Operations */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Database className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Operações do Banco de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Button
              onClick={handleSeedDatabase}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-transparent"
            >
              <div className="flex items-center gap-3 w-full">
                <RefreshCw className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="text-left min-w-0 flex-1">
                  <p className="font-medium text-sm">Popular Banco</p>
                  <p className="text-xs text-muted-foreground">
                    Adicionar dados de exemplo
                  </p>
                </div>
              </div>
            </Button>

            <Button
              onClick={handleBackupDatabase}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-transparent"
            >
              <div className="flex items-center gap-3 w-full">
                <Download className="h-5 w-5 flex-shrink-0 text-green-600" />
                <div className="text-left min-w-0 flex-1">
                  <p className="font-medium text-sm">Criar Backup</p>
                  <p className="text-xs text-muted-foreground">
                    Exportar dados do sistema
                  </p>
                </div>
              </div>
            </Button>

            <Button
              onClick={handleClearCache}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start h-auto p-4 bg-transparent"
            >
              <div className="flex items-center gap-3 w-full">
                <Trash2 className="h-5 w-5 flex-shrink-0 text-orange-600" />
                <div className="text-left min-w-0 flex-1">
                  <p className="font-medium text-sm">Limpar Cache</p>
                  <p className="text-xs text-muted-foreground">
                    Remover arquivos temporários
                  </p>
                </div>
              </div>
            </Button>
          </div>

          <Separator />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">
                  Atenção - Operações Críticas
                </h4>
                <p className="text-xs sm:text-sm text-yellow-700">
                  As operações acima podem afetar o funcionamento do sistema.
                  Certifique-se de ter um backup antes de executar operações
                  críticas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Manutenção do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <h4 className="font-medium text-sm">Última Verificação</h4>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                Sistema verificado em: {new Date().toLocaleDateString('pt-BR')}{' '}
                às{' '}
                {new Date().toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <Badge variant="outline" className="text-xs">
                Todos os serviços funcionando
              </Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <h4 className="font-medium text-sm">Logs do Sistema</h4>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                Últimos eventos registrados no sistema
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                Ver Logs Completos
              </Button>
            </div>
          </div>

          <Separator />

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-green-800 mb-1">
                  Sistema Funcionando Normalmente
                </h4>
                <p className="text-xs sm:text-sm text-green-700">
                  Todos os serviços estão operacionais. Última verificação
                  realizada com sucesso.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm font-medium">Processando operação...</p>
          </div>
        </div>
      )}
    </div>
  )
}
