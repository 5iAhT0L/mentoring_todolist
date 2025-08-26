import { TodoItem } from "./button";  // import TodoItem from button.jsx

export default function TodoList() {
  // ... your state & handlers

  return (
    <div className="max-w-md mx-auto mt-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
