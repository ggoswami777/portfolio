import React from 'react'
import { ModeToggle } from './ModeToggle'
import { LanguageSelector } from './LanguageSelector'

function HeaderRight() {
  return (
    <div className='flex gap-5'>
      <ModeToggle/>
      <LanguageSelector/>
    </div>
  )
}

export default HeaderRight
