const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement =  document.querySelector<HTMLUListElement>('.list');

type Task = {
    description: string;
    isCompleted: boolean;
}

const tasks: Task[] = [];

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
    taskListElement?.appendChild(taskElement)
}