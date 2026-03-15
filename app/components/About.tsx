'use client'

import { Award, Users, Clock, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { language, t } = useLanguage()

  const achievements = [
    { icon: <Award className="h-6 w-6" />, text: t('about.certifiedTrainer') },
    { icon: <Users className="h-6 w-6" />, text: t('about.successfulTransformations') },
    { icon: <Clock className="h-6 w-6" />, text: t('about.yearsExperience') },
    { icon: <Star className="h-6 w-6" />, text: t('about.fiveStarRated') }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${language === 'ar' ? 'text-right lg:order-2' : 'text-left'}`}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('about.title')}
                <span className="block text-primary-600">{t('about.subtitle')}</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('about.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.description2')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-primary-600">
                    {achievement.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {achievement.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative ${language === 'ar' ? 'lg:order-1' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Rayaan - Personal Trainer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Training Session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Gym Equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Nutrition Consultation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm">{language === 'ar' ? 'سنوات تدريب' : 'Years Training'}</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary-500 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm">{language === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}