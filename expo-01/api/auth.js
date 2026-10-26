import 'react-native-get-random-values';
import Parse from 'parse/react-native.js';

export async function loginUser(username, password) {
  return await Parse.User.logIn(username, password);
}

export async function registerUser(username, password, email) {
  const user = new Parse.User();
  user.set('username', username);
  user.set('password', password);
  user.set('email', email);
  return await user.signUp();
}

export async function logoutUser() {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.warn("A sessão já estava inválida no servidor. A limpar localmente...");
  }
}

export async function getCurrentUser() {
  return await Parse.User.currentAsync();
}