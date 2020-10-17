class ChatUI {
  constructor(list) {
    this.list = list
  }

  render(data) {
    const when = dateFns.distanceInWordsToNow(
      data.time.toDate(),
      { addSuffix: true }
    )
    const html = `
      <li class="list-group-item rounded shadow-lg mt-1 pl-4 py-3">
        <span class="username mr-1">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `
    this.list.innerHTML += html
  }
}