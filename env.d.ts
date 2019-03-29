export interface Env {
  FIREBASE_API_KEY: string
  FIREBASE_DATABASE_URL: string
  FIREBASE_AUTH_DOMAIN: string
  FIREBASE_BUCKET_URL: string
}

export const env: Partial<Env>
