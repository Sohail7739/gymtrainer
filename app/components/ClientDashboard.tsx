'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Target, TrendingUp, Apple, Dumbbell } from 'lucide-react'

interface ClientDashboardProps {
  user: any
  activeTab: string
}

export default function ClientDashboard({ user, activeTab }: ClientDashboardProps) {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [nutrition, setNutrition] = useState<any[]>([])

  useEffect(() => {
    // Load user's workouts and nutrition plans
    const allWorkouts = JSON.parse(localStorage.getItem('rayaan_workouts') || '[]')
    const allNutrition = JSON.parse(localStorage.getItem('rayaan_nutrition') || '[]')
    
    setWorkouts(allWorkouts.filter((w: any) => w.clientId === user.id))
    setNutrition(allNutrition.filter((n: any) => n.clientId === user.id))
  }, [user.id])

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
            </div>
            <Dumbbell className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nutrition Plans</p>
              <p className="text-2xl font-bold text-gray-900">{nutrition.length}</p>
            </div>
            <Apple className="h-8 w-8 text-secondary-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Days Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
          {workouts.length > 0 ? (
            <div className="space-y-3">
              {workouts.slice(0, 3).map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{workout.name}</p>
                    <p className="text-sm text-gray-600">{workout.duration} minutes</p>
                  </div>
                  <span className="text-sm text-primary-600 font-medium">{workout.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No workouts assigned yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Plan</h3>
          {nutrition.length > 0 ? (
            <div className="space-y-3">
              {nutrition.slice(0, 3).map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{plan.name}</p>
                    <p className="text-sm text-gray-600">{plan.calories} calories</p>
                  </div>
                  <span className="text-sm text-secondary-600 font-medium">{plan.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No nutrition plan assigned yet</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Workouts</h2>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold text-blue-600">{workouts.length}</span>
        </div>
      </div>

      {workouts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48">
                <img 
                  src={getWorkoutImage(workout.type)}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{workout.name}</h3>
                  <p className="text-sm opacity-90">{workout.type} Workout</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs rounded-full font-medium">
                    {workout.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{workout.duration}</div>
                    <div className="text-xs text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{workout.sets || 'N/A'}</div>
                    <div className="text-xs text-gray-600">Sets</div>
                  </div>
                </div>

                {workout.exercises && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Exercises:</h4>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg max-h-20 overflow-y-auto">
                      {workout.exercises.split('\n').map((exercise: string, i: number) => (
                        <div key={i} className="mb-1">{exercise}</div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{workout.description}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    Start Workout
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Workouts Yet</h3>
          <p className="text-gray-600 mb-6">Your trainer will assign personalized workouts soon!</p>
          <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-blue-700">
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
        <h2 className="text-2xl font-bold text-gray-900">Nutrition Plans</h2>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold text-green-600">{nutrition.length}</span>
        </div>
      </div>

      {nutrition.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutrition.map((plan, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48">
                <img 
                  src={getNutritionImage(plan.type)}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm opacity-90">{plan.type} Plan</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-secondary-600 text-white text-xs rounded-full font-medium">
                    {plan.calories} cal
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{plan.protein}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{plan.carbs}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="text-sm font-bold text-yellow-600">{plan.fat}g</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                  <div className="text-center p-2 bg-cyan-50 rounded">
                    <div className="text-sm font-bold text-cyan-600">{plan.waterIntake || '3'}L</div>
                    <div className="text-xs text-gray-600">Water</div>
                  </div>
                </div>

                {plan.meals && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Meal Plan:</h4>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg max-h-20 overflow-y-auto">
                      {plan.meals.split('\n').slice(0, 3).map((meal: string, i: number) => (
                        <div key={i} className="mb-1">{meal}</div>
                      ))}
                      {plan.meals.split('\n').length > 3 && <div className="text-gray-500">...</div>}
                    </div>
                  </div>
                )}

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{plan.description}</p>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-secondary-500 text-white py-2 rounded-lg hover:bg-secondary-600 transition-colors font-semibold">
                    View Full Plan
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Apple className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Nutrition Plans Yet</h3>
          <p className="text-gray-600 mb-6">Your trainer will create personalized nutrition plans for you!</p>
          <div className="bg-green-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-green-700">
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
      <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule Coming Soon</h3>
          <p className="text-gray-600">Booking system will be available soon!</p>
        </div>
      </div>
    </div>
  )

  switch (activeTab) {
    case 'workouts':
      return renderWorkouts()
    case 'nutrition':
      return renderNutrition()
    case 'schedule':
      return renderSchedule()
    default:
      return renderOverview()
  }
}