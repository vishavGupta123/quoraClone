class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.username=s,this.socket=io.connect("http://localhost:5000"),this.username&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets..."),e.socket.emit("join_room",{user_username:e.username,chatroom:"QuoraClone"}),e.socket.on("user_joined",(function(e){console.log("a user joined ",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_username:e.username,chatroom:"QuoraClone"})})),e.socket.on("receive_message",(function(s){console.log("message received",s.message);let n=$("<li>"),o="other-message";s.user_username==e.username&&(o="self-message"),n.append($("<span>",{html:s.message})),n.append($("<sub>",{html:s.user_username})),n.addClass(o),$("#chat-message-list").append(n),$("#chat-message-list").animate({scrollTop:$("#chat-message-list").prop("scrollHeight")},500)}))}}