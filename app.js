let tasks = [];
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const searchInput = document.getElementById("search-input");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

function renderTasks(filterText = "") {
  taskList.innerHTML = "";

  const filteredTasks = tasks
    .map((task, index) => ({ ...task, indexAsli: index }))
    .filter(task =>
      task.text.toLowerCase().includes(filterText.toLowerCase())
    );

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");

    // tampilkan teks + tanggal
    const content = document.createElement("span");
    content.innerHTML = `<strong>${task.text}</strong><br><small>${task.date}</small>`;

    // ikon Edit
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "auto";
    editBtn.style.backgroundColor = "rgb(6, 152, 16)";
    editBtn.addEventListener("click", function () {
      editTask(task.indexAsli); 
    });

    // ikon Hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.style.marginLeft = "5px";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.indexAsli);
    });

    li.appendChild(content);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(searchInput.value);
}

function editTask(index) {
  const newText = prompt("Edit tugas:", tasks[index].text);

  if (newText !== null) {
    const trimmed = newText.trim();
    if (trimmed !== "") {
      tasks[index].text = trimmed;
      saveTasks();
      renderTasks(searchInput.value);
    } else {
      alert("Input tidak boleh kosong!");
    }
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text !== "") {
    const date = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    tasks.push({ text, date });
    saveTasks();
    renderTasks(searchInput.value);
    input.value = "";
  }
});

if (searchInput) {
  searchInput.addEventListener("input", function () {
    renderTasks(searchInput.value);
  });
}

window.addEventListener("load", loadTasks);

