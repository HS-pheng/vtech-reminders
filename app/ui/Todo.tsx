import { ITodo } from "../lib/types";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState, KeyboardEvent } from "react";
import clsx from "clsx";
import { RadioButtonChecked } from "@mui/icons-material";

export default function Todo({
  todo,
  deleteTodo,
  editTodo,
  toggleTodo,
}: {
  todo: ITodo;
  deleteTodo: (todoId: string) => void;
  editTodo: (
    todoId: string,
    todo: string,
    setEditable: (value: boolean) => void
  ) => void;
  toggleTodo: (todo: ITodo) => void;
}) {
  const [showActions, setShowActions] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [edittingTodo, setEdittingTodo] = useState<string>(todo.todo);

  const inputElement = useRef<HTMLInputElement>(null);

  const openEdit = () => {
    setEditable(true);
    console.log("edit");
    inputElement.current?.focus();
  };

  const keyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputElement.current &&
      inputElement.current?.value !== ""
    ) {
      editTodo(todo.id, inputElement.current.value, setEditable);
      setEditable(false);
    }
  };

  return (
    <div
      className="flex"
      onMouseEnter={() => {
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setShowActions(false);
      }}
    >
      {todo.isCompleted === true ? (
        <RadioButtonChecked
          className="self-center mr-3 cursor-pointer"
          onClick={() => {
            toggleTodo(todo);
          }}
        />
      ) : (
        <RadioButtonUncheckedIcon
          className="self-center mr-3 cursor-pointer"
          onClick={() => {
            toggleTodo(todo);
          }}
        />
      )}

      <input
        className={clsx("p-2 border-b-2 w-full outline-none", {
          "line-through": todo.isCompleted,
        })}
        readOnly={!editable}
        defaultValue={edittingTodo}
        ref={inputElement}
        onKeyDown={keyPressed}
      />
      {showActions && (
        <div className="flex">
          <EditIcon
            className="p-2 self-center cursor-pointer hover:bg-blue-300 rounded-full"
            color="primary"
            fontSize="large"
            onClick={openEdit}
          />
          <ClearIcon
            className="p-2 self-center cursor-pointer hover:bg-red-300 rounded-full"
            fontSize="large"
            color="error"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
        </div>
      )}
    </div>
  );
}
