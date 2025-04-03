
// Mock authentication service
// In a real application, this would connect to your backend API

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  createdAt: string;
  avatarUrl?: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    status: "active",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Test User",
    email: "test@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2023-01-03T00:00:00.000Z",
  },
];

// Local storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "current_user";

class AuthService {
  private users: User[] = [...mockUsers];
  private currentUser: User | null = null;
  private isAuthenticated: boolean = false;

  constructor() {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (token && userJson) {
      try {
        this.currentUser = JSON.parse(userJson);
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Error parsing user data from storage:", error);
        this.logout();
      }
    }
  }

  private saveUserToStorage(user: User) {
    // In a real app, you would store a JWT token
    localStorage.setItem(TOKEN_KEY, "mock-token-" + Date.now());
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  login(credentials: UserCredentials): { success: boolean; message?: string; user?: User } {
    const user = this.users.find(
      (u) => 
        u.email === credentials.email && 
        u.status === "active" // In a real app, you would verify the password
    );

    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;
      this.saveUserToStorage(user);
      return { success: true, user };
    }

    return { success: false, message: "Invalid credentials or inactive account" };
  }

  register(userData: NewUser): { success: boolean; message?: string; user?: User } {
    // Check if email already exists
    if (this.users.some((u) => u.email === userData.email)) {
      return { success: false, message: "Email already in use" };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    
    // Automatically log in the new user
    this.currentUser = newUser;
    this.isAuthenticated = true;
    this.saveUserToStorage(newUser);

    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserRole(): string {
    return this.currentUser?.role || "";
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  getUserCount(): number {
    return this.users.length;
  }

  createUser(userData: NewUser): boolean {
    // Check if email already exists
    if (this.users.some((u) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return true;
  }

  updateUser(userId: string, userData: Partial<User>): boolean {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    
    if (userIndex === -1) {
      return false;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
    };

    // If we're updating the current user, update the stored user as well
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = this.users[userIndex];
      this.saveUserToStorage(this.currentUser);
    }

    return true;
  }

  deleteUser(userId: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== userId);
    
    return this.users.length < initialLength;
  }

  resetPassword(email: string): boolean {
    // In a real app, this would send a password reset email
    const user = this.users.find((u) => u.email === email);
    return !!user;
  }
}

export const authService = new AuthService();
