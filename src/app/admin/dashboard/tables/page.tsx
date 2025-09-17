'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addTable, deleteTable, fetchTables } from "@/lib/store/admin/tables/table-slice";
import { ITableData } from "@/lib/store/admin/tables/table-slice-type";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { EditTableModal } from "./editTableModal";

export default function RestaurantTables() {
  const dispatch = useAppDispatch();

  // Fetch tables
  const { table } = useAppSelector((store) => store.table);
  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  // Add table
  const [tableData, setTableData] = useState<ITableData>({
    tableNumber: "",
    seats: 0,
    tableStatus: "available",
  });

  const handleTableDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTableData({
      ...tableData,
      [name]: name === "seats" ? Number(value) : value,
    });
  };

  const handleTableDataSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTable(tableData));
  };

    // Modal (for editing table)
    const [editTableModalOpen, setEditTableModalOpen] = useState<boolean>(false)
    const [selectedTable, setSelectedTable] = useState<ITableData | null>(null)
    const openEditTableModalOpen = (table: ITableData) => {
      setSelectedTable(table)
      setEditTableModalOpen(true)
    }
    const closeEditTableModal = () => {
      setEditTableModalOpen(false)
      setSelectedTable(null)
    }

    //delete logic
      // Delete pop-up
      const [deleteModalOpen, setDeleteModalOpen] = useState(false)
      const [tableToDelete, setTableToDelete] = useState<ITableData | null>(null)
    
      const openDeleteModal = (table: ITableData) => {
        setTableToDelete(table)
        setDeleteModalOpen(true)
      }
    
      const closeDeleteModal = () => {
        setTableToDelete(null)
        setDeleteModalOpen(false)
      }
    
      const confirmDelete = () => {
        if (tableToDelete?.id) {
          dispatch(deleteTable(tableToDelete.id))
        }
        closeDeleteModal()
      }

  return (
    <div className="p-6 space-y-6">
      {/* Delete Modal */}
      {deleteModalOpen && tableToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl rounded-lg p-6 w-96 border border-red-800 pointer-events-auto">
            <h2 className="text-lg font-semibold mb-3 text-white">Confirm Deletion</h2>
            <p className="text-sm text-red-100 mb-5">
              Are you sure you want to delete{" "}
              <strong className="text-white">{tableToDelete.tableNumber}</strong>?
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
      {/* Edit Category Modal */}
      {editTableModalOpen && selectedTable && (
        <EditTableModal table={selectedTable} closeModal={closeEditTableModal} />
      )}
      {/* Heading */}
      <h1 className="text-2xl font-bold">Restaurant Tables</h1>

      {/* Add New Table Form */}
      <form onSubmit={handleTableDataSubmission}>
        <div className="p-6 rounded-2xl shadow-lg bg-red-500 space-y-5 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Table</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="tableNumber"
              type="text"
              onChange={handleTableDataChange}
              placeholder="Table Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <input
              name="seats"
              type="number"
              onChange={handleTableDataChange}
              placeholder="Seats"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <select
              name="tableStatus"
              value={tableData.tableStatus}
              onChange={handleTableDataChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Add Table
          </button>
        </div>
      </form>

      {/* Tables List */}
      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="w-full border border-gray-200 border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-center font-semibold">Table Number</th>
              <th className="p-2 border text-center font-semibold">Seats</th>
              <th className="p-2 border text-center font-semibold">Status</th>
              <th className="p-2 border text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.map((t) => (
              <tr
                key={t.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-red-100 transition"
              >
                <td className="p-1.5 border text-center">T{t.tableNumber}</td>
                <td className="p-1.5 border text-center">{t.seats}</td>
                <td className="p-1.5 border text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      t.tableStatus === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {t.tableStatus}
                  </span>
                </td>
                <td className="p-1.5 border text-center">
                  <div className="flex justify-center items-center gap-1">
                    {/* Edit */}
                    <button onClick={() => openEditTableModalOpen(t)} className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200 transition">
                      <svg
                        className="w-4 h-4 text-indigo-600"
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
                    <button onClick={()=>openDeleteModal(t)} className="p-1 rounded-full hover:bg-red-100 transition">
                      <svg
                        className="w-4 h-4 text-red-600"
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
                    <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <svg
                        className="w-4 h-4 text-gray-600"
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
  );
}
