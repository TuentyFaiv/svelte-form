# Contributing to the Monorepo Project

We are excited that you are considering contributing to our project! This guide provides an overview of how to get started, the guidelines we follow, and the best practices for making valuable contributions.

## Table of Contents

1. [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Contributing Code](#contributing-code)
2. [Development Setup](#development-setup)
    - [Monorepo Structure](#monorepo-structure)
    - [Installing Dependencies](#installing-dependencies)
    - [Running Tests](#running-tests)
3. [Pull Request Guidelines](#pull-request-guidelines)
4. [Code Style and Standards](#code-style-and-standards)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Branch Naming Convention](#branch-naming-convention)
7. [Getting Help](#getting-help)

## How Can I Contribute?

### Reporting Bugs

If you find a bug, we appreciate your help in making the project better by reporting it. When filing a bug report, make sure to include the following details:

- A clear and descriptive title that explains the issue.
- Steps to reproduce the issue in the relevant package (e.g., form, zod, yup).
- Expected behavior and actual behavior observed.
- Screenshots or code snippets that help illustrate the problem (if applicable).

You can file a bug by opening an issue.

### Suggesting Enhancements

Enhancements are always welcome, whether it’s a new feature, component improvement, or documentation update. To suggest an enhancement:

- Describe the enhancement in detail, explaining the need it addresses.
- Explain any benefits this change would bring to users or maintainers.
- Propose a possible implementation if you have one.

Feel free to open an enhancement issue to discuss your idea.

### Contributing Code

1. **Fork the repository:**  
   Click the Fork button on the repository page.

2. **Create a new branch:**  
   For new features or bug fixes, create a branch from the `main` branch following the branch naming convention:
   ```bash
   git switch -c feat/topic-message
   ```
   For example: 
   - `feat/form-validation`
   - `fix/bug-in-zod-adapter`

3. **Make changes:**  
   Implement your changes in the relevant package (form, builtin, zod, yup, or app/docs).

4. **Add or update tests:**  
   Ensure that your changes are covered by unit tests and other relevant tests.

5. **Submit your Pull Request:**  
   Push your changes and submit a pull request to the main branch. Make sure your PR follows the Pull Request Guidelines.

## Development Setup

### Monorepo Structure

This project is managed using Turborepo, and the monorepo is organized into several main packages:

- `builtin`: Built-in form components using core package components.
- `form`: Core input components.
- `zod`: Zod adapter package.
- `yup`: Yup adapter package.
- `app/docs`: Documentation and example app.

### Installing Dependencies

After cloning the repository, install the dependencies for the entire monorepo using pnpm:
```bash
pnpm install
```

Turborepo will manage and streamline the development, test, and linting processes for all packages.

### Running Tests

You can run tests for all packages using:
```bash
pnpm test
```

To run tests for a specific package:
```bash
pnpm test --filter=<package-name>
```

Ensure that all tests pass before submitting your pull request.

### Running Turborepo Commands

You can leverage Turborepo to run commands across the entire monorepo. For example:

- To develop all packages:
  ```bash
  pnpm dev
  ```

- To lint all packages:
  ```bash
  pnpm lint
  ```

## Pull Request Guidelines

To ensure high code quality and maintain consistency across the project, please adhere to the following guidelines when submitting a pull request:

- Follow the Pull Request Template.
- Ensure that the PR description explains the purpose of the change and which packages are affected.
- Reference any related issues using keywords like “Fixes #123”.
- Ensure your code follows the Code Style and Standards.
- Include relevant tests for any new or updated functionality.
- Update any documentation if your change affects the public API, a new component is introduced, or behavior is changed.

## Code Style and Standards

We enforce consistent coding standards to keep the project maintainable and accessible for all contributors. Currently, we are using ESLint for code quality enforcement and plan to migrate to oxlint in the future.

- **ESLint:** Ensure there are no linting errors. Run `pnpm lint` before submitting your pull request.
- **Component Structure:** Adhere to the existing structure of components and packages. Keep components modular and reusable.

## Commit Message Guidelines

To maintain clarity in the commit history, we use Gitmoji to categorize the purpose of each commit, alongside a clear and concise message. Commit messages should follow this format:

```
<Gitmoji> <TYPE>: <Subject>
```

- **Gitmoji:** A relevant emoji to categorize the type of change (e.g., ✨ for a new feature, 🐛 for a bug fix).
- **TYPE:** Specifies the nature of the change (e.g., FIX, FEAT, REFACTOR).
- **Subject:** A brief description of the change.

### Allowed Commit Types:

- 🐛 FIX: Fixing a bug.
- ✨ FEAT: Introducing a new feature.
- 🔨 REFACTOR: Code refactoring without adding new features or fixing bugs.
- 🔧 CHORE: Maintenance tasks or minor changes that don’t affect the app’s behavior.
- 📝 DOCS: Documentation updates.
- 💄 STYLES: Code style changes (e.g., formatting, linting rules).

### Example commit messages:

```
🐛 FIX: resolve bug in zod adapter validation
✨ FEAT: add new date picker component to form package
🔨 REFACTOR: clean up input field logic in form package
🔧 CHORE: update dependencies
📝 DOCS: update documentation for built-in form components
💄 STYLES: apply consistent ESLint rules across packages
```

You can refer to [Gitmoji](https://gitmoji.dev/) for a full list of emojis and their meanings.

## Branch Naming Convention

Follow this convention for branch names to make it easy to identify the purpose of a branch:
```
<type>/<topic-message>
```
- `feat/topic-message` – For new features (e.g., `feat/form-validation`)
- `fix/topic-message` – For bug fixes (e.g., `fix/input-render-bug`)
- `refactor/topic-message` – For code refactoring (e.g., `refactor/form-logic`)

## Getting Help

If you need assistance or have questions, feel free to reach out by:

- Opening a GitHub Discussion
- Filing an issue with the help wanted tag

Thank you for contributing to this project!