-- 🛡️ CORREÇÃO COMPLETA DE RLS - SUPABASE GB-LOCAÇÕES
-- Execute este script no SQL Editor do Supabase para resolver os 12 erros de segurança

-- =====================================================
-- 1. HABILITAR ROW LEVEL SECURITY (RLS) EM TODAS AS TABELAS
-- =====================================================

-- Habilitar RLS nas tabelas principais
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verificationtokens ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. CRIAR POLÍTICAS DE SEGURANÇA PARA USUÁRIOS
-- =====================================================

-- Política: Usuários só podem ver seus próprios dados
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id);

-- Política: Usuários só podem atualizar seus próprios dados
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id);

-- Política: Usuários só podem inserir seus próprios dados
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = id);

-- =====================================================
-- 3. POLÍTICAS PARA EQUIPAMENTOS (VISÍVEIS PARA TODOS)
-- =====================================================

-- Política: Equipamentos são visíveis para todos (público)
DROP POLICY IF EXISTS "Equipment is viewable by everyone" ON public.equipments;
CREATE POLICY "Equipment is viewable by everyone" ON public.equipments
    FOR SELECT USING (true);

-- Política: Apenas admins podem modificar equipamentos
DROP POLICY IF EXISTS "Only admins can modify equipment" ON public.equipments;
CREATE POLICY "Only admins can modify equipment" ON public.equipments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 4. POLÍTICAS PARA CATEGORIAS (VISÍVEIS PARA TODOS)
-- =====================================================

-- Política: Categorias são visíveis para todos
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Política: Apenas admins podem modificar categorias
DROP POLICY IF EXISTS "Only admins can modify categories" ON public.categories;
CREATE POLICY "Only admins can modify categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 5. POLÍTICAS PARA ORÇAMENTOS
-- =====================================================

-- Política: Usuários veem apenas seus próprios orçamentos
DROP POLICY IF EXISTS "Users can view own quotes" ON public.quotes;
CREATE POLICY "Users can view own quotes" ON public.quotes
    FOR SELECT USING (
        auth.uid()::text = "userId" OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- Política: Usuários podem criar seus próprios orçamentos
DROP POLICY IF EXISTS "Users can create own quotes" ON public.quotes;
CREATE POLICY "Users can create own quotes" ON public.quotes
    FOR INSERT WITH CHECK (
        auth.uid()::text = "userId" OR
        "userId" IS NULL -- Para orçamentos anônimos
    );

-- Política: Apenas admins podem modificar orçamentos
DROP POLICY IF EXISTS "Only admins can modify quotes" ON public.quotes;
CREATE POLICY "Only admins can modify quotes" ON public.quotes
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 6. POLÍTICAS PARA ITENS DE ORÇAMENTO
-- =====================================================

-- Política: Usuários veem itens de seus próprios orçamentos
DROP POLICY IF EXISTS "Users can view own quote items" ON public.quote_items;
CREATE POLICY "Users can view own quote items" ON public.quote_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.quotes 
            WHERE quotes.id = "quoteId" AND
            (quotes."userId" = auth.uid()::text OR
             EXISTS (
                 SELECT 1 FROM public.users 
                 WHERE users.id = auth.uid()::text 
                 AND users.role = 'ADMIN'
             ))
        )
    );

-- =====================================================
-- 7. POLÍTICAS PARA LOCAÇÕES
-- =====================================================

-- Política: Usuários veem apenas suas próprias locações
DROP POLICY IF EXISTS "Users can view own rentals" ON public.rentals;
CREATE POLICY "Users can view own rentals" ON public.rentals
    FOR SELECT USING (
        auth.uid()::text = "userid" OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- Política: Usuários podem criar suas próprias locações
DROP POLICY IF EXISTS "Users can create own rentals" ON public.rentals;
CREATE POLICY "Users can create own rentals" ON public.rentals
    FOR INSERT WITH CHECK (auth.uid()::text = "userid");

-- =====================================================
-- 8. POLÍTICAS PARA CONFIGURAÇÕES (APENAS ADMINS)
-- =====================================================

-- Política: Apenas admins podem acessar configurações
DROP POLICY IF EXISTS "Only admins can access settings" ON public.settings;
CREATE POLICY "Only admins can access settings" ON public.settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 9. POLÍTICAS PARA NEXT-AUTH (APENAS ADMINS)
-- =====================================================

-- Política: Apenas admins podem acessar tabelas do NextAuth
DROP POLICY IF EXISTS "Only admins can access NextAuth tables" ON public.accounts;
CREATE POLICY "Only admins can access NextAuth tables" ON public.accounts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

DROP POLICY IF EXISTS "Only admins can access NextAuth tables" ON public.sessions;
CREATE POLICY "Only admins can access NextAuth tables" ON public.sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

DROP POLICY IF EXISTS "Only admins can access NextAuth tables" ON public.verificationtokens;
CREATE POLICY "Only admins can access NextAuth tables" ON public.verificationtokens
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.id = auth.uid()::text 
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 10. VERIFICAÇÃO FINAL
-- =====================================================

-- Verificar se RLS está habilitado em todas as tabelas
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN '✅ RLS ATIVO'
        ELSE '❌ RLS INATIVO'
    END as status_rls
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'users', 'accounts', 'sessions', 'equipments', 
    'categories', 'quotes', 'quote_items', 'rentals', 
    'rental_items', 'settings', 'verificationtokens'
)
ORDER BY tablename;

-- Verificar políticas criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Contar total de políticas criadas
SELECT 
    COUNT(*) as total_policies,
    COUNT(DISTINCT tablename) as total_tables_with_policies
FROM pg_policies 
WHERE schemaname = 'public';
