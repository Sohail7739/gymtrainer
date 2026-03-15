'use client'

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { language, t } = useLanguage()

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl font-bold mb-4 text-center">{t('contact.title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('contact.phone')}</h3>
            <p className="text-gray-300">+966 50 123 4567</p>
          </div>

          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('contact.email')}</h3>
            <p className="text-gray-300">rayaan@fitness.sa</p>
          </div>

          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('contact.location')}</h3>
            <p className="text-gray-300">
              {language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('contact.hours')}</h3>
            <p className="text-gray-300">
              {language === 'ar' ? '6 صباحاً - 10 مساءً' : '6 AM - 10 PM'}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-800 p-8 rounded-2xl max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{t('contact.readyToTransform')}</h3>
            <p className="text-gray-300 mb-6">
              {t('contact.joinClients')}
            </p>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold">
              {t('contact.startJourney')}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Gym Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Training Session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Healthy Meal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}