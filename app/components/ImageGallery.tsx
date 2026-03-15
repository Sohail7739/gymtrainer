'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ImageGallery() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'جلسة تدريب شخصي' : 'Personal Training Session',
      category: language === 'ar' ? 'التدريب' : 'Training'
    },
    {
      src: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'مدرب محترف' : 'Professional Trainer',
      category: language === 'ar' ? 'المدرب' : 'Trainer'
    },
    {
      src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'معدات الجيم' : 'Gym Equipment',
      category: language === 'ar' ? 'المعدات' : 'Equipment'
    },
    {
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'تخطيط التغذية' : 'Nutrition Planning',
      category: language === 'ar' ? 'التغذية' : 'Nutrition'
    },
    {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'وجبة صحية' : 'Healthy Meal',
      category: language === 'ar' ? 'التغذية' : 'Nutrition'
    },
    {
      src: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'تدريب جماعي' : 'Group Training',
      category: language === 'ar' ? 'التدريب' : 'Training'
    },
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'داخل الجيم' : 'Gym Interior',
      category: language === 'ar' ? 'المرافق' : 'Facilities'
    },
    {
      src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'طعام صحي' : 'Healthy Food',
      category: language === 'ar' ? 'التغذية' : 'Nutrition'
    },
    {
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: language === 'ar' ? 'تمارين اللياقة' : 'Fitness Workout',
      category: language === 'ar' ? 'التدريب' : 'Training'
    }
  ]

  const openModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف مرافقنا وجلسات التدريب والنتائج المذهلة لعملائنا'
              : 'Discover our facilities, training sessions, and amazing client results'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg card-hover"
              onClick={() => openModal(index)}
            >
              <div className="aspect-square">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-primary-600 rounded-full text-sm font-medium mb-2">
                    {image.category}
                  </span>
                  <p className="text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <img 
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-4 text-white">
                <span className="inline-block px-3 py-1 bg-primary-600 rounded-full text-sm font-medium mb-2">
                  {images[selectedImage].category}
                </span>
                <p className="text-lg">{images[selectedImage].alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}