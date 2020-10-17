const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const deleteChat = document.querySelector('#delete')

// Deleting Chat for Particular Username
deleteChat.addEventListener('click', e => {
  chatroom.deleteChats('bunny')
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
  console.log('This is inside submit click')
  const newName = newNameForm.newName.value.trim()
  chatroom.updateName(newName)
  newNameForm.reset()
})

// Class Instances
const chatroom = new Chatroom('football', 'bunny')
const chatui = new ChatUI(chatList)

chatroom.getChats(data => chatui.render(data))