import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, Users, FileText } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data for KPIs - replace with actual data fetching
  const kpis = [
    { title: "Receita (Mês)", value: "R$ 12.345,67", icon: DollarSign, change: "+5.2%" },
    { title: "Equipamentos Alugados", value: "78", icon: Package, change: "+10" },
    { title: "Novos Clientes (Mês)", value: "12", icon: Users, change: "+2" },
    { title: "Orçamentos Pendentes", value: "5", icon: FileText, change: "-1" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{kpi.title}</CardTitle>
              <kpi.icon className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{kpi.value}</div>
              <p className="text-xs text-green-600">{kpi.change} desde o último mês</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Visão Geral de Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for equipment overview chart or table */}
            <p className="text-slate-600">Gráfico de status dos equipamentos aqui...</p>
            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center mt-4">
              <p className="text-gray-400">Em breve: Gráfico de Equipamentos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Últimos Orçamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent quotes list */}
            <p className="text-slate-600">Lista de orçamentos recentes aqui...</p>
            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center mt-4">
              <p className="text-gray-400">Em breve: Lista de Orçamentos</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Adicionar mais seções conforme necessário, como Alertas, Atividades Recentes, etc. */}
    </div>
  )
}
