'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import ImageGallery from './components/ImageGallery'
import Contact from './components/Contact'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedUser = localStorage.getItem('rayaan_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem('rayaan_user', JSON.stringify(userData))
    setIsAuthOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('rayaan_user')
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Rayaan Fitness...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onAuthClick={() => setIsAuthOpen(true)} />
      <Hero onGetStarted={() => setIsAuthOpen(true)} />
      <Features />
      <About />
      <ImageGallery />
      <Contact />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
    </main>
  )
}