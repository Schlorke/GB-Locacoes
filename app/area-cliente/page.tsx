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
import { User, FileText, Clock, Phone } from 'lucide-react'
import Link from 'next/link'

export default function AreaClientePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-bold text-h1 mb-4">Área do Cliente</h1>
          <p className="text-base text-slate-200 max-w-2xl mx-auto">
            Acompanhe seus orçamentos, histórico de locações e gerencie suas
            solicitações
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Acesso do Cliente
              </CardTitle>
              <CardDescription>
                Entre com seus dados para acessar sua área
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(51) 99999-9999" />
              </div>
              <Button className="w-full">Acessar Área do Cliente</Button>
              <p className="text-sm text-slate-600 text-center">
                Primeira vez? Seus dados serão criados automaticamente
              </p>
            </CardContent>
          </Card>

          {/* Services Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Seus Orçamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Acompanhe o status dos seus orçamentos em tempo real
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Pendente de análise
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Aprovado
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Em andamento
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Histórico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Visualize todas as suas locações anteriores
                </p>
                <Button variant="outline" className="w-full">
                  Ver Histórico Completo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Suporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Precisa de ajuda? Entre em contato conosco
                </p>
                <div className="space-y-2">
                  <Link href="/contato">
                    <Button variant="outline" className="w-full">
                      Falar com Suporte
                    </Button>
                  </Link>
                  <Link href="/orcamento">
                    <Button className="w-full">Novo Orçamento</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
