const { prisma } = require('../scripts/prisma-client.cjs')

async function checkAndaimePricing() {
  try {
    const andaime = await prisma.equipment.findFirst({
      where: {
        name: {
          contains: 'Andaime Tubular H=2m',
          mode: 'insensitive',
        },
      },
    })

    if (!andaime) {
      console.log('❌ Andaime não encontrado no banco!')
      return
    }

    console.log('\n📊 DADOS DO ANDAIME NO BANCO:')
    console.log('='.repeat(60))
    console.log('ID:', andaime.id)
    console.log('Nome:', andaime.name)
    console.log('Preço Base (pricePerDay):', Number(andaime.pricePerDay))
    console.log('\n🔹 VALORES DIRETOS:')
    console.log('  dailyDirectValue:', Number(andaime.dailyDirectValue || 0))
    console.log(
      '  weeklyDirectValue:',
      Number(andaime.weeklyDirectValue || 0),
      '← DEVE SER 400!'
    )
    console.log(
      '  biweeklyDirectValue:',
      Number(andaime.biweeklyDirectValue || 0)
    )
    console.log(
      '  monthlyDirectValue:',
      Number(andaime.monthlyDirectValue || 0)
    )
    console.log('\n🔸 FLAGS DE USO:')
    console.log('  dailyUseDirectValue:', andaime.dailyUseDirectValue || false)
    console.log(
      '  weeklyUseDirectValue:',
      andaime.weeklyUseDirectValue || false,
      '← DEVE SER true!'
    )
    console.log(
      '  biweeklyUseDirectValue:',
      andaime.biweeklyUseDirectValue || false
    )
    console.log(
      '  monthlyUseDirectValue:',
      andaime.monthlyUseDirectValue || false
    )
    console.log('\n🎯 DESCONTOS (%):')
    console.log('  dailyDiscount:', andaime.dailyDiscount || 0)
    console.log('  weeklyDiscount:', andaime.weeklyDiscount || 0)
    console.log('  biweeklyDiscount:', andaime.biweeklyDiscount || 0)
    console.log('  monthlyDiscount:', andaime.monthlyDiscount || 0)
    console.log('='.repeat(60))

    if (!andaime.weeklyUseDirectValue) {
      console.log('\n⚠️  PROBLEMA ENCONTRADO!')
      console.log('   weeklyUseDirectValue = false (deveria ser true)')
      console.log('\n📝 SOLUÇÃO:')
      console.log('   1. Acesse: http://localhost:3000/admin/equipamentos')
      console.log('   2. Clique em "Editar" no Andaime Tubular H=2m')
      console.log('   3. Na seção "Período Semanal":')
      console.log('      - Marque "Usar Valor Direto?"')
      console.log('      - Digite 400 em "Valor Direto Semanal"')
      console.log('   4. Salve')
    }

    if (Number(andaime.weeklyDirectValue || 0) !== 400) {
      console.log('\n⚠️  PROBLEMA ENCONTRADO!')
      console.log(
        `   weeklyDirectValue = ${Number(andaime.weeklyDirectValue || 0)} (deveria ser 400)`
      )
      console.log('\n📝 SOLUÇÃO:')
      console.log(
        '   Configure R$ 400 no campo "Valor Direto Semanal" do admin'
      )
    }

    if (
      andaime.weeklyUseDirectValue &&
      Number(andaime.weeklyDirectValue) === 400
    ) {
      console.log('\n✅ CONFIGURAÇÃO CORRETA!')
      console.log(
        '   O equipamento ESTÁ configurado para usar valor direto semanal de R$ 400'
      )
      console.log('\n🔄 PRÓXIMO PASSO:')
      console.log('   1. Vá para http://localhost:3000/orcamento')
      console.log('   2. REMOVA o Andaime do carrinho (🗑️)')
      console.log('   3. ADICIONE novamente clicando no equipamento')
      console.log('   4. Agora deve funcionar com R$ 400!')
    }
  } catch (error) {
    console.error('❌ Erro ao verificar:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndaimePricing()
