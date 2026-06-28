function sendMessage() {
  let input = document.getElementById("user-input");
  let message = input.value.trim();

  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  setTimeout(() => {
    let reply = getBotReply(message);
    addMessage(reply, "bot");
  }, 800);
}

function addMessage(text, sender) {
  let chatBox = document.getElementById("chat-box");

  let msg = document.createElement("div");
  msg.classList.add(sender);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple AI replies (demo logic)
function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) return "Hi 👋 How can I help you?";
  if (input.includes("name")) return "I am AI SANTHOSH 🤖";
  if (input.includes("help")) return "Sure 👍 Tell me what you need";
  if (input.includes("bye")) return "Goodbye 👋 Have a nice day!";

  return "I'm still learning 🤖";
}
