# **SportMatch** ⚽️
🛠️ **Mobile application built with React Native (using Expo Router) that helps users discover and join local sports events.**

---

## Tech Stack

- **Frontend:** React Native, Expo Router
- **Backend:** Supabase (Authentication and Database)
- **UI:** Custom UI components using React Native's StyleSheet and Expo's LinearGradient

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SportMatch-FR/Application
   cd Application
   ```

2. **Install dependencies:**

   If you're using **pnpm**:
   ```bash
   pnpm install
   ```
   Otherwise, with **npm**:
   ```bash
   npm install
   ```

3. **Configure Supabase:**

    - Rename the file `supabaseClient.js.exemple` to `supabaseClient.ts` at the project root.
    - Add your Supabase URL and anon key:

      ```js
      import AsyncStorage from '@react-native-async-storage/async-storage';
      import { createClient } from '@supabase/supabase-js';
      
      const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
      const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
      
      export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storage: AsyncStorage, 
          storageKey: 'supabase.auth.token',
        },
      });
      ```

Here's one way to improve the formatting in your README:

## Running the App

To start the project in development mode, run one of the following commands:

- **Using pnpm:**

  ```bash
  pnpm run dev
  ```

- **Using npm:**

  ```bash
  npm run dev
  ```

Follow the terminal instructions to open the app in an iOS simulator, on Android, or on the web.

## Contributing

Contributions are welcome! Please follow the [Git Semantic Commit Messages](#git-semantic-commit-messages) guidelines when making commits.

## Git Semantic Commit Messages

**Format:** `<type>(<scope>): <subject>`

`<scope>` is optional

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

**More Examples:**

- `feat`: (new feature for the user, not a new feature for a build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semicolons, etc.; no production code change)
- `refactor`: (refactoring production code, e.g., renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc.; no production code change)

**References:**

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Karma Commit Message Guide](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
