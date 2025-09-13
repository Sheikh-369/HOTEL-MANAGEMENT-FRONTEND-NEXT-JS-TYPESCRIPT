'use client'

import { ICategoryData } from "@/lib/store/admin/category/category-slice-type"
import { deleteCategory, fetchCategory } from "@/lib/store/admin/category/categorySlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useEffect, useState } from "react"
import AddCategoryModal from "./addCategoryModal"
import EditCategoryModal from "./editCategoryModal"

const Category = () => {
  const dispatch = useAppDispatch()

  // Modal (for adding category)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Modal (for editing category)
  const [editCategoryModalOpen, setEditCateryModalOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<ICategoryData | null>(null)
  const openEditCategoryModalOpen = (category: ICategoryData) => {
    setSelectedCategory(category)
    setEditCateryModalOpen(true)
  }
  const closeEditCategoryModal = () => {
    setEditCateryModalOpen(false)
    setSelectedCategory(null)
  }

  // Delete pop-up
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<ICategoryData | null>(null)

  const openDeleteModal = (category: ICategoryData) => {
    setCategoryToDelete(category)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setCategoryToDelete(null)
    setDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    if (categoryToDelete?.id) {
      dispatch(deleteCategory(String(categoryToDelete.id)))
    }
    closeDeleteModal()
  }

  // Fetch categories
  const { category } = useAppSelector((store) => store.category)
  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  // Search logic
  const [searchedText, setSearchedText] = useState<string>("")
  
  const filteredData = category.filter((c) => {
    const searchLower = searchedText.toLowerCase()
    return (
      c.categoryName.toLowerCase().includes(searchLower) ||
      (c.id?.toString() ?? "").toLowerCase().includes(searchLower) ||
      c.categoryDescription.toLowerCase().includes(searchLower)
    )
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className="flex flex-col p-4">
      {/* Add Category Modal */}
      {isModalOpen && <AddCategoryModal closeModal={closeModal} />}
      {/* Edit Category Modal */}
      {editCategoryModalOpen && selectedCategory && (
        <EditCategoryModal category={selectedCategory} closeModal={closeEditCategoryModal} />
      )}
      {/* Delete Modal */}
      {deleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl rounded-lg p-6 w-96 border border-red-800 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-3 text-white">Confirm Deletion</h2>
            <p className="text-sm text-red-100 mb-5">
              Are you sure you want to delete{" "}
              <strong className="text-white">{categoryToDelete.categoryName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm bg-white text-red-700 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-yellow-400 text-red-900 font-semibold rounded-md hover:bg-yellow-300 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Add */}
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <line x1="16.6569" y1="16.6569" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={searchedText ?? ""}
            onChange={(e) => {
              setSearchedText(e.target.value)
              setCurrentPage(1) // reset pagination on search
            }}
            className="block w-full h-12 pl-12 pr-5 text-sm md:text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for category"
          />
        </div>
        <button
          onClick={openModal}
          className="ml-3 px-5 py-2 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-red-500 to-red-500 text-white">
                <tr>
                  <th className="p-5 text-left text-sm md:text-base font-bold uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="p-5 text-left text-sm md:text-base font-bold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="p-5 text-left text-sm md:text-base font-bold uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="p-5 text-left text-sm md:text-base font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((c: ICategoryData, idx) => (
                  <tr
                    key={c.id}
                    className={`transition-all duration-300 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50`}
                  >
                    <td className="p-5 whitespace-nowrap text-sm md:text-base font-medium text-gray-800">
                      {c.categoryName}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm md:text-base text-gray-600">
                      {c.categoryDescription}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm md:text-base text-gray-500">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => openEditCategoryModalOpen(c)}
                          className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
                        >
                          <svg
                            className="w-5 h-5 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-2.828 0L9 11z" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => openDeleteModal(c)}
                          className="p-2 rounded-full hover:bg-red-100 transition"
                        >
                          <svg
                            className="w-5 h-5 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0v1h4V4" />
                          </svg>
                        </button>

                        {/* Info */}
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M13 16h-1v-4h-1m1-4h.01M12 18.5A6.5 6.5 0 1118.5 12 6.507 6.507 0 0112 18.5z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

export default Category
