import { useState } from 'react';
import { Bot, X, Send, FileText, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Source {
  citation: number;
  page: number;
  source: string;
  chunk_id: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

const API_URL = 'http://127.0.0.1:8000';

export function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the DRI Assistant. Ask me anything about the DRI project documentation.",
    },
  ]);

  const sendMessage = async (text?: string) => {
    const question = (text ?? message).trim();

    if (!question || isLoading) {
      return;
    }

    setMessage('');

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: question,
      },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch (error) {
      console.error('Failed to send question:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Maaf, terjadi kesalahan saat menghubungi DRI Assistant. Pastikan backend API sedang berjalan.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md overflow-hidden rounded-2xl border bg-background shadow-2xl'
          >
            {/* Header */}
            <div className='flex items-center gap-3 border-b px-4 py-3'>
              <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white'>
                <Bot className='w-5 h-5' />
              </div>

              <div className='flex-1'>
                <p className='text-sm font-semibold'>DRI Assistant</p>

                <p className='text-xs text-muted-foreground'>
                  Ask about the DRI project
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className='w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors'
                aria-label='Close chatbot'
              >
                <X className='w-4 h-4' />
              </button>
            </div>

            {/* Messages */}
            <div className='h-[380px] overflow-y-auto p-4 space-y-4'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    msg.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className='w-7 h-7 shrink-0 rounded-lg bg-muted flex items-center justify-center'>
                      <Bot className='w-3.5 h-3.5' />
                    </div>
                  )}

                  <div className='max-w-[85%]'>
                    <div
                      className={
                        msg.role === 'user'
                          ? 'rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 py-2.5'
                          : 'rounded-2xl rounded-tl-md bg-muted/60 px-3 py-2.5'
                      }
                    >
                      <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                        {msg.content}
                      </p>
                    </div>

                    {/* Sources */}
                    {msg.role === 'assistant' &&
                      msg.sources &&
                      msg.sources.length > 0 && (
                        <div className='mt-2 space-y-1.5'>
                          <p className='text-xs text-muted-foreground'>
                            Sources
                          </p>

                          <div className='flex flex-wrap gap-1.5'>
                            {msg.sources.map((source) => (
                              <div
                                key={`${source.citation}-${source.chunk_id}`}
                                className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-background text-xs'
                              >
                                <FileText className='w-3 h-3' />

                                <span>
                                  [{source.citation}] Page {source.page}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className='flex gap-2'>
                  <div className='w-7 h-7 shrink-0 rounded-lg bg-muted flex items-center justify-center'>
                    <Bot className='w-3.5 h-3.5' />
                  </div>

                  <div className='rounded-2xl rounded-tl-md bg-muted/60 px-3 py-2.5'>
                    <div className='flex items-center gap-2'>
                      <Loader2 className='w-4 h-4 animate-spin' />

                      <span className='text-sm text-muted-foreground'>
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {messages.length === 1 && !isLoading && (
                <div className='pt-2'>
                  <p className='text-xs text-muted-foreground mb-2'>
                    Try asking
                  </p>

                  <div className='flex flex-wrap gap-2'>
                    <button
                      onClick={() =>
                        sendMessage(
                          'Apa database yang digunakan dalam project DRI?',
                        )
                      }
                      className='text-xs border rounded-lg px-2.5 py-1.5 hover:bg-muted transition-colors'
                    >
                      Database DRI?
                    </button>

                    <button
                      onClick={() =>
                        sendMessage('Teknologi apa yang digunakan?')
                      }
                      className='text-xs border rounded-lg px-2.5 py-1.5 hover:bg-muted transition-colors'
                    >
                      Teknologi?
                    </button>

                    <button
                      onClick={() =>
                        sendMessage('Bagaimana resolver DRI bekerja?')
                      }
                      className='text-xs border rounded-lg px-2.5 py-1.5 hover:bg-muted transition-colors'
                    >
                      Cara kerja resolver?
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className='border-t p-3'>
              <div className='flex items-center gap-2 rounded-xl border bg-background px-3 py-2'>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder='Ask about DRI...'
                  disabled={isLoading}
                  className='flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50'
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!message.trim() || isLoading}
                  className='w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
                  aria-label='Send message'
                >
                  {isLoading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Send className='w-4 h-4' />
                  )}
                </button>
              </div>

              <div className='flex items-center justify-center gap-1 mt-2'>
                <Sparkles className='w-3 h-3 text-muted-foreground' />

                <p className='text-[10px] text-muted-foreground'>
                  Powered by DRI-RAG
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-lg flex items-center justify-center'
        aria-label='Open DRI Assistant'
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className='w-6 h-6' />
            </motion.div>
          ) : (
            <motion.div
              key='bot'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Bot className='w-6 h-6' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
