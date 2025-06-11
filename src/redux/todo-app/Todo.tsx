import React, { useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import {
  addTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  markAllComplete,
  clearCompleted,
} from './features/todoSlice';
import { store, type RootState } from '../todo-app/store'; // Assuming you have a store.ts file with RootState type

// TodoItem Component
const TodoItem = ({
  todo,
}: {
  todo: { id: string; text: string; completed: boolean };
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      dispatch(editTodo({ id: todo.id, text: editText }));
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    backgroundColor: todo.completed ? '#e6f7ff' : 'white',
    border: '1px solid #ccc',
  };

  const textStyles = {
    margin: '0 10px',
    flex: 1,
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? '#555' : '#222',
    fontWeight: todo.completed ? 'normal' : ('500' as const),
  };

  const inputStyles = {
    margin: '0 10px',
    flex: 1,
    padding: '4px 8px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const actionsStyles = {
    display: 'flex',
    gap: '5px',
  };

  const buttonStyles = {
    padding: '4px 8px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500' as const,
  };

  return (
    <div style={itemStyles}>
      <input
        type='checkbox'
        checked={todo.completed}
        style={{ cursor: 'pointer' }}
        onChange={handleToggleTodo}
      />

      {isEditing ? (
        <input
          type='text'
          style={inputStyles}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span style={textStyles}>{todo.text}</span>
      )}

      <div style={actionsStyles}>
        {isEditing ? (
          <>
            <button
              style={{
                ...buttonStyles,
                backgroundColor: '#4CAF50',
                color: 'white',
              }}
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              style={{
                ...buttonStyles,
                backgroundColor: '#f0f0f0',
                color: '#333',
              }}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                ...buttonStyles,
                backgroundColor: '#e0e0e0',
                color: '#333',
              }}
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              style={{
                ...buttonStyles,
                backgroundColor: '#ffcccb',
                color: '#b30000',
              }}
              onClick={handleDeleteTodo}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Tabs Component
const Tabs = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todo.filter);

  const tabsStyles = {
    display: 'flex',
    gap: '10px',
    margin: '15px 0',
  };

  const tabStyles = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#e0e0e0',
    color: '#333',
    fontWeight: '500' as const,
  };

  const activeTabStyles = {
    ...tabStyles,
    backgroundColor: '#2c6cb0',
    color: 'white',
  };

  return (
    <div style={tabsStyles}>
      <button
        style={currentFilter === 'all' ? activeTabStyles : tabStyles}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        style={currentFilter === 'active' ? activeTabStyles : tabStyles}
        onClick={() => dispatch(setFilter('active'))}
      >
        Active
      </button>
      <button
        style={currentFilter === 'completed' ? activeTabStyles : tabStyles}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
    </div>
  );
};

// TodoStats Component
const TodoStats = ({
  todos,
}: {
  todos: Array<{ id: string; text: string; completed: boolean }>;
}) => {
  const statsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    color: '#333',
    fontWeight: '500' as const,
  };

  return (
    <div style={statsStyles}>
      <span>Total: {todos.length}</span>
      <span>Completed: {todos.filter((todo) => todo.completed).length}</span>
      <span>Pending: {todos.filter((todo) => !todo.completed).length}</span>
    </div>
  );
};

// TodoInput Component
const TodoInput = () => {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');

  const inputSectionStyles = {
    display: 'flex',
    marginBottom: '20px',
  };

  const inputStyles = {
    flex: 1,
    padding: '10px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
    backgroundColor: 'white',
  };

  const buttonStyles = {
    padding: '10px 15px',
    backgroundColor: '#2c6cb0',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontWeight: '500' as const,
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={inputSectionStyles}>
      <input
        type='text'
        placeholder='Add a new todo...'
        style={inputStyles}
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button style={buttonStyles} onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
};

// BulkActions Component
const BulkActions = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const bulkStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const buttonStyles = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgb(44, 108, 176)',
    color: '#fff',
    fontWeight: '500' as const,
    opacity: hasCompletedTodos ? 1 : 0.5,
  };

  return (
    <div style={bulkStyles}>
      <button style={buttonStyles} onClick={() => dispatch(markAllComplete())}>
        Mark All Complete
      </button>
      <button
        style={buttonStyles}
        onClick={() => dispatch(clearCompleted())}
        disabled={!hasCompletedTodos}
      >
        Clear Completed
      </button>
    </div>
  );
};

// Main Todo Component
const Todo = () => {
  // Get todos from Redux store
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);

  const containerStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  const headingStyles = {
    textAlign: 'center' as const,
    color: '#222',
    marginBottom: '20px',
  };

  const todoListStyles = {
    marginTop: '20px',
  };

  const emptyStateStyles = {
    textAlign: 'center' as const,
    margin: '30px 0',
    color: '#888',
    fontStyle: 'italic',
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Todo App</h1>

      <TodoInput />
      <TodoStats todos={todos} />
      <Tabs />

      <div style={todoListStyles}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div style={emptyStateStyles}>
            {filter === 'all'
              ? 'No todos yet. Add one above!'
              : filter === 'active'
              ? 'No active todos!'
              : 'No completed todos!'}
          </div>
        )}
      </div>

      <BulkActions />
    </div>
  );
};

export default Todo;
