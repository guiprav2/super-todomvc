export default class Todo {
  state = {
    todos: [
      {
        id: 'todo-1',
        label: 'Buy groceries for the week',
        completed: false,
        dueDate: '2024-09-20',
        note: 'Restock produce and breakfast essentials.',
      },
      {
        id: 'todo-2',
        label: 'Schedule annual dentist appointment',
        completed: true,
        dueDate: '2024-09-05',
        note: 'Call Dr. Nguyen for openings next week.',
      },
      {
        id: 'todo-3',
        label: 'Finish Q3 project report',
        completed: false,
        dueDate: '2024-09-25',
        note: 'Incorporate updated revenue numbers.',
      },
    ],
    filter: 'all',
    newTodoText: '',
    newTodoDueDate: '',
    newTodoIncludeNote: false,
    newTodoNote: '',
    quickNote: '',
    quickNoteDetail: '',
    quickNoteExpanded: false,
    completeAll: false,
  };

  actions = {
    addTodo: () => {
      let text = this.state.newTodoText.trim();
      if (!text) {
        this.state.newTodoText = '';
        return;
      }
      let randomPart = Math.random().toString(36).slice(2);
      let fallbackId = `todo-${Date.now()}-${randomPart}`;
      let generatedId = crypto?.randomUUID ? crypto.randomUUID() : fallbackId;
      let note = this.state.newTodoIncludeNote ? this.state.newTodoNote.trim() : '';
      let dueDate = this.state.newTodoDueDate;
      let nextTodo = {
        id: generatedId,
        label: text,
        completed: false,
        dueDate,
        note,
      };
      this.state.todos = [nextTodo, ...this.state.todos];
      this.state.newTodoText = '';
      this.state.newTodoDueDate = '';
      this.state.newTodoIncludeNote = false;
      this.state.newTodoNote = '';
      this.state.completeAll =
        this.state.todos.length > 0 &&
        this.state.todos.every(todo => todo.completed);
    },

    removeTodo: id => {
      let nextTodos = this.state.todos.filter(todo => todo.id !== id);
      this.state.todos = nextTodos;
      this.state.completeAll =
        nextTodos.length > 0 && nextTodos.every(todo => todo.completed);
    },

    clearCompleted: () => {
      let nextTodos = this.state.todos.filter(todo => !todo.completed);
      this.state.todos = nextTodos;
      this.state.completeAll =
        nextTodos.length > 0 && nextTodos.every(todo => todo.completed);
    },

    toggleAll: () => {
      if (!this.state.todos.length) {
        return;
      }
      let shouldComplete = !this.state.todos.every(todo => todo.completed);
      this.state.todos = this.state.todos.map(todo => ({
        ...todo,
        completed: shouldComplete,
      }));
      this.state.completeAll = shouldComplete;
    },

    setFilter: filter => {
      this.state.filter = filter;
    },

    refreshCompleteAll: () => {
      this.state.completeAll =
        this.state.todos.length > 0 &&
        this.state.todos.every(todo => todo.completed);
    },

    toggleNoteField: () => {
      if (!this.state.newTodoIncludeNote) {
        this.state.newTodoNote = '';
      }
    },

    showQuickNoteDetails: () => {
      this.state.quickNoteExpanded = true;
    },

    maybeHideQuickNoteDetails: () => {
      if (!this.state.quickNote && !this.state.quickNoteDetail) {
        this.state.quickNoteExpanded = false;
      }
    },
  };
}
