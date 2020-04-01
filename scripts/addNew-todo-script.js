let flag=false;

function addTask(){

    let count=0;
    
    if(document.getElementById("start-date").value > document.getElementById("due-date").value)
    {
        document.getElementById("error-greaterStart").style.display = "block";
    }
    else{
        count++;
    }

    let reminder = getReminderValue();
    if(reminder == "yes")
    {
        flag=true;
        if(document.getElementById("reminder-date").value > document.getElementById("start-date").value && document.getElementById("reminder-date").value < document.getElementById("due-date").value)
        {
            count++;
        }
        else{
               document.getElementById("error-reminderDate").style.display = "block";
        }
        
    }//if reminder == "yes"

    if(flag==true)
    {
        if(count == 2)
        {
            addTaskToArray();
        }
    }
    else if(flag==false)
    {
        if(count==1)
        {
            addTaskToArray();
        }
    }//else

}//addtask

function selectReminder(){
    console.log("reminder");
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "block";
    }
}

function fadeReminder(){
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "none";
    }
}

function getReminderValue(){

    let ele = document.getElementsByName("reminderValue");
    for(let i=0; i<ele.length; i++)
    {
        if(ele[i].checked)
        {
            console.log(ele[i].value);
            return ele[i].value;
        }
    }
}

function addTaskToArray(){
    let e = document.getElementById("category");
    let reminderD = "";
    if(flag==true){
        reminderD = document.getElementById("reminder-date").value;
    }
    else{
        reminderD = "";
    }
    let task = {
        title : document.getElementById("title").value,
        category : e.options[e.selectedIndex].value,
        startDate : document.getElementById("start-date").value,
        dueDate : document.getElementById("due-date").value,
        reminderDate : reminderD,
    }

    let user = sessionStorage.getItem(sessionStorage.key(0));
    user.todoDetails.push(task);
    console.log("task added");
    alert("task added");
    console.log(user.todoDetails);

    return true;
}
