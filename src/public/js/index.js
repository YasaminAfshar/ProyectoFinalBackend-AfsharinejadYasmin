
const socket = io();

let userName = null;

if (!userName) {
  Swal.fire({
    title: "¡Welcome to chat!",
    text: "Insert your username here",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Your username is required";
      }
    },
  }).then((input) => {
   userName = input.value;
    socket.emit("newUser", userName);
  });
}

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");


btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    userName,
    message: message.value,
  });
  message.value = "";
});


socket.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((msg) => {
      return `<p style="font-family: 'Edu NSW ACT Foundation', cursive; font-size: 1.3em"><strong style="text-decoration: underline">${msg.userName}</strong>: '${msg.message}'</p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});


socket.on("newUser", (userName) => {
  Toastify({
    text: `🟢 ${userName} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
    },
    onClick: ()=>{}
  }).showToast();
});


message.addEventListener("keyup", () => {
  socket.emit("chat:typing", userName);
});


socket.on("chat:typing", (data) => {
  actions.innerHTML = data
    ? `<p style="padding: 10px 25px; margin: 0; font-family: 'Amatic SC', cursive; font-size: 1.4em"> ${data} is writing a message... </p>`
    : "";
});



