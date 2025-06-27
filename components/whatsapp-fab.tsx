"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const scrollbarStyles = `
  .whatsapp-chat-scroll::-webkit-scrollbar {
    width: 6px;
  }
  
  .whatsapp-chat-scroll::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
  }
  
  .whatsapp-chat-scroll::-webkit-scrollbar-thumb {
    background: #25D366;
    border-radius: 3px;
    opacity: 0.7;
  }
  
  .whatsapp-chat-scroll::-webkit-scrollbar-thumb:hover {
    background: #128C7E;
    opacity: 1;
  }
  
  .whatsapp-chat-scroll {
    scrollbar-width: thin;
    scrollbar-color: #25D366 #f0f0f0;
  }
`

type ChatMessage = {
  id: number
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text:
        "👷‍♂️ Olá! Precisa de equipamentos para sua obra? Somos especialistas em locação de equipamentos para construção civil e serviços em altura!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [unreadCount, setUnreadCount] = useState(1) // Contador de mensagens não lidas
  const [showQuickMessages, setShowQuickMessages] = useState(true)

  const whatsappNumber = "5551998205163" // WhatsApp da GB Locações

  useEffect(() => {
    // Quando o chat é aberto, marcar mensagens como lidas
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setShowQuickMessages(false) // Hide quick messages after user sends a message

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        text:
          "Obrigado pela mensagem! Vou te redirecionar para o WhatsApp onde nossos especialistas podem te atender melhor. 📱",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])

      // Se o chat não estiver aberto, incrementar contador de não lidas
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }

      // Redirect to WhatsApp after bot response
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(
          `Olá! Vim do site da GB Locações e gostaria de solicitar informações sobre locação de equipamentos para construção civil. Minha mensagem: ${message}`,
        )
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
        setIsOpen(false)
        setMessage("")
        setShowQuickMessages(true) // Reset for next time
      }, 1500)
    }, 1000)

    setMessage("")
  }

  const handleQuickMessage = (quickMessage: string) => {
    const whatsappMessage = encodeURIComponent(`Olá! Vim do site da GB Locações e gostaria de ${quickMessage}`)
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
    setIsOpen(false)
    setShowQuickMessages(true) // Reset for next time
  }

  const quickMessages = [
    "solicitar um orçamento de equipamentos",
    "saber sobre andaimes suspensos",
    "informações sobre cadeiras elétricas",
    "conhecer todos os equipamentos disponíveis",
  ]

  return (
    <>
      <style jsx>{scrollbarStyles}</style>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border z-50 max-h-[500px] flex flex-col overflow-hidden">
          {/* Header - cor verde WhatsApp e sem bordas brancas */}
          <div
            className="text-white p-4 flex items-center justify-between rounded-t-lg"
            style={{ backgroundColor: "#25D366" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">GB</span>
              </div>
              <div>
                <h3 className="font-semibold">GB Locações</h3>
                <p className="text-xs text-green-100">Equipamentos para Construção</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 p-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages - área expandida */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[200px] whatsapp-chat-scroll">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    msg.sender === "user" ? "text-white" : "bg-gray-100 text-gray-900"
                  }`}
                  style={msg.sender === "user" ? { backgroundColor: "#25D366" } : {}}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Messages - apenas quando não há conversa */}
          {showQuickMessages && messages.length === 1 && (
            <div className="p-3 border-t bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Mensagens rápidas:</p>
              <div className="space-y-1 max-h-24 overflow-y-auto whatsapp-chat-scroll">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(quickMsg)}
                    className="block w-full text-left text-xs p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors"
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t flex gap-2 bg-white">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              disabled={!message.trim()}
              className="text-white h-10"
              style={{ backgroundColor: "#25D366" }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* FAB Button - cor verde WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification Badge - estilo numérico */}
        {unreadCount > 0 && !isOpen && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white shadow-lg z-10">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{ backgroundColor: "#25D366" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#128C7E"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#25D366"
          }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  )
}
