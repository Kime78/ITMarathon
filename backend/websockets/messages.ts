import { io } from "../app";

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("group:join", (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
    });

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
