'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@payloadcms/ui'

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push('/admin/login')
        // Force a page refresh to clear any cached user state
        window.location.reload()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#dc2626',
        borderColor: '#dc2626',
        color: 'white',
        fontWeight: '600',
        padding: '8px 16px',
        borderRadius: '6px',
        border: '1px solid #dc2626',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'inline-block'
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = '#b91c1c'
        e.currentTarget.style.borderColor = '#b91c1c'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = '#dc2626'
        e.currentTarget.style.borderColor = '#dc2626'
      }}
      onClick={handleLogout}
      className={className}
    >
      Logout
    </div>
  )
}

export default LogoutButton