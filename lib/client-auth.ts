export interface User {
  id: number
  email: string
  name: string | null
  role: "admin" | "editor" | "author"
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("eshrm_user")
  }
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("eshrm_user")
  return stored ? JSON.parse(stored) : null
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}

export function setUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("eshrm_user", JSON.stringify(user))
  }
}
