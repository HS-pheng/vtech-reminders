"use client";

import { openSans } from "./lib/fonts";
import { ITodo } from "./lib/types";
import Todo from "./ui/Todo";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useRef, useState } from "react";
import NewTodo from "./ui/NewTodo";
import "react-toastify/dist/ReactToastify.css";
import notify from "./lib/toast";
import { ToastContainer } from "react-toastify";
import { Skeleton, Typography } from "@mui/material";
import supabase from "./lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [createNew, setCreateNew] = useState<boolean>(false);

  const inputElement = useRef<HTMLInputElement>(null);

  const loadTodos = (filter = "") => {
    setLoading(true);
    fetch(`api/todos?filter=${filter}`)
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos.data);
        setLoading(false);
      });
  };

  const handleClickAdd = () => {
    setCreateNew(true);
  };

  const handleEnterAdd = () => {
    setCreateNew(false);
  };

  const addTodo = (todo: string) => {
    setLoading(true);
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ todo }),
    }).then(async (res) => {
      if (!res.ok) {
        const jsonRes = (await res.json()) as { message: string };
        notify(jsonRes.message);
      }
      loadTodos();
      handleEnterAdd();
    });
  };

  const editTodo = (
    todoId: string,
    todo: string,
    setEditable: (value: boolean) => void
  ) => {
    setLoading(true);
    fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ todo }),
    }).then(async (res) => {
      if (!res.ok) {
        const jsonRes = (await res.json()) as { message: string };
        notify(jsonRes.message);
        setEditable(true);
        setLoading(false);
      } else {
        loadTodos();
        setEditable(false);
      }
    });
  };

  const deleteTodo = (todoId: string) => {
    setLoading(true);
    fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => loadTodos());
  };

  const toggleTodo = (todo: ITodo) => {
    setLoading(true);
    fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todo.todo, isCompleted: !todo.isCompleted }),
    }).then(() => loadTodos());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    loadTodos(debouncedTerm);
  }, [debouncedTerm]);

  useEffect(() => {
    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload: RealtimePostgresChangesPayload<ITodo>) => {
          switch (payload.eventType) {
            case "INSERT":
              setTodos([
                {
                  id: (payload.new as any).id,
                  todo: (payload.new as any).todo,
                  isCompleted: (payload.new as any).is_completed,
                },
                ...(todos ?? []),
              ]);
              break;
            case "UPDATE":
              // setTodos([
              //   {
              //     id: (payload.new as any).id,
              //     todo: (payload.new as any).todo,
              //     isCompleted: (payload.new as any).is_completed,
              //   },
              //   ...(todos ?? []).filter(
              //     (current) => current.id !== payload.new.id
              //   ),
              // ]);
              setTodos((prevTodos) =>
                (prevTodos ?? []).map((current) => {
                  if (current.id === payload.new.id) {
                    return {
                      id: current.id,
                      todo: (payload.new as any).todo,
                      isCompleted: (payload.new as any).is_completed,
                    };
                  }
                  return current;
                })
              );
              break;
            case "DELETE":
              // console.log(payload);
              // const index = (todos ?? []).findIndex((current) => {
              //   return current.id == (payload.old as any).id;
              // });
              setTodos(
                (todos ?? []).filter((current) => current.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [todos]);

  return (
    <div className={`${openSans.className}`}>
      <ToastContainer />
      <div className="flex">
        <input
          className="w-2/3 border p-2 rounded-md"
          placeholder=" Search "
          onChange={(e) => {
            console.log("change");
            setSearchTerm(e.target.value);
          }}
          ref={inputElement}
        />
        <AddIcon
          className="ml-auto hover:bg-slate-300 cursor-pointer rounded-full"
          fontSize="large"
          onClick={handleClickAdd}
        />
      </div>
      <h2 className="font-bold">All</h2>
      <hr />
      <h3 className="font-bold text-blue-600">Reminders</h3>
      {loading ? (
        <div>
          <Typography variant="h2">
            <Skeleton />
          </Typography>
          <Typography variant="h2">
            <Skeleton />
          </Typography>
          <Typography variant="h2">
            <Skeleton />
          </Typography>
        </div>
      ) : (
        <div>
          {createNew && (
            <NewTodo addTodo={addTodo} handleEnterAdd={handleEnterAdd} />
          )}
          {todos?.length === 0 && <div>No matched todo</div>}
          {todos?.map((todo) => {
            return (
              <Todo
                key={`${todo.id}${todo.todo}${todo.isCompleted}`}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleTodo={toggleTodo}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
