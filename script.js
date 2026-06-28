async function sendMessage() {
  let input = document.getElementById("user-input");
  let message = input.value.trim();

  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  let response = await getAIResponse(message);

  removeTyping();
  addMessage(response, "bot");
}

function addMessage(text, sender) {
  let chatBox = document.getElementById("chat-box");

  let msg = document.createElement("div");
  msg.classList.add(sender);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  let chatBox = document.getElementById("chat-box");
  let messages = chatBox.getElementsByClassName("bot");
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].innerText === "Typing...") {
      messages[i].remove();
      break;
    }
  }
}

async function getAIResponse(message) {
  const apiKey = "YOUR_OPENAI_API_KEY";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
