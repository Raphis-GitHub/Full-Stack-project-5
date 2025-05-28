export default class App {
  constructor() {
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      error: null
    };
  }

  setUsername(username) {
    this.state.username = username;
  }

  setPassword(password) {
    this.state.password = password;
  }

  setVerify(verifyPassword) {
    this.state.verifyPassword = verifyPassword;
  }

  setError(error) {
    this.state.error = error;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setError(null);
    if (this.state.password !== this.state.verifyPassword) {
      this.setError('הסיסמאות אינן תואמות');
      return;
    }
    try {
      let res = await fetch(
        `http://localhost:3000/users?username=${encodeURIComponent(this.state.username)}`
      );
      let users = await res.json();
      if (users.length) {
        this.setError('שם משתמש זה כבר קיים');
        return;
      }
      res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username, password: this.state.password })
      });
      const newUser = await res.json();
      localStorage.setItem('user', JSON.stringify(newUser));
      window.location.href = '/home';
    } catch {
      this.setError('בעיה בשרת, נסה שוב');
    }
  }

}