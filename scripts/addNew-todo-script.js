(function(){
    let user = JSON.parse(sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    if( user == null)
    {
        alert("You are not logged in.\nPlease Log in first.")
        window.location.href = "index.html";
    }
    else{
        document.getElementById("profile-image").src = user.photo;
    }
})();

let flag=false;
let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));

function addTask(){
    let count=0;
    if(document.getElementById("start-date").value > document.getElementById("due-date").value)
    {
        document.getElementById("error-greaterStart").style.display = "block";
        // return false;
    }
    else{
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
            if(document.getElementById("reminder-date").value > document.getElementById("start-date").value && document.getElementById("reminder-date").value < document.getElementById("due-date").value)
            {
                count++;
            }
            else{
               document.getElementById("error-reminderDate").style.display = "block";
            //    return false;
            }
        }
       
    }//if reminder == "yes"

    if(flag==true)
    {
        if(count == 2)
        {
            addTaskToArray();
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
            addTaskToArray();
            return true;
        }
        else{
            return false;
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
    alert("task added");
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