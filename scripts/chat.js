/**
 * * How to structure our project
 * 1 class for handling the chatroom data
 * 1 class for handling chatrooms UI
 * TODO update username // update room
 */


/**
 * set up initial properties of chatroom instance //
 * db 'chats' collection stored inside 'chats' key
 * * this.chats = db.collection('chats');
 * @params
 */

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsubscribe;
  }

  // setting async -- automatically makes function return a promise
  //? whats going 'on under the hood'?
  async addChat(message) {
    // TODO format a chat object
    let now = new Date();
    now = firebase.firestore.Timestamp.fromDate(now);

    // ! 'this' still refers to the instance of the chatroom
    const chat = {
      created_at: now,
      message,
      username: this.username,
      room: this.room
    }

    // ! not this way
    // db.collection('chats').add(chat).then(() => {
    // do something
    // }).catch(err => console.log(err));

    // ** use instead
    const response = await this.chats.add(chat);
    return response;
  }
  // TODO set up realtime listener -- gives back a response everytime there is a change
  getChats(callback) {
    this.unsubscribe = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update ui
            const data = change.doc.data();
            callback(data);
          }
        })
      })
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateRoom(room) {
    this.room = room;
    console.log('room updated')

    // this is a function firebase gives us
    // by envoking it we are automatically unsubscribing from the rt listener
    // if it has a value (true) then we can fire the func and unsubscribe
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
