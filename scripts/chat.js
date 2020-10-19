class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection('chats')
    this.unsub
  }

  async addChat(message) {
    const now = new Date()
    const name = this.username.charAt(0).toUpperCase() + this.username.slice(1)
    const chat = {
      message,
      room: this.room,
      username: name,
      time: firebase.firestore.Timestamp.fromDate(now)
    }
    const response = await this.chats.add(chat)
    return response
  }

  getChats(callback) {
    // Buttons Styling Changes
    document.querySelectorAll('.chat-rooms .btn').forEach(btn => {
      btn.style.backgroundColor = '#fff'
      btn.style.color = '#9067C6'
    })
    document.getElementById(this.room).style.backgroundColor = '#9067C6'
    document.getElementById(this.room).style.color = '#fff'
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('time')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added' || change.type === 'removed') {
            callback(change.doc.data())
          }
        })
      })
  }

  deleteChats(name) {
    this.chats
      .where('username', '==', name)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.chats.doc(doc.id).delete()
        })
      })
      .catch(err => console.log(err))
  }

  updateName(username) {
    this.username = username
    localStorage.setItem('username', this.username)
  }

  updateRoom(room) {
    this.room = room
    if(this.unsub) {
      this.unsub
    }
  }
}