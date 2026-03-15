'use client'

import { useState } from 'react'
import { X, Clock, Target, Dumbbell, Play, Pause, RotateCcw } from 'lucide-react'

interface WorkoutDetailModalProps {
  workout: any
  isOpen: boolean
  onClose: () => void
}

export default function WorkoutDetailModal({ workout, isOpen, onClose }: WorkoutDetailModalProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [timer, setTimer] = useState(0)

  if (!isOpen || !workout) return null

  const exercises = workout.exercises ? workout.exercises.split('\n').filter((ex: string) => ex.trim()) : []

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header with image */}
          <div className="relative h-64">
            <img 
              src={getWorkoutImage(workout.type)}
              alt={workout.name}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-30 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{workout.name}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{workout.duration} min</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{workout.difficulty}</span>
                </span>
                <span className="px-3 py-1 bg-primary-600 rounded-full text-xs font-medium">
                  {workout.type}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Workout Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{workout.duration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{workout.sets || '3-4'}</div>
                <div className="text-sm text-gray-600">Sets</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">{workout.reps || '8-12'}</div>
                <div className="text-sm text-gray-600">Reps</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{workout.restTime || '60'}s</div>
                <div className="text-sm text-gray-600">Rest</div>
              </div>
            </div>

            {/* Description */}
            {workout.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Workout Description</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {workout.description}
                </p>
              </div>
            )}

            {/* Exercises List */}
            {exercises.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exercises</h3>
                <div className="space-y-3">
                  {exercises.map((exercise: string, index: number) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                        currentExercise === index 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentExercise === index 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{exercise.replace(/^-\s*/, '')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{workout.sets || '3'} sets</span>
                        <span>•</span>
                        <span>{workout.reps || '8-12'} reps</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Workout Timer */}
            <div className="bg-gray-900 text-white p-6 rounded-xl mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {Math.floor(timer / 60).toString().padStart(2, '0')}:
                  {(timer % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 mb-4">Workout Timer</div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setIsActive(!isActive)}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg transition-colors"
                  >
                    {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    <span>{isActive ? 'Pause' : 'Start'}</span>
                  </button>
                  <button 
                    onClick={() => setTimer(0)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg">
                Start Full Workout
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Dumbbell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getWorkoutImage(type: string) {
  const images = {
    'Strength': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Cardio': 'https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'HIIT': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Flexibility': 'https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Functional': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  return images[type as keyof typeof images] || images.Strength
}