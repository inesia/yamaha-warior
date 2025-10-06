import React from 'react'
import useAdminStore from '../../store/adminStore'

const AdminTest = () => {
  const { isAdminAuthenticated, adminUser } = useAdminStore()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yamaha-dark">Admin Test Page</h1>
      <p className="text-gray-600">This is a test page to verify admin routing works.</p>
      
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          ✅ Admin routing is working correctly!
        </div>
        
        <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
          <h3 className="font-semibold">Authentication Status:</h3>
          <p>Authenticated: {isAdminAuthenticated ? 'Yes' : 'No'}</p>
          {adminUser && (
            <div>
              <p>User: {adminUser.name}</p>
              <p>Role: {adminUser.role}</p>
              <p>Email: {adminUser.email}</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <h3 className="font-semibold">Test Credentials:</h3>
          <p>Email: admin@yamaha.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default AdminTest
