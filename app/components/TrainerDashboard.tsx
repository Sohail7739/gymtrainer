'use client'

import { useState, useEffect } from 'react'
import { Users, Plus, Edit, Trash2, User, Dumbbell, Apple, X } from 'lucide-react'

interface TrainerDashboardProps {
  user: any
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TrainerDashboard({ user, activeTab, setActiveTab }: TrainerDashboardProps) {
  const [clients, setClients] = useState<any[]>([])
  const [workouts, setWorkouts] = useState<any[]>([])
  const [nutrition, setNutrition] = useState<any[]>([])
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showNutritionModal, setShowNutritionModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allUsers = JSON.parse(localStorage.getItem('rayaan_users') || '[]')
    const allWorkouts = JSON.parse(localStorage.getItem('rayaan_workouts') || '[]')
    const allNutrition = JSON.parse(localStorage.getItem('rayaan_nutrition') || '[]')
    
    setClients(allUsers.filter((u: any) => u.role === 'client'))
    setWorkouts(allWorkouts)
    setNutrition(allNutrition)
  }

  const createWorkout = (workoutData: any) => {
    const newWorkout = {
      id: Date.now(),
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      ...workoutData,
      createdAt: new Date().toISOString()
    }
    
    const updatedWorkouts = [...workouts, newWorkout]
    setWorkouts(updatedWorkouts)
    localStorage.setItem('rayaan_workouts', JSON.stringify(updatedWorkouts))
    setShowWorkoutModal(false)
    setSelectedClient(null)
  }

  const createNutritionPlan = (nutritionData: any) => {
    const newNutrition = {
      id: Date.now(),
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      ...nutritionData,
      createdAt: new Date().toISOString()
    }
    
    const updatedNutrition = [...nutrition, newNutrition]
    setNutrition(updatedNutrition)
    localStorage.setItem('rayaan_nutrition', JSON.stringify(updatedNutrition))
    setShowNutritionModal(false)
    setSelectedClient(null)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
            </div>
            <Dumbbell className="h-8 w-8 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clients</h3>
          {clients.length > 0 ? (
            <div className="space-y-3">
              {clients.slice(0, 5).map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-600">{client.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(client.joinDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No clients yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('clients')}
              className="w-full flex items-center space-x-3 p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Manage Clients</span>
            </button>
            <button 
              onClick={() => setActiveTab('workouts')}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Dumbbell className="h-5 w-5" />
              <span>Create Workout</span>
            </button>
            <button 
              onClick={() => setActiveTab('nutrition')}
              className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Apple className="h-5 w-5" />
              <span>Design Nutrition Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
        <div className="text-sm text-gray-600">
          Total Clients: <span className="font-semibold text-primary-600">{clients.length}</span>
        </div>
      </div>

      {clients.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const clientWorkouts = workouts.filter(w => w.clientId === client.id)
            const clientNutrition = nutrition.filter(n => n.clientId === client.id)
            const bmi = client.weight && client.height ? (client.weight / Math.pow(client.height / 100, 2)).toFixed(1) : 'N/A'
            
            return (
              <div key={client.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="relative h-32 bg-gradient-to-br from-primary-500 to-primary-700">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{client.name}</h3>
                    <p className="text-sm opacity-90">Member since {new Date(client.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{clientWorkouts.length}</div>
                      <div className="text-xs text-gray-600">Workouts</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary-600">{clientNutrition.length}</div>
                      <div className="text-xs text-gray-600">Nutrition Plans</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{client.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{client.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age:</span>
                      <span className="font-medium">{client.age || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BMI:</span>
                      <span className="font-medium">{bmi}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-medium mb-1">Goals:</p>
                    <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">{client.goals || 'No goals specified'}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedClient(client)
                        setShowWorkoutModal(true)
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Dumbbell className="h-4 w-4" />
                      <span className="text-sm">Assign Workout</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedClient(client)
                        setShowNutritionModal(true)
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Apple className="h-4 w-4" />
                      <span className="text-sm">Nutrition Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Clients Yet</h3>
          <p className="text-gray-600 mb-6">Start building your client base! Clients will appear here when they register.</p>
          <div className="bg-primary-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-primary-700">
              💡 <strong>Tip:</strong> Share your registration link with potential clients to get started!
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Workout Management</h2>
        <div className="text-sm text-gray-600">
          Total Workouts: <span className="font-semibold text-blue-600">{workouts.length}</span>
        </div>
      </div>

      {workouts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48">
                <img 
                  src={getWorkoutImage(workout.type)}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{workout.name}</h3>
                  <p className="text-sm opacity-90">For: {workout.clientName}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                    {workout.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{workout.duration}</div>
                    <div className="text-xs text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{workout.difficulty}</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{workout.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Created: {new Date(workout.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteWorkout(workout.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
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
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Workouts Created</h3>
          <p className="text-gray-600 mb-6">Start creating personalized workout plans for your clients!</p>
          <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-blue-700">
              💪 <strong>Tip:</strong> Go to the Clients tab to assign workouts to specific clients.
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

  const deleteWorkout = (workoutId: number) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      const updatedWorkouts = workouts.filter(w => w.id !== workoutId)
      setWorkouts(updatedWorkouts)
      localStorage.setItem('rayaan_workouts', JSON.stringify(updatedWorkouts))
    }
  }

  const renderNutrition = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Nutrition Management</h2>
        <div className="text-sm text-gray-600">
          Total Plans: <span className="font-semibold text-green-600">{nutrition.length}</span>
        </div>
      </div>

      {nutrition.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutrition.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48">
                <img 
                  src={getNutritionImage(plan.type)}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-sm opacity-90">For: {plan.clientName}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
                    {plan.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{plan.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{plan.protein}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="text-sm font-bold text-yellow-600">{plan.carbs}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="text-sm font-bold text-orange-600">{plan.fat}g</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{plan.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Created: {new Date(plan.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteNutritionPlan(plan.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
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
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Nutrition Plans</h3>
          <p className="text-gray-600 mb-6">Start creating personalized nutrition plans for your clients!</p>
          <div className="bg-green-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-green-700">
              🥗 <strong>Tip:</strong> Go to the Clients tab to create nutrition plans for specific clients.
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

  const deleteNutritionPlan = (planId: number) => {
    if (confirm('Are you sure you want to delete this nutrition plan?')) {
      const updatedNutrition = nutrition.filter(n => n.id !== planId)
      setNutrition(updatedNutrition)
      localStorage.setItem('rayaan_nutrition', JSON.stringify(updatedNutrition))
    }
  }

  // Workout Modal Component
  const WorkoutModal = () => {
    const [workoutData, setWorkoutData] = useState({
      name: '',
      type: 'Strength',
      duration: '',
      difficulty: 'Beginner',
      description: '',
      exercises: '',
      sets: '',
      reps: '',
      restTime: ''
    })

    if (!showWorkoutModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Create Workout Plan
                </h3>
                <p className="text-gray-600">For: {selectedClient?.name}</p>
              </div>
              <button 
                onClick={() => setShowWorkoutModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); createWorkout(workoutData) }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workout Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Upper Body Strength"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.name}
                    onChange={(e) => setWorkoutData({...workoutData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workout Type</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.type}
                    onChange={(e) => setWorkoutData({...workoutData, type: e.target.value})}
                  >
                    <option value="Strength">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Functional">Functional Training</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="45"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.duration}
                    onChange={(e) => setWorkoutData({...workoutData, duration: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.difficulty}
                    onChange={(e) => setWorkoutData({...workoutData, difficulty: e.target.value})}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rest Time (seconds)</label>
                  <input
                    type="number"
                    placeholder="60"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.restTime}
                    onChange={(e) => setWorkoutData({...workoutData, restTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sets</label>
                  <input
                    type="text"
                    placeholder="3-4 sets"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.sets}
                    onChange={(e) => setWorkoutData({...workoutData, sets: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reps</label>
                  <input
                    type="text"
                    placeholder="8-12 reps"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={workoutData.reps}
                    onChange={(e) => setWorkoutData({...workoutData, reps: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exercises</label>
                <textarea
                  placeholder="List the exercises (one per line)&#10;e.g.:&#10;- Bench Press&#10;- Squats&#10;- Deadlifts"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={workoutData.exercises}
                  onChange={(e) => setWorkoutData({...workoutData, exercises: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description & Notes</label>
                <textarea
                  placeholder="Additional instructions, tips, or modifications for this workout..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={workoutData.description}
                  onChange={(e) => setWorkoutData({...workoutData, description: e.target.value})}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-semibold"
                >
                  Create Workout Plan
                </button>
                <button
                  type="button"
                  onClick={() => setShowWorkoutModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Nutrition Modal Component
  const NutritionModal = () => {
    const [nutritionData, setNutritionData] = useState({
      name: '',
      type: 'Weight Loss',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      description: '',
      meals: '',
      supplements: '',
      waterIntake: ''
    })

    if (!showNutritionModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Create Nutrition Plan
                </h3>
                <p className="text-gray-600">For: {selectedClient?.name}</p>
              </div>
              <button 
                onClick={() => setShowNutritionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); createNutritionPlan(nutritionData) }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Weight Loss Plan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={nutritionData.name}
                    onChange={(e) => setNutritionData({...nutritionData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    value={nutritionData.type}
                    onChange={(e) => setNutritionData({...nutritionData, type: e.target.value})}
                  >
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Performance">Performance</option>
                    <option value="Cutting">Cutting</option>
                    <option value="Bulking">Bulking</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Daily Macronutrient Targets</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                    <input
                      type="number"
                      placeholder="2000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={nutritionData.calories}
                      onChange={(e) => setNutritionData({...nutritionData, calories: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      placeholder="150"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={nutritionData.protein}
                      onChange={(e) => setNutritionData({...nutritionData, protein: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      placeholder="200"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={nutritionData.carbs}
                      onChange={(e) => setNutritionData({...nutritionData, carbs: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                    <input
                      type="number"
                      placeholder="70"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      value={nutritionData.fat}
                      onChange={(e) => setNutritionData({...nutritionData, fat: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Intake (Liters)</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="3.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={nutritionData.waterIntake}
                  onChange={(e) => setNutritionData({...nutritionData, waterIntake: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Plan</label>
                <textarea
                  placeholder="Breakfast:&#10;- Oatmeal with berries&#10;- Greek yogurt&#10;&#10;Lunch:&#10;- Grilled chicken salad&#10;- Brown rice&#10;&#10;Dinner:&#10;- Salmon with vegetables"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={nutritionData.meals}
                  onChange={(e) => setNutritionData({...nutritionData, meals: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplements (Optional)</label>
                <textarea
                  placeholder="- Whey protein (25g post-workout)&#10;- Creatine (5g daily)&#10;- Multivitamin (1 daily)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={nutritionData.supplements}
                  onChange={(e) => setNutritionData({...nutritionData, supplements: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  placeholder="Special dietary requirements, timing recommendations, or other important notes..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={nutritionData.description}
                  onChange={(e) => setNutritionData({...nutritionData, description: e.target.value})}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-secondary-500 text-white py-3 rounded-lg hover:bg-secondary-600 font-semibold"
                >
                  Create Nutrition Plan
                </button>
                <button
                  type="button"
                  onClick={() => setShowNutritionModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {(() => {
        switch (activeTab) {
          case 'clients':
            return renderClients()
          case 'workouts':
            return renderWorkouts()
          case 'nutrition':
            return renderNutrition()
          default:
            return renderOverview()
        }
      })()}
      
      <WorkoutModal />
      <NutritionModal />
    </>
  )
}