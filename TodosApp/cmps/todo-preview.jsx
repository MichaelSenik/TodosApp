const { useState, useEffect } = React

import { showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/todos.action.js"
import { addActivity } from "../store/user.action.js"


export function TodoPreview({ todo }) {

    const [todoToEdit, setTodoToEdit] = useState(todo)
    const [isFistInit, setIsFistInit] = useState(true)

    useEffect(() => {
        if (isFistInit) return
        saveTodo(todoToEdit)
            .then(savedIsDoneTodo => {
                if (todoToEdit.isDone) addActivity({ txt: `Todo '${todoToEdit.txt}' is done`, at: Date.now() })
                else addActivity({ txt: `Todo '${todoToEdit.txt}' is undone`, at: Date.now() })
                showSuccessMsg(`Todo '${savedIsDoneTodo._id}' saved!`)
            })
    }, [todoToEdit])

    function toggleIsDone() {
        setIsFistInit(false)
        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, isDone: !prevTodoToEdit.isDone }))
    }

    return (
        <div className="todo-preview flex align-center">
            <input onChange={toggleIsDone} type="checkbox" name={todo._id} id={todo._id} checked={todoToEdit.isDone} />
            <span> {todo.txt} </span>
        </div>
    )
}