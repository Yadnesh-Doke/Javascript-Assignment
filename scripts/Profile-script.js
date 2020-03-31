function loadUserData(){
    console.log(sessionStorage.key(0));
    let user = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));

    console.log(user.fname);
    document.getElementById("fname").value = user.fname;
    document.getElementById("lname").value = user.lname;
    document.getElementById(user.gender).checked=true;
    document.getElementById("address").value = user.address;
    document.getElementById("passwd").value = user.password;
    
}

function edit(){
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";

    let inputs = document.getElementsByTagName("input");
    for(let i=0; i<inputs.length; i++)
    {
        inputs[i].readOnly = false;
    }
    // document.getElementsByName("gender").disabled=false;
    document.getElementsByTagName("textarea")[0].readOnly = false;
}

function loadData(){
    var password = document.getElementById("passwd").value;

        if(password.length >= 8)
        {
            var ptn = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d)/;
            if(password.match(ptn))
            {
                updateUser();
                return true;
            }
            else{
                alert("Password must contain:\n1.At least one uppercase letter \n2.at least One lowercase letter \n3.at least one digit \n4.At least one special symbol.")
                return false;
            }
        }
        else{
            alert("Password must be minimum 8 characters long.");
            return false;
        }
    
}//loadData()

function updateUser(){
    let user = JSON.parse(localStorage.getItem(sessionStorage.key(0)));
    user.fname = document.getElementById("fname").value;
    user.lname = document.getElementById("lname").value;
    user.gender = getGender();
    user.address = document.getElementById("address").value;
    user.password = document.getElementById("passwd").value;

    localStorage.setItem(user.email,JSON.stringify(user));
    console.log("User profile updated");
    console.log(JSON.stringify(user));
}

function getGender(){
    let ele = document.getElementsByName("gender");

    for(let i=0; i<ele.length; i++)
    {
        if(ele[i].checked)
        {
            console.log(ele[i].value);
            return ele[i].value;
        }
    }
}