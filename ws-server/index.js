const {WebSocketServer} = require("ws");

const server = new WebSocketServer({
    port: 5000
});

server.on("connection", (socket)=> {

    console.log(`Client Connected`);

    socket.on("message", (data) => {

        const sent_data = JSON.parse(data);
        console.log(sent_data.chat_message);

        setInterval(() => {
            socket.send(`
                <div id="chat_box" hx-swap-oob="beforeend">
                    <h3>${sent_data.chat_message}</h3>
                </div>
            `)
        }, 1000);

        
    })
    
})