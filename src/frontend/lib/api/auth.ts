import { apiFetch } from "./client"

const devAuthBaseUrl = "https://localhost:7156/auth"
const proxiedAuthBaseUrl = "/api/auth"

export type AuthLoginResponseDto = {
  id: string
  username: string
  email: string
}

export type AuthRegisterResponseDto = {
  id: string
  username: string
  email: string
}

export type AuthMeResponseDto = {
  id: string
  username: string
  email: string
}

export type LoginRequestDto = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterRequestDto = {
  username: string
  email: string
  password: string
  rememberMe: boolean
}

function getAuthBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? proxiedAuthBaseUrl
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

export async function register(request: RegisterRequestDto) {
  return apiFetch<AuthRegisterResponseDto>(`${getAuthBaseUrl()}/register`, {
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

export async function getCurrentUser() {
  return apiFetch<AuthMeResponseDto>(`${getAuthBaseUrl()}/me`, {
    method: "GET",
    credentials: "include",
  })
}
