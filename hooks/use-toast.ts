/**
 * Wrapper de compatibilidade para toast
 *
 * Este arquivo re-exporta a API do Sonner para manter compatibilidade
 * com componentes antigos que ainda usam `import { toast } from '@/hooks/use-toast'`
 *
 * @deprecated Prefira importar diretamente do Sonner: `import { toast } from 'sonner'`
 */

export { toast } from 'sonner'
