import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, ChevronDown, Shield, Phone, Mail, MapPin } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const { user, logout } = useAuthStore()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          {user?.fullName || 'User'}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {user?.fullName || 'User'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Verified: {user?.isEmailVerified ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to profile page
                  console.log('Navigate to profile')
                }}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">My Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to settings page
                  console.log('Navigate to settings')
                }}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Settings</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to emergency contacts
                  console.log('Navigate to emergency contacts')
                }}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Emergency Contacts</span>
              </button>
            </div>

            {/* Logout Button */}
            <div className="p-2 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
