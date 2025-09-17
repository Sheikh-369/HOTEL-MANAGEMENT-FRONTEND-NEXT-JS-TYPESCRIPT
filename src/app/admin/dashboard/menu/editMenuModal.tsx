'use client'

import { editMenu } from "@/lib/store/admin/menu/menu-slice";
import { IMenuData } from "@/lib/store/admin/menu/menu-slice-type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface MenuModalProps {
  closeModal: () => void;
  categories: { id: number; categoryName: string }[];
  selectedMenu: IMenuData;
}

const EditMenuModal: React.FC<MenuModalProps> = ({ closeModal, categories, selectedMenu }) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((store) => store.category);

  const [editMenuData, setEditMenuData] = useState<IMenuData>({
    ...selectedMenu,
    categoryId: selectedMenu.categoryId || categories[0]?.id || 0,
    categoryName: selectedMenu.categoryName || categories[0]?.categoryName || "",
  });

  // Update state if selectedMenu changes (optional but safer)
  useEffect(() => {
    setEditMenuData({
      ...selectedMenu,
      categoryId: selectedMenu.categoryId || categories[0]?.id || 0,
      categoryName: selectedMenu.categoryName || categories[0]?.categoryName || "",
    });
  }, [selectedMenu, categories]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle file upload
    if (name === "menuImage" && (e.target as HTMLInputElement).files) {
      setEditMenuData({
        ...editMenuData,
        menuImage: (e.target as HTMLInputElement).files![0],
      });
      return;
    }

    // Handle category selection
    if (name === "categoryId") {
      const selectedId = Number(value);
      const selectedCategory = category.find((c) => c.id === selectedId);
      setEditMenuData({
        ...editMenuData,
        categoryId: selectedId,
        categoryName: selectedCategory?.categoryName || "",
      });
      return;
    }

    // Handle numeric value (menuPrice)
    if (name === "menuPrice") {
      setEditMenuData({
        ...editMenuData,
        menuPrice: value === "" ? 0 : parseFloat(value),
      });
      return;
    }

    // Handle all other fields
    setEditMenuData({
      ...editMenuData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editMenu(editMenuData, editMenuData.id!));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-gray-50 rounded-xl shadow-lg w-full max-w-xl p-5 relative border border-gray-200">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-center text-red-600">Edit Menu</h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          {/* Dish Name */}
          <div>
            <label className="block mb-1 font-medium">Dish Name</label>
            <input
              type="text"
              name="menuName"
              value={editMenuData.menuName}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
              required
            />
          </div>

          {/* Two-column short fields */}
          <div className="grid grid-cols-2 gap-2">
            {/* Price */}
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                step="0.01"
                name="menuPrice"
                value={editMenuData.menuPrice}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                name="menuType"
                value={editMenuData.menuType}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="menuStatus"
                value={editMenuData.menuStatus}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                name="categoryId"
                value={editMenuData.categoryId || ""}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
                required
              >
                {category.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-1 font-medium">Ingredients</label>
            <input
              type="text"
              name="menuIngredients"
              value={editMenuData.menuIngredients}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="menuDescription"
              value={editMenuData.menuDescription}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded-lg focus:ring-1 focus:ring-red-400 bg-white"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              type="file"
              name="menuImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-1.5 rounded-lg hover:bg-red-700 transition font-medium text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuModal;
