export const config = {
    server:{
        port:8080,
        secretSession:"claveSecretaSessions"
    },
    mongo:{
        url:"MONGO URL"
    },
    github:{
        clientId:"Iv1.8abd785975412e63",
        clienteSecret:"GITHUB CLIENT SECRET",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    }
}