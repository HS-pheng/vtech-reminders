import { KeyboardEvent, useEffect, useRef } from "react";
import { ITodo } from "../lib/types";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function NewTodo({
  addTodo,
  handleEnterAdd,
}: {
  addTodo: (todo: string) => void;
  handleEnterAdd: () => void;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  const keyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputElement.current &&
      inputElement.current?.value !== ""
    ) {
      addTodo(inputElement.current.value);
      inputElement.current.value = "";
    }
  };

  return (
    <div className="flex">
      <RadioButtonUncheckedIcon className="self-center mr-3 cursor-pointer" />

      <input
        className="p-2 border-b-2 w-full outline-none"
        ref={inputElement}
        onKeyDown={keyPressed}
      />
    </div>
  );
}
