//bibliotecas e codigos de terceiros
function Formatter(date){
  return{
    day:{
      number : dayjs(date).format('DD'),
      week:{
        short : dayjs(date).format('ddd'),
        long : dayjs(date).format('dddd'),
      } 
    },
    month : dayjs(date).format('MMMM'),
    hour: dayjs(date).format('HH:mm')
  }
};

//object
const task = {
  name: "Almoço",
  date: new Date("2024-07-08 10:00"),
  finished: true
};

// lista, array, vetor []
let tasks = [
  task,
  {name: 'Academia em grupo',
  date: new Date("2024-07-09 12:00"),
  finished: false},

  {name: 'Gaming Session',
  date: new Date("2024-07-09 16:00"),
  finished: true},
]
//lista vazia
//tasks = []

//arrow function const createNewTask = () =>{}
function CreateNewTask(task){
  let input = `
  <input
  onchange="FinishedTask(event)"
  value ="${task.date}"
  type="checkbox"`

  if (task.finished){
    input +='checked';
  };

  input += '>';

  const format = Formatter(task.date);
  
  return `
  <div>
    ${input}
    <span>${task.name},</span>
    <time>
      ${format.day.week.long},
      ${format.day.number}
      de ${format.month}
      às ${format.hour}h
    </time>
  </div>
  `
}

function UpdateEmptyTaskList(){
  const section = document.querySelector("section");
  section.innerHTML = '';
  if (tasks.length == 0){
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
  }
  else{
    for (let i  = 0; i<tasks.length; i++){
    section.innerHTML += CreateNewTask(tasks[i]);
    }
  }
};
UpdateEmptyTaskList();

function SaveTask(event){
   event.preventDefault();  
   const dataForm = new FormData(event.target);

   const name = dataForm.get('event');
   const day = dataForm.get('day');
   const hour = dataForm.get('hour');
   const date = `${day} ${hour}`;

   const newTask = {
      //name:name, date:date,
      name, 
      date,
      finished: false
    };  

    const existingTask = tasks.find((task)=>{
      return task.date == newTask.date;
    })

    if(existingTask){
      return alert("Dia/Hora não disponível.")
    }

  tasks = [newTask,...tasks];
  UpdateEmptyTaskList();

}

function CreateSelectionOfDays(){
  const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]
  let selectionDays = ''

  for (let i=0; i<days.length; i++){
    const format = Formatter(days[i]);
    const formatedDay =`
    ${format.day.number} de ${format.month}`

    selectionDays += `
    <option value="${days[i]}">${formatedDay}</option>
    `
  }

  document.querySelector('select[name="day"]')
  .innerHTML = selectionDays;
}
CreateSelectionOfDays();

function CreateSelectionOfHours(){
  let selectionHours = '';

  for (let i = 6; i < 23; i++){
    //para adicionar o 0 na frente do numero quando não
    // houver dois caracteres
    const hour = String(i).padStart(2, '0');
    selectionHours += `
      <option value="${i}:00">${hour}:00</option>
      <option value="${i}:30">${hour}:30</option>
    `
  }

  document.querySelector('select[name="hour"]')
  .innerHTML = selectionHours;
}
CreateSelectionOfHours();

function FinishedTask(event){

  const input = event.target;
  const inputDateTask = input.value;

  const task = tasks.find((task) =>{
    return task.date == inputDateTask;
  })
  if(!task){
    return;
  }else{
      task.finished = !task.finished;
  }
  UpdateEmptyTaskList();
}
