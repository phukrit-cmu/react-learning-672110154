# Styled Components Project

This project demonstrates the usage of Styled Components in a React application. It has been configured to work with both Node.js and Bun.js runtimes.

## Project Structure

- `src/` - Source code files
  - `app/` - Application-level components and data
  - `features/` - Feature-specific components
  - `assets/` - Static assets like images

## Development Setup

This project supports both Node.js and Bun.js:

### Using Node.js
```bash
npm install
npm start
```

### Using Bun.js
```bash
bun install
bun dev
```

### Alternative Bun Commands
- `bun build` - Build the project
- `bun test` - Run tests

## Key Dependencies

- React 18.3.1
- Styled Components 6.1.8
- Testing Library suite
- React Scripts 5.0.1

## Bun.js Configuration

The project includes Bun.js support via:
- `bunfig.toml` - Bun configuration file
- Updated `package.json` with Bun-compatible scripts
- Engine specifications for both Node.js and Bun.js

## Conventions

- Use Styled Components for styling
- Follow React best practices
- Use PropTypes for prop validation where appropriate
- Write component tests with Testing Library