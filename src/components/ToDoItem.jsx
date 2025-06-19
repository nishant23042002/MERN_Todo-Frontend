import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDoNotDisturb } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function ToDoItem({ todo, onToggle, onDeleteItem, onEditItem }) {
    const [edit, setEdit] = useState(false);
    const [editList, setEditList] = useState(todo.text);

    const handleEditListItem = () => {
        if (editList.trim()) {
            onEditItem(todo.id, editList);
            setEdit(false);
        }
    };

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            handleEditListItem()
        }else if(e.key === "Escape"){
            setEdit(false)
            setEditList(todo.text)
        }
    }

    return (
        <div className="flex w-[30%] border-1 border-gray-200 shadow-md mx-auto items-center justify-between bg-gray-100 p-4 rounded-xl my-4 select-none cursor-pointer hover:bg-green-700 hover:text-white duration-500">
            {
                edit ? (
                    <input type="text" value={editList} onChange={e => setEditList(e.target.value)} onKeyDown={handleKeyPress} onBlur={handleEditListItem} className="flex-grow border outline-none px-2 py-1 rounded mr-2" />
                ) : (
                    <div onClick={() => onToggle(todo.id)} className="flex items-center justify-between w-full font-bold mx-2">{todo.text} {todo.completed ? <IoCheckmarkDoneCircle /> :  <MdDoNotDisturb color="red" />}</div>
                )
            }
            <div className="flex gap-2 items-center justify-center">
                <button onClick={() => setEdit(!edit)} className="text-yellow-500 cursor-pointer"><FaRegEdit size={"20px"} /></button>
                <button onClick={() => onDeleteItem(todo.id)} className="text-red-500 cursor-pointer"><RiDeleteBinLine size={"20px"} color="red" /></button>
            </div>
        </div>
    )
}

export default ToDoItem;