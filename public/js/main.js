const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const currentUserToDisplay = document.getElementById('current-user');
document.getElementById('msg').focus();

//  get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//  join chatroom
socket.emit('joinRoom', { username, room });

//  get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
  currentUserToDisplay.innerHTML = username;
});

//  Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  //  scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//  Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //  get message text
  const msg = e.target.elements.msg.value;

  //  emit message to server
  socket.emit('chatMessage', msg);
  console.log(msg);
  var hoy = new Date();
  var hora = hoy.getHours() + ':' + hoy.getMinutes();
  outputMessage({username: username, time: hora, text: msg});

  // clear inputs
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//  Output message to DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p><p clas="text">${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//  add room name to DOM
function outputRoomName(room){
  roomName.innerText = room;
}

//  add users to DOM
function outputUsers(users){
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}