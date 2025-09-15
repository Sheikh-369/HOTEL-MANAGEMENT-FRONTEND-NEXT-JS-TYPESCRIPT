'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useEffect, useState } from "react"
import { IUserData } from "@/lib/store/user/user-slice-type"

const UsersPage = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.user)

  useEffect(() => {
    // assuming your fetchUsers already fills the store
    dispatch({ type: "user/fetchUsers" }) 
  }, [dispatch])

  // Search
  const [searchedText, setSearchedText] = useState("")
  const filteredUsers = user?.filter((u: IUserData) => {
    const searchLower = searchedText.toLowerCase()
    return (
      u.userName.toLowerCase().includes(searchLower) ||
      u.userEmail.toLowerCase().includes(searchLower) ||
      u.phoneNumber.toLowerCase().includes(searchLower) ||
      u.address.toLowerCase().includes(searchLower)
    )
  }) || []

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  return (
    <div className="flex flex-col p-4">
      {/* Search */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.6569" y1="16.6569" x2="21" y2="21" />
          </svg>
        </div>
        <input
          type="text"
          value={searchedText}
          onChange={(e) => {
            setSearchedText(e.target.value)
            setCurrentPage(1)
          }}
          className="block w-72 h-10 pl-10 pr-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search users"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="p-2 text-left font-bold uppercase tracking-wider">Name</th>
                  <th className="p-2 text-left font-bold uppercase tracking-wider">Email</th>
                  <th className="p-2 text-left font-bold uppercase tracking-wider">Phone</th>
                  <th className="p-2 text-left font-bold uppercase tracking-wider">Address</th>
                  <th className="p-2 text-left font-bold uppercase tracking-wider">Member Since</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((u: IUserData, idx) => (
                  <tr
                    key={u.id}
                    className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50`}
                  >
                    <td className="p-2">{u.userName}</td>
                    <td className="p-2">{u.userEmail}</td>
                    <td className="p-2">{u.phoneNumber}</td>
                    <td className="p-2">{u.address}</td>
                    <td className="p-2">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-2 py-1 rounded text-sm ${
                currentPage === pageNum
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UsersPage
