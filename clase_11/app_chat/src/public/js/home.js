const socketClient = io();

const chatbox = document.getElementById("chatbox");
const chat = document.getElementById("messageLogs");
let user;


Swal.fire({
    title: "Identificate:",
    input: "text",
    text:"Ingresa un nombre de usuario para el chat",
    inputValidator: (value)=>{
        if (!value){
            return "El nombre de usuario es obligatorio"
        } 
    },
    allowOutsideClick: false,
}).then((result)=>{
    user = result.value;
    console.log("user: ",user);
});

chatbox.addEventListener("keyup", (e)=>{
    if (e.key=="Enter"){
        if (chatbox.value.trim().lenght>0){
            socketClient.emit("message",{user:user, message:chatbox.value});
            chatbox.value="";
        }
    }
});

socketClient.on("messageHistory", (dataServer)=>{
    let messageElements = "";
    console.log(dataServer);
    dataServer.forEach((item)=>{
        messageElements = messageElements + `${item.user}: ${item.message} <br/>`
    });
    chat.innerHTML = messageElements;
});