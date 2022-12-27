import React from "react";
import EditedCard from "./EditedCard";

function Modal({
  closeModal,
  isModalOpen,
  data,
  isEditing,
  setIsEditing,
  editData,
  handleEditStatus,
}) {
  const handleCloseForm = () => {
    setIsEditing(false);
    closeModal();
  };
  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-full bg-[#0002] z-10 ${
        isModalOpen ? "scale-100" : "scale-0"
      }`}
      onClick={handleCloseForm}
    >
      <div
        className={`modal-content absolute top-[calc(100vh/2-250px)] left-[calc(100vw/2-200px)]
         rounded-lg  mx-auto transition-transform duration-300 z-20 ${
           isModalOpen ? "scale-100" : "scale-0"
         }`}
        onClick={(e) => e.stopPropagation()}
      >
        <EditedCard
          setIsEditing={setIsEditing}
          data={data}
          editData={editData}
          isEditing={isEditing}
          openEditForm={() => setIsEditing(true)}
          handleEditStatus={handleEditStatus}
        />
      </div>
    </div>
  );
}

export default Modal;
