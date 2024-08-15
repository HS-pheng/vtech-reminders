"use client";

import Image from "next/image";
import { openSans } from "./lib/fonts";
import { ITodo } from "./lib/types";
import Todo from "./ui/Todo";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewTodo from "./ui/NewTodo";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: "1",
      todo: "Compelete technical documentation for Vtech",
      isCompleted: false,
    },
    {
      id: "2",
      todo: "Develop and Debug the Vtech-todolist",
      isCompleted: false,
    },
    {
      id: "3",
      todo: "Deploy vtech-todolist to GCP",
      isCompleted: false,
    },
  ]);

  const [createNew, setCreateNew] = useState<boolean>(false);

  return (
    <div className={`${openSans.className}`}>
      <div className="flex">
        <input className="w-2/3 border p-2 rounded-md" placeholder=" Search " />
        <AddIcon
          className="ml-auto hover:bg-slate-300 cursor-pointer rounded-full"
          fontSize="large"
        />
      </div>

      <h2 className="font-bold">All</h2>
      <hr />
      <h3 className="font-bold text-blue-600">Reminders</h3>
      {createNew && <NewTodo />}
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}
