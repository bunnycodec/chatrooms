const chatList = document.querySelector('.chat-list')

// Class Instances
const chatroom = new Chatroom('football', 'bunny')
const chatui = new ChatUI(chatList)

chatroom.getChats(data => chatui.render(data))