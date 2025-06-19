import ToDoItem from "./ToDoItem";

function ToDoList({ todos, onToggle, onDeleteItem, onEditItem }) {
    return (
        <>
            <div className="mt-6">
                <div className="flex w-[30%] border-1 border-gray-200 shadow-md mx-auto items-center justify-between bg-gray-100 p-4 rounded-xl my-4 select-none cursor-pointer hover:bg-green-700 hover:text-white duration-500">                    
                            <div className="flex gap-2 items-center justify-center">
                                <h1 className="flex items-center justify-between w-full font-bold mx-2">Demo Task 1</h1>
                            </div>
                        </div>
                {
                    todos.map((todo) => (
                        <ToDoItem key={todo.id} todo={todo} onToggle={onToggle} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
                    ))
                }
            </div>
        </>
    )
}

export default ToDoList;