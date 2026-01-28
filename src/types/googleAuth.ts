import * as AuthSession from "expo-auth-session";

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface AuthRequestConfig {
  clientId: string;
  scopes: string[];
}

export interface AuthRequestResponse {
  type: "success" | "error" | "cancel";
  authentication?: AuthSession.TokenResponse;
  error?: AuthSession.AuthSessionResult;
}
