const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement =  document.querySelector<HTMLUListElement>('.list');

type Task = {
    description: string;
    isCompleted: boolean;
}

// Tasks array intitialized by loading data from local storage
const tasks: Task[] = loadTasks();

// each tasks from local storage gets rendered
tasks.forEach(renderTask);

function loadTasks(): Task[]{
    const storedTasks = localStorage.getItem('Tasks')
    // if there are stored tasks, then parse them. Otherwise, return empty array
    return storedTasks ? JSON.parse(storedTasks) : []
}

// form submission
taskForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    // gets task description from input
    const taskDescription = formInput?.value
    if(taskDescription && taskDescription.length > 3) {
        // if imput is not 
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