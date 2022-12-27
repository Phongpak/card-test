import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import Modal from "./component/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("data")) {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          const imageRes = await axios.get("https://picsum.photos/v2/list");
          for (let i = 0; i < res?.data.length; i++) {
            res.data[i].url = imageRes.data[i].download_url;
            res.data[i].companyName = res.data[i].company.name;
            res.data[i].status = true;
            delete res.data[i].company;
          }
          localStorage.setItem("data", JSON.stringify(res.data));
          setData(res.data);
        } else {
          setData(JSON.parse(localStorage.getItem("data")));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const editData = (item) => {
    let index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === item.id) {
        index = i;
        break;
      }
    }
    const newData = [...data];
    newData[index] = item;
    setIsModalOpen(false);
    setIsEditing(false);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const handleEditStatus = (id) => {
    let index;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }
    const newData = [...data];
    newData[index].status = !newData[index].status;
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <div className="w-screen  flex justify-center items-center mt-5">
      {isModalOpen ? (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
          data={selectedData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editData={editData}
          handleEditStatus={handleEditStatus}
        />
      ) : (
        ""
      )}
      <div className=" grid grid-cols-3 gap-x-10 gap-y-6">
        {data.map((item) => (
          <Card
            setIsModalOpen={setIsModalOpen}
            item={item}
            setSelectedData={setSelectedData}
            openEditForm={() => setIsEditing(true)}
            key={item.id}
            handleEditStatus={handleEditStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
