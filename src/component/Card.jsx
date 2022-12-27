import React from "react";
import { Switch } from "@headlessui/react";
import { FaRegEdit } from "react-icons/fa";

function Card({
  setIsModalOpen,
  item,
  setSelectedData,
  openEditForm,
  handleEditStatus,
}) {
  const handleSelectCard = () => {
    setIsModalOpen(true);
    setSelectedData(item);
  };
  const onToggleClick = (e) => {
    e.stopPropagation();
    handleEditStatus(item.id);
  };

  return (
    <div
      className={`backdrop-grayscale border border-black rounded-[10px] w-[200px] h-[250px] flex flex-col items-center relative z-0 ${
        item.status ? "" : "bg-gray-200"
      }`}
      onClick={handleSelectCard}
    >
      <div className="flex flex-row justify-between w-full px-4 ">
        <button onClick={openEditForm}>
          <FaRegEdit />
        </button>

        <Switch
          checked={item.status}
          onClick={(e) => onToggleClick(e)}
          className={`${
            item.status ? "bg-blue-600" : "bg-gray-200"
          } inline-flex h-4 w-8 items-center rounded-full z-100 mt-1  `}
        >
          <span
            className={`${
              item.status ? "translate-x-4" : "translate-x-1"
            } inline-block h-3 w-3 transform rounded-full bg-white transition  `}
          />
        </Switch>
      </div>
      <img
        src={item?.url}
        className={`border border-black w-[100px] h-[100px] rounded-full ${
          item.status ? "" : "opacity-50"
        }`}
        alt="Profile"
      />

      <span className="text-[16px]">{item?.name}</span>
      <span className="text-[12px]">{item?.email}</span>
      <span className="text-[12px]">{item?.phone}</span>
      <div className="border-black border-t-[1px] w-[160px] my-[10px]"></div>
      <span className="text-[12px]">{item?.companyName}</span>
    </div>
  );
}

export default Card;
