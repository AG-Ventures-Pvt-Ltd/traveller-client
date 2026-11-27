import React from 'react'
import Link from 'next/link'

const Logo = ({ className = '' }) => (
  <Link href="/" aria-label="Wondrr home" className={`text-3xl font-bold cursor-pointer ${className}`}>Wondrr</Link>
)

export default Logo
