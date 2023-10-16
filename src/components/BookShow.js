import { useState} from "react";
import BookEdit from "./BookEdit";
import useBookContext from "../hooks/use-book-context";

function BookShow({book}) {

  const [showEdit , setShowEdit] = useState(false);
  const {deleteBookById} = useBookContext();
  const handleDeleteClick = () =>{
    deleteBookById(book.id)
  }

  const handleEditClick = () =>{
    setShowEdit(!showEdit)
  }

  const handleSubmit = () =>{
    setShowEdit(false)
  }

  let content  = <h3>{book.title}</h3>
  if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book}/>
  }
  return (
    <>
      <div className="book-show">
        <img src={`https://picsum.photos/seed/${book.id}300/200`} alt="Books" />
        <div>{content}</div>
        <div className="actions">
          <button className="edit" onClick={handleEditClick}>Edit</button>
          <button className="delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default BookShow
