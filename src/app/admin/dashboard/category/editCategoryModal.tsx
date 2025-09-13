import { ICategoryData } from "@/lib/store/admin/category/category-slice-type";
import { updateCategory } from "@/lib/store/admin/category/categorySlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  category: ICategoryData;
  closeModal: () => void;
}

const EditCategoryModal: React.FC<Props> = ({ category, closeModal }) => {
  const dispatch = useAppDispatch();

  const [categoryData, setCategoryData] = useState<ICategoryData>({
    categoryName: category.categoryName,
    categoryDescription: category.categoryDescription,
  });

  // Handle input changes
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch your update action here
    dispatch(updateCategory({ id: String(category.id), categoryData }));
    console.log("Updated Category:", categoryData);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
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
  );
};

export default EditCategoryModal;
