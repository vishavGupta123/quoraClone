class ChatEngine {
  constructor(chatBoxId, username) {
    this.chatBox = $(`#${chatBoxId}`);
    this.username = username;

    this.socket = io.connect("http://18.216.129.109/:5000");
    if (this.username) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established using sockets...");

      self.socket.emit("join_room", {
        user_username: self.username,
        chatroom: "QuoraClone",
      });
      self.socket.on("user_joined", function (data) {
        console.log("a user joined ", data);
      });
    });
    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_username: self.username,
          chatroom: "QuoraClone",
        });
      }
    });
    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      let newMessage = $("<li>");
      let messageType = "other-message";
      if (data.user_username == self.username) {
        messageType = "self-message";
      }
      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );
      newMessage.append(
        $("<sub>", {
          html: data.user_username,
        })
      );
      newMessage.addClass(messageType);
      $("#chat-message-list").append(newMessage);
      $("#chat-message-list").animate(
        { scrollTop: $("#chat-message-list").prop("scrollHeight") },
        500
      );
    });
  }
}
