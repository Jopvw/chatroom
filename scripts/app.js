// DOM queries
const chatList = document.querySelector('.chat-list');
const  newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms =  document.querySelector('.chat-rooms');
const allRoomBtns = document.querySelectorAll('.current-btn')

// add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //reset the form
    newNameForm.reset();

    // Show then hide update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText= "", 3000)
    });

    // update chatrooms
    rooms.addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON') {
            chatUI.clear();
            chatroom.updateRoom(e.target.getAttribute('id'));
            chatroom.getChats(chat => chatUI.render(chat))
        }
    });

    // Current room style
    allRoomBtns.forEach(function(item) {
      item.addEventListener("click", function(e) {
        allRoomBtns.forEach(function(element) {
          element.classList.remove("current-room");
          e.target.classList.add('current-room');
        });
      })
    });

    // Check localstorage for username
    const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));

