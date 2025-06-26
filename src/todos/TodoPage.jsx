import React, { useState } from 'react';
import TodoItem from './TodoItem';
import SearchBar from './SearchBar';
import { Trash, Rabbit } from 'lucide-react';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [displayedTodos, setDisplayedTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  const isEmpty = todos.length === 0;

  const isSorted = todos.every((todo, i, arr) => {
    return i === 0 || arr[i - 1].text.localeCompare(todo.text) <= 0;
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    const todoText = e.target.todo.value;
    if (todoText.length === 0) return;

    const newTodo = [...todos, {
      text: todoText,
      id: crypto.randomUUID(),
      completed: false
    }];

    setTodos(newTodo);
    setDisplayedTodos(newTodo);
    e.target.reset();
  }

  function handleCheck(id, checked) {
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, completed: checked } : item
    );
    setTodos(newtodos);
    setDisplayedTodos(newtodos);
  }

  function handleDelete(id) {
    const newtodos = todos.filter((item) => item.id !== id);
    setTodos(newtodos);
    setDisplayedTodos(newtodos);
  }

  function handleSort() {
    const newTodos = [...todos];
    newTodos.sort((a, b) => a.text.localeCompare(b.text));
    setTodos(newTodos);
    setDisplayedTodos(newTodos);
  }

  function handleUpdateTodoText(id, todoText) {
    if (!todoText) return;
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, text: todoText } : item
    );
    setTodos(newtodos);
    setDisplayedTodos(newtodos);
  }

  function handleMoveUp(index) {
    if (index === 0) return;
    const newtodos = [...todos];
    [newtodos[index - 1], newtodos[index]] = [newtodos[index], newtodos[index - 1]];
    setTodos(newtodos);
    setDisplayedTodos(newtodos);
  }

  function handleMoveDown(index) {
    if (index === todos.length - 1) return;
    const newtodos = [...todos];
    [newtodos[index + 1], newtodos[index]] = [newtodos[index], newtodos[index + 1]];
    setTodos(newtodos);
    setDisplayedTodos(newtodos);
  }

  const handleSearchInput = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (!searchMode) {
    const matches = todos.filter(todo =>
      todo.text.toLowerCase().includes(query.toLowerCase())
    );
    const rest = todos.filter(todo =>
      !todo.text.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedTodos([...matches, ...rest]); 
  }
};


  const handleSearch = () => {
    const matches = todos.filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedTodos(matches);
    setSearchMode(true);
  };

  const handleCancel = () => {
    setDisplayedTodos(todos);
    setSearchQuery('');
    setSearchMode(false);
  };

  const comp = todos.filter((item) => item.completed).length;

  const EmptySpace = () => (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 text-sec">
      <Rabbit size={40} />
      <p>Nothing here.. Write some todos</p>
    </div>
  );

  const EmptySearch=()=>(
    <div className="flex flex-col justify-center items-center gap-4 mt-10 text-sec">
      <Rabbit size={40} />
      <p>No results found</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
      <h1 className="text-center font-display text-6xl font-bold text-accent">To-Do List</h1>
      <p className="text-center text-lg font-light text-sec italic">Manage your tasks with ease</p>

      <form
        className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between gap-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="todo"
          required
          placeholder="Enter a todo here..."
          className="flex-1 font-body focus:outline-none"
        />
        <button className="p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover">
          <p className='font-body font-bold'> Add </p>
        </button>
      </form>

      <div className="flex justify-center gap-6">
        {!isEmpty && (
          <button
            className="px-4 py-4 ring-2 ring-red-500 rounded-lg flex gap-2 hover:bg-red-400 hover:text-black items-center cursor-pointer"
            onClick={() => {
              setTodos([]);
              setDisplayedTodos([]);
            }}
          >
            <Trash />
            Delete All
          </button>
        )}

        {!isSorted && (
          <button
            className="px-4 py-4 ring-2 ring-accent rounded-lg cursor-pointer hover:bg-yellow-300 hover:text-black"
            onClick={handleSort}
          >
            Sort todos
          </button>
        )}
      </div>

      {!isEmpty && (
        <p className="text-sec text-right my-10">
          Completed: {comp} / {todos.length}
        </p>
      )}

      {todos.length > 0 && (
        <SearchBar
          searchQuery={searchQuery}
          handleCancel={handleCancel}
          handleSearch={handleSearch}
          handleSearchInput={handleSearchInput}
        />
      )}

      {displayedTodos.length > 0 ? (
        <div className="space-y-4">
          {displayedTodos.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              onTodoTextUpdate={handleUpdateTodoText}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              index={index}
              len={displayedTodos.length}
            />
          ))}
        </div>
      ) : searchMode ? <EmptySearch /> : (
        <EmptySpace />
      )}
    </div>
  );
};

export default TodoPage;
