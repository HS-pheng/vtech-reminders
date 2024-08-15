import { ITodo } from "../lib/types";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import clsx from "clsx";

export default function Todo({ todo }: { todo: ITodo }) {
  const [showActions, setShowActions] = useState<boolean>();

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
      <RadioButtonUncheckedIcon className="self-center mr-3 cursor-pointer" />
      <input
        className={clsx("p-2 border-b-2 w-full outline-none")}
        readOnly={false}
        value={todo.todo}
      />
      {showActions && (
        <div className="flex">
          <EditIcon
            className="p-2 self-center cursor-pointer hover:bg-blue-300 rounded-full"
            color="primary"
            fontSize="large"
          />
          <ClearIcon
            className="p-2 self-center cursor-pointer hover:bg-red-300 rounded-full"
            fontSize="large"
            color="error"
          />
        </div>
      )}
    </div>
  );
}
