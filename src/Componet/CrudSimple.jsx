import React, { useState } from "react";
import { useEffect } from "react";

export default function CrudSimple() {
  // Array:-
  const [item, setItem] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Object:-
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });

  // Edit:-
  const [edit, setEdit] = useState(null);

  // Get data from user:-

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // submit from:-
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.name === "") {
      alert("enter name");
      return;
    } else if (inputValue.email.includes("!@")) {
      alert("enter a valid email");
    } else {
      setItem([...item, inputValue]);
      console.log(inputValue);

      setInputValue({
        name: "",
        email: "",
      });
    }
    setEdit(null);
  };

  // set data in localstorage:-

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(item));
  }, [item]);

  // delete:-
  const handleDelete = (index) => {
    const updatedData = [...item];
    updatedData.splice(index, 1);
    setItem(updatedData);
  };

  // edit:-
  const handleEdit = (index) => {
    setInputValue(item[index]);
    setEdit(index);
  };

  // update data:-
  const handleUpdateData = () => {
    const updatedData = [...item];
    updatedData[edit] = inputValue;
    setItem(updatedData);
    setInputValue({
      name: "",
      email: "",
    });
    setEdit(null);
  };
  return (
    <>
      <div className="main">
        <div>
          <h1>
            Hello,
            <br />
            Welcome!
          </h1>

          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={inputValue.name}
              name="name"
              onChange={handleInput}
            />
            <br />
            <br />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={inputValue.email}
              name="email"
              onChange={handleInput}
            />
            <br />
            <br />

            {edit === null ? (
              <button className="btn1">Add Data</button>
            ) : (
              <button onClick={() => handleUpdateData()} className="btn1">
                Update Data
              </button>
            )}
          </form>
          <br />
          <br />
          {/* show data */}

          <table border={1} className="detail">
            <thead>
              <tr>
                <th className="tr1">Sr no</th>
                <th className="tr1">Name</th>
                <th className="tr1">Email</th>
                <th className="tr1">Action</th>
              </tr>
            </thead>
            <tbody>
              {item.map((ele, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="tr2">{ele.name}</td>
                  <td className="tr2">{ele.email}</td>
                  <td className="tr2">
                    <div className="mm">
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
