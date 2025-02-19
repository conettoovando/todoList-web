import { useContext } from "react";
import { TodoContext } from "./Todos";

export default function useTodos() {
    return useContext(TodoContext)
}