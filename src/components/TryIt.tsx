"use client"

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export const TryIt = () => {
  const [copied, setCopied] = useState(false)
  const command = "npx gauravvv"
  const{t}=useLanguage();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <div className="animated-border-container w-fit mx-auto  group">
      <div className="inner-content gap-4 px-4 py-2 transition-all duration-300">
        
        {/* Label */}
        <span className="text-[13px] opacity-50 font-medium tracking-tight whitespace-nowrap">
          {t("tryIt")}
        </span>

        {/* Command Box */}
        <code className="font-mono text-sm bg-text-primary/5 border border-text-primary/10 px-2.5 py-1 rounded tracking-[0.3px] text-text-primary/90">
          {command}
        </code>

        {/* Copy Button */}
        <button 
          onClick={handleCopy}
          className="opacity-50 cursor-pointer p-1.5 rounded-md transition-all hover:bg-text-primary/10 hover:opacity-100 flex items-center justify-center"
          aria-label="Copy"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-text-primary" />
          )}
        </button>
      </div>
    </div>
  )
}