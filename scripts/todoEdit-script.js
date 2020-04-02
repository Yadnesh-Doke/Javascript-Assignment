function fillData(){
    let user = JSON.parse(localStorage.getItem(sessionStorage.key(0)));
    let index = sessionStorage.getItem(user.email);
    console.log("index: "+index);

    document.getElementById("title").value = user.todoDetails[index].title;
    document.getElementById("category").value = user.todoDetails[index].category;
    document.getElementById("start-date").value = user.todoDetails[index].startDate;
    document.getElementById("due-date").value = user.todoDetails[index].dueDate;
    
}