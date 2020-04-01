function delSession(){
    sessionStorage.clear();
    console.log("session cleared");
}

function addNewTask(){
    console.log("going to add new task");
    window.location.href="addNew-todo.html";
}