const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const deleteChat = document.querySelector('#delete')
const updateMessage = document.querySelector('.updateMessage')
const chatRooms = document.querySelector('.chat-rooms')

// Deleting Chat for Particular Username
deleteChat.addEventListener('click', e => {
  chatroom.deleteChats('Bunny')
})

// Update New Chats
newChatForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = newChatForm.newChat.value.trim()
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err))
})

// Update New Name
newNameForm.addEventListener('submit', e => {
  e.preventDefault()
  // Updating New Name
  let newName = newNameForm.newName.value.trim()
  newName = newName.charAt(0).toUpperCase() + newName.slice(1)
  chatroom.updateName(newName)
  newNameForm.reset()

  updateMessage.innerHTML = `Your Username Has Been Changed to ${newName}`
  setTimeout(() => updateMessage.innerHTML = '', 3000);
})

// Updating Room
chatRooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    chatui.clear()
    chatroom.updateRoom(e.target.getAttribute('id'))
    chatroom.getChats(chat => chatui.render(chat))
  }
})

// Taking value from LocalStorage
const username = localStorage.username ? localStorage.username : 'anon'

// Class Instances
const chatroom = new Chatroom('football', username)
const chatui = new ChatUI(chatList)

chatroom.getChats(data => chatui.render(data))