function validateData(){
    var useremail = document.getElementById("email").value; 
    var password = document.getElementById("passwd").value;
    var confirm_passwd = document.getElementById("confirm-passwd").value;

    if(localStorage.getItem(useremail) === null)
    {
        if(password.trim() == confirm_passwd.trim())
        {
            if(password.length >= 8)
            {
                var ptn = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d)/;
                if(password.match(ptn))
                {
                    alert("Registration successful");
                
                    registerUser();
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
        }
        else{
            alert("Please re-enter the same password.");
            return false;
        }
    
    }
    else{
        alert("This email id is already taken.\n Please try another email id.");
        document.getElementById("email").style.border = "3px solid red";
        console.log("i entered");
        return false;
    }
}//validateData()

function registerUser(){
    var user = {
        email : document.getElementById("email").value,
        fname : document.getElementById("fname").value,
        lname : document.getElementById("lname").value,
        gender: getGender(),
        address: document.getElementById("address").value,
        photo: document.getElementById("profile-image").value,
        password: document.getElementById("passwd").value,
        todoDetails:[],
    };

    console.log(user);
    localStorage.setItem(user.email,JSON.stringify(user));
    console.log("user added to local storage");
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