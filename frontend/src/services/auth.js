// authService.js
const serverhost = import.meta.env.VITE_SERVERHOST;

const apiUrl = `${serverhost}/api/auth`;

export const AuthService = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                return true;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            throw new Error('An error occurred during login. Please try again.');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    register: async (firstName, lastName, username, password) => {
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                return true;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            throw new Error('An error occurred during registration. Please try again.');
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};
