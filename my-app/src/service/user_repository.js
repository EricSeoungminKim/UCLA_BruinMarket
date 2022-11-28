import { getDatabase, ref, set, remove, onValue, off } from "firebase/database";

class UserRepository {
  constructor(app) {
    this.db = getDatabase(app);
    console.log("@UserRepository, app : ", app);
  }

  syncUsers(userId, onUpdate) {
    const query = ref(this.db, `${userId}/users`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(query);
  }

  saveUser(userId, user) {
    set(ref(this.db, `${userId}/users/${user.uid}`), user);
  }

  removeUser(userId, user) {
    // firebaseApp.database().ref(`${userId}/users/${user.uid}`).remove();
    remove(ref(this.db, `${userId}/users/${user.uid}`));
  }
}

export default UserRepository;
