'use client'

import { useState } from 'react'
import { Menu, X, Dumbbell, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface HeaderProps {
  onAuthClick: () => void
}

export default function Header({ onAuthClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'ريان فيتنس' : 'Rayaan Fitness'}
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-600 transition-colors">{t('nav.home')}</a>
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">{t('nav.services')}</a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">{t('nav.about')}</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors">{t('nav.contact')}</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <button 
              onClick={onAuthClick}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('nav.login')}
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-primary-600">{t('nav.home')}</a>
              <a href="#features" className="text-gray-700 hover:text-primary-600">{t('nav.services')}</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600">{t('nav.about')}</a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600">{t('nav.contact')}</a>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              <button 
                onClick={onAuthClick}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 w-full"
              >
                {t('nav.login')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}