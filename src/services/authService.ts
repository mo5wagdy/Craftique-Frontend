
import { fetchWithFallback } from './apiService';
import { toast } from 'sonner';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  token?: string;
}

// Store users in memory for demo purposes
const registeredUsers: Array<{email: string, password: string, firstName: string, lastName: string}> = [];

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Check if user exists in registered users
    const userExists = registeredUsers.find(
      user => user.email === credentials.email && user.password === credentials.password
    );
    
    if (!userExists) {
      return {
        success: false,
        message: 'Invalid email or password. Please sign up first if you don\'t have an account.'
      };
    }
    
    // For demo purposes, we'll simulate a successful login
    const response = {
      success: true,
      message: 'Login successful',
      user: {
        id: '1',
        email: credentials.email,
        firstName: userExists.firstName,
        lastName: userExists.lastName
      },
      token: 'mock-token-12345'
    };
    
    if (response.success && response.token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again.'
    };
  }
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    // Check if email already exists
    const emailExists = registeredUsers.some(user => user.email === data.email);
    
    if (emailExists) {
      return {
        success: false,
        message: 'Email already registered. Please use a different email.'
      };
    }
    
    // Add user to registered users
    registeredUsers.push({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    });
    
    console.log('Registered users:', registeredUsers);
    
    // For demo purposes, we'll simulate a successful signup
    const response = {
      success: true,
      message: 'Signup successful',
      user: {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      },
      token: 'mock-token-12345'
    };
    
    if (response.success && response.token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: 'An error occurred during signup. Please try again.'
    };
  }
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('authToken') !== null;
}

export function logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  toast('Logged out', {
    description: 'You have been successfully logged out.'
  });
}

export function getCurrentUser(): { id: string; email: string; firstName?: string; lastName?: string } | null {
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
}
