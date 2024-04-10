const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement =  document.querySelector<HTMLUListElement>('.list');

type Task = {
    description: string;
    isCompleted: boolean;
}

const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

function loadTasks(): Task[]{
    const storedTasks = localStorage.getItem('Tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
}

taskForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = formInput?.value
    if(taskDescription) {
        const task: Task ={
            description: taskDescription,
            isCompleted: false
        }
        addTask(task)

        //render tasks
        renderTask(task)

        //update local storage
        updateStorage();


        formInput.value='';
        return;

    } alert ('Please enter a task description');
})

function addTask(task: Task): void {
    tasks.push(task)
    console.log(tasks)
}

function renderTask(task: Task): void {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.description;
    
    const taskCheckBox = document.createElement('input')
    taskCheckBox.type = 'checkbox'
    taskCheckBox.checked = task.isCompleted;

    taskElement.appendChild(taskCheckBox);

    

    // toggle checkbox
    taskCheckBox.addEventListener('change', () => {
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) {
            taskElement.style.textDecoration = "line-through";
        } else {
            taskElement.style.textDecoration = "none";
        }
        updateStorage(); 
    })

    taskListElement?.appendChild(taskElement)

    if (task.isCompleted) {
        taskElement.style.textDecoration = "line-through";
    }
}

function updateStorage(): void {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}