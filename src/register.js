import {socket, lobbychannel} from "./socket.js"
let username  = document.getElementById("reg_username");
let userid  = document.getElementById("reg_userid");
let password  = document.getElementById("reg_password");
let registerbutton = document.getElementById("registerbutton");
registerbutton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("userid:"+ userid.value + ", username:" + username.value +", password:"+ password.value)
    document.getElementById("reg_errormsg").style.display = "none"
    lobbychannel.push("register", 
        {
            "userid":userid.value, 
            "username":username.value, 
            "password":password.value
        }
    )
    .receive("ok", (response) => {
        console.log(response.msg)
        window.location.replace("./pages/home.html")
    })
    .receive("error", (response)=>{
        document.getElementById("reg_errormsg").style.display = "inline-block"
        document.getElementById("reg_errormsg").innerHTML = response.msg
        console.log(response)
    })
})
