import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Map, Users, Settings } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { ProfileMenu } from '../components/ProfileMenu'

export const Dashboard = () => {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">BharatNari</h1>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            I'm Safe & Secure
          </h2>
          <p className="text-lg text-gray-600">
            Your personal safety companion is always watching over you
          </p>
        </motion.div>

        {/* Emergency Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <button className="relative group">
            <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse-slow opacity-20"></div>
            <div className="relative bg-red-600 hover:bg-red-700 text-white rounded-full p-8 shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Shield className="w-16 h-16" />
              <span className="block mt-2 text-lg font-semibold">Emergency</span>
            </div>
          </button>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Map className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Location</h3>
            </div>
            <p className="text-gray-600">Share your location with trusted contacts</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Contacts</h3>
            </div>
            <p className="text-gray-600">Manage your trusted emergency contacts</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Settings</h3>
            </div>
            <p className="text-gray-600">Configure your safety preferences</p>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Location Sharing</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Emergency Contacts</span>
                <span className="text-blue-600 font-medium">4 Ready</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">AI Detection</span>
                <span className="text-green-600 font-medium">Monitoring</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">Location Shared</p>
                <p>2 minutes ago</p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">Contacts Notified</p>
                <p>1 hour ago</p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">Journey Completed</p>
                <p>3 hours ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
