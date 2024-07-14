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
  <div class = "card-bg">
    ${input}

    <div>
      <svg class="active" width="20" height="20" viewBox="0 0 20  20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" style="stroke:#BEF264;stroke:color(display-p3 0.7451 0.9490 0.3922);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" style="stroke:#A1A1AA;stroke:color(display-p3 0.6314 0.6314 0.6667);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <span>${task.name}</span>
    </div>
    
    <time class ="short">
      ${format.day.week.short}.
      ${format.day.number}<br>
      ${format.hour}
    </time>
    <time class="full">
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
      <option value="${hour}:00">${hour}:00</option>
      <option value="${hour}:30">${hour}:30</option>
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
