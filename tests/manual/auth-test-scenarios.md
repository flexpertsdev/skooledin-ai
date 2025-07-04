# Manual Authentication Test Scenarios

## Prerequisites
1. Start the development server: `npm run dev`
2. Open browser to http://localhost:3000
3. Open browser DevTools to monitor console and network

## Test Scenarios

### 1. New User Registration

#### 1.1 Student Registration
1. Navigate to `/auth/signup`
2. Fill in:
   - Name: "Test Student"
   - Email: "student@test.com"
   - Password: "TestPass123!"
   - Confirm Password: "TestPass123!"
   - Role: Select "Student"
3. Click "Sign Up"
4. **Expected**: Redirect to onboarding page
5. Complete onboarding:
   - Select subjects: Math, Science, English
   - Select grade: 10th Grade
   - Select learning style: Visual
6. **Expected**: Redirect to student dashboard

#### 1.2 Teacher Registration
1. Navigate to `/auth/signup`
2. Fill in teacher details with role "Teacher"
3. Complete teacher-specific onboarding
4. **Expected**: Redirect to teacher dashboard

#### 1.3 Parent Registration
1. Navigate to `/auth/signup`
2. Fill in parent details with role "Parent"
3. Complete parent onboarding
4. **Expected**: Redirect to parent dashboard

### 2. User Login

#### 2.1 Valid Login
1. Navigate to `/auth/login`
2. Enter valid credentials
3. Click "Sign In"
4. **Expected**: Redirect to role-appropriate dashboard

#### 2.2 Invalid Credentials
1. Navigate to `/auth/login`
2. Enter wrong password
3. **Expected**: Error message "Invalid credentials"

#### 2.3 Remember Me
1. Check "Remember me" during login
2. Close browser
3. Reopen and navigate to site
4. **Expected**: Still logged in

### 3. Social Login

#### 3.1 Google Sign-In
1. Click "Continue with Google" on login page
2. Complete Google auth flow
3. **Expected**: 
   - New users: Redirect to onboarding
   - Existing users: Redirect to dashboard

### 4. Password Reset

#### 4.1 Reset Request
1. Navigate to `/auth/login`
2. Click "Forgot password?"
3. Enter email address
4. **Expected**: Success message "Reset email sent"

#### 4.2 Invalid Email
1. Enter non-existent email
2. **Expected**: Error message "User not found"

### 5. Session Management

#### 5.1 Logout
1. While logged in, click user menu
2. Click "Sign Out"
3. **Expected**: Redirect to login page

#### 5.2 Protected Routes
1. While logged out, try to access `/app/student/dashboard`
2. **Expected**: Redirect to login page

#### 5.3 Role-Based Access
1. Login as student
2. Try to access `/app/teacher/dashboard`
3. **Expected**: Redirect to student dashboard or error

### 6. Profile Management

#### 6.1 Update Profile
1. Navigate to profile settings
2. Update display name
3. Save changes
4. **Expected**: Profile updated successfully

#### 6.2 Update Preferences
1. Navigate to preferences
2. Change notification settings
3. Add/remove subjects
4. **Expected**: Preferences saved

### 7. Error Scenarios

#### 7.1 Network Error
1. Disable network in DevTools
2. Try to login
3. **Expected**: Network error message

#### 7.2 Validation Errors
1. Try to sign up with:
   - Short password (< 8 chars)
   - Invalid email format
   - Mismatched passwords
2. **Expected**: Appropriate validation messages

### 8. Mobile Testing

#### 8.1 Responsive Design
1. Open DevTools device emulator
2. Test on various screen sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
3. **Expected**: All forms and buttons accessible

#### 8.2 Touch Interactions
1. Use touch emulation
2. Test form inputs and buttons
3. **Expected**: Smooth interaction

### 9. Accessibility Testing

#### 9.1 Keyboard Navigation
1. Use Tab key to navigate forms
2. Use Enter to submit
3. **Expected**: All elements reachable

#### 9.2 Screen Reader
1. Enable screen reader
2. Navigate through forms
3. **Expected**: All elements properly announced

## Test Data

### Valid Test Accounts
```
Student: student@test.com / TestPass123!
Teacher: teacher@test.com / TestPass123!
Parent: parent@test.com / TestPass123!
```

### Invalid Test Data
```
Non-existent: nobody@test.com
Wrong password: any@test.com / wrongpass
Invalid format: notanemail
```

## Checklist

- [ ] All registration flows work
- [ ] All login methods work
- [ ] Password reset works
- [ ] Session persistence works
- [ ] Role-based access enforced
- [ ] Error messages display correctly
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Loading states show
- [ ] Success messages show