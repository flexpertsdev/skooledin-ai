# Skooledin AI - Test Suite Documentation

## Overview

This test suite provides comprehensive coverage for the Skooledin AI authentication system, including unit tests, integration tests, and end-to-end tests.

## Test Structure

```
tests/
├── unit/               # Unit tests for individual components
│   └── auth.test.ts    # Auth store unit tests
├── integration/        # Integration tests for complete flows
│   └── auth-flows.test.ts  # Auth workflow integration tests
├── e2e/                # End-to-end tests for user journeys
│   └── auth-pages.test.ts  # Auth pages E2E tests
├── setup.ts            # Test setup and global mocks
└── README.md           # This file
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Test Types
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e

# Auth tests specifically
npm run test:auth
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Categories

### 1. Unit Tests (`tests/unit/`)

Tests individual components in isolation:

- **Auth Store Tests**
  - Initial state validation
  - Sign up functionality
  - Sign in functionality
  - Google authentication
  - Profile updates
  - Password reset
  - Session management
  - Error handling

### 2. Integration Tests (`tests/integration/`)

Tests complete user workflows:

- **Authentication Flows**
  - Student registration journey
  - Teacher registration journey
  - Parent registration journey
  - Social login flows
  - Password reset flow
  - Session persistence
  - Role-based access control

### 3. E2E Tests (`tests/e2e/`)

Tests full user experience:

- **Authentication Pages**
  - Login page functionality
  - Signup page with role selection
  - Password reset page
  - Onboarding flows
  - Navigation guards
  - Mobile responsiveness
  - Accessibility compliance

## Key Test Scenarios

### Authentication Tests
1. **User Registration**
   - Valid registration with all roles
   - Duplicate email handling
   - Password validation
   - Email verification

2. **User Login**
   - Email/password authentication
   - Google OAuth
   - Remember me functionality
   - Invalid credentials handling

3. **Session Management**
   - Token persistence
   - Auto-logout on expiry
   - Multi-tab synchronization

4. **Role-Based Access**
   - Student permissions
   - Teacher permissions
   - Parent permissions
   - Admin access

5. **Error Scenarios**
   - Network failures
   - Server errors
   - Invalid inputs
   - Rate limiting

## Mocking Strategy

### Firebase Services
All Firebase services are mocked in tests to ensure:
- Fast test execution
- No external dependencies
- Predictable test results
- No cost for Firebase operations

### Key Mocks
- `firebaseAuth`: Authentication methods
- `firebaseDb`: Firestore operations
- `useNuxtApp`: Nuxt context
- Navigation utilities

## Writing New Tests

### Unit Test Template
```typescript
describe('Component/Feature Name', () => {
  let store: ReturnType<typeof useStore>
  
  beforeEach(() => {
    // Setup
  })
  
  it('should do something specific', async () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = await store.action(input)
    
    // Assert
    expect(result).toBe(expected)
  })
})
```

### Integration Test Template
```typescript
describe('User Journey Name', () => {
  it('should complete full journey', async () => {
    // Step 1: Initial action
    // Step 2: Follow-up action
    // Step 3: Verify outcome
  })
})
```

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Clear Naming**: Use descriptive test names
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mock External Services**: Don't hit real APIs
5. **Test Edge Cases**: Include error scenarios
6. **Maintain Test Data**: Use factories for test data

## Continuous Integration

Tests are automatically run on:
- Pull request creation
- Commits to main branch
- Deployment pipeline

## Coverage Goals

- Unit Tests: 80% coverage
- Integration Tests: Key user flows
- E2E Tests: Critical paths

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Run `npm install`
   - Check import paths

2. **Firebase mock errors**
   - Verify mock setup in `tests/setup.ts`
   - Check mock implementations

3. **Timeout errors**
   - Increase timeout in test config
   - Check for unresolved promises

## Next Steps

As the application grows, add tests for:
- AI service integration
- Course management
- Messaging system
- Payment processing
- File uploads
- Real-time features