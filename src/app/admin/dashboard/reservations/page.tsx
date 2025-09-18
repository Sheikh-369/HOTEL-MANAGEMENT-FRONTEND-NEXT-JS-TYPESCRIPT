'use client'
import { fetchReservations } from "@/lib/store/admin/reservatoin/reservation-slice"
import { IReservationData } from "@/lib/store/admin/reservatoin/reservation=slice-type"
import { fetchTables } from "@/lib/store/admin/tables/table-slice"
import { fetchUsers } from "@/lib/store/admin/user/user-slice"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useEffect } from "react"

const Reservation = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.user)
  const { table } = useAppSelector((store) => store.table)
  const { reservation } = useAppSelector((store) => store.reservation)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchTables())
    dispatch(fetchReservations())
  }, [dispatch])

  return (
    <div className="flex flex-col">
      {/* Search */}
      <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          placeholder="Search by User ID"
          className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="min-w-full rounded-xl">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Table No.</th>
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Guests</th>
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="p-5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {reservation && reservation.length > 0 ? (
              reservation.map((r:IReservationData) => (
                <tr
                  key={r.id}
                  className="bg-white transition-all duration-500 hover:bg-gray-50"
                >
                  <td className="p-5 text-sm text-gray-900">{r.userName}</td>
                  <td className="p-5 text-sm text-gray-900">{r.tableNumber}</td>
                  <td className="p-5 text-sm text-gray-900">{r.numberOfGuests}</td>
                  <td className="p-5 text-sm text-gray-900">{r.reservationTime}</td>
                  <td
                    className={`p-5 text-sm font-semibold ${
                      r.reservationStatus === "RESERVED"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {r.reservationStatus}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-4">
                      <button className="text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-5 text-center text-sm text-gray-500">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reservation
