/**
 * This is where we handle all our ui updates
 * TODO render chat templates to the dom // clear chats when room changes
 */

// take in chat
// render template
class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = '';
  }

  render(data) {
    const date = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    )

    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${date}</div>
      </li>
    `

    this.list.innerHTML += html;
  }
}

