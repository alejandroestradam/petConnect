import { useNavigate } from 'react-router-dom';

export const loginUser = async (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.username === 'user' && values.password === 'password') {
        resolve({
          token: 'fake-jwt-token',
          user: {
            username: 'user',
            email: 'user@example.com',
          },
        });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
};
