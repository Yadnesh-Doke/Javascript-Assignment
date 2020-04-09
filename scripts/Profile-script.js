(function(){
    if(JSON.parse(sessionStorage.getItem(sessionStorage.key(sessionStorage.length - 1))) == null)
    {
        alert("You are not logged in.\nPlease Log in first.")
        window.location.href = "index.html";
    }
})();

let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
let imgdata = user.photo;

function loadUserData(){
    console.log(sessionStorage.key(0));
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));

    console.log(user.fname);
    document.getElementById("profile").src = user.photo;
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
    document.getElementById("profile-image").style.display = "block";
}

function ProfilePic() {
    let profileImage = document.getElementById("profile-image").files[0];
    let imagereader = new FileReader();
    imagereader.readAsDataURL(profileImage);

    imagereader.onload = function () {
        imgdata = imagereader.result;
        document.getElementById("profile").src = imgdata;
    };
}

function loadData(){
    var password = document.getElementById("passwd").value;

        if(password.length >= 8)
        {
            var ptn = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d)/;
            if(password.match(ptn))
            {
                updateUser();
                makeReadOnly();
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
    // let user = JSON.parse(localStorage.getItem(sessionStorage.key(sessionStorage.length - 1)));
    user.fname = document.getElementById("fname").value;
    user.lname = document.getElementById("lname").value;
    user.gender = getGender();
    user.address = document.getElementById("address").value;
    user.password = document.getElementById("passwd").value;
    user.photo = imgdata;

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

function makeReadOnly(){
    document.getElementById("edit-button").style.display = "block";
    document.getElementById("submit-btn").style.display = "none";

    let inputs = document.getElementsByTagName("input");
    for(let i=0; i<inputs.length; i++)
    {
        inputs[i].readOnly = true;
    }
    // document.getElementsByName("gender").disabled=false;
    document.getElementsByTagName("textarea")[0].readOnly = true;
}

function delSession(){
    sessionStorage.clear();
    console.log("Session storage cleared");
}

function checkRadio(value){
    if(value == 1){
        document.getElementById("M").checked = true;
    }
    else if(value == 2){
        document.getElementById("F").checked = true;
    }
}