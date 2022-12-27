import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaRegEdit } from "react-icons/fa";

function Card({
  data,
  isEditing,
  openEditForm,
  editData,
  setIsEditing,
  handleEditStatus,
}) {
  const [newData, setNewData] = useState(data);
  const handleChangeData = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleEditData = (e) => {
    e.preventDefault();
    setIsEditing(false);
    editData(newData);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setNewData(data);
  };
  const handleToggle = (e) => {
    setNewData({ ...newData, [e.target.id]: !newData.status });
    handleEditStatus(newData.id);
  };
  return (
    <>
      {isEditing ? (
        <div className="border border-black rounded-[10px] w-[400px] h-[500px] flex flex-col items-center bg-white">
          <div className="flex flex-row justify-between p-[20px] w-full">
            <button onClick={openEditForm}>
              <FaRegEdit className="text-[24px]" />
            </button>
            <Switch
              checked={newData.status}
              onClick={handleToggle}
              className={`${
                newData.status ? "bg-blue-600" : "bg-gray-100 my-1"
              } relative inline-flex h-6 w-10 items-center rounded-full`}
            >
              <span
                className={`${
                  newData.status ? "translate-x-5" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <img
            src={newData?.url}
            className="border border-black w-[200px] h-[200px] rounded-full"
            alt="Profile"
          />
          <form className="flex flex-col items-center">
            <input
              className="w-full text-[24px] text-center rounded border border-gray-400  bg-gray-100 my-1 "
              placeholder="Name"
              defaultValue={newData.name}
              name="name"
              onChange={handleChangeData}
            />
            <input
              className="w-full text-[16px] text-center rounded border border-gray-400  bg-gray-100 my-1"
              placeholder="Email"
              defaultValue={newData.email}
              required
              name="email"
              onChange={handleChangeData}
            />
            <input
              className="w-full text-[16px] text-center rounded border border-gray-400  bg-gray-100 my-1"
              placeholder="Phone"
              defaultValue={newData.phone}
              required
              name="phone"
              onChange={handleChangeData}
            />
            <div className="border-black border-t-[1px] w-[320px] my-[10px]"></div>
            <input
              className="w-full text-[16px] text-center rounded border border-gray-400  bg-gray-100 my-1"
              placeholder="Company"
              defaultValue={newData?.companyName}
              required
              name="companyName"
              onChange={handleChangeData}
            />
            <div className="flex flex-row">
              <button
                className={`w-[100px] bg-green-700 rounded text-white m-1 ${
                  newData.name === "" ||
                  newData.phone === "" ||
                  newData.email === "" ||
                  newData.companyName === ""
                    ? " bg-gray-300 "
                    : " bg-green-700"
                }`}
                disabled={
                  newData.name === "" ||
                  newData.phone === "" ||
                  newData.email === "" ||
                  newData.companyName === ""
                }
                onClick={handleEditData}
              >
                Save
              </button>
              <button
                className="w-[100px] bg-gray-300 rounded m-1 "
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="border border-black rounded-[10px] w-[400px] h-[500px] flex flex-col items-center bg-white">
          <div className="flex flex-row justify-between p-[20px] w-full">
            <button onClick={openEditForm}>
              <FaRegEdit className="text-[24px]" />
            </button>
            <Switch
              id="status"
              checked={newData.status}
              onClick={handleToggle}
              className={`${
                newData.status ? "bg-blue-600" : "bg-gray-100 my-1"
              } relative inline-flex h-6 w-10 items-center rounded-full`}
            >
              <span
                id="status"
                className={`${
                  newData.status ? "translate-x-5" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <img
            src={newData?.url}
            className="border border-black w-[200px] h-[200px] rounded-full"
            alt="Profile"
          />

          <span className="text-[30px]">{newData.name}</span>
          <span className="text-[20px]">{newData.email}</span>
          <span className="text-[20px]">{newData.phone}</span>
          <div className="border-black border-t-[1px] w-[160px] my-[10px]"></div>
          <span className="text-[20px]">{newData?.companyName}</span>
        </div>
      )}
    </>
  );
}

export default Card;
