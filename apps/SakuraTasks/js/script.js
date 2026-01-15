// Estado

let tasks = [];
let currentFilter = 'all';
let currentPriority = 'low';
let editingTaskId = null;

// Elementos
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksContainer = document.getElementById('tasksContainer');
const priorityBtns = document.querySelectorAll('.priority-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Eventos
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

priorityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        priorityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPriority = btn.dataset.priority;
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Funciones
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    if (editingTaskId) {
        const task = tasks.find(t => t.id === editingTaskId);
        task.text = text;
        task.priority = currentPriority;
        editingTaskId = null;
        addBtn.textContent = '➕ Añadir';
    } else {
        tasks.unshift({
            id: Date.now(),
            text,
            completed: false,
            priority: currentPriority
        });
    }

    taskInput.value = '';
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    taskInput.value = task.text;
    currentPriority = task.priority;
    priorityBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.priority === task.priority));
    editingTaskId = id;
    addBtn.textContent = '✏️ Actualizar';
    taskInput.focus();
}

function renderTasks() {
    let filtered = tasks;
    if (currentFilter === 'pending') filtered = tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

    if (filtered.length === 0) {
        tasksContainer.innerHTML = `<p style="text-align:center;">🌸 No hay tareas</p>`;
        return;
    }

    tasksContainer.innerHTML = filtered.map(t => `
        <div class="task-item ${t.completed ? 'completed' : ''}">
            <div class="task-checkbox" onclick="toggleTask(${t.id})"></div>
            <div class="task-content">
                <span>${t.text}</span>
                <span class="priority-badge ${t.priority}">${getPriorityText(t.priority)}</span>
            </div>
            <div class="task-actions">
                <button onclick="editTask(${t.id})">✏️</button>
                <button onclick="deleteTask(${t.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function getPriorityText(p) {
    return p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja';
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Inicializar
renderTasks();
updateStats();



//si quiero volver a usar localstorage
// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); 
