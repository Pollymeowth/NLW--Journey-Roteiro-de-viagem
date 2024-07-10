//object
const task = {
  name: "Almoço",
  date: new Date("2024-07-08 10:00"),
  finished: true
};

// lista, array, vetor []

const tasks = [
  task,
  {name: 'Academia em grupo',
  date: new Date("2024-07-09 12:00"),
  finished: false},
  {name: 'Gaming Session',
  date: new Date("2024-07-09 16:00"),
  finished: true},
]

//arrow function const createNewTask = () =>{}
function createNewTask(task){
  let input = '<input type="checkbox" '
  if (task.finished){
    input +='checked';
  };

  input += '>';

  return `
  <div>
    ${input}
    <span>${task.name}</span>
    <time datetime="">${task.date}</time>
  </div>
  `
}

const section = document.querySelector("section");

for (let i  = 0; i<tasks.length; i++){
  section.innerHTML += createNewTask(tasks[i]);
}
