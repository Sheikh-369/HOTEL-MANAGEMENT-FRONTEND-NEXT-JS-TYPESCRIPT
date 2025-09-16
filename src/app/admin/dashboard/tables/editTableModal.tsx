import { useAppDispatch } from "@/lib/store/hooks";
import { editTable } from "@/lib/store/tables/table-slice";
import { ITableData } from "@/lib/store/tables/table-slice-type";
import { ChangeEvent, FormEvent, useState } from "react";

interface IEditModalProps {
  table: ITableData;
  closeModal: () => void;
  
}

export const EditTableModal: React.FC<IEditModalProps> = ({ table, closeModal }) => {
    const dispatch=useAppDispatch()
  const [tableEditData, setTableEditData] = useState(table);

  const handleTableEdtDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTableEditData({ 
        ...tableEditData, 
        [name]: name === "seats" ? Number(value) : value });
  };

  const handleEditTableDataSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editTable(table.id!,tableEditData))
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Edit Table</h2>
        <form onSubmit={handleEditTableDataSubmit} className="space-y-3">
          <input
            name="tableNumber"
            value={tableEditData.tableNumber}
            onChange={handleTableEdtDataChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            name="seats"
            type="number"
            value={tableEditData.seats}
            onChange={handleTableEdtDataChange}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            name="tableStatus"
            value={tableEditData.tableStatus}
            onChange={handleTableEdtDataChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
