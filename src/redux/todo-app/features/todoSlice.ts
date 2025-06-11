import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the Todo item interface
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Define the Todo state interface
export interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  filter: 'all' | 'active' | 'completed';
}

// Initialize the todo state
const initialState: TodoState = {
  todos: [
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Build Todo App', completed: true },
    { id: '3', text: 'Practice Redux', completed: false },
  ],
  status: 'idle',
  filter: 'all',
};

// Create the todo slice
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        // Generate a new ID (simple implementation - in production you might want a more robust ID generation)
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    // Mark a todo as completed
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Edit a todo
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    // Delete a todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Set the filter
    setFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>
    ) => {
      state.filter = action.payload;
    },
    // Mark all todos as complete
    markAllComplete: (state) => {
      state.todos.forEach((todo) => {
        todo.completed = true;
      });
    },
    // Clear completed todos
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

// Export actions
export const {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setFilter,
  markAllComplete,
  clearCompleted,
} = todoSlice.actions;

// Export the reducer
export default todoSlice.reducer;
