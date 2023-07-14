const socketClient = io(); // Instanciando socket del lado del cliente

const chatbox = document.getElementById("chatbox");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", ()=>{
    socketClient.emit("messageKey", chatbox.value);
    chatbox.value="";
});

//chatbox.addEventListener("keydown", (e)=>{
  //  console.log(e.key);
    // Enviamos datos al servidor
    //socketClient.emit("messageKey", e.key)
//});

socketClient.on("messageHistory", (data)=>{
    console.log(data);
});

/*
// Enviar un evento hacia el servidor
socketClient.emit("messageEvent", "Hola desde el cliente!");


// Recibir un evento del servidor
socketClient.on("eventoIndividual", (dataServer)=>{
    console.log(`Datos recibidos del servidor ${dataServer}`);
});

socketClient.on("eventoTodosMenosActual", (data)=>{
    console.log(`Datos para todos: ${data}`);
});

socketClient.on("eventoParaTodos",(data)=>{
    console.log(data);
});
*/