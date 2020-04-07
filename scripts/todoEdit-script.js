(function(){
    if(JSON.parse(sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1))) == null)
    {
        alert("You are not logged in.\nPlease Log in first.")
        window.location.href = "index.html";
    }
})();

let flag=false;
let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));

function fillData(){
    let index = sessionStorage.getItem(user.email);
    console.log("index: "+index);

    document.getElementById("title").value = user.todoDetails[index].title;
    document.getElementById("category").value = user.todoDetails[index].category;
    document.getElementById("start-date").value = user.todoDetails[index].startDate;
    document.getElementById("due-date").value = user.todoDetails[index].dueDate;
    
    let reminder = user.todoDetails[index].reminderDate;
    if(reminder === "No")
    {
        document.getElementById("no").checked = true;
    }
    else{
        document.getElementById("yes").checked = true;
        document.getElementById("reminder-date").value = reminder;
        document.getElementById("reminder-date").style.display = "block";
    }

    if(user.todoDetails[index].isPublic === "yes")
    {
        document.getElementById("publicYes").checked = true;
    }
    else{
        document.getElementById("publicNo").checked = true;
    }
}//fillData

function selectReminder(){
    console.log("reminder");
    document.getElementById("error-reminderEmpty").style.display = "none";
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "block";
    }
    document.getElementById("error-reminderDate").style.display = "none";
}

function fadeReminder(){
    document.getElementById("error-reminderEmpty").style.display = "none";
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "none";
    }
    document.getElementById("error-reminderDate").style.display = "none";
}

function addTask(){
    let count=0;
    
    if(document.getElementById("start-date").value > document.getElementById("due-date").value)
    {
        document.getElementById("error-greaterStart").style.display = "block";
        // return false;
    }
    else{
        document.getElementById("error-greaterStart").style.display = "none";
        count++;
    }

    let reminder = getReminderValue();
    if(reminder == "yes")
    {
        flag=true;
        if(document.getElementById("reminder-date").value == ""){
            document.getElementById("error-reminderEmpty").style.display = "block";
            // return false;
        }
        else
        {
            document.getElementById("error-reminderEmpty").style.display = "none";
            if(document.getElementById("reminder-date").value > document.getElementById("start-date").value && document.getElementById("reminder-date").value < document.getElementById("due-date").value)
            {
                count++;
            }
            else{
                document.getElementById("error-reminderEmpty").style.display = "none";
               document.getElementById("error-reminderDate").style.display = "block";
            //    return false;
            }
        }
       
    }//if reminder == "yes"
    else{
        document.getElementById("error-reminderEmpty").style.display = "none";
        document.getElementById("error-reminderDate").style.display = "none";
    }

    if(flag==true)
    {
        if(count == 2)
        {
            updateTaskToArray();
            return true;
        }
        else{
            return false;
        }
    }
    else if(flag==false)
    {
        if(count==1)
        {
            updateTaskToArray();
            return true;
        }
        else{
            return false;
        }
    }//else
}//addTask

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

function updateTaskToArray(){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    let index = sessionStorage.getItem(user.email);
    console.log("index: "+index);

    let e = document.getElementById("category");
    let reminderD = "";
    if(flag==true){
        reminderD = document.getElementById("reminder-date").value;
    }
    else{
        reminderD = "No";
    }

        user.todoDetails[index].title = document.getElementById("title").value;
        user.todoDetails[index].category = e.options[e.selectedIndex].value;
        user.todoDetails[index].startDate = document.getElementById("start-date").value;
        user.todoDetails[index].dueDate = document.getElementById("due-date").value;
        user.todoDetails[index].reminderDate = reminderD;
        user.todoDetails[index].isPublic = getPublic();

    console.log(user.todoDetails[index]);
    // user.todoDetails.push(task);
    localStorage.setItem(user.email,JSON.stringify(user));
    console.log("Task updated successfully");
    alert("Task updated successfully!!");
}//updateTaskToArray

function updateSession(){
    sessionStorage.setItem(user.email,JSON.stringify(user));
}

function checkRadio(value){
    if(value == 1){
        document.getElementById("yes").checked = true;
    }
    else if(value == 2){
        document.getElementById("no").checked = true;
    }
}

function getPublic(){
    let ele = document.getElementsByName("isPublic");
    for(let i=0; i<ele.length; i++)
    {
        if(ele[i].checked)
        {
            console.log(ele[i].value);
            return ele[i].value;
        }
    }
}

function checkPublic(value){
    if(value == 1){
        document.getElementById("publicYes").checked = true;
    }
    else if(value == 2){
        document.getElementById("publicNo").checked = true;
    }
}