
const users = [
    { id: 1, username: 'user', password: 'user' },
    { id: 2, username: 'admin', password: 'admin' },
    { id: 3, username: '123', password: '123'},
  ];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const loginUser = async (username, password) => {
    await delay(1000);
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  };
  