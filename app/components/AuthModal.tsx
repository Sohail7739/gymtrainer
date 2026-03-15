'use client'

import { useState } from 'react'
import { X, User, Mail, Lock, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: any) => void
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goals: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('rayaan_users') || '[]')
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)
      
      if (user) {
        onLogin(user)
      } else {
        alert(language === 'ar' ? 'بيانات اعتماد غير صحيحة' : 'Invalid credentials')
      }
    } else {
      // Register logic
      const users = JSON.parse(localStorage.getItem('rayaan_users') || '[]')
      const newUser = {
        id: Date.now(),
        ...formData,
        role: 'client',
        joinDate: new Date().toISOString(),
        workouts: [],
        nutrition: []
      }
      
      users.push(newUser)
      localStorage.setItem('rayaan_users', JSON.stringify(users))
      onLogin(newUser)
    }
  }

  const handleTrainerLogin = () => {
    const trainerUser = {
      id: 'trainer',
      name: language === 'ar' ? 'ريان' : 'Rayaan',
      email: 'rayaan@fitness.sa',
      role: 'trainer'
    }
    onLogin(trainerUser)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? t('auth.welcomeBack') : t('auth.joinRayaan')}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                <input
                  type="text"
                  placeholder={t('auth.fullName')}
                  className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
              <input
                type="email"
                placeholder={t('auth.emailAddress')}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="relative">
              <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
              <input
                type="password"
                placeholder={t('auth.password')}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <Phone className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
                  <input
                    type="tel"
                    placeholder={t('auth.phoneNumber')}
                    className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder={t('auth.age')}
                    className={`px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder={t('auth.weight')}
                    className={`px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder={t('auth.height')}
                    className={`px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>

                <textarea
                  placeholder={t('auth.fitnessGoals')}
                  rows={3}
                  className={`w-full px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg"
            >
              {isLogin ? t('auth.signIn') : t('auth.createAccount')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={handleTrainerLogin}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg"
            >
              {t('auth.loginAsTrainer')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}