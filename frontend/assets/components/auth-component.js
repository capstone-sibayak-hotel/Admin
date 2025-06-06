class AuthComponent extends HTMLElement {
  connectedCallback() {
    this.mode = 'login';  
    this.render();
  }

  render() {
    const isLogin = this.mode === 'login';
    this.innerHTML = `
      <div class="container">
        <div class="left">
          <img src="../assets/images/login-background.jpg" alt="background" />
        </div>
        <div class="right">
          <h2>${isLogin ? 'SIGN IN' : 'REGISTER'}</h2>
          <form id="auth-form">
            <label>Username</label>
            <input type="text" id="username" placeholder="Username" required />
            <label>Password</label>
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit">${isLogin ? 'SIGN IN' : 'REGISTER'}</button>
          </form>
          <p>
            ${isLogin ? "Don't have an account? <a href='#' id='toggle-mode'>Register here</a>" : 
                         "Already have an account? <a href='#' id='toggle-mode'>Login here</a>"}
          </p>
        </div>
      </div>
    `;

    this.querySelector('#auth-form').addEventListener('submit', this.handleAuth.bind(this));
    this.querySelector('#toggle-mode').addEventListener('click', (e) => {
      e.preventDefault();
      this.mode = isLogin ? 'register' : 'login';
      this.render();
    });
  }

  handleAuth(e) {
    e.preventDefault();
    const username = this.querySelector('#username').value;
    const password = this.querySelector('#password').value();

    if (this.mode === 'login') {
      // Login logic
      const user = JSON.parse(localStorage.getItem(username));
      if (user && user.password === password) {
        const token = this.generateToken(username);  
        localStorage.setItem('authToken', token);  
        localStorage.setItem('loggedInUser', username);  
        alert('Login successful!');
        window.location.href = 'index.html'; 
      } else {
        alert('Invalid username or password');
      }
    } else {
      // Register logic
      if (localStorage.getItem(username)) {
        alert('Username already taken.');
      } else {
        localStorage.setItem(username, JSON.stringify({ username, password }));
        alert('Registration successful! You can now log in.');
        this.mode = 'login';  
        this.render();
      }
    }
  }

  // Dummy function to simulate token generation (for testing purposes)
  generateToken(username) {
    return btoa(username + ':' + Date.now()); // Simple encoding (Base64) for testing
  }
}

customElements.define('auth-component', AuthComponent);
