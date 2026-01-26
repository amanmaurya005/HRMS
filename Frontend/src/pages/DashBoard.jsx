import React from 'react'

export default function DashBoard() {
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          
          {/* Total Employees */}
          <div className="bg-white rounded-xl border p-6 flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
              TE
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl border p-6 flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold">
              SS
            </div>
            <div>
              <p className="text-sm text-gray-500">System Status</p>
              <p className="text-lg font-semibold text-green-600">
                Active
              </p>
            </div>
          </div>

        </div>
    </>
  )
}
