const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Retrieve tasks from local storage and render them
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task));

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
function addTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    saveTasks(tasks);
}

// Delete task
function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    saveTasks(updatedTasks);
    renderTasks();
}

// Handle form submission
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
        renderTasks();
    }
});

renderTasks();