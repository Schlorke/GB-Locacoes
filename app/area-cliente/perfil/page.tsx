'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Phone,
  Building,
  Save,
  Edit,
  Shield,
  // AlertCircle,
  CheckCircle,
  XCircle,
  Lock,
  Smartphone,
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function PerfilPage() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    cpf: '',
    cnpj: '',
    company: '',
  })

  // Estados de verificação (mockados por enquanto; integrar com backend quando disponível)
  const [emailStatus] = useState<'pending' | 'verified' | 'error'>('pending')
  const [phoneStatus] = useState<'pending' | 'verified' | 'error'>('pending')
  const [documentsStatus] = useState<'pending' | 'verified' | 'error'>(
    'pending'
  )
  const documentsErrorMessage =
    'Documento ilegível. Por favor, tente novamente.'

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      // Aqui você implementaria a lógica para salvar os dados do perfil
      // Por exemplo, uma chamada para a API
      toast.success('Perfil atualizado com sucesso!')
      setIsEditing(false)
    } catch {
      toast.error('Erro ao atualizar perfil')
    }
  }

  // TODO: Implement cancel functionality
  // const handleCancel = () => {
  //   setFormData({
  //     name: session?.user?.name || '',
  //     email: session?.user?.email || '',
  //     phone: '',
  //     cpf: '',
  //     cnpj: '',
  //     company: '',
  //   })
  //   setIsEditing(false)
  // }

  return (
    <div className="min-h-screen bg-gray-50 pt-[84px] sm:pt-0">
      {/* Hero Section com Identidade Visual Completa */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white overflow-hidden w-screen -ml-4 sm:w-full sm:ml-0">
        {/* Elementos animados de background removidos nesta seção da área do cliente */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:py-14 relative z-10">
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight">Meu Perfil</h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto">
              Gerencie suas informações pessoais e configurações
            </p>
          </motion.div>
        </div>

        {/* Onda SVG no final */}
        <div className="relative w-full overflow-hidden">
          <svg
            className="relative block w-full h-6"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Dashboard Principal - LAYOUT SIMPLIFICADO */}
      <section className="py-12 md:py-16 lg:py-10 relative -mt-20 md:-mt-24">
        <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Card Unificado */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-50"></div>
              <CardHeader className="relative md:px-6 z-10 pb-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                        <User className="h-5 w-5" />
                      </div>
                      Informações Pessoais
                    </CardTitle>
                    <CardDescription>
                      Suas informações básicas de cadastro e status da conta
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white hover:bg-white text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative md:px-6 z-10 pt-0">
                <div className="space-y-8">
                  {/* Dados Pessoais */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5 text-orange-600" />
                      Dados Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nome Completo
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          E-mail
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="(51) 99999-9999"
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-sm font-medium text-gray-700"
                        >
                          Empresa
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Nome da sua empresa"
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="cpf"
                          className="text-sm font-medium text-gray-700"
                        >
                          CPF
                        </Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="000.000.000-00"
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="cnpj"
                          className="text-sm font-medium text-gray-700"
                        >
                          CNPJ
                        </Label>
                        <Input
                          id="cnpj"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="00.000.000/0000-00"
                          className="h-12 rounded-md border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status da Conta - Painel de Confiança */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Shield
                        className="h-5 w-5"
                        style={{ color: '#1A2E4C' }}
                      />
                      Status da Conta
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Cartão: E-mail */}
                      <div
                        className={`bg-white border rounded-xl px-6 py-4 shadow-md transition-all duration-300 hover:shadow-xl flex flex-wrap items-center gap-4 ${
                          emailStatus === 'verified'
                            ? 'border-l-4 border-green-600'
                            : emailStatus === 'error'
                              ? 'border-l-4 border-red-600'
                              : ''
                        }`}
                        role="status"
                        aria-label="Status de verificação de e-mail"
                      >
                        {emailStatus === 'verified' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : emailStatus === 'error' ? (
                          <XCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Mail className="h-6 w-6 text-orange-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[0.95rem] text-[#1a2e4c]">
                            E-mail Verificado
                          </p>
                          {emailStatus === 'error' && (
                            <p className="text-sm text-red-600 mt-0.5">
                              Não conseguimos verificar seu e-mail. Tente
                              novamente.
                            </p>
                          )}
                        </div>
                        {emailStatus === 'verified' ? (
                          <span className="text-green-600 font-medium ml-auto self-center mt-3 md:mt-0">
                            Verificado
                          </span>
                        ) : (
                          <Button
                            size="default"
                            className="ml-auto self-center w-full md:w-28 mt-3 md:mt-0"
                            aria-label={
                              emailStatus === 'error'
                                ? 'Reenviar verificação de e-mail'
                                : 'Verificar e-mail'
                            }
                          >
                            {emailStatus === 'error' ? 'Reenviar' : 'Verificar'}
                          </Button>
                        )}
                      </div>

                      {/* Cartão: Telefone */}
                      <div
                        className={`bg-white border rounded-xl px-6 py-4 shadow-md transition-all duration-300 hover:shadow-xl flex flex-wrap items-center gap-4 ${
                          phoneStatus === 'verified'
                            ? 'border-l-4 border-green-600'
                            : phoneStatus === 'error'
                              ? 'border-l-4 border-red-600'
                              : ''
                        }`}
                        role="status"
                        aria-label="Status de verificação de telefone"
                      >
                        {phoneStatus === 'verified' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : phoneStatus === 'error' ? (
                          <XCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Phone className="h-6 w-6 text-orange-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[0.95rem] text-[#1a2e4c]">
                            Telefone Verificado
                          </p>
                          {phoneStatus === 'error' && (
                            <p className="text-sm text-red-600 mt-0.5">
                              Código inválido. Tente novamente.
                            </p>
                          )}
                        </div>
                        {phoneStatus === 'verified' ? (
                          <span className="text-green-600 font-medium ml-auto self-center mt-3 md:mt-0">
                            Verificado
                          </span>
                        ) : (
                          <Button
                            size="default"
                            className="ml-auto self-center w-full md:w-28 mt-3 md:mt-0"
                            aria-label={
                              phoneStatus === 'error'
                                ? 'Reenviar verificação de telefone'
                                : 'Verificar telefone'
                            }
                          >
                            {phoneStatus === 'error' ? 'Reenviar' : 'Verificar'}
                          </Button>
                        )}
                      </div>

                      {/* Cartão: Documentos */}
                      <div
                        className={`bg-white border rounded-xl px-6 py-4 shadow-md transition-all duration-300 hover:shadow-xl flex flex-wrap items-center gap-4 ${
                          documentsStatus === 'verified'
                            ? 'border-l-4 border-green-600'
                            : documentsStatus === 'error'
                              ? 'border-l-4 border-red-600'
                              : ''
                        }`}
                        role="status"
                        aria-label="Status de envio de documentos"
                      >
                        {documentsStatus === 'verified' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : documentsStatus === 'error' ? (
                          <XCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Building className="h-6 w-6 text-orange-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[0.95rem] text-[#1a2e4c]">
                            Documentos
                          </p>
                          {documentsStatus === 'error' && (
                            <p className="text-sm text-red-600 mt-0.5">
                              {documentsErrorMessage}
                            </p>
                          )}
                        </div>
                        {documentsStatus === 'verified' ? (
                          <span className="text-green-600 font-medium ml-auto self-center mt-3 md:mt-0">
                            Verificado
                          </span>
                        ) : (
                          <Button
                            size="default"
                            className="ml-auto self-center w-full md:w-28 mt-3 md:mt-0"
                            aria-label={
                              documentsStatus === 'error'
                                ? 'Reenviar documentos'
                                : 'Enviar documentos'
                            }
                          >
                            {documentsStatus === 'error'
                              ? 'Reenviar'
                              : 'Enviar'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão Salvar - aparece apenas quando editando */}
                {isEditing && (
                  <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl px-8"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Seção de Segurança */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50"></div>
              <CardHeader className="relative z-10 pb-6">
                <div className="space-y-1.5">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                      <Lock className="h-5 w-5" />
                    </div>
                    Segurança
                  </CardTitle>
                  <CardDescription>
                    Gerencie a segurança da sua conta
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative px-4 md:px-6 z-10 pt-0">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white mt-1">
                          <Lock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Alterar Senha
                          </p>
                          <p className="text-sm text-gray-600">
                            Atualize sua senha regularmente
                          </p>
                        </div>
                      </div>
                      <Button
                        size="default"
                        className="w-full sm:w-28 flex-shrink-0"
                      >
                        Alterar
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white mt-1">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            Sessões Ativas
                          </p>
                          <p className="text-sm text-gray-600">
                            Gerencie seus dispositivos conectados
                          </p>
                        </div>
                      </div>
                      <Button
                        size="default"
                        className="w-full sm:w-28 flex-shrink-0"
                      >
                        Gerenciar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
