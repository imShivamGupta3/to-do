import React from 'react'
import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { SquarePen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { Check } from 'lucide-react'
import { X } from 'lucide-react'
import CheckBox from './CheckBox'

const TodoItem = ({ item, handleCheck, handleDelete, onTodoTextUpdate, onMoveUp, onMoveDown, index, len }) => {

    const [showEditTodo, setShowEditTodo] = useState(false);

    function handleEditTodo(e) {
        e.preventDefault();
        const todoText = e.target.todo.value;
        onTodoTextUpdate(item.id, todoText);
        setShowEditTodo(false);
    }

    const todoEditForm = () => {
        return (
            <div className='flex justify-between items-center bg-gray-900 px-4 py-2 min-h-20 rounded-lg group'>
                <form
                    className='flex-1 flex items-center gap-2 px-2' onSubmit={handleEditTodo}>
                    <input
                        className='flex-1 border-2 border-sec rounded-md px-4 py-2 font-body'
                        type="text"
                        name="todo"
                        required
                        defaultValue={item.text}>
                    </input>
                    <button className='bg-hover'>
                        <Check />
                    </button>
                </form>
                <button
                    className='text-red-500 bg-hover'
                    onClick={() => setShowEditTodo(false)}>
                    <X />
                </button>
            </div>
        )
    }

    const todoItemDiv = () => {
        return (
            <div className='flex gap-4 justify-between items-center  hover:bg-gray-700 rounded-lg px-4 py-2 group'>
                < div className='flex flex-col gap-1 text-sec '>
                    <button
                        className="rounded-md p-1 cursor-pointer hover:bg-gray-700"
                        disabled={index == len - 1}
                        onClick={() => onMoveDown(index)}>
                        <ChevronDown />
                    </button>
                    <button
                        className="rounded-md p-1 cursor-pointer hover:bg-gray-700"
                        disabled={index == 0}
                        onClick={() => onMoveUp(index)}> <ChevronUp /> </button>
                </div>

                <div className='flex-1 flex gap-4 items-center'>
                    <CheckBox 
                    id={item.id} 
                    checked={item.completed} 
                    onChange={(e) => handleCheck(item.id, e.target.checked)}
                    label={item.text}
                    />
                </div>

                <div className='hidden group-hover:flex gap-4 '>
                    <button
                        className='bg-hover'
                        onClick={() => setShowEditTodo(true)}>
                        <SquarePen />
                    </button>
                    <button
                        className='text-red-500 bg-hover'
                        onClick={() => handleDelete(item.id)}>
                        <Trash />
                    </button>
                </div>

            </div>
        )
    }

    return (
        <div className='border-t border-sec pt-3'>
            {showEditTodo ? todoEditForm() : todoItemDiv()}
        </div>
    )
}

export default TodoItem