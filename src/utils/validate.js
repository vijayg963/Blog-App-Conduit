export default function validate(errors, name, value) {
  switch (name) {
    case 'username':
      let usernameError =
        value.length <= 6
          ? `Username Password can't be less then 6 characters`
          : '';
      errors.username = usernameError;
      break;
    case 'email':
      let emailError =
        value.indexOf('@') === -1 ? 'Email does not contain @' : '';
      errors.email = emailError;
      break;
    case 'password':
      let passwordError;
      if (value.length < 7) {
        passwordError = `Password can't be less then 6 characters`;
      }
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
      if (!re.test(value)) {
        passwordError =
          'Password must contains at least one letter and one number';
      }
      errors.password = passwordError;
      break;
    default:
      return errors;
  }
}
