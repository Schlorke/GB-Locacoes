'use client'

import { motion } from 'framer-motion'
import { Calendar, FileText, Home, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LegalPageLayoutProps {
  title: string
  lastUpdate: string
  icon: ReactNode
  children: ReactNode
  sections?: Array<{
    id: string
    title: string
  }>
}

export function LegalPageLayout({
  title,
  lastUpdate,
  icon,
  children,
  sections = [],
}: LegalPageLayoutProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120 // Altura do header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/10 to-orange-700/10"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-xl">
              {icon}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-sm">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-orange-50">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                Última atualização: {lastUpdate}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="rgb(248, 250, 252)"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop Sidebar */}
          {sections.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-32">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4 text-orange-600">
                    <FileText className="w-5 h-5" />
                    <h2 className="font-semibold text-sm uppercase tracking-wide">
                      Índice
                    </h2>
                  </div>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 flex items-center gap-2 group"
                      >
                        <span className="text-xs text-gray-400 group-hover:text-orange-600 w-6">
                          {index + 1}.
                        </span>
                        <span className="flex-1">{section.title}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={sections.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 lg:p-12">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
