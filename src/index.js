document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskList = document.getElementById("tasks");

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.style.marginLeft = "10px";

    // Add event listener to remove the task
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = "";
  });
});
