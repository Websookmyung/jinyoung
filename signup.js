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