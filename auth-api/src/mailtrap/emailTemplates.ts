export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body>
  <p>Thank you for registering! Please verify your email using the following code:</p>
  <h1>{verificationCode}</h1>
  <p>This code will expire in 24 hours.</p>
</body>
</html>
`

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
</head>
<body>
  <p>You requested a password reset. Click the link below to reset your password:</p>
  <a href="{resetURL}">Reset Password</a>
  <p>If you did not request this, please ignore this email.</p>
</body>
</html>
`

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body>
  <p>Your password has been reset successfully. You can now log in with your new password.</p>
</body>
</html>
`
