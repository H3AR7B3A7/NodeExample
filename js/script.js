/***********************************************/
//             _               _____           //
//            | |             |  _  \          //
//          __| | ___   __ _  | | \  \         //
//         / _` |/ _ \ / _` | | |  \  \        //
//        | (_| | (_) | (_| | | |__/   |       //
//         \__,_|\___/ \__, | |______/         //
//                      __/ |                  //
//                     |___/                   //
/***********************************************/
// By dog.D, tutorial-source:                  //
// https://www.youtube.com/watch?v=rxzOqP9YwmM //
/***********************************************/

const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// Prompt for new user nickname and emit
// TODO : replace ugly prompt
// TODO : create channels
const name = prompt('What is your name?');
appendMessage(`You joined, welcome to the chat ${name}.`);
socket.emit('new-user', name);

// Client received-message handling
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
});

// Client connection-message handling
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
});

// Client disconnection-message handling
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
});

// Event listener for send button
messageForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default event from occurring
    const message = messageInput.value; // Get input
    appendMessage(`You: ${message}`); // Append own messages
    socket.emit('send-chat-message', message); // Emit
    messageInput.value = ''; // Clear input
});

// Append messages in divs to messageContainer
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}