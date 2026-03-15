'use client'

import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  const { language, t } = useLanguage()

  return (
    <section id="home" className="pt-20 pb-16 bg-dark-900 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {t('hero.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 block">
                  {t('hero.subtitle')}
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold neon-orange"
              >
                <span>{t('hero.getStarted')}</span>
                <ArrowRight className={`h-5 w-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold">
                <Play className="h-5 w-5" />
                <span>{t('hero.watchDemo')}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">500+</div>
                <div className="text-gray-400">{t('hero.happyClients')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">5+</div>
                <div className="text-gray-400">{t('hero.yearsExperience')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">24/7</div>
                <div className="text-gray-400">{t('hero.support')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
                  <img 
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Rayaan Training"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
                  <img 
                    src="https://images.unsplash.com/photo-1597452485677-d661670d9640?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Gym Equipment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Personal Training"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
                  <img 
                    src="https://images.unsplash.com/photo-1738321791387-a11c55f52d7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Nutrition Planning"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-xl shadow-2xl neon-orange">
              <div className="text-2xl font-bold text-white">
                {language === 'ar' ? 'ريان' : 'Rayaan'}
              </div>
              <div className="text-gray-100">
                {language === 'ar' ? 'مدرب معتمد' : 'Certified Trainer'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}