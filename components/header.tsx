'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Search, User, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInternalNavigation = () => {
    sessionStorage.setItem('internalNavigation', 'true');
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Equipamentos', href: '/equipamentos' },
    { name: 'Orçamento', href: '/orcamento' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header className="fixed top-0 left-0 w-screen z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-slate-700 text-white py-2 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                (51) 2313-6262
              </span>
              <span className="hidden md:inline">
                Atendimento especializado • Entrega em toda região de Porto Alegre
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hover:text-gray-300 transition-colors"
                onClick={handleInternalNavigation}
              >
                Área do Cliente
              </Link>
              <Link
                href="/admin/login"
                className="hover:text-gray-300 transition-colors"
                onClick={handleInternalNavigation}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={handleInternalNavigation}>
            <div className="bg-slate-700 text-white p-2 rounded-lg font-bold text-lg">GB</div>
            <div>
              <div className="font-bold text-lg text-gray-900">GB Locações</div>

              <div className="text-xs text-gray-500">Equipamentos para Construção</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-orange-600 font-medium transition-colors group"
                onClick={handleInternalNavigation}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-600">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-600">
              <User className="h-5 w-5" />
              <span className="sr-only">Minha conta</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-600">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-700 hover:text-orange-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  onClick={handleInternalNavigation}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t space-y-2">
              <Button variant="outline" asChild className="w-full h-12">
                <Link href="/login" onClick={handleInternalNavigation}>
                  Área do Cliente
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
