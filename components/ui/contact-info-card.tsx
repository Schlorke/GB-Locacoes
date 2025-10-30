'use client'

import { usePublicSettings } from '@/hooks/use-public-settings'
import { Mail, MapPin, Phone } from 'lucide-react'

interface ContactInfoCardProps {
  className?: string
  email?: string
  phone?: string
  whatsapp?: string
  address?: string
  description?: string
}

export function ContactInfoCard({
  className = '',
  email,
  phone,
  whatsapp,
  address,
  description = 'Nossa equipe está pronta para esclarecer suas dúvidas.',
}: ContactInfoCardProps) {
  const { settings } = usePublicSettings()

  const primaryEmail = email || settings.contactEmail
  const secondaryEmail = settings.marketingEmail
  const primaryPhone = phone || settings.companyPhone
  const whatsappNumber = whatsapp || settings.whatsappNumber
  const companyAddress = address || settings.companyAddress

  return (
    <div
      className={`p-6 sm:p-7 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <div className="space-y-3.5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[20px] text-gray-900">
              Entre em Contato
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Respondemos com agilidade e transparência.
          </p>
        </div>

        <p className="text-[16px] text-gray-700 leading-relaxed">
          {description}
        </p>

        <div className="space-y-3 text-[16px] text-gray-700">
          <div className="flex items-start gap-2">
            <Mail className="w-5 h-5 min-w-5 min-h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">E-mail:</span>{' '}
              <a
                href={`mailto:${primaryEmail}`}
                className="hover:underline font-medium text-gray-800"
              >
                {primaryEmail}
              </a>
              {secondaryEmail && (
                <p className="text-sm text-gray-600">
                  {secondaryEmail} · automações e campanhas
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-5 h-5 min-w-5 min-h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-[16px]">
                <span className="font-medium">Telefone:</span>{' '}
                <a
                  href={`tel:+55${primaryPhone.replace(/\D/g, '')}`}
                  className="hover:underline font-medium text-gray-800"
                >
                  {primaryPhone}
                </a>
              </p>
              {whatsappNumber && (
                <p className="text-[16px]">
                  <span className="font-medium">WhatsApp:</span>{' '}
                  <a
                    href={`https://wa.me/55${whatsappNumber.replace(/\D/g, '')}`}
                    className="hover:underline text-gray-800"
                  >
                    {whatsappNumber}
                  </a>
                </p>
              )}
            </div>
          </div>

          {companyAddress && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 min-w-5 min-h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="whitespace-pre-line text-[16px]">
                <span className="font-medium">Endereço:</span> {companyAddress}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
