"use client"

import React, { useState } from 'react'
import { ModeToggle } from './ModeToggle'
import { LanguageSelector } from './LanguageSelector'
import { ControlK } from './ControlK'
import { Sidebar } from './Sidebar'
import { Menu } from 'lucide-react'

function HeaderRight() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex items-center gap-3 sm:gap-5'>
      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-3'>
        <ControlK />
        <ModeToggle />
        <LanguageSelector />
      </div>

      {/* Mobile Menu Icon only */}
      <div className='md:hidden flex items-center'>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md border border-[#27272a] bg-black text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}

export default HeaderRight