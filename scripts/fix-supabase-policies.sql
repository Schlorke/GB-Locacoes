-- Script para corrigir políticas RLS duplicadas no Supabase
-- Este script remove as políticas "bypass" que estão causando problemas de performance

-- =====================================
-- CATEGORIES - Remover política bypass
-- =====================================
DROP POLICY IF EXISTS "Categories bypass for postgres" ON public.categories;

-- =====================================
-- EQUIPMENTS - Remover política bypass  
-- =====================================
DROP POLICY IF EXISTS "Equipment bypass for postgres" ON public.equipments;

-- =====================================
-- QUOTES - Remover política bypass
-- =====================================
DROP POLICY IF EXISTS "Quotes bypass for postgres" ON public.quotes;

-- =====================================
-- SETTINGS - Remover política bypass
-- =====================================  
DROP POLICY IF EXISTS "Settings bypass for postgres" ON public.settings;

-- =====================================
-- USERS - Remover política bypass
-- =====================================
DROP POLICY IF EXISTS "Users bypass for postgres" ON public.users;

-- =====================================
-- Verificar se as políticas restantes estão funcionando
-- =====================================

-- Verificar políticas ativas em categories
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'categories'
ORDER BY tablename, policyname;

-- Verificar políticas ativas em equipments  
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'equipments'
ORDER BY tablename, policyname;

-- Verificar políticas ativas em quotes
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies  
WHERE schemaname = 'public' AND tablename = 'quotes'
ORDER BY tablename, policyname;

-- Verificar políticas ativas em settings
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'settings' 
ORDER BY tablename, policyname;

-- Verificar políticas ativas em users
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'users'
ORDER BY tablename, policyname;
