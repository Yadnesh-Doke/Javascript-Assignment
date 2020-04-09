let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));

(function(){
    let session = JSON.parse(sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    if( session == null)
    {
        alert("You are not logged in.\nPlease Log in first.")
        window.location.href = "index.html";
    }
    else{
        document.getElementById("profile-image").src = user.photo;
        let today = new Date().toISOString().substr(0, 10);
        document.getElementById("start-date").setAttribute("min", today);
    }
})();


let flag=false;

function addTask(){
    let reminder = getReminderValue();
    if(reminder == "yes")
    {
        flag=true;
        if(document.getElementById("reminder-date").value == ""){
            document.getElementById("error-reminderEmpty").style.display = "block";
            return false;
        }
        else
        {
            document.getElementById("error-reminderEmpty").style.display = "none";
            addTaskToArray();
            return true;
        }
       
    }//if reminder == "yes"
    else{
        document.getElementById("error-reminderEmpty").style.display = "none";
        addTaskToArray();
        return true;
    }
}//addtask

function selectReminder(){
    document.getElementById("error-reminderEmpty").style.display = "none";
    console.log("reminder");
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "block";
    }
}

function fadeReminder(){
    document.getElementById("error-reminderEmpty").style.display = "none";
    let rem = document.getElementsByClassName("reminder");
    for(let i=0; i<rem.length; i++)
    {
        rem[i].style.display = "none";
    }
    document.getElementById("reminder-date").value = "";
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

function addTaskToArray(){
    let e = document.getElementById("category");
    let reminderD = "";
    if(flag==true){
        reminderD = document.getElementById("reminder-date").value;
    }
    else{
        reminderD = "No";
    }
    let task = {
        title : document.getElementById("title").value,
        category : e.options[e.selectedIndex].value,
        startDate : document.getElementById("start-date").value,
        dueDate : document.getElementById("due-date").value,
        reminderDate : reminderD,
        isPublic:getPublic(),
        status : "Pending",
    }

    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    console.log(user.todoDetails);
    user.todoDetails.push(task);
    localStorage.setItem(user.email,JSON.stringify(user));
    console.log("task added");
    alert("Task added successfully!!");
    console.log(user.todoDetails);
}

function checkRadio(value){
    if(value == 1){
        document.getElementById("yes").checked = true;
    }
    else if(value == 2){
        document.getElementById("no").checked = true;
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

function minDueDate(value){
    document.getElementById("due-date").setAttribute("min", value);
    document.getElementById("reminder-date").setAttribute("min", value);
    if(document.getElementById("due-date").value == "")
    {}
    else if(document.getElementById("due-date").value < document.getElementById("start-date").value)
    {
        document.getElementById("error-greaterStart").style.display = "block";
    }
    else{
        document.getElementById("error-greaterStart").style.display = "none";
    }
}

function maxRemDate(value){
    document.getElementById("error-greaterStart").style.display = "none";
    document.getElementById("reminder-date").setAttribute("max", value);
}