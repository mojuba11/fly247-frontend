'use client'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BannerSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative max-w-7xl mx-auto py-10 px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-[0_0_80%] md:flex-[0_0_40%] h-48 bg-flyBlue rounded-2xl p-8 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold">Special Offer {i}</h3>
              <p>Save up to 30% on international flights.</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        onClick={scrollPrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        onClick={scrollNext}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}