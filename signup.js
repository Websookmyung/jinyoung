function duplicationCheck(){
    username_in = document.getElementById("username2").value;

    var localStorage=window.localStorage;
    if (!localStorage){
        //local storage is not supported by this browser
        //do nothing

    }
    else{
        numUsers=localStorage.numUsers;
        var duplicate=false;
        if (numUsers !=undefined){
            for (i=0; i<numUsers; i++){
                username= localStorage["user"+i];
                if (username == username_in){
                    duplicate = true;
                    break;
                }
            }
        }

    if (duplicate)
        alert (username_in + "is duplicate username. Please enter different one.")
    else
        alert("You can use " + username_in + "as a username.");
    }
}

document.getElementById("signup_button").onclick=signup;

function signup(){
    username_in=document.getElementById("username2").value;
    password_in1=document.getElementById("pass1").value;
    var localStorage=window.localStorage;
    if (!localStorage){
        //local storage is not supported by this browser.
        //do nothing
    }
    else{
        numUsers = localStorage.numUsers;
        if (numUsers == undefined) numUsers ="0";
        localStorage["user"+numUsers]=username_in;
        localStorage["pass"+numUsers]=password_in1;
        localStorage.numUsers=parseInt(numUsers)+1;
        alert("Signup succeeded!\n"+"Number of users: "+ localStorage.numUsers);
    }
}