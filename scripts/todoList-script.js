(function(){
    if(JSON.parse(sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1))) == null)
    {
        alert("You are not logged in.\nPlease Log in first.")
        window.location.href = "index.html";
    }
})();

let table = document.getElementById("table");
let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));

function fillTable(){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    console.log(user.todoDetails);
    document.getElementById("profile-image").src = user.photo;

    let table = document.getElementById("table");
    for(let i=0; i<user.todoDetails.length; i++)
    {
        let row = document.createElement("tr");
        
        row.innerHTML=
        "<td>"+ "<input type='checkbox' class='checkboxes' onchange='check()'></input>" +"</td>"+
        "<td>"+ user.todoDetails[i].title +"</td>"+
        "<td>"+ user.todoDetails[i].category +"</td>"+
        "<td>"+ user.todoDetails[i].startDate +"</td>"+
        "<td>"+ user.todoDetails[i].dueDate +"</td>"+
        "<td>"+ user.todoDetails[i].reminderDate +"</td>"+
        "<td>"+ user.todoDetails[i].status +"</td>"+
        "<td>"+ "<button onclick='toEditPage("+i+")'"+" class='disable'>Edit</button>" +"</td>"+
        "<td>"+ "<button onclick='deleteRow("+i+")'"+" class='disable' style='border:2px solid red;color:red'>Delete</button>" +"</td>";
    
        table.appendChild(row);
    }
}

function toEditPage(index){
    console.log("sessionStorage.Key(0): "+sessionStorage.key(0));
    sessionStorage.setItem(sessionStorage.key(sessionStorage.length - 1),index);
    console.log(index);
    window.location.href = "todoEdit.html";
}

function deleteRow(index){
    console.log(index);
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    user.todoDetails.splice(index,1);
    localStorage.setItem(user.email,JSON.stringify(user));
    console.log("task deleted");
    console.log(user.todoDetails.length);
    window.location.href="todoList.html";
}

function check(){
    let flag = false;
    let arr = document.getElementsByClassName("checkboxes");
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].checked == true)
        {
            flag = true;
            break;
        }
    }

    if(flag){
        disableEditAndDelete();
        document.getElementById("delete-btn").disabled = false;
        document.getElementById("delete-btn").style.opacity = 1;
    }
    else{
        enableEditAndDelete();
        document.getElementById("delete-btn").disabled = true;
        document.getElementById("delete-btn").style.opacity = 0.4;
    }
}

function checkAll(){
    let arr = document.getElementsByClassName("checkboxes");
    if(document.getElementById("head-checkbox").checked == true)
    {
        for(let i=0; i<arr.length; i++)
        {
            arr[i].checked=true;
        }
        disableEditAndDelete();
        document.getElementById("delete-btn").disabled = false;
        document.getElementById("delete-btn").style.opacity = 1;
    }
    else{
        for(let i=0; i<arr.length; i++)
        {
            arr[i].checked=false;
        }
        enableEditAndDelete();
        document.getElementById("delete-btn").disabled = true;
        document.getElementById("delete-btn").style.opacity = 0.4;
    }
}

function disableEditAndDelete(){
    let arr = document.getElementsByClassName("disable");
    for(let i=0; i<arr.length; i++)
    {
        arr[i].disabled = true;
        arr[i].style.opacity = 0.4;
    }
}

function enableEditAndDelete(){
    let arr = document.getElementsByClassName("disable");
    for(let i=0; i<arr.length; i++)
    {
        arr[i].disabled = false;
        arr[i].style.opacity = 1;
    }
}

function deleteTodo(){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    let arr = document.getElementsByClassName("checkboxes");
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].checked == true)
        {
            delete user.todoDetails[i];
        }
    }
    user.todoDetails = user.todoDetails.filter(function (element) {
        return element !== null;
     });
    localStorage.setItem(user.email,JSON.stringify(user));
    window.location.href = "todoList.html";
}

function delSession(){
    sessionStorage.clear();
    console.log("session cleared");
    window.location.href="index.html";
}

function addNewTask(){
    console.log("going to add new task");
    window.location.href="addNew-todo.html";
}

function filter(){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    let sel = document.getElementById("category");
    let category = sel.options[sel.selectedIndex].text;
    console.log("category: "+category);
    

    if(category == "Office" || category == "Personal" || category == "Other")
    {
        console.log("outer if");
        let tableRows = table.getElementsByTagName('tr');
        let rowCount = tableRows.length;
        for (let x=rowCount-1; x>=0; x--) {
            table.removeChild(tableRows[x]);
        }

        for(let i=0; i<user.todoDetails.length; i++)
        {
            console.log("entered for");
            if(user.todoDetails[i].category == category)
            {
                console.log("inner if");
                let row = document.createElement("tr");

                row.innerHTML = 
                "<td>"+ "<input type='checkbox' class='checkboxes' onchange='check()'></input>" +"</td>"+
                "<td>"+ user.todoDetails[i].title +"</td>"+
                "<td>"+ user.todoDetails[i].category +"</td>"+
                "<td>"+ user.todoDetails[i].startDate +"</td>"+
                "<td>"+ user.todoDetails[i].dueDate +"</td>"+
                "<td>"+ user.todoDetails[i].reminderDate +"</td>"+
                "<td>"+ user.todoDetails[i].status +"</td>"+
                "<td>"+ "<button onclick='toEditPage("+i+")'"+" class='disable'>Edit</button>" +"</td>"+
                "<td>"+ "<button onclick='deleteRow("+i+")'"+" class='disable' style='border:2px solid red;color:red'>Delete</button>" +"</td>";

                table.appendChild(row);
            }//if
        }//for
    }//outer if
    else if(category == "All")
    {
        let tableRows = table.getElementsByTagName('tr');
        let rowCount = tableRows.length;
        for (let x=rowCount-1; x>=0; x--) {
            table.removeChild(tableRows[x]);
        }
        fillTable();
    }
}//filter

function search(value){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    for (let i = 0; i < user.todoDetails.length; i++) {

        if(user.todoDetails[i].title==value.trim()){
            
            var tableRows = table.getElementsByTagName('tr');
            var rowCount = tableRows.length;
    
            for (var x = rowCount - 1; x >= 0; x--) {
                table.removeChild(tableRows[x]);
            }

            let row = document.createElement("tr");
                row.innerHTML =
                "<td>"+ "<input type='checkbox' class='checkboxes' onchange='check()'></input>" +"</td>"+
                "<td>"+ user.todoDetails[i].title +"</td>"+
                "<td>"+ user.todoDetails[i].category +"</td>"+
                "<td>"+ user.todoDetails[i].startDate +"</td>"+
                "<td>"+ user.todoDetails[i].dueDate +"</td>"+
                "<td>"+ user.todoDetails[i].reminderDate +"</td>"+
                "<td>"+ user.todoDetails[i].status +"</td>"+
                "<td>"+ "<button onclick='toEditPage("+i+")'"+" class='disable'>Edit</button>" +"</td>"+
                "<td>"+ "<button onclick='deleteRow("+i+")'"+" class='disable' style='border:2px solid red;color:red'>Delete</button>" +"</td>";

                    table.appendChild(row);
                    break;
        }
            else{
                var tableRows = table.getElementsByTagName('tr');
                var rowCount = tableRows.length;
        
                for (var x = rowCount - 1; x >= 0; x--) {
                    table.removeChild(tableRows[x]);
                }
                fillTable()
            }
    }
}

function markDone(){
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    let arr = document.getElementsByClassName("checkboxes");
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].checked == true)
        {
            user.todoDetails[i].status = "Done";
        }
    }

    localStorage.setItem(user.email,JSON.stringify(user));

    window.location.reload();
}