const ROOT_URL = 'https://mighty-oasis-08080.herokuapp.com/api/';

const articleURL = ROOT_URL + 'articles';

const tagsURL = ROOT_URL + 'tags';

const signupURL = ROOT_URL + 'users';

const loginURL = ROOT_URL + 'users/login';

const userVerifyURL = ROOT_URL + 'user';

const localStorageKey = 'app_user';

export {
  ROOT_URL,
  articleURL,
  userVerifyURL,
  tagsURL,
  signupURL,
  loginURL,
  localStorageKey,
};
