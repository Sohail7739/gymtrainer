'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Target, TrendingUp, Apple, Dumbbell } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface ClientDashboardProps {
  user: any
  activeTab: string
}

export default function ClientDashboard({ user, activeTab }: ClientDashboardProps) {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [nutrition, setNutrition] = useState<any[]>([])
  const { language, t } = useLanguage()

  useEffect(() => {
    // Load user's workouts and nutrition plans
    const allWorkouts = JSON.parse(localStorage.getItem('rayaan_workouts') || '[]')
    const allNutrition = JSON.parse(localStorage.getItem('rayaan_nutrition') || '[]')
    
    setWorkouts(allWorkouts.filter((w: any) => w.clientId === user.id))
    setNutrition(allNutrition.filter((n: any) => n.clientId === user.id))
  }, [user.id])

  const renderOverview = () => (
    <div className={`space-y-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('dashboard.totalWorkouts')}</p>
              <p className="text-2xl font-bold text-white">{workouts.length}</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Dumbbell className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('dashboard.nutritionPlans')}</p>
              <p className="text-2xl font-bold text-white">{nutrition.length}</p>
            </div>
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <Apple className="h-8 w-8 text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('dashboard.daysActive')}</p>
              <p className="text-2xl font-bold text-white">
                {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{t('dashboard.progress')}</p>
              <p className="text-2xl font-bold text-white">85%</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Dumbbell className="h-5 w-5 text-orange-400 mr-2" />
            {t('dashboard.recentWorkouts')}
          </h3>
          {workouts.length > 0 ? (
            <div className="space-y-3">
              {workouts.slice(0, 3).map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div>
                    <p className="font-medium text-white">{workout.name}</p>
                    <p className="text-sm text-gray-400">{workout.duration} {t('dashboard.minutes')}</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full font-medium border border-orange-500/30">
                    {workout.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Dumbbell className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400">{t('dashboard.noWorkoutsYet')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('dashboard.trainerWillAssign')}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Apple className="h-5 w-5 text-teal-400 mr-2" />
            {t('dashboard.nutritionPlan')}
          </h3>
          {nutrition.length > 0 ? (
            <div className="space-y-3">
              {nutrition.slice(0, 3).map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div>
                    <p className="font-medium text-white">{plan.name}</p>
                    <p className="text-sm text-gray-400">{plan.calories} {t('dashboard.calories')}</p>
                  </div>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm rounded-full font-medium border border-teal-500/30">
                    {plan.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Apple className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-gray-400">{t('dashboard.noNutritionYet')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('dashboard.trainerWillCreate')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Dumbbell className="h-7 w-7 text-orange-400 mr-3" />
          My Workouts
        </h2>
        <div className="text-sm text-gray-400">
          Total: <span className="font-semibold text-orange-400">{workouts.length}</span>
        </div>
      </div>

      {workouts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300 group">
              <div className="relative h-48">
                <img 
                  src={getWorkoutImage(workout.type)}
                  alt={workout.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{workout.name}</h3>
                  <p className="text-sm opacity-90">{workout.type} Workout</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-orange-500/90 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    {workout.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-xl font-bold text-blue-400">{workout.duration}</div>
                    <div className="text-xs text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <div className="text-xl font-bold text-green-400">{workout.sets || 'N/A'}</div>
                    <div className="text-xs text-gray-400">Sets</div>
                  </div>
                </div>

                {workout.exercises && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Exercises:</h4>
                    <div className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-lg max-h-20 overflow-y-auto border border-gray-600">
                      {workout.exercises.split('\n').map((exercise: string, i: number) => (
                        <div key={i} className="mb-1">{exercise}</div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{workout.description}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg">
                    Start Workout
                  </button>
                  <button className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Calendar className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No Workouts Yet</h3>
          <p className="text-gray-400 mb-6">Your trainer will assign personalized workouts soon!</p>
          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-orange-400">
              💪 <strong>Coming Soon:</strong> Your customized workout plans will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const getWorkoutImage = (type: string) => {
    const images = {
      'Strength': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Cardio': 'https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'HIIT': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Flexibility': 'https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Functional': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    return images[type as keyof typeof images] || images.Strength
  }

  const renderNutrition = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Apple className="h-7 w-7 text-teal-400 mr-3" />
          Nutrition Plans
        </h2>
        <div className="text-sm text-gray-400">
          Total: <span className="font-semibold text-teal-400">{nutrition.length}</span>
        </div>
      </div>

      {nutrition.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutrition.map((plan, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden hover:border-teal-500/50 transition-all duration-300 group">
              <div className="relative h-48">
                <img 
                  src={getNutritionImage(plan.type)}
                  alt={plan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm opacity-90">{plan.type} Plan</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-teal-500/90 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                    {plan.calories} cal
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <div className="text-lg font-bold text-green-400">{plan.protein}g</div>
                    <div className="text-xs text-gray-400">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-lg font-bold text-blue-400">{plan.carbs}g</div>
                    <div className="text-xs text-gray-400">Carbs</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-yellow-500/20 rounded border border-yellow-500/30">
                    <div className="text-sm font-bold text-yellow-400">{plan.fat}g</div>
                    <div className="text-xs text-gray-400">Fat</div>
                  </div>
                  <div className="text-center p-2 bg-cyan-500/20 rounded border border-cyan-500/30">
                    <div className="text-sm font-bold text-cyan-400">{plan.waterIntake || '3'}L</div>
                    <div className="text-xs text-gray-400">Water</div>
                  </div>
                </div>

                {plan.meals && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Meal Plan:</h4>
                    <div className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-lg max-h-20 overflow-y-auto border border-gray-600">
                      {plan.meals.split('\n').slice(0, 3).map((meal: string, i: number) => (
                        <div key={i} className="mb-1">{meal}</div>
                      ))}
                      {plan.meals.split('\n').length > 3 && <div className="text-gray-500">...</div>}
                    </div>
                  </div>
                )}

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{plan.description}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg">
                    View Full Plan
                  </button>
                  <button className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Calendar className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No Nutrition Plans Yet</h3>
          <p className="text-gray-400 mb-6">Your trainer will create personalized nutrition plans for you!</p>
          <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-teal-400">
              🥗 <strong>Coming Soon:</strong> Your customized meal plans will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const getNutritionImage = (type: string) => {
    const images = {
      'Weight Loss': 'https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Muscle Gain': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Maintenance': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Performance': 'https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Cutting': 'https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bulking': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    return images[type as keyof typeof images] || images['Weight Loss']
  }

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Calendar className="h-7 w-7 text-blue-400 mr-3" />
        Schedule
      </h2>
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Schedule Coming Soon</h3>
          <p className="text-gray-400">Booking system will be available soon!</p>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg max-w-md mx-auto mt-4">
            <p className="text-sm text-blue-400">
              📅 <strong>Coming Soon:</strong> Book sessions with your trainer directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  switch (activeTab) {
    case 'workouts':
      return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          {renderWorkouts()}
        </div>
      )
    case 'nutrition':
      return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          {renderNutrition()}
        </div>
      )
    case 'schedule':
      return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          {renderSchedule()}
        </div>
      )
    default:
      return (
        <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300">
          {renderOverview()}
        </div>
      )
  }
}