'use client'
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchTables } from "@/lib/store/tables/table-slice";
import { useEffect } from "react";

export default function RestaurantTables() {
  const dispatch = useAppDispatch()
  const { table } = useAppSelector((store) => store.table)

  useEffect(() => {
    dispatch(fetchTables())
  }, [dispatch])

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold">Restaurant Tables</h1>

      {/* Add New Table Form */}
      <div className="p-4 rounded-2xl shadow bg-white space-y-4">
        <h2 className="text-lg font-semibold">Add New Table</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Table Number"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Seats"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <select className="w-full px-3 py-2 border rounded-lg">
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
          Add Table
        </button>
      </div>

      {/* Tables List */}
      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-center font-semibold">Table Number</th>
              <th className="p-3 border text-center font-semibold">Seats</th>
              <th className="p-3 border text-center font-semibold">Status</th>
              <th className="p-3 border text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.map((t) => (
              <tr key={t.id}>
                <td className="p-3 border text-center">T{t.tableNumber}</td>
                <td className="p-3 border text-center">{t.seats}</td>
                <td className="p-3 border text-center">
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {t.tableStatus}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <div className="flex justify-center items-center gap-2">
                    {/* Edit */}
                    <button
                      // onClick={() => openEditTableModal(t)}
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
                      // onClick={() => openDeleteModal(t)}
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

                    {/* Info (optional) */}
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
  );
}
