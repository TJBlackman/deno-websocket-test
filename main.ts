Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.log("a client connected!");
  });
  socket.addEventListener("message", (event) => {
    if (event.data === "ping") {
      return socket.send("pong");
    }
    if (event.data === "hello") {
      return socket.send("world");
    }
    socket.send(`Unknown: ${event.data}`);
  });
  return response;
});
