'use client'

import { Dumbbell, Apple, Users, Calendar, Target, Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Features() {
  const { language, t } = useLanguage()

  const features = [
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: t('features.personalTraining'),
      description: t('features.personalTrainingDesc'),
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Apple className="h-8 w-8" />,
      title: t('features.nutritionCoaching'),
      description: t('features.nutritionCoachingDesc'),
      image: "https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('features.clientManagement'),
      description: t('features.clientManagementDesc'),
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: t('features.flexibleScheduling'),
      description: t('features.flexibleSchedulingDesc'),
      image: "https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('features.goalTracking'),
      description: t('features.goalTrackingDesc'),
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('features.wellnessSupport'),
      description: t('features.wellnessSupportDesc'),
      image: "https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  return (
    <section id="features" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="dark-card rounded-xl shadow-2xl overflow-hidden card-hover">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="text-primary-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}