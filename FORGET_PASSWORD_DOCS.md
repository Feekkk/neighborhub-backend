# Forget Password Functionality Documentation

## Overview
The forget password feature allows users to securely reset their passwords via email verification. The process involves generating secure tokens, sending reset emails, and verifying tokens before allowing password changes.

## Database Changes
Added to the User model:
- `resetToken`: String field to store password reset tokens
- `resetTokenExpiry`: DateTime field to store token expiration time

## API Endpoints

### 1. Request Password Reset
**Endpoint:** `POST /api/auth/forgot-password`
**Authentication:** Not required
**Description:** Initiates password reset process by sending an email with reset link.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

**Security Note:** The response is the same regardless of whether the email exists to prevent email enumeration attacks.

### 2. Verify Reset Token
**Endpoint:** `GET /api/auth/verify-reset-token/:token`
**Authentication:** Not required
**Description:** Verifies if a reset token is valid and not expired.

**Parameters:**
- `token` (string): The reset token from the email

**Response (Success):**
```json
{
  "valid": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

**Response (Invalid):**
```json
{
  "error": "Invalid or expired reset token"
}
```

### 3. Reset Password
**Endpoint:** `POST /api/auth/reset-password`
**Authentication:** Not required
**Description:** Resets the user's password using a valid token.

**Request Body:**
```json
{
  "token": "reset-token-here",
  "newPassword": "newSecurePassword123"
}
```

**Response (Success):**
```json
{
  "message": "Password reset successfully",
  "user": {
    "id": "user-id",
    "username": "username",
    "email": "user@example.com"
  }
}
```

## Process Flow

1. **User Requests Reset**
   - User enters email in Flutter app
   - App sends POST request to `/api/auth/forgot-password`
   - Backend generates secure token and sends email

2. **Email Sent**
   - User receives email with reset link
   - Link contains token: `yourapp://reset-password?token=abc123`
   - Token expires in 1 hour

3. **User Clicks Link**
   - Flutter app opens with token
   - App verifies token via `/api/auth/verify-reset-token/:token`
   - If valid, shows password reset form

4. **Password Reset**
   - User enters new password
   - App sends POST to `/api/auth/reset-password`
   - Backend verifies token and updates password
   - Token is cleared after successful reset

## Security Features

- **Secure Token Generation**: Uses crypto.randomBytes(32) for tokens
- **Token Expiration**: Tokens expire after 1 hour
- **Email Enumeration Protection**: Same response regardless of email existence
- **One-Time Use**: Tokens are cleared after successful password reset
- **Password Hashing**: New passwords are bcrypt hashed before storage

## Email Configuration

### Environment Variables Required:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup:
1. Enable 2-Factor Authentication
2. Generate App Password (not your regular password)
3. Use App Password in EMAIL_PASSWORD

### Email Template Features:
- Professional HTML styling
- Clear call-to-action button
- Backup plain text link
- Expiration warning
- Security notice

## Flutter Integration Examples

### 1. Request Password Reset
```dart
Future<void> requestPasswordReset(String email) async {
  try {
    final response = await http.post(
      Uri.parse('${baseUrl}/api/auth/forgot-password'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    if (response.statusCode == 200) {
      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Reset email sent if account exists')),
      );
    } else {
      // Handle error
      final error = jsonDecode(response.body)['error'];
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error)),
      );
    }
  } catch (e) {
    print('Error: $e');
  }
}
```

### 2. Verify Token and Reset Password
```dart
Future<bool> verifyResetToken(String token) async {
  try {
    final response = await http.get(
      Uri.parse('${baseUrl}/api/auth/verify-reset-token/$token'),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['valid'] == true;
    }
    return false;
  } catch (e) {
    print('Error: $e');
    return false;
  }
}

Future<bool> resetPassword(String token, String newPassword) async {
  try {
    final response = await http.post(
      Uri.parse('${baseUrl}/api/auth/reset-password'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'token': token,
        'newPassword': newPassword,
      }),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      final error = jsonDecode(response.body)['error'];
      // Show error message
      return false;
    }
  } catch (e) {
    print('Error: $e');
    return false;
  }
}
```

### 3. Deep Link Handling (for email links)
```dart
// In your Flutter app, handle deep links like:
// yourapp://reset-password?token=abc123

void handleResetPasswordLink(String link) {
  final uri = Uri.parse(link);
  final token = uri.queryParameters['token'];
  
  if (token != null) {
    // Navigate to reset password screen with token
    Navigator.pushNamed(context, '/reset-password', arguments: token);
  }
}
```

## Error Handling

Common error responses:
- `400 Bad Request`: Missing required fields
- `400 Bad Request`: Invalid or expired token
- `500 Internal Server Error`: Email sending failed or server error

## Testing

### Test the API endpoints:

1. **Request Reset:**
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

2. **Verify Token:**
```bash
curl http://localhost:3000/api/auth/verify-reset-token/your-token-here
```

3. **Reset Password:**
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"your-token","newPassword":"newpass123"}'
```

## Dependencies Added
- `nodemailer`: For sending emails
- `crypto`: For secure token generation (built-in Node.js module)

The forget password functionality is now fully implemented and ready for use with your Flutter application!
