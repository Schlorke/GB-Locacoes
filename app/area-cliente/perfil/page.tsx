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
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Phone,
  Building,
  Save,
  Edit,
  Shield,
  AlertCircle,
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
        {/* Elementos animados de background */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

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
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <div className="flex items-start justify-between">
                  <div>
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
                    className="bg-white  hover:bg-gray-50 text-gray-900 hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
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

                  {/* Status da Conta */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Status da Conta
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-gray-900">
                            E-mail Verificado
                          </span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pendente
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-gray-900">
                            Telefone Verificado
                          </span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pendente
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-gray-900">
                            Documentos
                          </span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pendente
                        </Badge>
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
              <CardHeader className="relative z-10 pb-6 md:pb-8">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white">
                    <Lock className="h-5 w-5" />
                  </div>
                  Segurança
                </CardTitle>
                <CardDescription>
                  Gerencie a segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-orange-50 hover:to-orange-100 transition-all duration-300 border border-gray-200 hover:border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                          <Lock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Alterar Senha
                          </p>
                          <p className="text-sm text-gray-600">
                            Atualize sua senha regularmente
                          </p>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Alterar
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-gray-200 hover:border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Sessões Ativas
                          </p>
                          <p className="text-sm text-gray-600">
                            Gerencie seus dispositivos conectados
                          </p>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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
