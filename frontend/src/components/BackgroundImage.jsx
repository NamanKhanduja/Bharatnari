import React from 'react'

export const BackgroundImage = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 opacity-90"></div>
      
      {/* Abstract safety patterns */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="safety-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="none" stroke="#e0e7ff" strokeWidth="0.5" opacity="0.3"/>
              <path d="M0 50 L100 50 M50 0 L50 100" stroke="#e0e7ff" strokeWidth="0.3" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#safety-pattern)" />
        </svg>
      </div>

      {/* Floating security icons */}
      <div className="absolute top-10 left-10 opacity-5">
        <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 1.1.9 2 2h16c1.1 0 2-.9 2-2V7l-10-5z"/>
            <path d="M2 17l10 5 10-5M2 17l10-5M12 12l10 5"/>
          </svg>
        </div>
      </div>
      
      <div className="absolute top-20 right-20 opacity-5">
        <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2l4-4m-6 8l-2-2-4 4m6-8l-2-2-4 4m6 8l-2-2m-6-8a2 2 0 110-4 2 2 2 0 014-2 2z"/>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-20 left-20 opacity-5">
        <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M17 21a4 4 0 004-4h-4M17 21a4 4 0 004-4h-4"/>
            <path d="M16 3.13a4 4 0 11-3.13-3.13L14 8l-6.87 6.87A4 4 0 0116 18.87L14 8l6.87-6.87z"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 opacity-5">
        <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 2.54-2.52-2.52L12 2z"/>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 2.54-2.52-2.52L12 2z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
