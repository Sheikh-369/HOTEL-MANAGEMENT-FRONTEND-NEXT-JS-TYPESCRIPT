'use client'
import { ICategoryData } from "@/lib/store/admin/category/category-slice-type"
import { createCategory, fetchCategory } from "@/lib/store/admin/category/categorySlice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface ICloseModal {
  closeModal: () => void
}

const AddCategoryModal: React.FC<ICloseModal> = ({ closeModal }) => {
  const dispatch = useAppDispatch()
  const { category } = useAppSelector((store) => store.category)

  // Input state for new category
  const [categoryData, setCategoryData] = useState<ICategoryData>({
    categoryName: "",
    categoryDescription: "",
  })

  // Handle input changes
  const handleCategoryDataChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleCategorySubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!categoryData.categoryName.trim()) return // simple validation
    dispatch(createCategory(categoryData))
    setCategoryData({ categoryName: "", categoryDescription: "" }) // reset inputs
    closeModal()
    dispatch(fetchCategory()) // refresh list
  }

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  // Slice data for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem)

  // Total pages
  const totalPages = Math.ceil(category.length / itemsPerPage)

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 animate-fadeIn">
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Add New Category
        </h2>

        <form onSubmit={handleCategorySubmission} className="space-y-4">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              value={categoryData.categoryName}
              onChange={handleCategoryDataChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category name"
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={categoryData.categoryDescription}
              onChange={handleCategoryDataChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={closeModal}
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryModal
