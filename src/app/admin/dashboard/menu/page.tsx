'use client'

import { deleteMenu, fetchMenu } from "@/lib/store/admin/menu/menu-slice"
import { IMenuData } from "@/lib/store/admin/menu/menu-slice-type"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useEffect, useState, useMemo } from "react"
import AddMenuModal from "./addMenuModal"
import { fetchCategory } from "@/lib/store/admin/category/categorySlice"
import EditMenuModal from "./editMenuModal"

const Menu = () => {
  const dispatch = useAppDispatch()
  const { menu } = useAppSelector((store) => store.menu)
  const { category } = useAppSelector((store) => store.category)

  // Add menu modal
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState<boolean>(false)
  const openAddMenuModal = () => setIsAddMenuModalOpen(true)
  const closeAddMenuModal = () => setIsAddMenuModalOpen(false)

    // Modal (for editing menu)
    const [editMenuModalOpen, setEditMenuModalOpen] = useState<boolean>(false)
    const [selectedMenu, setSelectedMenu] = useState<IMenuData | null>(null)
    const openEditMenuModalOpen = (menu: IMenuData) => {
      setSelectedMenu(menu)
      setEditMenuModalOpen(true)
    }
    const closeEditCategoryModal = () => {
      setEditMenuModalOpen(false)
      setSelectedMenu(null)
    }

  // Search & Pagination
  const [searchText, setSearchText] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 5

  useEffect(() => {
    dispatch(fetchMenu())
    dispatch(fetchCategory())
  }, [dispatch])

  // Filtered menu based on search
  const filteredMenu = useMemo(() => {
    if (!searchText) return menu
    return menu.filter(
      (m: IMenuData) =>
        m.menuName.toLowerCase().includes(searchText.toLowerCase()) ||
        m.categoryName.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [menu, searchText])

  // Pagination logic
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage)
  const paginatedMenu = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredMenu.slice(start, start + itemsPerPage)
  }, [filteredMenu, currentPage])

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  //delete menu
// Delete pop-up
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [menuToDelete, setmenuToDelete] = useState<IMenuData | null>(null)

  const openDeleteModal = (menu: IMenuData) => {
    setmenuToDelete(menu)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setmenuToDelete(null)
    setDeleteModalOpen(false)
  }

  const confirmDelete = () => {
    if (menuToDelete?.id) {
      dispatch(deleteMenu(menuToDelete.id))
    }
    closeDeleteModal()
  }

  return (
    <div className="flex flex-col">
        {/* Delete Modal */}
      {deleteModalOpen && menuToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl rounded-lg p-6 w-96 border border-red-800 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-3 text-white">Confirm Deletion</h2>
            <p className="text-sm text-red-100 mb-5">
              Are you sure you want to delete{" "}
              <strong className="text-white">{menuToDelete.categoryName}</strong>?
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
      {/* Add Menu Modal */}
      {isAddMenuModalOpen && (
        <AddMenuModal
          closeModal={closeAddMenuModal}
          categories={category.map(c => ({
            id: c.id ? Number(c.id) : 0,
            categoryName: c.categoryName || ""
          }))}
        />
      )}
        {/* Edit Menu Modal */}
            {editMenuModalOpen && selectedMenu && (
            <EditMenuModal
                selectedMenu={selectedMenu} // pass the selected menu here
                categories={category.map((c) => ({
                id: c.id ? Number(c.id) : 0,
                categoryName: c.categoryName || "",
                }))}
                closeModal={closeEditCategoryModal}
            />
            )}

        
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          {/* Search bar + Add Menu button */}
          <div className="relative flex justify-between items-center mb-4">
            <div className="relative text-gray-500 focus-within:text-gray-900">
              <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                    stroke="#9CA3AF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  setCurrentPage(1) // reset page on search
                }}
                className="block w-96 h-11 pr-5 pl-12 py-2.5 text-base shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search menu..."
              />
            </div>
            <button
              onClick={openAddMenuModal}
              className="ml-4 bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
            >
              Add Menu
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden border rounded-xl">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-red-600">
                  <th className="p-4" />
                  <th className="p-4 text-sm font-semibold text-white">Dish</th>
                  <th className="p-4 text-sm font-semibold text-white">Category</th>
                  <th className="p-4 text-sm font-semibold text-white">Type</th>
                  <th className="p-4 text-sm font-semibold text-white">Ingredients</th>
                  <th className="p-4 text-sm font-semibold text-white">Price</th>
                  <th className="p-4 text-sm font-semibold text-white">Status</th>
                  <th className="p-4 text-sm font-semibold text-white">Description</th>
                  <th className="p-4 text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedMenu?.map((m: IMenuData) => (
                  <tr key={m.id} className="bg-white hover:bg-red-50 transition">
                    <td className="p-4">
                      <img
                        src={m.menuImage || "https://via.placeholder.com/60"}
                        alt={m.menuName}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-900">{m.menuName}</td>
                    <td className="p-4 text-sm text-gray-700">{m.categoryName}</td>
                    <td className="p-4 text-sm text-gray-700">{m.menuType}</td>
                    <td className="p-4 text-sm text-gray-700">{m.menuIngredients}</td>
                    <td className="p-4 text-sm text-gray-700">Rs. {m.menuPrice}</td>
                    <td className="p-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          m.menuStatus === "available" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                        }`}
                      >
                        {m.menuStatus.charAt(0).toUpperCase() + m.menuStatus.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{m.menuDescription}</td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button onClick={()=>openEditMenuModalOpen(m)} className="p-2 rounded-full hover:bg-indigo-50 transition">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                            <path
                              d="M2 14.5V18H5.5L16.873 6.627C17.245 6.255 17.245 5.622 16.873 5.25L14.75 3.127C14.378 2.755 13.745 2.755 13.373 3.127L2 14.5Z"
                              stroke="#4F46E5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button onClick={()=>openDeleteModal(m)} className="p-2 rounded-full hover:bg-red-50 transition">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                            <path
                              d="M6 6L14 14M6 14L14 6M3 3H17V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V3Z"
                              stroke="#EF4444"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Info */}
                        <button className="p-2 rounded-full hover:bg-gray-50 transition">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                            <path
                              d="M10 9V14M10 6H10.01M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z"
                              stroke="#000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
