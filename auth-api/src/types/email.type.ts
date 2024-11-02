export interface BaseEmail {
  email: string
}

export type VerificationEmailArgs = BaseEmail & {
  verificationToken: string
}

export type WelcomeEmailArgs = BaseEmail & {
  name: string
}

export type PasswordResetEmailArgs = BaseEmail & {
  resetURL: string
}
