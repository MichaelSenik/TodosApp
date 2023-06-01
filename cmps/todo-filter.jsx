import { utilService } from "../services/util.service.js"
import { TodoSort } from "./todo-sort.jsx"

const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilterBy, sortBy, onSetSortBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy.current(filterByToEdit)
    }

    function onFilterByDone({ target }) {
        let value
        if (target.value === 'true') value = true
        else if (target.value === 'false') value = false
        else value = null
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, isDone: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="todos-filter">
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="Search Todos" />
                <button className="btn-search"> Search </button>
            </form>
            <div className="btns-filter-container sort-container flex align-center">
                <button onClick={onFilterByDone} value={null}> All </button>
                <button onClick={onFilterByDone} value={false}> Active </button>
                <button onClick={onFilterByDone} value={true}> Done </button>
                <TodoSort sortBy={sortBy} onSetSortBy={onSetSortBy} />
            </div>
        </section>
    )
}