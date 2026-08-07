```javascript
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

const themeBtn = document.getElementById("themeBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

// TASK ARRAY
let tasks = [];

// SAVE TASKS
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD TASKS
function loadTasks() {

    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    displayTasks();
}

// DISPLAY TASKS
function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        // FILTER CONDITIONS
        if (filter === "completed" && !task.completed) {
            return;
        }

        if (filter === "pending" && task.completed) {
            return;
        }

        // CREATE LIST ITEM
        const li = document.createElement("li");

        // TASK INFO
        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        if (task.completed) {
            taskInfo.classList.add("completed");
        }

        // PRIORITY CLASS
        let priorityClass = "";

        if (task.priority === "High") {
            priorityClass = "high";
        }
        else if (task.priority === "Medium") {
            priorityClass = "medium";
        }
        else {
            priorityClass = "low";
        }

        taskInfo.innerHTML = `
            <strong>${task.text}</strong>
            <div>Due: ${task.date || "No Date"}</div>
            <div class="priority ${priorityClass}">
                Priority: ${task.priority}
            </div>
        `;

        // BUTTON CONTAINER
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("task-buttons");

        // DONE BUTTON
        const doneBtn = document.createElement("button");

        doneBtn.innerText = "Done";
        doneBtn.classList.add("complete-btn");

        doneBtn.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks(filter);
        });

        // EDIT BUTTON
        const editBtn = document.createElement("button");

        editBtn.innerText = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function() {

            const updatedTask = prompt("Edit Task", task.text);

            if (updatedTask !== null && updatedTask.trim() !== "") {

                tasks[index].text = updatedTask;

                saveTasks();
                displayTasks(filter);
            }
        });

        // DELETE BUTTON
        const deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks(filter);
        });

        // APPEND BUTTONS
        buttonDiv.appendChild(doneBtn);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(deleteBtn);

        // APPEND ELEMENTS
        li.appendChild(taskInfo);
        li.appendChild(buttonDiv);

        taskList.appendChild(li);
    });
}

// ADD TASK
addBtn.addEventListener("click", function() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const task = {

        text: text,
        date: dueDate.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    // CLEAR INPUTS
    taskInput.value = "";
    dueDate.value = "";
});

// FILTER BUTTONS
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const filter = button.dataset.filter;

        displayTasks(filter);
    });
});

// DARK / LIGHT MODE
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.innerText = "☀️";
    }
    else {
        themeBtn.innerText = "🌙";
    }
});

// LOAD TASKS ON START
loadTasks();
```
