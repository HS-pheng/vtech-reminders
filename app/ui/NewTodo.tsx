import { ITodo } from "../lib/types";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function NewTodo() {
  return (
    <div className="flex">
      <RadioButtonUncheckedIcon className="self-center mr-3 cursor-pointer" />
      <input className="p-2 border-b-2 w-full" />
    </div>
  );
}
