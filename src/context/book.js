import { createContext, useState } from "react";
import axios from 'axios';


const BookContext = createContext();

function Provider({ children }) {

    const [books, setBook] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books')
        setBook(response.data);
    }

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response };
            }
            console.log(id);
            console.log(book.id);
            console.log(book);
            return book;
        })
        setBook(updatedBooks);
    }

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`)
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBook(updatedBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        })

        const updatedBooks = [...books, response.data]
        setBook(updatedBooks)
    }

    const valueToShare = {
        books,
        deleteBookById,
        createBook,
        editBookById,
        fetchBooks
    }

    return <BookContext.Provider value={valueToShare}>
        {children}
    </BookContext.Provider>
}
export { Provider };

export default BookContext;