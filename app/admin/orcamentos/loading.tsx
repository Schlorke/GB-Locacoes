'use client';

import { motion } from 'framer-motion';

export default function AdminQuotesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  );
}
