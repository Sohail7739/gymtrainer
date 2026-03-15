'use client'

import { useState } from 'react'
import { LogOut, Users, Dumbbell, Apple, Calendar, Settings, User, Plus } from 'lucide-react'
import ClientDashboard from './ClientDashboard'
import TrainerDashboard from './TrainerDashboard'
import { useLanguage } from '../context/LanguageContext'

interface DashboardProps {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const { language, t } = useLanguage()

  const isTrainer = user.role === 'trainer'

  const clientTabs = [
    { id: 'overview', label: t('dashboard.overview'), icon: <User className="h-5 w-5" /> },
    { id: 'workouts', label: t('dashboard.workouts'), icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'nutrition', label: t('dashboard.nutrition'), icon: <Apple className="h-5 w-5" /> },
    { id: 'schedule', label: t('dashboard.schedule'), icon: <Calendar className="h-5 w-5" /> },
  ]

  const trainerTabs = [
    { id: 'overview', label: t('dashboard.overview'), icon: <User className="h-5 w-5" /> },
    { id: 'clients', label: t('dashboard.clients'), icon: <Users className="h-5 w-5" /> },
    { id: 'workouts', label: t('dashboard.workouts'), icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'nutrition', label: t('dashboard.nutrition'), icon: <Apple className="h-5 w-5" /> },
  ]

  const tabs = isTrainer ? trainerTabs : clientTabs

  return (
    <div className={`min-h-screen bg-dark-800 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-dark-900 shadow-2xl border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-primary-500" />
                <span className="text-2xl font-bold text-white">
                  {language === 'ar' ? 'ريان فيتنس' : 'Rayaan Fitness'}
                </span>
              </div>
              <div className="hidden md:block text-gray-500">|</div>
              <div className="hidden md:block">
                <span className="text-lg font-medium text-gray-300">
                  {t('dashboard.welcome')}, {user.name}
                </span>
                <span className="ml-2 px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full border border-primary-500/30">
                  {isTrainer ? t('dashboard.trainer') : t('dashboard.client')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-primary-500 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:block">{t('dashboard.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex space-x-8 overflow-x-auto ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500 transform scale-105'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600 hover:scale-102'
                } ${language === 'ar' ? 'space-x-reverse' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-500 ease-in-out">
          {isTrainer ? (
            <TrainerDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <ClientDashboard user={user} activeTab={activeTab} />
          )}
        </div>
      </main>
    </div>
  )
}