let allGoals;
if(window.localStorage["allGoals"]){
allGoals=JSON.parse(window.localStorage["allGoals"])
}
else{
    allGoals={
        first:{
            name:"",
            completed:false,
        },
        second:{
            name:"",
            completed:false,
        },
        third:{
            name:"",
            completed:false,
        },
    };
}

console.log(allGoals)

const circles = document.querySelectorAll('.circle');
const textBar = document.querySelector('.lower .text-bar');
const inputs = document.querySelectorAll('.input-bar input')
const checkedSvgs=document.querySelectorAll(".lower svg")
const progress = document.querySelector('.progress')
let completedCount = 0;

for(const key in allGoals){
    const input=document.querySelector(`#${key}`)
    const circle=input.previousElementSibling;
    const checkedSvg=circle.querySelector('svg');
    input.value=allGoals[key].name;
    checkedSvg.style.display = 'none';
    if(allGoals[key].completed){
        completedCount++;
        
        circle.classList.add('checked');
        checkedSvg.style.display = 'block';

    }
}

let isALLSet =()=>{
    for(const input of inputs){
    if(!input.value.length) return false;
    }
    return true;
    }

    progress.style.width = `${completedCount / 3 * 100}%`;
    progress.innerHTML = `${completedCount}/3 completed`
    progress.style.backgroundColor = 'rgb(47, 248, 47)';
    if(isALLSet()) textBar.innerHTML = "Please complete your goals"
    if (completedCount == 3) {
        textBar.innerHTML = "Congratulations you completed all 3 goals!"
    }
    if (!completedCount) {
        progress.style.backgroundColor = 'transparent';
    }




for(const input of inputs){
    input.addEventListener('input',function(){
        textBar.classList.remove("text-red");
        if(!input.value.length){
            for(const circle of circles) circle.classList.remove("checked");
            for(const checkedSvg of checkedSvgs) checkedSvg.style.display = 'none';
            for(const key in allGoals) allGoals[key].completed=false;
            completedCount=0;
            progress.style.backgroundColor = 'transparent';
            progress.style.width = `${completedCount / 3 * 100}%`;
            progress.innerHTML = `${completedCount}/3 completed`
            textBar.innerHTML = "Please set all 3 goals"
        }
        else if(isALLSet())textBar.innerHTML = "Please complete your goals"
        else textBar.innerHTML = "Please set all 3 goals"

        const id=input.id;
        allGoals[id]={
            name:input.value,
            completed:false,
        }
        window.localStorage["allGoals"]=JSON.stringify(allGoals);
    })
}

for(const circle of circles){
    circle.addEventListener('click',()=>{
    let checked=circle.classList.value.search("checked") != -1;
    const id=circle.nextElementSibling.id;
    const checkedSvg=circle.firstElementChild
    if(!checked){
     if(isALLSet()){
         circle.classList.add('checked');
         allGoals[id].completed=true;
         window.localStorage["allGoals"]=JSON.stringify(allGoals)
         completedCount++;
         progress.style.width = `${completedCount / 3 * 100}%`;
         progress.innerHTML = `${completedCount}/3 completed`
         progress.style.backgroundColor = 'rgb(47, 248, 47)';
         checkedSvg.style.display = 'block';
         if (completedCount == 3) {
             textBar.innerHTML = "Congratulations you completed all 3 goals!"
         }
     }
     else{
         textBar.innerHTML = "Please set all 3 goals!"
         textBar.classList.add("text-red");
        }
    }
    else{
         circle.classList.remove('checked');
         allGoals[id].completed=false;
         window.localStorage["allGoals"]=JSON.stringify(allGoals)
         checkedSvg.style.display = 'none';
         completedCount--;
         progress.style.width = `${completedCount / 3 * 100}%`;
         progress.innerHTML = `${completedCount}/3 completed`
         if (!completedCount) {
             progress.style.backgroundColor = 'transparent';
         }
         textBar.innerHTML = "Please complete your goals"
    }
   })
   
}

