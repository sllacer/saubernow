'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LoginModal from '@/components/LoginModal';

export default function ComponentTestPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              🧪 Component Testing Lab
            </h1>
            
            <div className="space-y-8">
              {/* LoginModal Testing Section */}
              <section className="border-b pb-8">
                <h2 className="text-2xl font-semibold mb-4">LoginModal Component</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="btn-primary"
                  >
                    Open Login Modal
                  </button>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Test Cases:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modal opens and closes correctly</li>
                      <li>• Form validation works</li>
                      <li>• Loading states display</li>
                      <li>• Error handling shows properly</li>
                      <li>• Password visibility toggle</li>
                      <li>• Signup button redirects</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Navigation Testing Section */}
              <section className="border-b pb-8">
                <h2 className="text-2xl font-semibold mb-4">Navigation Component</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Current Navigation Above ↑</h3>
                  <p className="text-sm text-gray-600">
                    Test the unified profile section in the navigation bar above.
                    Check both authenticated and unauthenticated states.
                  </p>
                </div>
              </section>

              {/* Add more component sections as needed */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Add New Components Here</h2>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-700">
                    Import and test new components in this space. 
                    Hot reload will update as you make changes!
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Render modals here */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}