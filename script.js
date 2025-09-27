const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Load tasks when page starts
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks(); // save after adding
  taskInput.value = ""; // clear input
}

function createTaskElement(text, done = false) {
  let li = document.createElement("li");
  li.textContent = text;

  if (done) li.classList.add("done");

  // Toggle done when clicked
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  delBtn.onclick = (e) => {
    e.stopPropagation(); // stop toggle
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  return li;
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved) {
    JSON.parse(saved).forEach(task => {
      let li = createTaskElement(task.text, task.done);
      taskList.appendChild(li);
    });
  }
}