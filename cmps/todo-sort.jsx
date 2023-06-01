const { useState, useEffect } = React

export function TodoSort({ sortBy, onSetSortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'desc') setSortByToEdit(prevSort => ({ ...prevSort, desc: -(prevSort.desc) }))
        else setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
    }

    return (
        <form className="todos-sort flex align-center">
            <select className="sort-type" name="type" value={sortByToEdit.type} onChange={handleChange}>
                <option value=""> Sort By </option>
                <option value="txt"> Name </option>
                <option value="createdAt"> Date </option>
            </select>
            <label className="descending-sort flex align-center">
                <input type="checkbox" name="desc" checked={sortByToEdit.desc > 0} onChange={handleChange} />
                <span> Descending </span>
            </label>
        </form >
    )
}