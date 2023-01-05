import React, { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./component/AddTodo";
import Todo from "./component/Todo";
const App = () => {
  const [users, setUsers] = useState([]);
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const onAdd = async (name) => {
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
        setPostData(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(postData);
  console.log(users);
  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1 className="heading">TODO APP</h1>

      <br />
      <AddTodo onAdd={onAdd} />
      <div>
        {users.map((user) => (
          <Todo
            id={user.id}
            key={user.id}
            name={user.title}
            onDelete={onDelete}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
