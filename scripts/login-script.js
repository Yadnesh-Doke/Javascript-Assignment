function authenticateUser(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("passwd").value;

    if(localStorage.getItem(email)!=null && (password == JSON.parse(localStorage.getItem(email)).password) )
    {
        alert("Login successful!!!");
        return true;
    }
    else{
        console.log("Please enter valid credentials.");
        alert("Please enter valid credentials.");
        return false;
    }
}