import {
  Bot,
  FileText,
  Sparkles,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function DRIRAGShowcase() {
  return (
    <section id='ai-assistant' className='py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <Badge className='mb-4 px-4 py-1.5'>
            <Sparkles className='w-3.5 h-3.5 mr-2' />
            AI-Powered RAG
          </Badge>

          <h2 className='mb-4 text-4xl md:text-5xl' style={{ fontWeight: 700 }}>
            Ask Your Research Data
          </h2>

          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            DRI uses AI to answer questions from your research documents with
            relevant sources and citations.
          </p>
        </div>

        {/* AI Assistant Showcase */}
        <div className='max-w-3xl mx-auto'>
          <Card className='p-6 border-2 overflow-hidden'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white'>
                <Bot className='w-5 h-5' />
              </div>

              <div>
                <h3 style={{ fontWeight: 600 }}>DRI Assistant</h3>
                <p className='text-sm text-muted-foreground'>
                  AI-powered document assistant
                </p>
              </div>

              <div className='ml-auto'>
                <span className='flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400'>
                  <span className='w-2 h-2 rounded-full bg-green-500' />
                  Online
                </span>
              </div>
            </div>

            {/* User Message */}
            <div className='flex justify-end mb-4'>
              <div className='max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3'>
                <p className='text-sm'>
                  Apa database yang digunakan dalam project DRI?
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className='flex gap-3 mb-6'>
              <div className='w-8 h-8 shrink-0 rounded-lg bg-muted flex items-center justify-center'>
                <Bot className='w-4 h-4' />
              </div>

              <div className='flex-1'>
                <div className='rounded-2xl rounded-tl-md bg-muted/60 px-4 py-3'>
                  <p className='text-sm leading-relaxed'>
                    Database yang digunakan dalam project DRI adalah{' '}
                    <strong>MySQL</strong> [2]. MySQL digunakan untuk menyimpan
                    data relasional seperti Registry Identitas Sumber Daya, data
                    jurnal, dan data paket berlangganan [3].
                  </p>
                </div>

                {/* Sources */}
                <div className='mt-3'>
                  <p className='text-xs text-muted-foreground mb-2'>Sources</p>

                  <div className='flex flex-wrap gap-2'>
                    <div className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-background text-xs'>
                      <FileText className='w-3.5 h-3.5' />
                      Page 12
                      <ExternalLink className='w-3 h-3 text-muted-foreground' />
                    </div>

                    <div className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-background text-xs'>
                      <FileText className='w-3.5 h-3.5' />
                      Page 12
                      <ExternalLink className='w-3 h-3 text-muted-foreground' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fake Input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className='flex items-center gap-2 border rounded-xl px-4 py-3 bg-background'
            >
              <MessageSquare className='w-4 h-4 text-muted-foreground' />

              <span className='text-sm text-muted-foreground flex-1'>
                Ask about the DRI project...
              </span>

              <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center'>
                <Sparkles className='w-4 h-4 text-muted-foreground' />
              </div>
            </motion.div>
          </Card>
        </div>
      </div>
    </section>
  );
}
