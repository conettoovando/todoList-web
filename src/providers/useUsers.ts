import { useContext } from "react";
import { UserContext } from "./Users";

export default function useTodos() {
    return useContext(UserContext)
}