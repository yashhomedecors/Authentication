import React, { useState, useEffect } from "react";
import api from "./api";

// Define an interface for the shop object
interface Shop {
  id: string;
  savedBy: string;
  shopName: string;
}

// Define props for the ShopSelection component
interface ShopSelectionProps {
  show: boolean;
  onClose: () => void;
  onSelectShop: (shopId: string) => void;
}

const ShopSelection: React.FC<ShopSelectionProps> = ({
  show,
  onClose,
  onSelectShop,
}) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    if (show) {
      fetchShops();
    }
  }, [show]);

  const fetchShops = async () => {
    try {
      // Fetch the list of shops from the API endpoint
      const response = await api.get("/api/shop/get-all-shops");

      // Update the state with the fetched list of shops
      setShops(response.data);
    } catch (error) {
      console.error("Failed to fetch shops:", error);
    }
  };

  // Handle shop selection
  const handleShopSelect = (shopId: string, shopName: string) => {
    localStorage.setItem("ShopId", shopId);
    localStorage.setItem("ShopName", shopName);

    // Call the onSelectShop callback with the selected shop's ID
    onSelectShop(shopId);

    // Close the modal after selection
    onClose();
  };

  return (
    // Overlay for modal
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        show ? "bg-black bg-opacity-85" : "hidden"
      }`}
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex justify-between items-start border-b pb-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Select your Branch</h2>
            <p className="text-md font-normal mt-1">
              Please select a branch to continue
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500">
            &#10005; {/* Unicode for close icon (x) */}
          </button>
        </div>

        {/* Modal body */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shops.length > 0 ? (
            shops.map((shop, index) => (
              <div
                key={shop.id}
                className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => handleShopSelect(shop.id, shop.shopName)}
              >
                <img
                  alt="Shop Icon"
                  src={
                    index % 2 === 0
                      ? "https://ik.imagekit.io/yhd/DecorFlow/Icons/Shop-Branch-2.png" // Even card image
                      : "https://ik.imagekit.io/yhd/DecorFlow/Icons/Shop-Branch.png" // Odd card image
                  }
                  className="w-16 h-16 mb-2 object-cover"
                />
                {/* Shop name */}
                <span className="text-lg font-medium text-gray-800">
                  {shop.shopName}
                </span>
              </div>
            ))
          ) : (
            <p>No shops available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSelection;
