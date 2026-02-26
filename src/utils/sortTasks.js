const PRIORITY_ORDER = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    const priorityDiff =
      PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}