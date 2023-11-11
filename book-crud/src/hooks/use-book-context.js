import { useContext } from "react";
import BookContext from "../context/book";

function useBookContext() {
    return useContext(BookContext);
}

export default useBookContext;