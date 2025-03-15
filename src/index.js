document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const priorityInput = document.getElementById("task-priority");
  const userInput = document.getElementById("task-user");
  const dueDateInput = document.getElementById("task-due-date");
  const taskList = document.getElementById("tasks");
  const sortButton = document.getElementById("sort-tasks");
  let ascending = true;

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    const user = userInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `<strong>${taskText}</strong> (Assigned to: ${user || "N/A"}, Due: ${dueDate || "N/A"})`;
    taskItem.style.color = getPriorityColor(priority);

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.style.marginLeft = "10px";
    editButton.addEventListener("click", () => editTask(taskItem));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => taskItem.remove());

    taskItem.addEventListener("click", () => taskItem.classList.toggle("completed"));

    taskItem.dataset.priority = priority;
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    userInput.value = "";
    dueDateInput.value = "";
  });

  sortButton.addEventListener("click", () => {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return ascending
        ? priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority]
        : priorityOrder[b.dataset.priority] - priorityOrder[a.dataset.priority];
    });

    tasks.forEach(task => taskList.appendChild(task));
    ascending = !ascending;
  });

  function getPriorityColor(priority) {
    return priority === "High" ? "red" : priority === "Medium" ? "orange" : "green";
  }

  function editTask(taskItem) {
    const newText = prompt("Edit your task:", taskItem.firstChild.textContent);
    if (newText) {
      taskItem.firstChild.textContent = newText;
    }
  }
});
