import { apiFetch } from "./client"

const prodAuthBaseUrl = "https://noneed2ask.onrender.com/auth"
const devAuthBaseUrl = "https://localhost:7156/auth"

export type AuthLoginResponseDto = {
  id: string
  username: string
  email: string
}

export type LoginRequestDto = {
  email: string
  password: string
  rememberMe: boolean
}

function getAuthBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? prodAuthBaseUrl
    : devAuthBaseUrl
}

export async function login(request: LoginRequestDto) {
  return apiFetch<AuthLoginResponseDto>(`${getAuthBaseUrl()}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
}

export async function logout() {
  return apiFetch<void>(`${getAuthBaseUrl()}/logout`, {
    method: "POST",
    credentials: "include",
  })
}
