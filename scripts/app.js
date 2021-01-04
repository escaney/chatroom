/**
 * app.js working as the glue for our project
 */

// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateSuccessMsg = document.querySelector('.update-msg');
const chatrooms = document.querySelector('.chat-rooms');

// event listeners
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = e.target.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  chatroom.updateName(name);
  newNameForm.reset();

  updateSuccessMsg.innerText = `Hi ${name}, get chatting! 🐒`

  setTimeout(() => updateSuccessMsg.innerText = '', 2000);
});

chatrooms.addEventListener('click', e => {
  // could simply do if (room) change room to room etc
  // but is there a cleaner way?
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(data => chatUI.render(data));
  }
})

// check localStorage for name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// this gets passed data from getChats() inside Chatroom Class
// TODO render the data to the dom
chatroom.getChats(data => chatUI.render(data));
