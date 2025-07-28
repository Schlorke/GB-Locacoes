'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CloseButton } from '@/components/ui/close-button';

type MessageSender = 'bot' | 'user';

interface ChatMessage {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: Date;
}

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
`;

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: '👷‍♂️ Olá! Precisa de equipamentos para sua obra? Somos especialistas em locação de equipamentos para construção civil e serviços em altura!',
      sender: 'bot' as MessageSender,
      timestamp: new Date(),
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(1); // Contador de mensagens não lidas
  const [showQuickMessages, setShowQuickMessages] = useState(true);

  const whatsappNumber = '5551998205163'; // WhatsApp da GB Locações

  useEffect(() => {
    // Quando o chat é aberto, marcar mensagens como lidas
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user' as MessageSender,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setShowQuickMessages(false); // Hide quick messages after user sends a message

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        text: 'Obrigado pela mensagem! Vou te redirecionar para o WhatsApp onde nossos especialistas podem te atender melhor. 📱',
        sender: 'bot' as MessageSender,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);

      // Se o chat não estiver aberto, incrementar contador de não lidas
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }

      // Redirect to WhatsApp after bot response
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(
          `Olá! Vim do site da GB Locações e gostaria de solicitar informações sobre locação de equipamentos para construção civil. Minha mensagem: ${message}`,
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        setIsOpen(false);
        setMessage('');
        setShowQuickMessages(true); // Reset for next time
      }, 1500);
    }, 1000);

    setMessage('');
  };

  const handleQuickMessage = (quickMessage: string) => {
    const whatsappMessage = encodeURIComponent(
      `Olá! Vim do site da GB Locações e gostaria de ${quickMessage}`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    setIsOpen(false);
    setShowQuickMessages(true); // Reset for next time
  };

  const quickMessages = [
    'solicitar um orçamento de equipamentos',
    'saber sobre andaimes suspensos',
    'informações sobre cadeiras elétricas',
    'conhecer todos os equipamentos disponíveis',
  ];

  return (
    <>
      <style jsx>{scrollbarStyles}</style>
      {/* Chat Window */}
      {isOpen && (
        <div className="whatsapp-chat-window fixed bottom-24 right-4 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border z-50 h-[500px] flex flex-col overflow-hidden">
          {/* Header - cor verde WhatsApp e sem bordas brancas */}
          <div className="whatsapp-header text-white p-4 flex items-center justify-between rounded-t-xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">GB</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">GB Locações</h3>
                <p className="text-sm text-green-100">Equipamentos para Construção</p>
              </div>
            </div>
            <CloseButton
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 hover:text-white"
              variant="ghost"
              size="sm"
            />
          </div>

          {/* Messages + Quick Messages - área flexível */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto whatsapp-chat-scroll bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'whatsapp-green text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none border'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-xs mt-1 opacity-70 ${
                        msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Messages - apenas quando não há conversa */}
            {showQuickMessages && messages.length === 1 && (
              <div className="shrink-0 p-3 border-t bg-white">
                <p className="text-xs text-gray-600 mb-2 font-medium">Mensagens rápidas:</p>
                <div className="space-y-1 max-h-20 overflow-y-auto whatsapp-chat-scroll">
                  {quickMessages.map((quickMsg, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(quickMsg)}
                      className="block w-full text-left text-xs p-2 hover:bg-green-50 hover:text-green-700 rounded transition-colors border border-gray-200 hover:border-green-300"
                    >
                      • {quickMsg}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input - sempre visível no fundo */}
          <div className="whatsapp-input-area shrink-0 p-4 border-t bg-white">
            <div className="flex gap-3 items-end">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-12 text-base border-2 border-gray-200 focus:border-green-500 rounded-lg px-4"
              />
              <Button
                onClick={handleSendMessage}
                size="lg"
                disabled={!message.trim()}
                className="whatsapp-green text-white h-12 w-12 rounded-lg hover:scale-105 transition-transform"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button - cor verde WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification Badge - estilo numérico */}
        {unreadCount > 0 && !isOpen && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white shadow-lg z-10">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}

        {isOpen ? (
          <CloseButton
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="md"
            className="w-14! h-14! rounded-full! text-white! shadow-lg! hover:shadow-xl! transition-all! duration-300! hover:scale-110! border-0! bg-green-500! hover:bg-green-600!"
            aria-label="Fechar chat do WhatsApp"
          />
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="whatsapp-green w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Abrir chat do WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
}
