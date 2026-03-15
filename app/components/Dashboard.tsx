'use client'

import { useState } from 'react'
import { LogOut, Users, Dumbbell, Apple, Calendar, Settings, User, Plus } from 'lucide-react'
import ClientDashboard from './ClientDashboard'
import TrainerDashboard from './TrainerDashboard'

interface DashboardProps {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const isTrainer = user.role === 'trainer'

  const clientTabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-5 w-5" /> },
    { id: 'workouts', label: 'Workouts', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Apple className="h-5 w-5" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5" /> },
  ]

  const trainerTabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-5 w-5" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="h-5 w-5" /> },
    { id: 'workouts', label: 'Workouts', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Apple className="h-5 w-5" /> },
  ]

  const tabs = isTrainer ? trainerTabs : clientTabs

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold text-gray-900">Rayaan Fitness</span>
              </div>
              <div className="hidden md:block text-gray-500">|</div>
              <div className="hidden md:block">
                <span className="text-lg font-medium text-gray-700">
                  Welcome, {user.name}
                </span>
                <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                  {isTrainer ? 'Trainer' : 'Client'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
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
        {isTrainer ? (
          <TrainerDashboard user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <ClientDashboard user={user} activeTab={activeTab} />
        )}
      </main>
    </div>
  )
}