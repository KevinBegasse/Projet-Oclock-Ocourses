const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Cette liste est vide pour le moment !'},
    'task-2': { id: 'task-2', content: 'Pouet!'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Carrefour',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Mr. Bricolage',
      taskIds: ['task-1'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
};

export default initialData;