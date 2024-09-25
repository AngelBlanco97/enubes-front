import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
