# React Frontend Documentation

## 1. Folder Structure

```markdown
- **react-frontend/**
  - .env
  - .gitignore
  - eslint.config.js
  - index.html
  - package-lock.json
  - package.json
  - README.md
  - vite.config.js
  - **public/**
  - **src/**
    - App.css
    - App.jsx
    - index.css
    - main.jsx
    - **assets/**
    - **components/**
      - BackendStatus.jsx
      - Footer.jsx
      - LoginModal.jsx
      - Navbar.jsx
      - SignupModal.jsx
    - **pages/**
      - About.jsx
      - Contact.jsx
      - Dashboard.jsx
      - Demo.jsx
      - Home.jsx
      - PerformanceReport.jsx
      - Upload.jsx
    - **services/**
      - api.js
    - **styles/**
      - dashboard.css
      - main.css
```

## 2. File Purposes

| File Path | Purpose |
|-----------|---------|
| `.env` | Support or configuration file. |
| `.gitignore` | Specifies intentionally untracked files to ignore in Git. |
| `README.md` | Documentation file. |
| `eslint.config.js` | Configuration for ESLint code linting and formatting rules. |
| `index.html` | Main HTML template where the React app is mounted. |
| `package-lock.json` | Support or configuration file. |
| `package.json` | NPM configuration file listing dependencies and scripts. |
| `src/App.css` | Stylesheet providing design, layout, and visual styling. |
| `src/App.jsx` | Root component defining all routes and global modal states. |
| `src/components/BackendStatus.jsx` | Component that checks and displays the connectivity status to the backend. |
| `src/components/Footer.jsx` | Footer component displayed at the bottom of pages. |
| `src/components/LoginModal.jsx` | Modal component for user authentication (Login). |
| `src/components/Navbar.jsx` | Top navigation bar component for the application. |
| `src/components/SignupModal.jsx` | Modal component for user registration (Signup). |
| `src/index.css` | Stylesheet providing design, layout, and visual styling. |
| `src/main.jsx` | Entry point for React that renders the App into the DOM. |
| `src/pages/About.jsx` | About Us page detailing the mission and FAQs. |
| `src/pages/Contact.jsx` | Contact Us page with contact form and location details. |
| `src/pages/Dashboard.jsx` | Main user interface for the mind-reading keyboard and core app features. |
| `src/pages/Demo.jsx` | Demo page showing how the system works. |
| `src/pages/Home.jsx` | Landing page introducing the product and its features. |
| `src/pages/PerformanceReport.jsx` | Component/Page displaying analytics and session performance reports. |
| `src/pages/Upload.jsx` | Component/Page for uploading EEG dataset files (.mat). |
| `src/services/api.js` | Centralized service for making API calls to the FastAPI backend. |
| `src/styles/dashboard.css` | Main user interface for the mind-reading keyboard and core app features. |
| `src/styles/main.css` | Stylesheet providing design, layout, and visual styling. |
| `vite.config.js` | Configuration for Vite, the frontend build tool. |

## 3. Source Code

### .env

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### README.md

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

### eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MindKey — Give Thought a Voice</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

### package-lock.json

```json
{
  "name": "react-frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "react-frontend",
      "version": "0.0.0",
      "dependencies": {
        "aos": "^2.3.4",
        "bootstrap": "^5.3.8",
        "html2canvas": "^1.4.1",
        "jspdf": "^3.0.4",
        "lucide-react": "^0.555.0",
        "node": "^20.19.6",
        "react": "^19.2.0",
        "react-dom": "^19.2.0",
        "react-router-dom": "^7.9.6"
      },
      "devDependencies": {
        "@eslint/js": "^9.39.1",
        "@types/react": "^19.2.5",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^5.1.1",
        "eslint": "^9.39.1",
        "eslint-plugin-react-hooks": "^7.0.1",
        "eslint-plugin-react-refresh": "^0.4.24",
        "globals": "^16.5.0",
        "vite": "^7.2.4"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.5.tgz",
      "integrity": "sha512-6uFXyCayocRbqhZOB+6XcuZbkMNimwfVGFji8CTZnCzOHVGvDqzvitu1re2AU5LROliz7eQPhB8CpAMvnx9EjA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.5.tgz",
      "integrity": "sha512-e7jT4DxYvIDLk1ZHmU/m/mB19rex9sv0c2ftBtjSBv+kVM/902eh0fINUzD7UwLLNR+jU585GxUJ8/EBfAM5fw==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.5",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.4",
        "@babel/parser": "^7.28.5",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.5.tgz",
      "integrity": "sha512-3EwLFhZ38J4VyIP6WNtt2kUdW9dokXA9Cr4IVIFHuCpZ3H8/YFOl5JjZHisrn1fATPBmKKqXzDFvh9fUwHz6CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.4.tgz",
      "integrity": "sha512-HFN59MmQXGHVyYadKLVumYsA9dBFun/ldYxipEjzA4196jpLZd8UjEEBLkbEkvfYreDqJhZxYAWFPtrfhNpj4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.4"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.5.tgz",
      "integrity": "sha512-KKBU1VGYR7ORr3At5HAtUQ+TV3SzRCXmA/8OdDZiLDBIZxVyzXuztPjfLd3BV1PRAQGCMWWSHYhL0F8d5uHBDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.5"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.28.4",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.28.4.tgz",
      "integrity": "sha512-Q/N6JNWvIvPnLDvjlE1OUBLPQHH6l3CltCEsHIujp45zQUSSh8K+gHnaEX45yAT1nyngnINhvWtzN+Nb9D8RAQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
      "integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/parser": "^7.27.2",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.5.tgz",
      "integrity": "sha512-TCCj4t55U90khlYkVV/0TfkJkAkUg3jZFA3Neb7unZT8CPok7iiRfaX0F+WnqWqt7OxhOn0uBKXCw4lbL8W0aQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.5",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.28.5",
        "@babel/template": "^7.27.2",
        "@babel/types": "^7.28.5",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.5.tgz",
      "integrity": "sha512-qQ5m48eI/MFLQ5PxQj4PFaprjyCTLI37ElWMmNs0K8Lk3dVeOdNpB3ks8jc7yM5CDmVC73eMVk/trk3fgmrUpA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.12.tgz",
      "integrity": "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.12.tgz",
      "integrity": "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.12.tgz",
      "integrity": "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.12.tgz",
      "integrity": "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.12.tgz",
      "integrity": "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.12.tgz",
      "integrity": "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.12.tgz",
      "integrity": "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.12.tgz",
      "integrity": "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.12.tgz",
      "integrity": "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.12.tgz",
      "integrity": "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.12.tgz",
      "integrity": "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.12.tgz",
      "integrity": "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.12.tgz",
      "integrity": "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.12.tgz",
      "integrity": "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.12.tgz",
      "integrity": "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.12.tgz",
      "integrity": "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.12.tgz",
      "integrity": "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.12.tgz",
      "integrity": "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.12.tgz",
      "integrity": "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.12.tgz",
      "integrity": "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.12.tgz",
      "integrity": "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.12.tgz",
      "integrity": "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.12.tgz",
      "integrity": "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.12.tgz",
      "integrity": "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.0.tgz",
      "integrity": "sha512-ayVFHdtZ+hsq1t2Dy24wCmGXGe4q9Gu3smhLYALJrr473ZH27MsnSL+LKUlimp4BWJqMDMLmPpx/Q9R3OAlL4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.1",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.1.tgz",
      "integrity": "sha512-aw1gNayWpdI/jSYVgzN5pL0cfzU02GT3NBpeT/DXbx1/1x7ZKxFPd9bwrzygx/qiwIQiJ1sw/zD8qY/kRvlGHA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.2"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.1.tgz",
      "integrity": "sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.1.tgz",
      "integrity": "sha512-S26Stp4zCy88tH94QbBv3XCuzRQiZ9yXofEILmglYTh/Ug/a9/umqvgFtYBAo3Lp0nsI/5/qH1CCrbdK3AP1Tw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@popperjs/core": {
      "version": "2.11.8",
      "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz",
      "integrity": "sha512-P1st0aksCrn9sGZhp8GMYwBnQsbvAWsZAX44oXNNvLHGqAOcoVxmjZiohstwQ7SqKnbR47akdNi+uleWD8+g6A==",
      "license": "MIT",
      "peer": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/popperjs"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.47",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.47.tgz",
      "integrity": "sha512-8QagwMH3kNCuzD8EWL8R2YPW5e4OrHNSAHRFDdmFqEwEaD/KcNKjVoumo+gP2vW5eKB2UPbM6vTYiGZX0ixLnw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.53.3.tgz",
      "integrity": "sha512-mRSi+4cBjrRLoaal2PnqH82Wqyb+d3HsPUN/W+WslCXsZsyHa9ZeQQX/pQsZaVIWDkPcpV6jJ+3KLbTbgnwv8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.53.3.tgz",
      "integrity": "sha512-CbDGaMpdE9sh7sCmTrTUyllhrg65t6SwhjlMJsLr+J8YjFuPmCEjbBSx4Z/e4SmDyH3aB5hGaJUP2ltV/vcs4w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.53.3.tgz",
      "integrity": "sha512-Nr7SlQeqIBpOV6BHHGZgYBuSdanCXuw09hon14MGOLGmXAFYjx1wNvquVPmpZnl0tLjg25dEdr4IQ6GgyToCUA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.53.3.tgz",
      "integrity": "sha512-DZ8N4CSNfl965CmPktJ8oBnfYr3F8dTTNBQkRlffnUarJ2ohudQD17sZBa097J8xhQ26AwhHJ5mvUyQW8ddTsQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.53.3.tgz",
      "integrity": "sha512-yMTrCrK92aGyi7GuDNtGn2sNW+Gdb4vErx4t3Gv/Tr+1zRb8ax4z8GWVRfr3Jw8zJWvpGHNpss3vVlbF58DZ4w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.53.3.tgz",
      "integrity": "sha512-lMfF8X7QhdQzseM6XaX0vbno2m3hlyZFhwcndRMw8fbAGUGL3WFMBdK0hbUBIUYcEcMhVLr1SIamDeuLBnXS+Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.53.3.tgz",
      "integrity": "sha512-k9oD15soC/Ln6d2Wv/JOFPzZXIAIFLp6B+i14KhxAfnq76ajt0EhYc5YPeX6W1xJkAdItcVT+JhKl1QZh44/qw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.53.3.tgz",
      "integrity": "sha512-vTNlKq+N6CK/8UktsrFuc+/7NlEYVxgaEgRXVUVK258Z5ymho29skzW1sutgYjqNnquGwVUObAaxae8rZ6YMhg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.53.3.tgz",
      "integrity": "sha512-RGrFLWgMhSxRs/EWJMIFM1O5Mzuz3Xy3/mnxJp/5cVhZ2XoCAxJnmNsEyeMJtpK+wu0FJFWz+QF4mjCA7AUQ3w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.53.3.tgz",
      "integrity": "sha512-kASyvfBEWYPEwe0Qv4nfu6pNkITLTb32p4yTgzFCocHnJLAHs+9LjUu9ONIhvfT/5lv4YS5muBHyuV84epBo/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.53.3.tgz",
      "integrity": "sha512-JiuKcp2teLJwQ7vkJ95EwESWkNRFJD7TQgYmCnrPtlu50b4XvT5MOmurWNrCj3IFdyjBQ5p9vnrX4JM6I8OE7g==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.53.3.tgz",
      "integrity": "sha512-EoGSa8nd6d3T7zLuqdojxC20oBfNT8nexBbB/rkxgKj5T5vhpAQKKnD+h3UkoMuTyXkP5jTjK/ccNRmQrPNDuw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.53.3.tgz",
      "integrity": "sha512-4s+Wped2IHXHPnAEbIB0YWBv7SDohqxobiiPA1FIWZpX+w9o2i4LezzH/NkFUl8LRci/8udci6cLq+jJQlh+0g==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.53.3.tgz",
      "integrity": "sha512-68k2g7+0vs2u9CxDt5ktXTngsxOQkSEV/xBbwlqYcUrAVh6P9EgMZvFsnHy4SEiUl46Xf0IObWVbMvPrr2gw8A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.53.3.tgz",
      "integrity": "sha512-VYsFMpULAz87ZW6BVYw3I6sWesGpsP9OPcyKe8ofdg9LHxSbRMd7zrVrr5xi/3kMZtpWL/wC+UIJWJYVX5uTKg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.53.3.tgz",
      "integrity": "sha512-3EhFi1FU6YL8HTUJZ51imGJWEX//ajQPfqWLI3BQq4TlvHy4X0MOr5q3D2Zof/ka0d5FNdPwZXm3Yyib/UEd+w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.53.3.tgz",
      "integrity": "sha512-eoROhjcc6HbZCJr+tvVT8X4fW3/5g/WkGvvmwz/88sDtSJzO7r/blvoBDgISDiCjDRZmHpwud7h+6Q9JxFwq1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.53.3.tgz",
      "integrity": "sha512-OueLAWgrNSPGAdUdIjSWXw+u/02BRTcnfw9PN41D2vq/JSEPnJnVuBgw18VkN8wcd4fjUs+jFHVM4t9+kBSNLw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.53.3.tgz",
      "integrity": "sha512-GOFuKpsxR/whszbF/bzydebLiXIHSgsEUp6M0JI8dWvi+fFa1TD6YQa4aSZHtpmh2/uAlj/Dy+nmby3TJ3pkTw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.53.3.tgz",
      "integrity": "sha512-iah+THLcBJdpfZ1TstDFbKNznlzoxa8fmnFYK4V67HvmuNYkVdAywJSoteUszvBQ9/HqN2+9AZghbajMsFT+oA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.53.3.tgz",
      "integrity": "sha512-J9QDiOIZlZLdcot5NXEepDkstocktoVjkaKUtqzgzpt2yWjGlbYiKyp05rWwk4nypbYUNoFAztEgixoLaSETkg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.53.3.tgz",
      "integrity": "sha512-UhTd8u31dXadv0MopwGgNOBpUVROFKWVQgAg5N1ESyCz8AuBcMqm4AuTjrwgQKGDfoFuz02EuMRHQIw/frmYKQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/pako": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/@types/pako/-/pako-2.0.4.tgz",
      "integrity": "sha512-VWDCbrLeVXJM9fihYodcLiIv0ku+AlOa/TQ1SvYOaBuyrSKgEcro95LJyIsJ4vSo6BXIxOKxiJAat04CmST9Fw==",
      "license": "MIT"
    },
    "node_modules/@types/raf": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/@types/raf/-/raf-3.4.3.tgz",
      "integrity": "sha512-c4YAvMedbPZ5tEyxzQdMoOhhJ4RD3rngZIdwC2/qDN3d7JpEhB6fiBRKVY1lg5B7Wk+uPBjn5f39j1/2MY1oOw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/react": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.6.tgz",
      "integrity": "sha512-p/jUvulfgU7oKtj6Xpk8cA2Y1xKTtICGpJYeJXz2YVO2UcvjQgeRMLDGfDeqeRW2Ta+0QNFwcc8X3GH8SxZz6w==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/trusted-types": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/@types/trusted-types/-/trusted-types-2.0.7.tgz",
      "integrity": "sha512-ScaPdn1dQczgbl0QFTeTOmVHFULt394XJgOQNoyVhZ6r2vLnMLJfBPd53SB52T/3G36VI1/g2MZaX0cwDuXsfw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.1.1.tgz",
      "integrity": "sha512-WQfkSw0QbQ5aJ2CHYw23ZGkqnRwqKHD/KYsMeTkZzPT4Jcf0DcBxBtwMJxnu6E7oxw5+JC6ZAiePgh28uJ1HBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.5",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.47",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/acorn": {
      "version": "8.15.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
      "integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.12.6",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
      "integrity": "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/aos": {
      "version": "2.3.4",
      "resolved": "https://registry.npmjs.org/aos/-/aos-2.3.4.tgz",
      "integrity": "sha512-zh/ahtR2yME4I51z8IttIt4lC1Nw0ktsFtmeDzID1m9naJnWXhCoARaCgNOGXb5CLy3zm+wqmRAEgMYB5E2HUw==",
      "license": "MIT",
      "dependencies": {
        "classlist-polyfill": "^1.0.3",
        "lodash.debounce": "^4.0.6",
        "lodash.throttle": "^4.0.1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/base64-arraybuffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-1.0.2.tgz",
      "integrity": "sha512-I3yl4r9QB5ZRY3XuJVEPfc2XhZO6YweFPI+UovAzn+8/hb3oJ6lnysaFcjVpkCPfVWFUDvoZ8kmVDP7WyRtYtQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.8.30",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.8.30.tgz",
      "integrity": "sha512-aTUKW4ptQhS64+v2d6IkPzymEzzhw+G0bA1g3uBRV3+ntkH+svttKseW5IOR4Ed6NUVKqnY7qT3dKvzQ7io4AA==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/bootstrap": {
      "version": "5.3.8",
      "resolved": "https://registry.npmjs.org/bootstrap/-/bootstrap-5.3.8.tgz",
      "integrity": "sha512-HP1SZDqaLDPwsNiqRqi5NcP0SSXciX2s9E+RyqJIIqGo+vJeN5AJVM98CXmW/Wux0nQ5L7jeWUdplCEf0Ee+tg==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/twbs"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/bootstrap"
        }
      ],
      "license": "MIT",
      "peerDependencies": {
        "@popperjs/core": "^2.11.8"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.0.tgz",
      "integrity": "sha512-tbydkR/CxfMwelN0vwdP/pLkDwyAASZ+VfWm4EOwlB6SWhx1sYnWLqo8N5j0rAzPfzfRaxt0mM/4wPU/Su84RQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "baseline-browser-mapping": "^2.8.25",
        "caniuse-lite": "^1.0.30001754",
        "electron-to-chromium": "^1.5.249",
        "node-releases": "^2.0.27",
        "update-browserslist-db": "^1.1.4"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001756",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001756.tgz",
      "integrity": "sha512-4HnCNKbMLkLdhJz3TToeVWHSnfJvPaq6vu/eRP0Ahub/07n484XHhBF5AJoSGHdVrS8tKFauUQz8Bp9P7LVx7A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/canvg": {
      "version": "3.0.11",
      "resolved": "https://registry.npmjs.org/canvg/-/canvg-3.0.11.tgz",
      "integrity": "sha512-5ON+q7jCTgMp9cjpu4Jo6XbvfYwSB2Ow3kzHKfIyJfaCAOHLbdKPQqGKgfED/R5B+3TFFfe8pegYA+b423SRyA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@babel/runtime": "^7.12.5",
        "@types/raf": "^3.4.0",
        "core-js": "^3.8.3",
        "raf": "^3.4.1",
        "regenerator-runtime": "^0.13.7",
        "rgbcolor": "^1.0.1",
        "stackblur-canvas": "^2.0.0",
        "svg-pathdata": "^6.0.3"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/classlist-polyfill": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/classlist-polyfill/-/classlist-polyfill-1.2.0.tgz",
      "integrity": "sha512-GzIjNdcEtH4ieA2S8NmrSxv7DfEV5fmixQeyTmqmRmRJPGpRBaSnA2a0VrCjyT8iW8JjEdMbKzDotAJf+ajgaQ==",
      "license": "Unlicense"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.0.2.tgz",
      "integrity": "sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/core-js": {
      "version": "3.47.0",
      "resolved": "https://registry.npmjs.org/core-js/-/core-js-3.47.0.tgz",
      "integrity": "sha512-c3Q2VVkGAUyupsjRnaNX6u8Dq2vAdzm9iuPj5FW0fRxzlxgq9Q39MDq10IvmQSpLgHQNyQzQmOo6bgGHmH3NNg==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/core-js"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/css-line-break": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/css-line-break/-/css-line-break-2.1.0.tgz",
      "integrity": "sha512-FHcKFCZcAha3LwfVBhCQbW2nCNbkZXn7KVUJcsT5/P8YmfsVja0FMPJr0B903j/E69HUphKiV9iQArX8SDYA4w==",
      "license": "MIT",
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dompurify": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/dompurify/-/dompurify-3.3.0.tgz",
      "integrity": "sha512-r+f6MYR1gGN1eJv0TVQbhA7if/U7P87cdPl3HN5rikqaBSBxLiCb/b9O+2eG0cxz0ghyU+mU1QkbsOwERMYlWQ==",
      "license": "(MPL-2.0 OR Apache-2.0)",
      "optional": true,
      "optionalDependencies": {
        "@types/trusted-types": "^2.0.7"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.259",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.259.tgz",
      "integrity": "sha512-I+oLXgpEJzD6Cwuwt1gYjxsDmu/S/Kd41mmLA3O+/uH2pFRO/DvOjUyGozL8j3KeLV6WyZ7ssPwELMsXCcsJAQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/esbuild": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz",
      "integrity": "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.12",
        "@esbuild/android-arm": "0.25.12",
        "@esbuild/android-arm64": "0.25.12",
        "@esbuild/android-x64": "0.25.12",
        "@esbuild/darwin-arm64": "0.25.12",
        "@esbuild/darwin-x64": "0.25.12",
        "@esbuild/freebsd-arm64": "0.25.12",
        "@esbuild/freebsd-x64": "0.25.12",
        "@esbuild/linux-arm": "0.25.12",
        "@esbuild/linux-arm64": "0.25.12",
        "@esbuild/linux-ia32": "0.25.12",
        "@esbuild/linux-loong64": "0.25.12",
        "@esbuild/linux-mips64el": "0.25.12",
        "@esbuild/linux-ppc64": "0.25.12",
        "@esbuild/linux-riscv64": "0.25.12",
        "@esbuild/linux-s390x": "0.25.12",
        "@esbuild/linux-x64": "0.25.12",
        "@esbuild/netbsd-arm64": "0.25.12",
        "@esbuild/netbsd-x64": "0.25.12",
        "@esbuild/openbsd-arm64": "0.25.12",
        "@esbuild/openbsd-x64": "0.25.12",
        "@esbuild/openharmony-arm64": "0.25.12",
        "@esbuild/sunos-x64": "0.25.12",
        "@esbuild/win32-arm64": "0.25.12",
        "@esbuild/win32-ia32": "0.25.12",
        "@esbuild/win32-x64": "0.25.12"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.1",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.1.tgz",
      "integrity": "sha512-BhHmn2yNOFA9H9JmmIVKJmd288g9hrVRDkdoIgRCRuSySRUHH7r/DI6aAXW9T1WwUuY3DFgrcaqB+deURBLR5g==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.1",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.1",
        "@eslint/js": "9.39.1",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.12.4",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.2",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.0.1.tgz",
      "integrity": "sha512-O0d0m04evaNzEPoSW+59Mezf8Qt0InfgGIBJnpC0h3NH/WjUAR7BIKUfysC6todmtiZ/A0oUVS8Gce0WhBrHsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.4.24.tgz",
      "integrity": "sha512-nLHIW7TEq3aLrEYWpVaJ1dRgFR+wLDPN8e8FpYAql/bMV2oBEfC37K0gLEGgv9fy66juNShSMV8OkTqzltcG/w==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": ">=8.40"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.6.0.tgz",
      "integrity": "sha512-ca9pw9fomFcKPvFLXhBKUK90ZvGibiGOvRJNbjljY7s7uq/5YO4BOzcYtJqExdx99rF6aAcnRxHmcUHcz6sQsg==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-png": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/fast-png/-/fast-png-6.4.0.tgz",
      "integrity": "sha512-kAqZq1TlgBjZcLr5mcN6NP5Rv4V2f22z00c3g8vRrwkcqjerx7BEhPbOnWCPqaHUl2XWQBJQvOT/FQhdMT7X/Q==",
      "license": "MIT",
      "dependencies": {
        "@types/pako": "^2.0.3",
        "iobuffer": "^5.3.2",
        "pako": "^2.1.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fflate": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.8.2.tgz",
      "integrity": "sha512-cPJU47OaAoCbg0pBvzsgpTPhmhqI5eJjh/JIu8tPj5q+T7iLvW/JAYUqmE7KOB4R1ZyEhzBaIQpQpardBF5z8A==",
      "license": "MIT"
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.3.tgz",
      "integrity": "sha512-GX+ysw4PBCz0PzosHDepZGANEuFCMLrnRTiEy9McGjmkCQYwRq4A/X786G/fjM/+OjsWSU1ZrY5qyARZmO/uwg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "16.5.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-16.5.0.tgz",
      "integrity": "sha512-c/c15i26VrJ4IRt5Z89DnIzCGDn9EcebibhAOjw5ibqEHsE1wLUgkPn9RDmNcUKyU87GeaL633nyJ+pplFR2ZQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/html2canvas": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/html2canvas/-/html2canvas-1.4.1.tgz",
      "integrity": "sha512-fPU6BHNpsyIhr8yyMpTLLxAbkaK8ArIBcmZIRiBLiDhjeqvXolaEmDGmELFuX9I4xDcaKKcJl+TKZLqruBbmWA==",
      "license": "MIT",
      "dependencies": {
        "css-line-break": "^2.1.0",
        "text-segmentation": "^1.0.3"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/iobuffer": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/iobuffer/-/iobuffer-5.4.0.tgz",
      "integrity": "sha512-DRebOWuqDvxunfkNJAlc3IzWIPD5xVxwUNbHr7xKB8E6aLJxIPfNX3CoMJghcFjpv6RWQsrcJbghtEwSPoJqMA==",
      "license": "MIT"
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jspdf": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/jspdf/-/jspdf-3.0.4.tgz",
      "integrity": "sha512-dc6oQ8y37rRcHn316s4ngz/nOjayLF/FFxBF4V9zamQKRqXxyiH1zagkCdktdWhtoQId5K20xt1lB90XzkB+hQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.4",
        "fast-png": "^6.2.0",
        "fflate": "^0.8.1"
      },
      "optionalDependencies": {
        "canvg": "^3.0.11",
        "core-js": "^3.6.0",
        "dompurify": "^3.2.4",
        "html2canvas": "^1.0.0-rc.5"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==",
      "license": "MIT"
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lodash.throttle": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.throttle/-/lodash.throttle-4.1.1.tgz",
      "integrity": "sha512-wIkUCfVKpVsWo3JSZlc+8MB5it+2AN5W8J7YVMST30UrvcQNZ1Okbj+rbVniijTWE6FGYy4XJq/rHkas8qJMLQ==",
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.555.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.555.0.tgz",
      "integrity": "sha512-D8FvHUGbxWBRQM90NZeIyhAvkFfsh3u9ekrMvJ30Z6gnpBHS6HC6ldLg7tL45hwiIz/u66eKDtdA23gwwGsAHA==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.2.tgz",
      "integrity": "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node": {
      "version": "20.19.6",
      "resolved": "https://registry.npmjs.org/node/-/node-20.19.6.tgz",
      "integrity": "sha512-EDRH8t/R6cBUGCXA+MMQ4fSafg/jDPltwL7RWDODKj7O/vAZXOO8w5GA3sIQp0wQnmxQlgApJUYzEjs5MGu9Zg==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "node-bin-setup": "^1.0.0"
      },
      "bin": {
        "node": "bin/node"
      },
      "engines": {
        "npm": ">=5.0.0"
      }
    },
    "node_modules/node-bin-setup": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/node-bin-setup/-/node-bin-setup-1.1.4.tgz",
      "integrity": "sha512-vWNHOne0ZUavArqPP5LJta50+S8R261Fr5SvGul37HbEDcowvLjwdvd0ZeSr0r2lTSrPxl6okq9QUw8BFGiAxA==",
      "license": "ISC"
    },
    "node_modules/node-releases": {
      "version": "2.0.27",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.27.tgz",
      "integrity": "sha512-nmh3lCkYZ3grZvqcCH+fjmQ7X+H0OeZgP40OierEaAptX4XofMh5kwNbWh7lBduUzCcV/8kZ+NDLCwm2iorIlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pako": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/pako/-/pako-2.1.0.tgz",
      "integrity": "sha512-w+eufiZ1WuJYgPXbV/PO3NCMEc3xqylkKHzp8bxp1uW4qaSNQUkwmLLEc3kKsfz8lpV1F8Ht3U1Cm+9Srog2ug==",
      "license": "(MIT AND Zlib)"
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/performance-now": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/performance-now/-/performance-now-2.1.0.tgz",
      "integrity": "sha512-7EAHlyLHI56VEIdK57uwHdHKIaAGbnXPiw0yWbarQZOKaKpvUIgW0jWRVLiatnM+XXlSwsanIBH/hzGMJulMow==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.6",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
      "integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/raf": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/raf/-/raf-3.4.1.tgz",
      "integrity": "sha512-Sq4CW4QhwOHE8ucn6J34MqtZCeWFP2aQSmrlroYgqAV1PjStIhJXxYuTgUIfkEk7zTLjmIjLmU5q+fbD1NnOJA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "performance-now": "^2.1.0"
      }
    },
    "node_modules/react": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.0.tgz",
      "integrity": "sha512-tmbWg6W31tQLeB5cdIBOicJDJRR2KzXsV7uSK9iNfLWQ5bIZfxuPEHp7M8wiHyHnn0DD1i7w3Zmin0FtkrwoCQ==",
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.0.tgz",
      "integrity": "sha512-UlbRu4cAiGaIewkPyiRGJk0imDN2T3JjieT6spoL2UeSf5od4n5LB/mQ4ejmxhCFT1tYe8IvaFulzynWovsEFQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.0"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.9.6.tgz",
      "integrity": "sha512-Y1tUp8clYRXpfPITyuifmSoE2vncSME18uVLgaqyxh9H35JWpIfzHo+9y3Fzh5odk/jxPW29IgLgzcdwxGqyNA==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.9.6",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.9.6.tgz",
      "integrity": "sha512-2MkC2XSXq6HjGcihnx1s0DBWQETI4mlis4Ux7YTLvP67xnGxCvq+BcCQSO81qQHVUTM1V53tl4iVVaY5sReCOA==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.9.6"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/regenerator-runtime": {
      "version": "0.13.11",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.13.11.tgz",
      "integrity": "sha512-kY1AZVr2Ra+t+piVaJ4gxaFaReZVH40AKNo7UCX6W+dEwBo/2oZJzqfuN1qLq1oL45o56cPaTXELwrTh8Fpggg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rgbcolor": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/rgbcolor/-/rgbcolor-1.0.1.tgz",
      "integrity": "sha512-9aZLIrhRaD97sgVhtJOW6ckOEh6/GnvQtdVNfdZ6s67+3/XwLS9lBcQYzEEhYVeUowN7pRzMLsyGhK2i/xvWbw==",
      "license": "MIT OR SEE LICENSE IN FEEL-FREE.md",
      "optional": true,
      "engines": {
        "node": ">= 0.8.15"
      }
    },
    "node_modules/rollup": {
      "version": "4.53.3",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.53.3.tgz",
      "integrity": "sha512-w8GmOxZfBmKknvdXU1sdM9NHcoQejwF/4mNgj2JuEEdRaHwwF12K7e9eXn1nLZ07ad+du76mkVsyeb2rKGllsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.53.3",
        "@rollup/rollup-android-arm64": "4.53.3",
        "@rollup/rollup-darwin-arm64": "4.53.3",
        "@rollup/rollup-darwin-x64": "4.53.3",
        "@rollup/rollup-freebsd-arm64": "4.53.3",
        "@rollup/rollup-freebsd-x64": "4.53.3",
        "@rollup/rollup-linux-arm-gnueabihf": "4.53.3",
        "@rollup/rollup-linux-arm-musleabihf": "4.53.3",
        "@rollup/rollup-linux-arm64-gnu": "4.53.3",
        "@rollup/rollup-linux-arm64-musl": "4.53.3",
        "@rollup/rollup-linux-loong64-gnu": "4.53.3",
        "@rollup/rollup-linux-ppc64-gnu": "4.53.3",
        "@rollup/rollup-linux-riscv64-gnu": "4.53.3",
        "@rollup/rollup-linux-riscv64-musl": "4.53.3",
        "@rollup/rollup-linux-s390x-gnu": "4.53.3",
        "@rollup/rollup-linux-x64-gnu": "4.53.3",
        "@rollup/rollup-linux-x64-musl": "4.53.3",
        "@rollup/rollup-openharmony-arm64": "4.53.3",
        "@rollup/rollup-win32-arm64-msvc": "4.53.3",
        "@rollup/rollup-win32-ia32-msvc": "4.53.3",
        "@rollup/rollup-win32-x64-gnu": "4.53.3",
        "@rollup/rollup-win32-x64-msvc": "4.53.3",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stackblur-canvas": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/stackblur-canvas/-/stackblur-canvas-2.7.0.tgz",
      "integrity": "sha512-yf7OENo23AGJhBriGx0QivY5JP6Y1HbrrDI6WLt6C5auYZXlQrheoY8hD4ibekFKz1HOfE48Ww8kMWMnJD/zcQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=0.1.14"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/svg-pathdata": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/svg-pathdata/-/svg-pathdata-6.0.3.tgz",
      "integrity": "sha512-qsjeeq5YjBZ5eMdFuUa4ZosMLxgr5RZ+F+Y1OrDhuOCEInRMA3x74XdBtggJcj9kOeInz0WE+LgCPDkZFlBYJw==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/text-segmentation": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/text-segmentation/-/text-segmentation-1.0.3.tgz",
      "integrity": "sha512-iOiPUo/BGnZ6+54OsWxZidGCsdU8YbE4PSpdPinp7DeMtUJNJBoJ/ouUSTJjHkh1KntHaltHl/gDs2FC4i5+Nw==",
      "license": "MIT",
      "dependencies": {
        "utrie": "^1.0.2"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.4.tgz",
      "integrity": "sha512-q0SPT4xyU84saUX+tomz1WLkxUbuaJnR1xWt17M7fJtEJigJeWUNGUqrauFXsHnqev9y9JTRGwk13tFBuKby4A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/utrie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/utrie/-/utrie-1.0.2.tgz",
      "integrity": "sha512-1MLa5ouZiOmQzUbjbu9VmjLzn1QLXBhwpUa7kdLUQK+KQ5KA9I1vk5U4YHe/X2Ch7PYnJfWuWT+VbuxbGwljhw==",
      "license": "MIT",
      "dependencies": {
        "base64-arraybuffer": "^1.0.2"
      }
    },
    "node_modules/vite": {
      "version": "7.2.4",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.2.4.tgz",
      "integrity": "sha512-NL8jTlbo0Tn4dUEXEsUg8KeyG/Lkmc4Fnzb8JXN/Ykm9G4HNImjtABMJgkQoVjOBN/j2WAwDTRytdqJbZsah7w==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.1.12",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.1.12.tgz",
      "integrity": "sha512-JInaHOamG8pt5+Ey8kGmdcAcg3OL9reK8ltczgHTAwNhMys/6ThXHityHxVV2p3fkw/c+MAvBHFVYHFZDmjMCQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    }
  }
}
```

### package.json

```json
{
  "name": "react-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "aos": "^2.3.4",
    "bootstrap": "^5.3.8",
    "html2canvas": "^1.4.1",
    "jspdf": "^3.0.4",
    "lucide-react": "^0.555.0",
    "node": "^20.19.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

### src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

### src/App.jsx

```jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";

// Import modals
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import BackendStatus from "./components/BackendStatus";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginClick = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <div className="App" style={{ width: "100%", minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/demo"
          element={
            <Demo
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />
          }
        />
      </Routes>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onSwitchToSignup={handleSignupClick}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLoginClick}
      />
      <BackendStatus />
    </div>
  );
}

export default App;
```

### src/components/BackendStatus.jsx

```jsx
import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const BackendStatus = () => {
  const [status, setStatus] = useState("checking"); // checking, connected, disconnected
  const [latency, setLatency] = useState(null);

  const checkHealth = async () => {
    const start = Date.now();
    try {
      // We'll assume there's a health endpoint or just try a simple fetch
      // The api.js doesn't have a specific health check exposed, but we can try a simple fetch to the base URL or a known endpoint.
      // Let's use a direct fetch to the health endpoint we saw in main.py: /api/health
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${API_BASE_URL}/api/health`);

      if (response.ok) {
        setStatus("connected");
        setLatency(Date.now() - start);
      } else {
        setStatus("disconnected");
        setLatency(null);
      }
    } catch (error) {
      setStatus("disconnected");
      setLatency(null);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (status === "checking") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "20px",
        backgroundColor:
          status === "connected"
            ? "rgba(220, 252, 231, 0.9)"
            : "rgba(254, 226, 226, 0.9)",
        border: `1px solid ${status === "connected" ? "#86efac" : "#fca5a5"}`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        fontSize: "14px",
        color: status === "connected" ? "#166534" : "#991b1b",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: status === "connected" ? "#16a34a" : "#dc2626",
        }}
      />
      <span style={{ fontWeight: 500 }}>
        {status === "connected" ? "Backend Connected" : "Backend Disconnected"}
      </span>
      {latency && (
        <span style={{ fontSize: "12px", opacity: 0.8 }}>({latency}ms)</span>
      )}
    </div>
  );
};

export default BackendStatus;
```

### src/components/Footer.jsx

```jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

const Footer = () => {
  return (
    <footer className="mindkey-footer">
      <div className="footer-content-wrapper">
        {/* Info Column */}
        <div className="footer-col footer-col-info">
          <div className="footer-logo">MindKey</div>
          <p className="footer-description">
            MindKey is an assistive AI system designed to empower individuals
            with paralysis and severe motor disabilities. By transforming
            brain-signal patterns into digital commands, we create a
            communication bridge that restores independence, dignity, and human
            connection.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-icon-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/demo">Demo</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li>
              <a href="#features-section">Features</a>
            </li>
            <li>
              <a href="#faq-section">FAQs</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col footer-col-address">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-address-text">
            <p>
              <i className="fas fa-envelope" style={{ marginRight: "8px" }}></i>
              info@mindkey.com
            </p>
            <p>
              <i className="fas fa-phone" style={{ marginRight: "8px" }}></i>
              +1 (555) 123-4567
            </p>
            <p>
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: "8px" }}
              ></i>
              123 Innovation Drive
              <br />
              Tech City, TC 12345
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>
          &copy; {new Date().getFullYear()} MindKey. All rights reserved. | Give
          Thought a Voice
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```

### src/components/LoginModal.jsx

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/main.css";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login(email, password);
      // Store user info if needed
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      navigate("/dashboard");
      onClose();
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="form-container">
          <h1>Login</h1>
          {error && (
            <div
              style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}
            >
              {error}
            </div>
          )}
          <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="separator">
            <span>Or</span>
          </div>

          <div className="signup-prompt">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                if (onSwitchToSignup) onSwitchToSignup();
              }}
              className="signup-link"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
```

### src/components/Navbar.jsx

```jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (onSignupClick) {
      onSignupClick();
    }
  };

  return (
    <nav
      id="mainNav"
      className={`navbar navbar-expand-lg sticky-top ${isScrolled ? "shadowed" : ""}`}
    >
      <div className="container-lg">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          aria-label="MindKey home"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="6" fill="#1A73E8"></circle>
            <circle cx="12" cy="8" r="3.2" fill="#fff"></circle>
          </svg>
          <span
            className="fw-bold"
            style={{ color: "var(--primary)", fontSize: "1.05rem" }}
          >
            MindKey
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navCollapse"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/demo") ? "active" : ""}`}
                to="/demo"
              >
                Demo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleLoginClick}
            className="btn btn-outline-primary"
            id="loginBtn"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="btn btn-primary"
            id="signupBtn"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

### src/components/SignupModal.jsx

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/main.css";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    medical_condition: "",
    guardian_name: "",
    consent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!formData.consent) {
      setError("Please consent to share medical information");
      return;
    }

    setLoading(true);

    try {
      // Validate age
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 5 || age > 120) {
        setError("Please enter a valid age between 5 and 120");
        setLoading(false);
        return;
      }

      const signupData = {
        email: formData.email.trim(),
        full_name: formData.full_name.trim(),
        password: formData.password,
        age: age,
        medical_condition: formData.medical_condition,
        guardian_name: formData.guardian_name.trim(),
        consent: formData.consent,
      };

      console.log("Sending signup request:", {
        ...signupData,
        password: "***",
      }); // Debug log
      const response = await api.signup(signupData);
      // Store user info if needed
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      navigate("/dashboard");
      onClose();
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="form-container">
          <h1>Signup</h1>
          {error && (
            <div
              style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}
            >
              {error}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              value={formData.full_name}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create Password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                id="eye1"
                onClick={() => togglePassword("password")}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                id="eye2"
                onClick={() => togglePassword("confirmPassword")}
                style={{ cursor: "pointer" }}
              ></i>
            </div>

            <p
              id="passError"
              style={{
                color: "red",
                fontSize: "13px",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
            >
              {passwordError}
            </p>

            <input
              type="number"
              name="age"
              placeholder="Age"
              min="5"
              max="120"
              required
              value={formData.age}
              onChange={handleChange}
              disabled={loading}
            />

            <select
              name="medical_condition"
              required
              value={formData.medical_condition}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="" disabled>
                Select Medical Condition
              </option>
              <option value="ALS">ALS</option>
              <option value="Stroke">Stroke</option>
              <option value="Paralysis">Paralysis</option>
              <option value="Spinal Injury">Spinal Injury</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="text"
              name="guardian_name"
              placeholder="Guardian Name"
              required
              value={formData.guardian_name}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="consent-box">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
                disabled={loading}
              />
              <label>
                I consent to share medical information for assistive technology
                usage.
              </label>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <div className="separator">
            <span>Or</span>
          </div>

          <div className="login-prompt">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onSwitchToLogin();
              }}
              className="login-link"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
```

### src/index.css

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  padding: 0;
  min-width: 320px;
  width: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

#root {
  width: 100%;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

:root {
  --primary: #1a73e8;
  --primary-dark: #0a3e86;
  --muted: #6b7280;
  --bg: #ffffff;
  --card: #f8fafc;
  --glass: rgba(255, 255, 255, 0.6);
  --radius: 12px;
}

html,
body {
  height: 100%;
}
body {
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    Arial;
  background: var(--bg);
  color: #071225;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

/* NAVBAR */
.navbar {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85)
  );
  backdrop-filter: blur(6px);
  transition:
    box-shadow 0.28s ease,
    background 0.28s ease;
}
.navbar.shadowed {
  box-shadow: 0 10px 30px rgba(12, 34, 70, 0.08);
}
.nav-link {
  color: rgba(7, 18, 37, 0.8);
  font-weight: 600;
}
.nav-link:hover,
.nav-link.active {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 8px;
}
.btn-primary {
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border: none;
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.12);
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-primary a {
  color: #fff !important;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(26, 115, 232, 0.18);
}

.btn-outline-primary {
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
  transition: all 0.3s ease;
}

.btn-outline-primary a {
  color: var(--primary);
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.btn-outline-primary:hover {
  background: var(--primary);
  color: #fff;
}

.btn-outline-primary:hover a {
  color: #fff;
}

/* HERO */
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}
.hero .eyebrow {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 0.6rem;
}
.hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.02;
  font-weight: 800;
  margin-bottom: 0.6rem;
}
.hero p.lead {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 56ch;
}

/* Neural background glow + nodes */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}
@keyframes slowPulse {
  0% {
    transform: scale(1);
    opacity: 0.95;
  }
  50% {
    transform: scale(1.06);
    opacity: 0.85;
  }
  100% {
    transform: scale(1);
    opacity: 0.95;
  }
}

.floating-icon {
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 16px;
  background: linear-gradient(180deg, #fff, #eef8ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 28px rgba(11, 32, 63, 0.06);
  z-index: 3;
  pointer-events: none;
  transition: transform 0.45s ease;
}

/* Hero mock card */
.hero-card {
  background: linear-gradient(180deg, #ffffff, #f7fbff);
  border-radius: 16px;
  padding: 1.1rem;
  box-shadow: 0 18px 50px rgba(11, 32, 63, 0.07);
  border: 1px solid rgba(10, 60, 134, 0.04);
  z-index: 4;
}
#about {
  height: 80vh;
}
.about-full {
  min-height: 95vh;
  display: flex;
  align-items: center;
}

.about-img-wrapper {
  height: 100%;
}
#about h1 {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  margin-bottom: 3rem;
  text-align: center;
}

.stat-box {
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: 0.25s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.09);
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 6px;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.3;
  font-weight: 500;
}

.stats-row > .col-4 {
  display: flex;
}
.stat-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(26, 115, 232, 0.25); /* soft blue glow (#1A73E8 tint) */
  background-color: rgba(
    26,
    115,
    232,
    0.05
  ); /* very light blue background tint */
}

/* HOW IT WORKS */
.how-it-works-section {
  min-height: 80vh;
  display: flex;
  align-items: center;

  justify-content: center;
}

#how-it-works h1 {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  margin-bottom: 3rem;
  text-align: center;
}

.how-it-works-section .card {
  transition: all 0.3s ease;
}
.how-it-works-section .card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.how-it-works-section .card:hover {
  border-color: var(--primary); /* turns blue on hover */
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(26, 115, 232, 0.15);
}

.how-it-works-section img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* ================================ */

/* typed text effect */
.typed {
  font-weight: 700;
  color: var(--primary);
}
.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  background: var(--primary);
  margin-left: 6px;
  vertical-align: middle;
  animation: blink 1s steps(2) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* STAT CARDS */
.stat-card {
  transition:
    transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1),
    box-shadow 0.28s;
  background: var(--card);
  border-radius: 12px;
  padding: 1.15rem;
}
.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(10, 46, 100, 0.06);
}

/* TIMELINE / STEPS */
.step {
  background: white;
  border-radius: 12px;
  padding: 1.15rem;
  box-shadow: 0 8px 28px rgba(8, 26, 50, 0.04);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease;
}
.step:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(8, 26, 50, 0.06);
}

/* CORE FEATURES */

#features .feature-card {
  border: 2px solid transparent;
  background-color: rgba(26, 115, 232, 0.05); /* default white */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* subtle default shadow */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

#features .feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(14, 73, 151, 0.15); /* soft blue shadow */
  background-color: rgba(
    26,
    115,
    232,
    0.05
  ); /* subtle blue background on hover */
}

/* testimonials carousel */
/* .testimonial { border-radius:12px; padding:1.25rem; background:linear-gradient(180deg,#fff,#f7fbff); box-shadow:0 12px 36px rgba(11,32,63,0.06); } */
/* .testimonial .meta { font-weight:700; color:var(--primary); } */

/* CTA */
.big-cta {
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  color: white;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 18px 40px rgba(26, 115, 232, 0.12);
}

footer {
  background: #f5f9ff;
  padding: 2.2rem 0;
  border-top: 1px solid rgba(10, 60, 134, 0.04);
}

/* small screens */
@media (max-width: 991px) {
  .neural-bg {
    display: none;
  }
  .floating-icon {
    display: none;
  }
  .hero {
    padding-top: 4rem;
    padding-bottom: 3rem;
    min-height: calc(80vh - 76px);
  }
}

/* focus accessibility */
a:focus,
button:focus,
input:focus {
  outline: 3px solid rgba(26, 115, 232, 0.14);
  outline-offset: 4px;
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .neural-bg,
  .floating-icon,
  .feature-card,
  .step {
    animation: none;
    transition: none;
  }
  .typing-cursor {
    animation: none;
    opacity: 1;
  }
}

/* ===================================================================BOTTOM ======================================================================= */

/* ======================================TESTIMONIALS========================= */
:root {
  --quote-color: rgba(255, 255, 255, 0.5);
  --image-size: 70px;
  --card-gap: 30px;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: var(--text-color);
  overflow-x: hidden;
}

/* --- Section and Wrapper --- */
.testimonial-section {
  /* FIX: Increased top padding to prevent floating image from being clipped */
  padding: 70px 20px 50px;
  width: 100%;
  /* Used the gradient from your previous request */
  background: transparent;
}

.slider-wrapper {
  position: relative;
  /* FIX: Increased Max Width to ensure 3 cards fit comfortably without cutting */
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

/* --- Slider and Buttons --- */
.testimonial-container {
  display: flex;
  gap: var(--card-gap);
  overflow: hidden; /* Use 'hidden' as scroll is JS controlled */
  scroll-behavior: smooth;
  padding: 20px 0;
  margin: 0 50px;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(62, 107, 255);
  color: var(--text-color);
  border: none;
  padding: 15px 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.slider-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.left-btn {
  left: 0;
}
.right-btn {
  right: 0;
}

/* --- Testimonial Card Styling --- */
.testimonial-card {
  /* FIX: Conservative calculation ensures three full cards fit */
  flex: 0 0 calc(33% - 20px);
  min-width: 280px;

  /* Appearance and Glassmorphism */
  background: white;
  border-radius: 15px;
  padding: 30px;
  /* Adjust top padding to leave space for the image to float up */
  padding-top: calc(30px + var(--image-size) / 2 + 10px);

  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-6px);
  /* Changed shadow color to match the purple/pink theme slightly better */
  box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
}

/* --- User Image Positioning (Floating effect) --- */
.user-image-wrapper {
  position: absolute;
  /* Places the image centered on the card's top edge */
  top: calc(-1 * var(--image-size) / 2);
  left: 30px;
  z-index: 5;
}

.user-image {
  width: var(--image-size); /* 70px */
  height: var(--image-size); /* 70px */
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

/* --- Content Styling --- */
.quote-text {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  /* Ensures quote content starts after the image's lowest point */
  margin-top: calc(var(--image-size) / 2);
  color: black;
}

.user-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: black;
}

.user-title {
  font-size: 0.9rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  color: black;
}

.quote-icon {
  /* Styling for the large " symbol */
  font-family: Arial, sans-serif;
  content: "“"; /* Used a single quote char as a large visual element */
  font-size: 80px;
  color: var(--primary);
  line-height: 1;
  font-weight: 900;
  position: absolute;
  bottom: 10px;
  right: 20px;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* --- Responsive Adjustments (Kept your media queries simple) --- */
@media (max-width: 1000px) {
  .testimonial-card {
    flex: 0 0 calc(50% - 15px);
  }
}
@media (max-width: 768px) {
  .slider-btn {
    display: none;
  }
  .testimonial-container {
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    margin: 0;
  }
  .testimonial-card {
    flex: 0 0 100%;
    scroll-snap-align: center;
  }
}

/*  */

:root {
  --footer-bg-color: #0c1833; /* Dark blue background */
  --logo-color: #3abff8; /* Light blue/cyan for the logo element */
  --link-hover-color: #3abff8; /* Link hover color */
  --text-color-light: #ffffff;
  --text-color-faded: rgba(
    255,
    255,
    255,
    0.7
  ); /* Faded white for descriptions/links */
}
footer {
  background: var(--footer-bg-color);
}

/* --- Main Footer Container --- */
.conceptual-footer {
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  font-family: Arial, sans-serif;
  padding-top: 50px; /* Top padding to lift content */
  border-radius: 20px 20px 0 0; /* Rounded top corners, matching the image style */
  position: relative;
}

/* --- Content Wrapper (Using Flexbox for columns) --- */
.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--footer-bg-color);
}

/* --- Individual Columns --- */
.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px; /* Minimum width for link columns */
}

.footer-col-info {
  flex-grow: 2; /* Make the first column wider */
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

/* --- Logo and Description --- */
.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
  /* You would typically use a background image for the logo icon */
}

.footer-description {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

/* --- Link Lists --- */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

/* --- Social Icons --- */
.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.15); /* Darker square background */
  color: var(--text-color-light);
  border-radius: 3px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
}

/* --- Address Text --- */
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
}

/* --- Copyright Section --- */
.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- Responsiveness (Example for stacking columns on smaller screens) --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }
  .footer-col {
    margin-bottom: 30px;
    min-width: 45%; /* Two columns per row */
  }
  .footer-col-info,
  .footer-col-address {
    max-width: 100%; /* Full width for logo/address on very small screens */
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .footer-col {
    min-width: 100%; /* Stack all columns */
    padding: 0 10px;
  }
}

/* =========================FOOTER============================ */

/* --- 4. FOOTER STYLES (Provided by User) --- */

.mindkey-footer {
  /* Ensure the footer background is set */
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  padding-top: 50px;
  padding-bottom: 20px;
  border-radius: 20px 20px 0 0;
}

.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px 40px; /* Adjusted padding */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px;
}

.footer-col-info {
  flex-grow: 2;
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
}

.footer-description,
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-light);
  border-radius: 3px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
}

.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- RESPONSIVENESS --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }
  .footer-col {
    margin-bottom: 30px;
    min-width: 45%;
  }
  .footer-col-info,
  .footer-col-address {
    max-width: 100%;
    min-width: 100%;
  }

  .form-map-wrapper {
    flex-direction: column;
  }
  .map-placeholder {
    min-height: 300px;
  }
  .banner-content {
    padding-left: 50px;
  }
}

@media (max-width: 576px) {
  .info-cards-wrapper {
    flex-direction: column;
  }
  .footer-col {
    min-width: 100%;
    padding: 0 10px;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .banner-title {
    font-size: 2.5rem;
  }
  .banner-content {
    padding-left: 20px;
  }
}

/* =======================CONTACT ========================================*/

/* --- GLOBAL & CONTACT SECTION STYLES --- */

:root {
  /* Footer Colors */
  --footer-bg-color: #0c1833;
  --logo-color: #3abff8;
  --link-hover-color: #3abff8;
  --text-color-light: #ffffff;
  --text-color-faded: rgba(255, 255, 255, 0.7);

  /* Contact Page Colors */
  --contact-form-bg: #f5f8fd; /* Light blue background for info cards */
  --primary-blue: #007bff; /* Button color */
  --light-text: #6c757d; /* Muted text */
  --icon-color: #007bff; /* Blue icon color */
  --primary-tint: rgba(26, 115, 232, 0.05);
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #fff;
  overflow-x: hidden;
}

/* Reusable Container */
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* --- 1. CONTACT BANNER HEADER --- */
.contact-banner {
  height: 300px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  /* Placeholder Background Image (Replace with your own image URL) */
  display: flex;
  align-items: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding-left: 100px;
}

.banner-title {
  color: #fff;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.breadcrumb {
  color: #fff;
  font-size: 0.85rem;
}

.breadcrumb a {
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
}

/* --- 2. INFO CARDS SECTION --- */
.info-cards-section {
  padding: 60px 0;
}

.info-cards-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.info-card {
  flex: 1;
  padding: 30px;
  text-align: center;
  background-color: var(--primary-tint);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  min-height: 120px;
}

.info-card i {
  color: var(--icon-color);
  font-size: 1.2rem;
  margin-right: 10px;
  vertical-align: middle;
}

.card-text {
  display: block;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
}

.card-subtext {
  display: block;
  font-size: 0.9rem;
  color: var(--light-text);
}

/* --- 3. FORM AND MAP SECTION --- */
.form-map-section {
  padding: 40px 0 80px;
}

.form-map-wrapper {
  display: flex;
  gap: 30px;
}

.contact-form-col {
  flex: 1;
  padding-right: 20px;
}

.map-col {
  flex: 1;
}

.form-header-small {
  display: inline-block;
  padding: 5px 15px;
  background-color: var(--contact-form-bg);
  color: var(--primary-blue);
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 15px 0 10px;
}

.form-description {
  font-size: 0.9rem;
  color: var(--light-text);
  margin-bottom: 30px;
}

/* Form Styling */
.form-group {
  margin-bottom: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row input {
  flex: 1;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* 1. Makes the row a flexible container */
.contact-form-col .form-row {
  display: flex;
  gap: 20px; /* Adds space between the 'Your Name' and 'Your Email' fields */
  margin-bottom: 20px; /* Add some space below this row */
}

/* 2. Makes each input group take up an equal share of the available space */
.contact-form-col .form-row .form-group {
  flex: 1; /* Shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

/* 3. Ensures the <input> element inside the form-group fills 100% of its parent group's width */
.contact-form-col .form-row .form-group input {
  width: 100%;
}

.send-button:hover {
  background-color: #0056b3;
}

/* NEW */
:root {
  /* Define a primary color variable, assuming it's the blue used in the logo and link */
  --primary: #1a73e8;
  --primary-blue: #1a73e8;
}
/* Ensure the span in the logo uses the correct variable */
.navbar-brand .fw-bold {
  color: var(--primary) !important;
}

/* --- NEW STYLES FOR NEURAL BACKGROUND EFFECT --- */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}
@keyframes slowPulse {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
/* You might need to add positioning/z-index to your .contact-banner or .banner-content
           to ensure the text appears above the new effect. */
.contact-banner {
  position: relative;
  overflow: hidden;
  background-image: url(./src/brainheader.jpg);
  background-size: cover; /* Ensures the image covers the entire banner */
  background-repeat: no-repeat; /* Prevents the image from tiling */
  background-position: right center; /* <-- THIS IS THE KEY CHANGE */
  min-height: 250px; /* Example: ensure banner has a visible height */
  display: flex; /* Helps vertically center content if needed */
  align-items: center; /* Vertically centers content */
  justify-content: center; /* Horizontally centers content */
  text-align: center; /* Centers text within the banner content */
  color: white; /* Ensure text is visible over the background */
}
.banner-content {
  z-index: 2; /* Ensure content is above the neural-bg */
  position: relative;
}
/* --- END OF NEW STYLES --- */

/* END */

/* Map Styling (Using iframe placeholder) */
.map-placeholder {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.map-placeholder iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* --- 4. FOOTER STYLES (Provided by User) --- */

.mindkey-footer {
  /* Ensure the footer background is set */
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  padding-top: 50px;
  padding-bottom: 20px;
  border-radius: 20px 20px 0 0;
}

.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px 40px; /* Adjusted padding */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px;
}

.footer-col-info {
  flex-grow: 2;
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
}

.footer-description,
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-light);
  border-radius: 3px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
}

.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- RESPONSIVENESS --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }
  .footer-col {
    margin-bottom: 30px;
    min-width: 45%;
  }
  .footer-col-info,
  .footer-col-address {
    max-width: 100%;
    min-width: 100%;
  }

  .form-map-wrapper {
    flex-direction: column;
  }
  .map-placeholder {
    min-height: 300px;
  }
  .banner-content {
    padding-left: 50px;
  }
}

@media (max-width: 576px) {
  .info-cards-wrapper {
    flex-direction: column;
  }
  .footer-col {
    min-width: 100%;
    padding: 0 10px;
  }
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  .banner-title {
    font-size: 2.5rem;
  }
  .banner-content {
    padding-left: 20px;
  }
}

/* TESTING================================================ */
/* ----------------- GLOBAL VARIABLES ----------------- */
:root {
  --primary-blue: #007bff;
  --dark-text: #212529;
  --light-text: #6c757d;
  --bg-light: #f8f9fa;
  --card-bg: #ffffff;
}

/* ----------------- ABOUT SECTION ----------------- */
.about-us-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 15px;
}

.about-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
}

/* IMAGE SIDE - Animate entering from Left Screen edge */
.about-image-col {
  flex: 1;
  min-width: 45%;
  position: relative;
  opacity: 0;
  transform: translateX(-100vw);
  transition: all 1.2s ease-out;
}
.about-image-col.active {
  opacity: 1;
  transform: translateX(0);
}

.image-stack {
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  max-width: 550px;
}

.img-main-placeholder {
  width: 90%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background: #e7f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a64b9;
  font-weight: bold;
}

.img-offset-placeholder {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 250px;
  border-radius: 8px;
  border: 5px solid #fff;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translate(10%, 30px);
  background: #e7f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a64b9;
  font-weight: bold;
}

/* TEXT SIDE - Animate entering from Right Screen edge */
.about-text-col {
  flex: 1;
  max-width: 55%;
  opacity: 0;
  transform: translateX(100vw);
  transition: all 1.2s ease-out;
}
.about-text-col.active {
  opacity: 1;
  transform: translateX(0);
}

.about-tag {
  padding: 5px 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  display: inline-block;
  border-radius: 5px;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark-text);
  margin-bottom: 20px;
}

.about-paragraph {
  margin-bottom: 15px;
  color: var(--light-text);
}

/* Trust icons list */
.trust-points {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}
.trust-points li {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: var(--dark-text);
}
.trust-points i {
  color: #28a745;
  margin-right: 8px;
}

/* Button */
.read-more-button {
  padding: 10px 22px;
  border: none;
  background: var(--primary-blue);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  margin-top: 10px;
  transition: 0.3s;
}
.read-more-button:hover {
  background: #0056b3;
}

/* ---------------- SERVICES SECTION (No conflicts) ---------------- */
.features-section {
  background: var(--bg-light);
  padding: 80px 0;
  text-align: center;
}

/* Heading animation */
.section-title,
.section-description,
.section-tag {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
}
.section-title.active,
.section-description.active,
.section-tag.active {
  opacity: 1;
  transform: translateY(0);
}

/* Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

/* Card animation */
.service-box {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.8s ease-out;
}
.service-box.show {
  opacity: 1;
  transform: translateY(0);
}

/* icons */
.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-blue);
  background: rgba(0, 123, 255, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

/* ---------------- RESPONSIVE ---------------- */
@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }
  .about-text-col,
  .about-image-col {
    transform: none;
    opacity: 1;
  }
  .about-text-col {
    max-width: 100%;
  }
}

/* =============================================ABOUT CSS ====================================== */

:root {
  --primary-blue: #007bff; /* Standard bright blue */
  --dark-text: #212529; /* Dark heading text */
  --light-text: #6c757d; /* Grey paragraph text */
  --bg-light: #f8f9fa; /* Very light background color */
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa; /* Simulate a light background */
}

/* Container for the whole section */
.about-us-container {
  max-width: 1200px;
  margin: 80px auto; /* Centering the block */
  padding: 0 15px;
}

/* Flex layout for the two main columns */
.about-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
}

/* --- LEFT COLUMN: IMAGE STACK --- */
.about-image-col {
  flex: 1;
  position: relative;
  min-width: 45%;
}

.image-stack {
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  max-width: 550px; /* Constraint the image column size */
}

/* Placeholder styling for the main image */
.img-main-placeholder {
  width: 90%;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #e0e0e0; /* Light grey background */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #495057;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-dasharray="5,5"/><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" stroke-dasharray="5,5"/></svg>');
}

/* Placeholder styling for the offset image */
.img-offset-placeholder {
  position: absolute;
  bottom: 0;
  left: 0; /* Changed from right to left to better match the image composition */
  width: 50%;
  height: 250px;
  border-radius: 8px;
  border: 5px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translate(10%, 30px); /* Move slightly right and down */
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #495057;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-dasharray="5,5"/><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" stroke-dasharray="5,5"/></svg>');
}

/* --- RIGHT COLUMN: TEXT CONTENT --- */
.about-text-col {
  flex: 1;
  max-width: 55%;
}

.about-tag {
  display: inline-block;
  padding: 5px 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  border-radius: 5px; /* Used a standard radius as the image shows a slightly rounded edge */
  text-transform: uppercase;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark-text);
  margin-bottom: 20px;
  line-height: 1.3;
}

.about-paragraph {
  margin-bottom: 15px;
  color: var(--light-text);
  line-height: 1.6;
  font-size: 1rem;
}

.trust-points {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 25px;
}

.trust-points li {
  margin-bottom: 10px;
  font-size: 1rem;
  color: var(--dark-text);
  display: flex;
  align-items: center;
}

.trust-points li .fa {
  color: var(--primary-blue);
  margin-right: 10px;
  font-size: 1.1rem;
}

.read-more-button {
  background-color: var(--primary-blue);
  color: white !important;
  padding: 12px 35px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
  display: inline-block;
  border: none;
  cursor: pointer;
}

.read-more-button:hover {
  background-color: #0056b3;
}

/* --- RESPONSIVENESS FOR MOBILE/TABLET --- */
@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }
  .about-image-col,
  .about-text-col {
    flex: none;
    max-width: 100%;
    width: 100%;
  }
  .about-image-col {
    order: 2; /* Images below text on small screens */
    padding-right: 0;
  }
  .about-text-col {
    order: 1;
  }
  .image-stack {
    padding-bottom: 70px;
    margin: 0 auto; /* Center the image stack */
  }
  .img-main-placeholder {
    width: 100%;
  }
  .img-offset-placeholder {
    transform: translate(0, 30px); /* Adjust positioning */
    left: 50%;
    margin-left: -5%; /* Center bias */
  }
}

/* Services */
:root {
  --primary-blue: #007bff; /* Main brand blue */
  --dark-heading: #212529; /* Darker text for titles */
  /* --body-text: #6c757d;    Lighter text for paragraphs */
  --bg-light: #f8f9fa; /* Light background color for the section */
  --card-bg: #ffffff; /* White background for cards */
  --card-shadow: rgba(0, 0, 0, 0.05); /* Subtle shadow for cards */
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-light); /* Light background for the page */
  line-height: 1.6;
  color: var(--body-text);
}

.features-section {
  padding: 80px 0; /* Vertical padding for the section */
  text-align: center; /* Center align all content initially */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-tag {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 10px;
  display: block; /* Ensures it takes full width for centering */
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark-heading);
  margin-bottom: 20px;
  line-height: 1.2;
}

.section-description {
  max-width: 700px;
  margin: 0 auto 50px auto; /* Center and add space below */
  font-size: 1rem;
  color: var(--body-text);
}

/* Feature Cards Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Responsive grid */
  gap: 30px; /* Space between cards */
  margin-top: 40px;
}

/* Individual Feature Card */
.feature-card {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px var(--card-shadow);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem; /* Size of the icon */
  color: var(--primary-blue);
  background-color: rgba(
    0,
    123,
    255,
    0.1
  ); /* Light blue background for icon circle */
  border-radius: 50%; /* Makes it a circle */
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto; /* Center the icon */
  position: relative; /* For the inner circle */
}

.feature-icon::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid var(--primary-blue); /* Inner circle border */
  border-radius: 50%;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-heading);
  margin-bottom: 10px;
}

.feature-description {
  font-size: 0.95rem;
  color: var(--body-text);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .section-description {
    margin-bottom: 30px;
  }
  .features-grid {
    grid-template-columns: 1fr; /* Stack cards on very small screens */
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }
  .feature-card {
    padding: 25px;
  }
  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  .feature-icon::before {
    width: 40px;
    height: 40px;
  }
}

/*  Animation*/

/* Fade + Slide Up Animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Animation for images section  */
/* Slide-in Animations (Reversed Direction) */
.reveal-left,
.reveal-right {
  opacity: 0;
  transition: all 0.9s ease;
}

.reveal-left {
  transform: translateX(-50px); /* Images come from left */
}

.reveal-right {
  transform: translateX(50px); /* Text comes from right */
}

.reveal-left.active,
.reveal-right.active {
  opacity: 1;
  transform: translateX(0);
}

/* =====================END ABOUT================================== */

/* ========================FAQS======================================== */
:root {
  --primary-blue: #007bff;
  --dark-heading: #212529;
  /* --body-text: #6c757d; */
  --bg-light: #f8f9fa;
}

body {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  line-height: 1.6;
  overflow-x: hidden;
}

/* === FAQ SECTION === */
.faq-section {
  position: relative; /* so the .neural-bg stays behind it */
  background-color: white;
  padding: 100px 0;
  overflow: hidden;
}

/* --- Animated Gradient Background --- */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}

@keyframes slowPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* === FAQ CONTENT === */
.faq-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2; /* above background */
}

.faq-content-col {
  flex: 1;
  max-width: 55%;
  padding-right: 20px;
  opacity: 0;
  transform: translateX(-100%);
  transition:
    opacity 1.5s,
    transform 1.5s;
}

.faq-content-col.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.section-tag {
  font-size: 0.9rem;
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-heading);
  margin-bottom: 40px;
  line-height: 1.2;
}

/* === Accordion Styling === */
.accordion-item {
  margin-bottom: 18px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.accordion-item:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  color: var(--dark-heading);
  font-size: 1.05rem;
}

.accordion-header .icon {
  margin-left: auto;
  color: var(--primary-blue);
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.accordion-item.active {
  border-color: var(--primary-blue);
}

.accordion-item.active .icon {
  transform: rotate(45deg);
}

.accordion-body {
  padding: 0 25px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
  color: var(--body-text);
  font-size: 0.95rem;
  border-top: 1px solid #f1f1f1;
}

.accordion-body-text {
  padding-top: 20px;
  padding-bottom: 25px;
}

/* === Image Column === */
.faq-image-col {
  flex: 1;
  max-width: 45%;
  text-align: center;
  padding: 20px;
  opacity: 0;
  transform: translateX(100%);
  transition:
    opacity 1.5s,
    transform 1.5s;
}

.faq-image-col.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.illustration-placeholder {
  width: 100%;
  max-width: 500px;
  height: 400px;
  background: url("./src/faqs-removebg-preview.png") no-repeat center center /
    contain;
  margin: 0 auto;
  display: block;
}

/* === Responsive === */
@media (max-width: 992px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }
  .faq-content-col,
  .faq-image-col {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
  .section-title {
    font-size: 2rem;
  }
  .illustration-placeholder {
    height: 300px;
    background-image: url("./src/faqs-removebg-preview.png");
  }
}

/* SIGNUP MODAL================================ */

/* ======================================================
   FORM & MODAL STYLES (REQUIRED FOR SIGNUP MODAL)
   ====================================================== */

/* Form Container Styling (Content inside the modal) */
.form-container {
  background-color: white;
  padding: 30px 20px 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
  box-sizing: border-box;
}

/* Heading */
.form-container h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

/* Input Fields */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #fff;
}

/* Password field wrapper */
.password-wrapper {
  position: relative;
}
.password-wrapper input {
  padding-right: 40px;
}
.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #777;
  font-size: 18px;
}

/* Error Text */
#passError {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}

/* Dropdown Styling */
select {
  cursor: pointer;
  background-color: #f9f9f9;
}

/* Consent */
.consent-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
}
.consent-box input {
  margin-right: 10px;
}

/* Main Signup Button */
.signup-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
}
.signup-button:hover {
  background-color: #0056b3;
}

/* Login Prompt and Link */
.login-prompt {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}
.login-link:hover {
  text-decoration: underline;
}

/* OR separator */
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  margin: 20px 0;
}
.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eee;
}
.separator:not(:empty)::before {
  margin-right: 0.5em;
}
.separator:not(:empty)::after {
  margin-left: 0.5em;
}

/* ======================================================
   MODAL OVERLAY STYLES (FOR BLUR EFFECT)
   ====================================================== */

.custom-modal {
  display: none; /* Hidden by default */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  /* The key to the blurred background effect */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);

  /* Center the modal content using flex */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Content/Box */
.custom-modal .modal-content {
  background-color: transparent;
  padding: 0;
  width: 90%;
  max-width: 550px;
  position: relative;
  margin: 0;
}

/* Close Button (X icon) */
.close-btn {
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: -45px;
  z-index: 1001;
  cursor: pointer;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}
.close-btn:hover,
.close-btn:focus {
  color: #ccc;
}
```

### src/main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Import CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "./styles/main.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

### src/pages/About.jsx

```jsx
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pic1Img from "../assets/pic1.jpg";
import pic2Img from "../assets/about-background (2).png";
import faqsImg from "../assets/faqs-removebg-preview.png";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const About = ({ onLoginClick, onSignupClick }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Update accordion body heights when activeIndex changes
  useEffect(() => {
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      const element = contentRefs.current[activeIndex];
      // Force a reflow to ensure scrollHeight is calculated
      element.style.maxHeight = `${element.scrollHeight}px`;
    }
  }, [activeIndex]);

  useEffect(() => {
    // 1. Reveal elements (general)
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const visiblePoint = window.innerHeight * 0.85;
        if (top < visiblePoint) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 2. Left-right reveal
    const revealItems = document.querySelectorAll(
      ".reveal-left, .reveal-right",
    );
    const revealScroll = () => {
      revealItems.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.85) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", revealScroll);
    revealScroll();

    // 3. ABOUT Page Animation (Specific targeting like in HTML)
    const aboutImg = document.querySelector(".about-image-col");
    const aboutText = document.querySelector(".about-text-col");
    const animateAbout = () => {
      const trigger = window.innerHeight * 0.85;
      if (aboutImg && aboutImg.getBoundingClientRect().top < trigger) {
        aboutImg.style.transform = "translateX(0)";
        aboutImg.style.opacity = "1";
      }
      if (aboutText && aboutText.getBoundingClientRect().top < trigger) {
        aboutText.style.transform = "translateX(0)";
        aboutText.style.opacity = "1";
      }
    };
    window.addEventListener("scroll", animateAbout);
    animateAbout();

    // 4. Services heading animation (UPDATED: Removed .features-section prefix to match HTML behavior)
    const servicesHeadings = document.querySelectorAll(
      ".section-tag, .section-title, .section-description",
    );
    const animateServiceHeading = () => {
      servicesHeadings.forEach((h) => {
        if (h.getBoundingClientRect().top < window.innerHeight * 0.85)
          h.classList.add("active");
      });
    };
    window.addEventListener("scroll", animateServiceHeading);
    animateServiceHeading();

    // 5. Services Cards stagger
    const serviceCards = document.querySelectorAll(".service-box"); // Changed from .feature-card to .service-box to match JSX class
    const animateCards = () => {
      let delay = 0;
      serviceCards.forEach((card) => {
        if (
          card.getBoundingClientRect().top < window.innerHeight * 0.9 &&
          !card.classList.contains("show")
        ) {
          setTimeout(() => card.classList.add("show"), delay);
          delay += 200;
        }
      });
    };
    window.addEventListener("scroll", animateCards);
    animateCards();

    // 6. FAQ Intersection Observer
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      const contentCol = faqSection.querySelector(".faq-content-col");
      const imageCol = faqSection.querySelector(".faq-image-col");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              contentCol?.classList.add("animate-in");
              imageCol?.classList.add("animate-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      observer.observe(faqSection);
    }

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", revealScroll);
      window.removeEventListener("scroll", animateAbout);
      window.removeEventListener("scroll", animateServiceHeading);
      window.removeEventListener("scroll", animateCards);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${brainheaderImg})` }}
      >
        <div className="neural-bg"></div>
        <div className="banner-overlay"></div>
        <div className="contact-container banner-content">
          <h1 className="banner-title">About Us</h1>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-us-container">
        <div className="about-wrapper">
          <div className="about-image-col reveal-left">
            <div className="image-stack">
              <div className="img-main-placeholder">
                <img src={pic2Img} alt="" />
              </div>
              <div className="img-offset-placeholder">
                <img src={pic1Img} alt="" />
              </div>
            </div>
          </div>

          <div className="about-text-col reveal-right">
            <h2 className="about-title">
              Why You Should Trust Us? Get to Know MindKey
            </h2>

            <p className="about-paragraph">
              MindKey is an assistive AI system designed to empower individuals
              with paralysis and severe motor disabilities. By transforming
              brain-signal patterns into digital commands, we create a
              communication bridge that restores independence, dignity, and
              human connection.
            </p>

            <p className="about-paragraph">
              Our research-driven approach integrates neural signal processing,
              adaptive machine learning, and an intuitive virtual keyboard
              interface. With a focus on safety, accuracy, and accessibility,
              MindKey is built not just as a tool but as a companion for daily
              expression and communication.
            </p>

            <ul className="trust-points">
              <li>
                <i className="fa fa-check-circle"></i> Non-invasive, safe neural
                interaction
              </li>
              <li>
                <i className="fa fa-check-circle"></i> Research-backed EEG
                processing pipeline
              </li>
              <li>
                <i className="fa fa-check-circle"></i> Adaptive AI tailored for
                each user
              </li>
            </ul>

            <a href="#features-section" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="features-section" id="features-section">
        <div className="container">
          <span className="section-tag">Our Services</span>
          <h2 className="section-title">
            We Provide Support Beyond Limitations
          </h2>
          <p className="section-description">
            MindKey is designed to help individuals with paralysis or severe
            motor disabilities communicate independently using AI-powered neural
            interaction. Our focus is dignity, accessibility, and ease of use.
          </p>

          <div className="features-grid">
            {[
              {
                icon: "fa-handshake-o",
                title: "Reliable Assistive Solution",
                desc: "Engineered using validated datasets and signal-processing standards, MindKey offers dependable, real-time communication support for individuals with movement limitations.",
              },
              {
                icon: "fa-money",
                title: "Accessible & Affordable",
                desc: "MindKey provides a cost-effective alternative to invasive or high-end neuroprosthetic systems, making assistive AI communication tools available to wider communities.",
              },
              {
                icon: "fa-bullseye",
                title: "Adaptive AI Interface",
                desc: "Our machine learning engine continuously learns from user-specific EEG patterns, offering personalized typing speed, prediction, and accuracy improvements over time.",
              },
              {
                icon: "fa-headphones",
                title: "Caregiver & Family Assistance",
                desc: "MindKey supports caregivers by reducing communication barriers, improving emotional connection, and enabling smoother daily interactions with the user.",
              },
            ].map((service, index) => (
              <div key={index} className="service-box reveal">
                <div className="feature-icon">
                  <i className={`fa ${service.icon}`}></i>
                </div>
                <h3 className="feature-title">{service.title}</h3>
                <p className="feature-description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="faq-section" id="faq-section">
        <div className="neural-bg"></div>
        <div className="faq-container">
          <div className="faq-content-col">
            <span className="section-tag"></span>
            <h2 className="section-title">Common Frequently Asked Questions</h2>

            <div className="accordion">
              {[
                {
                  question: "What is MindKey?",
                  answer:
                    "MindKey is an AI-powered assistive communication system that converts EEG signals into digital text, designed for individuals with paralysis or severe motor impairments.",
                },
                {
                  question: "Does the system require a real EEG device?",
                  answer:
                    "No. MindKey currently uses high-quality EEG datasets for model training and simulation. Physical EEG device integration may be implemented in future expansions.",
                },
                {
                  question: "How accurate is the AI model?",
                  answer:
                    "MindKey uses feature extraction, preprocessing, and adaptive machine learning techniques to enhance typing accuracy over time based on user-specific signals.",
                },
                {
                  question: "Is MindKey medically approved?",
                  answer:
                    "MindKey is currently a research-stage system and is not intended for medical diagnosis, treatment, or clinical decision-making.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                  data-id={index + 1}
                >
                  <div
                    className="accordion-header"
                    onClick={(e) => toggleAccordion(index, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleAccordion(index, e);
                      }
                    }}
                  >
                    <span>{faq.question}</span>
                    <i className="icon fa-solid fa-plus"></i>
                  </div>
                  <div
                    className="accordion-body"
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    style={{
                      maxHeight:
                        activeIndex === index
                          ? contentRefs.current[index]?.scrollHeight
                            ? `${contentRefs.current[index].scrollHeight}px`
                            : "auto"
                          : "0px",
                    }}
                  >
                    <p className="accordion-body-text">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="faq-image-col">
            <div
              className="illustration-placeholder"
              role="img"
              aria-label="Illustration of people solving problems."
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                backgroundImage: `url(${faqsImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                margin: "0 auto",
                display: "block",
              }}
            ></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
```

### src/pages/Contact.jsx

```jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const Contact = ({ onLoginClick, onSignupClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${brainheaderImg})` }}
      >
        <div className="neural-bg"></div>
        <div className="banner-overlay"></div>
        <div className="contact-container banner-content">
          <h1 className="banner-title">Contact Us</h1>
        </div>
      </section>

      <section className="info-cards-section contact-container">
        <div className="info-cards-wrapper">
          <div className="info-card">
            <i className="fa fa-map-marker"></i>
            <span className="card-text">Address</span>
            <span className="card-subtext">MindKey Rawalpindi, Pakistan</span>
          </div>

          <div className="info-card">
            <i className="fa fa-phone"></i>
            <span className="card-text">Call Us Now</span>
            <span className="card-subtext">+012 345 6789</span>
          </div>

          <div className="info-card">
            <i className="fa fa-envelope"></i>
            <span className="card-text">Mail Us Now</span>
            <span className="card-subtext"> support@mindkey.ai</span>
          </div>
        </div>
      </section>

      <section className="form-map-section contact-container">
        <div className="form-map-wrapper">
          <div className="contact-form-col">
            <h2 className="form-title">Have Any Query? Please Contact Us!</h2>
            <p className="small text-muted form-description">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax & PHP in a few minutes. Just copy
              and paste the files, add a little code and you're done.
            </p>

            <form>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="map-col">
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106637.3005898869!2d72.95543669145943!3d33.58550186938923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9480b065ccdf%3A0xc48644534a70650d!2sRawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709230537443!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
```

### src/pages/Dashboard.jsx

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./Upload";
import PerformanceReport from "./PerformanceReport";
import { api } from "../services/api";
import "../styles/main.css";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [outputContent, setOutputContent] = useState("");
  const [isABCKeyboard, setIsABCKeyboard] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [brainSignalActive, setBrainSignalActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const signalTimeoutRef = useRef(null);

  // Keyboard selector state — default to center of keyboard (row 1 = middle row, col 4 = "P")
  const [selectorRow, setSelectorRow] = useState(1);
  const [selectorCol, setSelectorCol] = useState(4);
  const [activeArea, setActiveArea] = useState("keyboard"); // 'keyboard' or 'suggestions'
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const wsRef = useRef(null);

  // Refs that mirror state — used inside WebSocket callbacks to avoid stale closures
  const selectorRowRef = useRef(1);
  const selectorColRef = useRef(4);
  const activeAreaRef = useRef("keyboard");
  const suggestionIndexRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => {
    selectorRowRef.current = selectorRow;
  }, [selectorRow]);
  useEffect(() => {
    selectorColRef.current = selectorCol;
  }, [selectorCol]);
  useEffect(() => {
    activeAreaRef.current = activeArea;
  }, [activeArea]);
  useEffect(() => {
    suggestionIndexRef.current = suggestionIndex;
  }, [suggestionIndex]);

  // Streaming state
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamInfo, setStreamInfo] = useState({
    trialNumber: 0,
    totalTrials: 0,
    className: "",
    confidence: 0,
    action: "",
  });

  // Session and backend state
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [user, setUser] = useState(null);

  const initialText = "Say what's on your mind — we'll turn it into words.";

  // Simple dictionary for intellisense
  const commonWords = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "hello",
    "help",
    "yes",
    "no",
    "thanks",
    "please",
    "good",
    "bad",
    "pain",
    "water",
  ];

  const activateSignal = () => {
    if (signalTimeoutRef.current) {
      clearTimeout(signalTimeoutRef.current);
    }
    setBrainSignalActive(true);
    signalTimeoutRef.current = setTimeout(() => {
      setBrainSignalActive(false);
    }, 5000);
  };

  const updateSuggestions = (text) => {
    if (!text || text === initialText) {
      setSuggestions(["hello", "help", "yes", "no", "thanks"]);
      return;
    }
    const lastWord = text.split(" ").pop().toLowerCase();
    if (!lastWord) {
      setSuggestions(["the", "I", "it", "this", "what"]);
      return;
    }
    const matches = commonWords
      .filter((word) => word.startsWith(lastWord) && word !== lastWord)
      .slice(0, 5);
    setSuggestions(
      matches.length > 0 ? matches : ["the", "and", "is", "it", "to"],
    );
  };

  const handleKeyClick = (key) => {
    activateSignal();

    setOutputContent((prev) => {
      let newContent = prev === initialText ? "" : prev;

      if (key === "DEL") {
        newContent = newContent.slice(0, -1);
      } else if (key === "CLEAR") {
        newContent = "";
      } else if (key === "SPACE") {
        newContent = newContent + " ";
      } else if (key === "QUICK_SPEAK") {
        // Handled below via useEffect to avoid breaking state updater
        return newContent;
      } else {
        newContent = newContent + key;
      }

      updateSuggestions(newContent);

      // Update session stats
      if (currentSessionId) {
        const words = newContent.split(" ").filter((w) => w.length > 0);
        api
          .updateSession(currentSessionId, {
            words_typed: words.length,
            characters: newContent.length,
          })
          .catch(console.error);
      }

      return newContent;
    });

    if (key === "QUICK_SPEAK") {
      setShowModal(true);
    }
  };

  const handlePhraseClick = (phrase) => {
    if (phrase !== "Close.") {
      activateSignal();
      setOutputContent((prev) => {
        const current = prev === initialText ? "" : prev;
        const newContent =
          current.length > 0 && current[current.length - 1] !== " "
            ? current + " "
            : current;
        return newContent + phrase;
      });
    }
    setShowModal(false);
  };

  const handleSuggestionClick = (word) => {
    activateSignal();
    setOutputContent((prev) => {
      const current = prev === initialText ? "" : prev;
      const words = current.split(" ");
      words.pop(); // Remove partial word
      const newContent =
        words.join(" ") + (words.length > 0 ? " " : "") + word + " ";
      return newContent;
    });
    updateSuggestions(""); // Reset suggestions or predict next word
  };

  const quickSpeakPhrases = [
    "Yes",
    "No",
    "I need help.",
    "I am okay today.",
    "How are you?",
    "Thank you.",
    "Please adjust my position.",
    "I feel pain.",
    "Close.",
  ];

  const abcKeys = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    ["L", "M", "N", "O", "P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y", "Z"],
  ];

  const numKeys = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
    ["9", "0", ".", ","],
  ];

  // Get current keyboard layout
  const getCurrentKeys = () => (isABCKeyboard ? abcKeys : numKeys);

  // Get current selected key
  const getSelectedKey = () => {
    const keys = getCurrentKeys();
    if (
      selectorRow >= 0 &&
      selectorRow < keys.length &&
      selectorCol >= 0 &&
      selectorCol < keys[selectorRow].length
    ) {
      return keys[selectorRow][selectorCol];
    }
    return null;
  };

  // Navigate selector based on prediction
  // Uses refs to always read the latest state values (avoids stale closure in WS callbacks)
  const navigateSelector = (action) => {
    const keys = getCurrentKeys();
    const currentArea = activeAreaRef.current;

    if (currentArea === "keyboard") {
      let newRow = selectorRowRef.current;
      let newCol = selectorColRef.current;

      switch (action) {
        case "move_left":
          if (newCol > 0) {
            newCol--;
          } else {
            // Wrap to rightmost key of current row
            newCol = keys[newRow].length - 1;
          }
          break;
        case "move_right":
          if (newRow < keys.length && newCol < keys[newRow].length - 1) {
            newCol++;
          } else {
            // Wrap to leftmost key of current row
            newCol = 0;
          }
          break;
        case "move_down":
          if (newRow < keys.length - 1) {
            newRow++;
            // Adjust column if new row is shorter
            if (newCol >= keys[newRow].length) {
              newCol = keys[newRow].length - 1;
            }
          } else {
            // Wrap from bottom row back to top row
            newRow = 0;
            if (newCol >= keys[newRow].length) {
              newCol = keys[newRow].length - 1;
            }
          }
          break;
        case "select_letter":
          if (
            newRow >= 0 &&
            newRow < keys.length &&
            newCol >= 0 &&
            newCol < keys[newRow].length
          ) {
            const keyToSelect = keys[newRow][newCol];
            handleKeyClick(keyToSelect);
          }
          break;
        default:
          break;
      }
      setSelectorRow(newRow);
      setSelectorCol(newCol);
      selectorRowRef.current = newRow;
      selectorColRef.current = newCol;
    } else if (currentArea === "suggestions") {
      let newIdx = suggestionIndexRef.current;

      switch (action) {
        case "move_left":
          if (newIdx > 0) {
            newIdx--;
          } else {
            // Wrap to last suggestion
            newIdx = suggestions.length - 1;
          }
          break;
        case "move_right":
          if (newIdx < suggestions.length - 1) {
            newIdx++;
          } else {
            // Wrap to first suggestion
            newIdx = 0;
          }
          break;
        case "move_down":
          // Moving down from suggestions goes back to keyboard top row
          setActiveArea("keyboard");
          activeAreaRef.current = "keyboard";
          setSelectorRow(1);
          selectorRowRef.current = 1;
          setSelectorCol(4);
          selectorColRef.current = 4;
          return;
        case "select_letter":
          if (suggestions[newIdx]) handleSuggestionClick(suggestions[newIdx]);
          break;
        default:
          break;
      }
      setSuggestionIndex(newIdx);
      suggestionIndexRef.current = newIdx;
    }
  };

  // Generate simulated EEG data for testing (22 channels, 1001 time points)
  const generateSimulatedEEG = () => {
    const channels = 22;
    const timePoints = 1001;
    const eegData = [];

    for (let i = 0; i < channels; i++) {
      const channel = [];
      for (let j = 0; j < timePoints; j++) {
        // Generate realistic EEG-like signal (sine waves with noise)
        const signal = Math.sin(j * 0.1) * 0.5 + Math.random() * 0.3 - 0.15;
        channel.push(signal);
      }
      eegData.push(channel);
    }

    return eegData;
  };

  // Handle prediction from backend
  const handlePrediction = async (eegData) => {
    if (!currentSessionId) {
      console.warn("No active session. Starting session...");
      await startSession();
      if (!currentSessionId) {
        alert("Failed to start session. Please try again.");
        return;
      }
    }

    try {
      const prediction = await api.predictSignal(eegData, currentSessionId);
      navigateSelector(prediction.action);

      // Visual feedback
      activateSignal();
    } catch (error) {
      console.error("Prediction error:", error);
      alert(`Prediction failed: ${error.message}`);
    }
  };

  // Stop the prediction stream
  const stopStream = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsStreaming(false);
  };

  // Start real-time prediction stream from an uploaded dataset
  const startBrainStream = async () => {
    // Don't start if already streaming
    if (isStreaming) {
      stopStream();
      return;
    }

    let sessionId = currentSessionId;

    if (!sessionId) {
      console.warn("No active session. Starting session...");
      try {
        const session = await api.createSession();
        setCurrentSessionId(session.session_id);
        setIsRecording(true);
        sessionId = session.session_id;
      } catch (e) {
        console.error("Failed to start session:", e);
        alert("Failed to start session. Please try again.");
        return;
      }
    }

    // Check if we have an active uploaded dataset
    const datasetJson = localStorage.getItem("activeDataset");
    if (!datasetJson) {
      alert(
        "No dataset selected. Please upload a .mat file first from the Upload Dataset panel.",
      );
      return;
    }

    try {
      const dataset = JSON.parse(datasetJson);
      // Disconnect existing WebSocket if any
      if (wsRef.current) wsRef.current.close();

      // Reset selector position to center of keyboard ("P")
      setSelectorRow(1);
      setSelectorCol(4);
      setActiveArea("keyboard");

      wsRef.current = api.connectPredictionStream(
        sessionId,
        dataset.patientId,
        dataset.filename,
        {
          onStreamStart: (data) => {
            setIsStreaming(true);
            setStreamInfo((prev) => ({
              ...prev,
              totalTrials: data.total_trials,
              trialNumber: 0,
            }));
          },
          onPrediction: (data) => {
            // Update the stream info panel
            setStreamInfo({
              trialNumber: data.trial_number,
              totalTrials: data.total_trials,
              className: data.class_name,
              confidence: data.confidence,
              action: data.action,
            });
            // Navigate the keyboard cursor
            navigateSelector(data.action);
            activateSignal();
          },
          onComplete: (data) => {
            setIsStreaming(false);
            setStreamInfo((prev) => ({
              ...prev,
              trialNumber: prev.totalTrials,
            }));
            alert(
              `✅ Prediction complete! Processed ${data.total_trials} trials.`,
            );
          },
          onError: (err) => {
            console.error("Stream error:", err);
            setIsStreaming(false);
            alert(`Stream error: ${err.message}`);
          },
          onClose: () => {
            console.log("Stream closed");
            // Only reset streaming state if it wasn't already reset by onComplete
            setIsStreaming(false);
          },
        },
      );
    } catch (e) {
      console.error("Error starting prediction stream:", e);
      alert(`Failed to start predictions: ${e.message}`);
    }
  };

  const testPrediction = async () => {
    const eegData = generateSimulatedEEG();
    await handlePrediction(eegData);
  };

  // Start new session
  const startSession = async () => {
    try {
      const session = await api.createSession();
      setCurrentSessionId(session.session_id);
      setIsRecording(true);
      setSelectorRow(1);
      setSelectorCol(4);
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  // End current session
  const endSession = async () => {
    if (!currentSessionId) return;

    try {
      // Update session stats
      const words = outputContent.split(" ").filter((w) => w.length > 0);
      await api.updateSession(currentSessionId, {
        words_typed: words.length,
        characters: outputContent.length,
        quick_phrases: 0, // Track this separately
        suggestions_used: 0, // Track this separately
      });

      await api.endSession(currentSessionId);
      setCurrentSessionId(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  };

  // Initialize session and user on mount
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Get current user
        const userData = await api.getCurrentUser();
        setUser(userData);

        // Start a new session
        await startSession();
      } catch (error) {
        console.error("Initialization error:", error);
        // Only redirect if it's an authentication error
        if (
          error.message === "Not authenticated" ||
          error.message.includes("401") ||
          error.message.includes("Invalid authentication") ||
          error.message.includes("Unauthorized")
        ) {
          console.log("Authentication failed, redirecting to home");
          navigate("/");
        } else {
          // For other errors, just log them but don't redirect
          console.error("Non-auth error during initialization:", error);
        }
      }
    };

    document.body.style.overflow = "hidden";
    updateSuggestions("");
    initializeDashboard();

    return () => {
      document.body.style.overflow = "auto";
      if (signalTimeoutRef.current) {
        clearTimeout(signalTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup session on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (currentSessionId) {
        endSession().catch(console.error);
      }
    };
  }, [currentSessionId]);

  // Update session stats when content changes
  useEffect(() => {
    if (currentSessionId && outputContent && outputContent !== initialText) {
      const words = outputContent.split(" ").filter((w) => w.length > 0);
      const lastWord = words[words.length - 1];

      // Add word to history when space is added
      if (lastWord && outputContent.endsWith(" ")) {
        api.addWordToHistory(currentSessionId, lastWord).catch(console.error);
      }
    }
  }, [outputContent, currentSessionId]);

  return (
    <>
      <div className="chat-app">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span className="chatgpt-logo">MINDKEY</span>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div className="new-chat">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setShowPerformanceModal(false);
              }}
              className={`sidebar-action-btn ${!showUploadModal && !showPerformanceModal ? "active" : ""}`}
            >
              Keyboard Interface
            </button>
          </div>

          <nav className="nav-links">
            <button
              onClick={() => {
                setShowUploadModal(true);
                setShowPerformanceModal(false);
              }}
              className={`sidebar-action-btn ${showUploadModal ? "active" : ""}`}
            >
              Upload Dataset
            </button>
            <button
              onClick={() => {
                setShowPerformanceModal(true);
                setShowUploadModal(false);
              }}
              className={`sidebar-action-btn ${showPerformanceModal ? "active" : ""}`}
            >
              Performance Reports
            </button>
          </nav>

          <div className="chat-history-section"></div>

          <div className="sidebar-footer">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="sidebar-logout-btn"
            >
              Logout
            </button>
            <div
              className="user-info"
              onClick={() => setShowSettingsModal(true)}
            >
              <span className="user-icon">
                {user?.full_name?.charAt(0) || "U"}
              </span>
              <span className="username">{user?.full_name || "User"}</span>
              <i
                className="fas fa-cog ms-auto text-muted"
                style={{ fontSize: "0.8rem" }}
              ></i>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {showPerformanceModal ? (
            <PerformanceReport />
          ) : showUploadModal ? (
            <Upload onUploadComplete={() => setShowUploadModal(false)} />
          ) : (
            <div className="modern-keyboard-wrapper">
              {/* Header */}
              <div className="keyboard-header">
                <h1 className="keyboard-title">
                  ASSISTIVE COMMUNICATION SYSTEM
                </h1>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "10px",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  <button
                    onClick={startBrainStream}
                    className={`btn ${isStreaming ? "btn-danger" : "btn-primary"}`}
                    style={{
                      padding: "7px 18px",
                      fontSize: "0.8rem",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    title={
                      isStreaming
                        ? "Stop predictions"
                        : "Start predictions from dataset"
                    }
                  >
                    <i
                      className={`fas ${isStreaming ? "fa-stop" : "fa-brain"}`}
                    ></i>
                    {isStreaming ? "Stop" : "Start Predictions"}
                  </button>
                  {currentSessionId && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: isStreaming ? "#f59e0b" : "#10b981",
                          display: "inline-block",
                          animation: isStreaming ? "pulse 1s infinite" : "none",
                        }}
                      ></span>
                      {isStreaming ? "Streaming" : "Session Active"}
                    </span>
                  )}

                  {/* Live Streaming Status — inline beside the button */}
                  {isStreaming && streamInfo.totalTrials > 0 && (
                    <div
                      style={{
                        padding: "6px 16px",
                        background: "rgba(59, 130, 246, 0.08)",
                        borderRadius: "20px",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        flexShrink: 1,
                        minWidth: 0,
                      }}
                    >
                      {/* Trial Counter */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.3px",
                          }}
                        >
                          Trial
                        </span>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {streamInfo.trialNumber}/{streamInfo.totalTrials}
                        </span>
                      </div>

                      {/* Mini Progress Bar */}
                      <div style={{ width: "80px", flexShrink: 0 }}>
                        <div
                          style={{
                            width: "100%",
                            height: "5px",
                            background: "#e2e8f0",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${(streamInfo.trialNumber / streamInfo.totalTrials) * 100}%`,
                              height: "100%",
                              background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                              borderRadius: "3px",
                              transition: "width 0.3s ease",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Current Prediction */}
                      {streamInfo.className && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#1e293b",
                            }}
                          >
                            {streamInfo.className}
                          </span>
                          <span
                            style={{ fontSize: "0.7rem", color: "#64748b" }}
                          >
                            {(streamInfo.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}

                      {/* Action indicator */}
                      {streamInfo.action && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color:
                              streamInfo.action === "select_letter"
                                ? "#10b981"
                                : "#3b82f6",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {streamInfo.action === "move_left"
                            ? "⬅"
                            : streamInfo.action === "move_right"
                              ? "➡"
                              : streamInfo.action === "move_down"
                                ? "⬇"
                                : streamInfo.action === "select_letter"
                                  ? "✓"
                                  : ""}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="keyboard-layout-grid">
                {/* Left Panel - Input Mode & Quick Speak */}
                <div className="left-panel">
                  {/* Input Mode Selection */}
                  <div className="mode-section">
                    <h3 className="section-label">INPUT MODE</h3>
                    <div className="mode-buttons">
                      <button
                        className={`mode-btn ${isABCKeyboard ? "active" : ""}`}
                        onClick={() => setIsABCKeyboard(true)}
                      >
                        ABC
                      </button>
                      <button
                        className={`mode-btn ${!isABCKeyboard ? "active" : ""}`}
                        onClick={() => setIsABCKeyboard(false)}
                      >
                        123
                      </button>
                    </div>
                  </div>

                  {/* Quick Speak Section */}
                  <div className="quick-speak-section">
                    <h3 className="section-label">
                      <i className="fas fa-comment"></i> QUICK SPEAK
                    </h3>
                    <div className="quick-speak-list">
                      {quickSpeakPhrases
                        .filter((p) => p !== "Close.")
                        .map((phrase, index) => (
                          <button
                            key={index}
                            className="quick-speak-btn"
                            onClick={() => handlePhraseClick(phrase)}
                          >
                            <span>{phrase}</span>
                            <i className="fas fa-volume-up"></i>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel - Display & Keyboard */}
                <div className="right-panel">
                  {/* Display Section */}
                  <div className="display-section">
                    <div className="display-header">
                      <h3 className="section-label">DISPLAY</h3>
                      <button
                        className="speak-btn"
                        onClick={() => {
                          if (
                            "speechSynthesis" in window &&
                            outputContent &&
                            outputContent !== initialText
                          ) {
                            const utterance = new SpeechSynthesisUtterance(
                              outputContent,
                            );
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                      >
                        <i className="fas fa-volume-up"></i> Speak
                      </button>
                    </div>
                    <div className="display-box">
                      {outputContent || initialText}
                    </div>
                  </div>

                  {/* Suggestions Section */}
                  <div className="suggestions-section-new">
                    <h3 className="section-label">SUGGESTIONS</h3>
                    <div className="suggestions-row">
                      {suggestions.map((word, index) => (
                        <button
                          key={index}
                          className={`suggestion-chip ${activeArea === "suggestions" && suggestionIndex === index ? "selected" : ""}`}
                          style={{
                            border:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "2px solid var(--primary)"
                                : "none",
                            transform:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "scale(1.05)"
                                : "scale(1)",
                            transition: "all 0.2s ease",
                            background:
                              activeArea === "suggestions" &&
                              suggestionIndex === index
                                ? "rgba(59, 130, 246, 0.1)"
                                : "#f1f5f9",
                          }}
                          onClick={() => handleSuggestionClick(word)}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard Section */}
                  <div className="keyboard-section">
                    {isABCKeyboard ? (
                      <div className="abc-keyboard">
                        {/* Row 1: A to K */}
                        <div className="key-row">
                          {abcKeys[0].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 0 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(0);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Row 2: L to T */}
                        <div className="key-row row-offset-1">
                          {abcKeys[1].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 1 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(1);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Row 3: U to Z */}
                        <div className="key-row row-offset-2">
                          {abcKeys[2].map((key, colIndex) => (
                            <button
                              key={key}
                              className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === 2 && selectorCol === colIndex ? "selected" : ""}`}
                              onClick={() => {
                                setActiveArea("keyboard");
                                setSelectorRow(2);
                                setSelectorCol(colIndex);
                                handleKeyClick(key);
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        {/* Control Row */}
                        <div className="control-row">
                          <button
                            className="control-btn space-btn"
                            onClick={() => handleKeyClick("SPACE")}
                          >
                            <i className="fas fa-arrow-left"></i> Space
                          </button>
                          <button
                            className="control-btn comma-btn"
                            onClick={() => handleKeyClick(",")}
                          >
                            ,
                          </button>
                          <button
                            className="control-btn period-btn"
                            onClick={() => handleKeyClick(".")}
                          >
                            .
                          </button>
                          <button
                            className="control-btn delete-btn"
                            onClick={() => handleKeyClick("DEL")}
                          >
                            <i className="fas fa-backspace"></i>
                          </button>
                          <button
                            className="control-btn clear-btn"
                            onClick={() => handleKeyClick("CLEAR")}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="num-keyboard">
                        {numKeys.map((row, rowIndex) => (
                          <div key={rowIndex} className="key-row">
                            {row.map((key, colIndex) => (
                              <button
                                key={key}
                                className={`key-btn-modern ${activeArea === "keyboard" && selectorRow === rowIndex && selectorCol === colIndex ? "selected" : ""}`}
                                onClick={() => {
                                  setActiveArea("keyboard");
                                  setSelectorRow(rowIndex);
                                  setSelectorCol(colIndex);
                                  handleKeyClick(key);
                                }}
                              >
                                {key}
                              </button>
                            ))}
                          </div>
                        ))}

                        {/* Control Row */}
                        <div className="control-row">
                          <button
                            className="control-btn space-btn"
                            onClick={() => handleKeyClick("SPACE")}
                          >
                            <i className="fas fa-arrow-left"></i> Space
                          </button>
                          <button
                            className="control-btn comma-btn"
                            onClick={() => handleKeyClick(",")}
                          >
                            ,
                          </button>
                          <button
                            className="control-btn period-btn"
                            onClick={() => handleKeyClick(".")}
                          >
                            .
                          </button>
                          <button
                            className="control-btn delete-btn"
                            onClick={() => handleKeyClick("DEL")}
                          >
                            <i className="fas fa-backspace"></i>
                          </button>
                          <button
                            className="control-btn clear-btn"
                            onClick={() => handleKeyClick("CLEAR")}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quick Speak Modal */}
      {showModal && (
        <div
          id="quickSpeakModal"
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowModal(false);
            }
          }}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3 className="modal-title">Quick Speak Phrases</h3>
            <div className="modal-phrases">
              {quickSpeakPhrases.map((phrase, index) => (
                <button
                  key={index}
                  className="phrase-btn"
                  onClick={() => handlePhraseClick(phrase)}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowLogoutModal(false);
            }
          }}
        >
          <div className="modal-content" style={{ maxWidth: "400px" }}>
            <span
              className="close-btn"
              onClick={() => setShowLogoutModal(false)}
            >
              &times;
            </span>
            <h3 className="modal-title mb-4 text-center">
              <i className="fas fa-exclamation-triangle text-warning me-2"></i>
              Confirm Logout
            </h3>
            <p className="text-center mb-4">Are you sure you want to logout?</p>
            <div className="d-flex gap-3">
              <button
                className="btn btn-secondary flex-fill"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger flex-fill"
                onClick={async () => {
                  setShowLogoutModal(false);
                  if (currentSessionId) {
                    await endSession();
                  }
                  api.logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div
          className="keyboard-modal show"
          onClick={(e) => {
            if (e.target.className === "keyboard-modal show") {
              setShowSettingsModal(false);
            }
          }}
        >
          <div className="modal-content" style={{ maxWidth: "500px" }}>
            <span
              className="close-btn"
              onClick={() => setShowSettingsModal(false)}
            >
              &times;
            </span>
            <h3 className="modal-title mb-4">Accessibility Settings</h3>

            <div className="mb-4">
              <label className="form-label fw-bold">Gaze Sensitivity</label>
              <input type="range" className="form-range" min="0" max="100" />
              <div className="d-flex justify-content-between small text-muted">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Dwell Time (ms)</label>
              <input
                type="range"
                className="form-range"
                min="200"
                max="2000"
                step="100"
                defaultValue="500"
              />
              <div className="d-flex justify-content-between small text-muted">
                <span>200ms</span>
                <span>2000ms</span>
              </div>
            </div>

            <div className="mb-4 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="audioFeedback"
                defaultChecked
              />
              <label
                className="form-check-label fw-bold"
                htmlFor="audioFeedback"
              >
                Audio Feedback
              </label>
            </div>

            <div className="mb-4 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="highContrast"
              />
              <label
                className="form-check-label fw-bold"
                htmlFor="highContrast"
              >
                High Contrast Mode
              </label>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={() => setShowSettingsModal(false)}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
```

### src/pages/Demo.jsx

```jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import videoSrc from "../assets/Mind Reading Keyboard Prototype.mp4";
import brainheaderImg from "../assets/brainheader.jpg";
import "../styles/main.css";

const Demo = ({ onLoginClick, onSignupClick }) => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${brainheaderImg})` }}
      >
        <div className="neural-bg"></div>
        <div className="banner-overlay"></div>
        <div className="contact-container banner-content">
          <h1 className="banner-title">Demo</h1>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="text-center mb-4">Watch the MindKey Demo</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="shadow-lg rounded-3 overflow-hidden">
                <video controls className="w-100">
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-muted mt-3">
                Learn how MindKey can help you or your loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
```

### src/pages/Home.jsx

```jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import brainHeaderImg from "../assets/brain.png";
import wearEEGImg from "../assets/wearEEG.jpeg";
import signalProcessingImg from "../assets/signalprocessing.jpeg";
import conversionImg from "../assets/conversion.png";
import user1Img from "../assets/user1.jpg";
import user2Img from "../assets/user2.jpg";
import user3Img from "../assets/user3.png";
import user21Img from "../assets/user21.jpg";
import eegHeadsetImg from "../assets/eeg-headset.jpg";
import "../styles/main.css";

const Home = ({ onLoginClick, onSignupClick }) => {
  const [typedText, setTypedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const testimonialContainerRef = useRef(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const phrases = [
    "Think to Speak",
    "Neural Communication",
    "Assistive AI for Paralysis",
    "Restore Dignity",
  ];

  const testimonials = [
    {
      name: "Ayesha Khalid",
      title: "Patient",
      text: "For the first time after my injury, I told my daughter 'I love you' — by myself.",
      image: user1Img,
    },
    {
      name: "Saad Ahmed",
      title: "Caregiver",
      text: "The system felt private, secure and empowering — like my independence returned.",
      image: user2Img,
    },
    {
      name: "Dr. Sarah",
      title: "Clinical Therapist",
      text: "Real-time neural decoding enabled meaningful communication for our patient.",
      image: user3Img,
    },
    {
      name: "Dr. Maria",
      title: "Research Participant",
      text: "AI calibration helped me communicate more accurately and faster.",
      image: user21Img,
    },
    {
      name: "Hira Nadeem",
      title: "Participant",
      text: "Non-invasive EEG gave me freedom without discomfort.",
      image: user2Img,
    },
    {
      name: "Fatima Noor",
      title: "Caregiver",
      text: "The caregiver dashboard made monitoring effortless.",
      image: user1Img,
    },
  ];

  // Typed text animation
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-quart" });

    const typingInterval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isTyping) {
        if (currentCharIndex < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setCurrentCharIndex(0);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }, 900);
        }
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex, currentCharIndex, isTyping]);

  // Testimonial slider
  useEffect(() => {
    const updateDisplay = () => {
      if (
        testimonialContainerRef.current &&
        testimonialContainerRef.current.children.length > 0
      ) {
        const cardWidth =
          testimonialContainerRef.current.children[0].offsetWidth + 30;
        testimonialContainerRef.current.scrollTo({
          left: currentTestimonialIndex * cardWidth,
          behavior: "smooth",
        });
      }
    };

    updateDisplay();
    window.addEventListener("resize", updateDisplay);
    return () => window.removeEventListener("resize", updateDisplay);
  }, [currentTestimonialIndex]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev < testimonials.length - 3 ? prev + 1 : 0,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev > 0 ? prev - 1 : testimonials.length - 3,
    );
  };

  // Auto-play testimonials
  useEffect(() => {
    const autoPlay = setInterval(nextTestimonial, 6000);
    return () => clearInterval(autoPlay);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

      {/* HERO */}
      <header id="home" className="hero" role="banner" aria-label="Main banner">
        <div className="neural-bg" aria-hidden="true"></div>

        {/* HERO  <div className="floating-icon" style={{ left: '6%', top: '18%' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C8 2 6 5 6 8c0 3 2 6 6 8s6-5 6-8c0-3-2-6-6-6z" fill="#1A73E8" />
            <circle cx="12" cy="8" r="2.2" fill="#fff" />
          </svg>
        </div>
        <div className="floating-icon" style={{ left: '28%', top: '6%', width: '56px', height: '56px', borderRadius: '14px' }} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#fff" />
            <path d="M7 12h10" stroke="#1A73E8" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        */}

        <div className="container-lg" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div className="eyebrow">
                Non-invasive · Privacy-first · Medical-grade accessibility
              </div>
              <h1>
                Give Thought a{" "}
                <span style={{ color: "var(--primary)" }}>Voice.</span>
              </h1>
              <p className="lead">
                AI-powered brain-to-text system enabling paralyzed individuals
                to communicate naturally using neural signals.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link
                  className="btn btn-primary"
                  onClick={onLoginClick}
                  role="button"
                >
                  Try Demo
                </Link>
                <Link
                  className="btn btn-outline-primary d-inline-flex align-items-center"
                  to="../demo"
                  role="button"
                  aria-label="Watch overview"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="me-2"
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>{" "}
                  Watch Overview
                </Link>
              </div>

              <div className="mt-4">
                <span
                  className="typed"
                  id="typedPlaceholder"
                  aria-live="polite"
                >
                  {typedText}
                </span>
                <span className="typing-cursor" aria-hidden="true"></span>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex justify-content-center"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <img
                src={brainHeaderImg}
                alt="Brain neural network animation"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT / PROBLEM & STATS */}
      <section id="about" className="py-5 about-full">
        <div className="container-lg h-100 d-flex flex-column align-items-center">
          <h1
            className="fw-bold text-primary text-center mb-5"
            data-aos="fade-up"
          >
            Problem & Mission
          </h1>

          <div className="row g-5 align-items-center w-100">
            <div className="col-md-6" data-aos="fade-up">
              <div className="about-img-wrapper">
                <img
                  src={eegHeadsetImg}
                  alt="Patient and caregiver in clinical setting"
                  className="img-fluid rounded-3 shadow"
                />
              </div>
            </div>

            <div className="col-md-6" data-aos="fade-up" data-aos-delay="120">
              <h2 className="fw-bold mb-3 text-dark">
                When movement is lost, communication shouldn't be.
              </h2>

              <p className="text-muted fs-5">
                Millions of individuals with paralysis, ALS, spinal cord
                injuries, and neurological disorders struggle to express their
                thoughts.
                <strong>MindKey bridges the gap</strong> through breakthrough
                brain-signal-to-text intelligence restoring dignity,
                independence, and connection.
              </p>

              <div className="row gx-4 gy-4 mt-4 stats-row">
                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">75M+</div>
                    <div className="stat-label">
                      People need assistive communication
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">85%</div>
                    <div className="stat-label">
                      Face barriers to natural communication
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="stat-box">
                    <div className="stat-value">AI</div>
                    <div className="stat-label">Unlocks autonomy & hope</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="how-it-works-section position-relative"
        style={{ height: "80vh", overflow: "hidden", paddingTop: 0 }}
      >
        <div className="neural-bg" aria-hidden="true"></div>

        <div
          className="container-lg h-100 d-flex flex-column align-items-center justify-content-center position-relative"
          style={{ zIndex: 2 }}
        >
          <h1
            className="fw-bold text-primary text-center mb-4 mt-0"
            data-aos="fade-up"
          >
            How It Works
          </h1>

          <div className="row g-4 justify-content-center w-100 mt-2">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={wearEEGImg}
                  alt="Patient undergoing EEG test"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Wear EEG Band</h5>
                <p className="small text-muted">
                  {" "}
                  A non-invasive EEG headset captures the user’s real-time
                  brainwave activity.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={signalProcessingImg}
                  alt="Signal processing"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Signal Processing</h5>
                <p className="small text-muted">
                  EEG data is filtered and processed, extracting meaningful
                  neural features.
                </p>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card border-0 text-center rounded-4 how-card p-3">
                <img
                  src={conversionImg}
                  alt="AI conversion"
                  className="img-fluid rounded-4 mb-3"
                />
                <h5 className="mt-2">Mind-to-Text Conversion</h5>
                <p className="small text-muted">
                  {" "}
                  The AI model interprets neural intent and converts it into
                  text on the virtual keyboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section
        id="features"
        className="py-5"
        style={{ height: "80vh", display: "flex", alignItems: "center" }}
      >
        <div className="container-lg text-center">
          <h1 className="fw-bold text-primary mb-4" data-aos="fade-up">
            Core Features
          </h1>
          <p className="text-muted mb-5" data-aos="fade-up">
            Built for real use in clinics, homes, and research labs.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Real-time Neural Decoding",
                desc: "Fast, low-latency mapping of brain patterns to text candidates.",
              },
              {
                title: "Personal AI Calibration",
                desc: "AI adapts to each user’s neural patterns for higher accuracy.",
              },
              {
                title: "Privacy-by-Design",
                desc: "Encrypted EEG storage and role-based access control.",
              },
              {
                title: "Accessible Interface",
                desc: "Large keys, contrast-rich UI, and caregiver-friendly tools.",
              },
              {
                title: "Performance Monitoring",
                desc: "Reports on accuracy, progress, and model performance.",
              },
              {
                title: "AI-Powered Pipeline",
                desc: "End-to-end EEG preprocessing, feature extraction, and prediction.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="col-md-4"
                data-aos="fade-up"
                data-aos-delay={index * 30}
              >
                <div className="feature-card p-4 rounded-4 h-100">
                  <h5 className="mt-2 fw-semibold">{feature.title}</h5>
                  <p className="text-muted small">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section" id="testiContainer">
        <div className="container-lg text-center mb-5" data-aos="fade-up">
          <h1 className="fw-bold text-primary mb-3">Testimonials</h1>
          <p className="text-muted mb-4">
            Hear what our users and participants have to say about our system.
          </p>
        </div>
        <div className="slider-wrapper">
          <button
            className="slider-btn left-btn"
            id="prevTest"
            onClick={prevTestimonial}
          >
            &#10094;
          </button>

          <div
            className="testimonial-container"
            id="testimonial-container"
            ref={testimonialContainerRef}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="user-image-wrapper">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="user-image"
                  />
                </div>
                <p className="quote-text">{testimonial.text}</p>
                <div className="quote-icon">"</div>
                <h3 className="user-name">{testimonial.name}</h3>
                <p className="user-title">{testimonial.title}</p>
                <div
                  className="text-muted small mt-2"
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Clinical Study — anonymized
                </div>
              </div>
            ))}
          </div>

          <button
            className="slider-btn right-btn"
            id="nextTest"
            onClick={nextTestimonial}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container-lg">
          <div className="big-cta text-center p-4 rounded-3">
            <h3 style={{ marginBottom: ".4rem" }}>
              Ready to empower someone's voice?
            </h3>
            <p className="text-white small mb-3">
              Start exploring our brain-to-text communication platform.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                className="btn btn-outline-primary d-inline-flex align-items-center"
                to="/demo"
                role="button"
                style={{ borderColor: "white", color: "white" }}
              >
                Explore Demo
              </Link>
              <button
                className="btn btn-outline-primary d-inline-flex align-items-center"
                onClick={onLoginClick}
                style={{ borderColor: "white", color: "rgb(255, 255, 255)" }}
              >
                Request Medical Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
```

### src/pages/PerformanceReport.jsx

```jsx
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { api } from "../services/api";
import "../styles/main.css";

const PerformanceReport = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        const data = await api.getAllPerformance();

        // Transform data to match component structure
        const transformedSessions = data.map((session, index) => {
          const metrics = session.metrics || {
            accuracy: 0,
            recall: 0,
            precision: 0,
            f1_score: 0,
          };

          return {
            id: session.id || `session-${index + 1}`,
            sessionNumber: String(session.session_number || index + 1).padStart(
              3,
              "0",
            ),
            date: session.date
              ? session.date.split("T")[0] || session.date
              : new Date().toISOString().split("T")[0],
            startTime: session.start_time
              ? new Date(session.start_time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            duration: session.duration || "N/A",
            wordsTyped: session.words_typed || 0,
            characters: session.characters || 0,
            quickPhrases: session.quick_phrases || 0,
            suggestions: session.suggestions || 0,
            metrics: {
              accuracy: metrics.accuracy || 0,
              recall: metrics.recall || 0,
              precision: metrics.precision || 0,
              f1Score: metrics.f1_score || metrics.f1Score || 0,
            },
          };
        });

        setSessions(transformedSessions);
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError(err.message);
        // Keep empty array on error
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  // Calculate overall metrics (average of all sessions)
  const overallMetrics =
    sessions.length > 0
      ? {
          accuracy:
            sessions.reduce((sum, s) => sum + s.metrics.accuracy, 0) /
            sessions.length,
          recall:
            sessions.reduce((sum, s) => sum + s.metrics.recall, 0) /
            sessions.length,
          precision:
            sessions.reduce((sum, s) => sum + s.metrics.precision, 0) /
            sessions.length,
          f1Score:
            sessions.reduce((sum, s) => sum + s.metrics.f1Score, 0) /
            sessions.length,
        }
      : {
          accuracy: 0,
          recall: 0,
          precision: 0,
          f1Score: 0,
        };

  // Progress bar component
  const ProgressBar = ({ value, color }) => (
    <div
      style={{
        width: "100%",
        height: "6px",
        backgroundColor: "#e5e7eb",
        borderRadius: "3px",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          backgroundColor: color,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );

  // Metric icon component
  const MetricIcon = ({ type, color }) => {
    const icons = {
      accuracy: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      recall: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      precision: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      f1score: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <path d="M3 3v18h18" />
          <path d="M18 17l-5-5-5 5" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  // Generate PDF for a specific session
  const generatePDF = async (session) => {
    const elementId = `session-card-${session.id}`;
    const btnId = `download-btn-${session.id}`;

    const element = document.getElementById(elementId);
    const btn = document.getElementById(btnId);

    if (!element) {
      console.error("Element not found");
      return;
    }

    try {
      // Hide the download button during capture
      if (btn) btn.style.display = "none";

      // Capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      // Show the button again
      if (btn) btn.style.display = "flex";

      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions to fit A4 width
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // A4 dimensions: 210 x 297 mm
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Add a simple header
      pdf.setFontSize(16);
      pdf.setTextColor(44, 62, 80);
      pdf.text("Performance Report", pdfWidth / 2, 15, { align: "center" });

      // Add the captured image
      pdf.addImage(imgData, "PNG", margin, 25, contentWidth, contentHeight);

      // Save the PDF
      pdf.save(
        `Performance_Report_Session_${session.sessionNumber}_${session.date.replace(/\//g, "-")}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Ensure button is restored on error
      if (btn) btn.style.display = "flex";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f9fa",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: "1rem", color: "#7f8c8d" }}>
            Loading performance data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f9fa",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#e74c3c" }}>
          <p>Error loading performance data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f9fa",
        padding: "2rem",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: "0.5rem",
            }}
          >
            Performance Analytics
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#7f8c8d",
              marginBottom: "1rem",
            }}
          >
            User Session Reports & Metrics Dashboard
          </p>
          <div
            style={{
              display: "inline-block",
              background: "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: "0.9rem",
              color: "#4A90E2",
              fontWeight: "600",
            }}
          >
            Total Sessions: {sessions.length}
          </div>
        </div>

        {/* Overall Performance Metrics */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            >
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
            Overall Performance Metrics
          </h2>
          <div className="row g-3">
            {[
              {
                label: "Accuracy",
                value: overallMetrics.accuracy,
                color: "#4A90E2",
                type: "accuracy",
              },
              {
                label: "Recall",
                value: overallMetrics.recall,
                color: "#2ecc71",
                type: "recall",
              },
              {
                label: "Precision",
                value: overallMetrics.precision,
                color: "#9b59b6",
                type: "precision",
              },
              {
                label: "F1 Score",
                value: overallMetrics.f1Score,
                color: "#e67e22",
                type: "f1score",
              },
            ].map((metric, idx) => (
              <div key={idx} className="col-md-3 col-sm-6">
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `${metric.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MetricIcon type={metric.type} color={metric.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#7f8c8d",
                          fontWeight: "500",
                        }}
                      >
                        {metric.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                        }}
                      >
                        {metric.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <ProgressBar value={metric.value} color={metric.color} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Reports */}
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#2c3e50",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Session Reports
          </h2>

          {sessions.map((session, idx) => (
            <div
              key={session.id}
              id={`session-card-${session.id}`}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.25rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              {/* Session Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #ecf0f1",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "700",
                      color: "#2c3e50",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Session {session.sessionNumber}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.8rem",
                      color: "#7f8c8d",
                    }}
                  >
                    <span>📅 {session.date}</span>
                    <span>🕐 {session.startTime}</span>
                    <span>⏱️ {session.duration}</span>
                  </div>
                </div>
                <button
                  id={`download-btn-${session.id}`}
                  onClick={() => generatePDF(session)}
                  style={{
                    background: "#4A90E2",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(74, 144, 226, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#357ABD";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(74, 144, 226, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#4A90E2";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(74, 144, 226, 0.3)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>

              {/* Session Statistics */}
              <div className="row g-2 mb-3">
                {[
                  { label: "Words Typed", value: session.wordsTyped },
                  { label: "Characters", value: session.characters },
                  { label: "Quick Phrases", value: session.quickPhrases },
                  { label: "Suggestions", value: session.suggestions },
                ].map((stat, statIdx) => (
                  <div key={statIdx} className="col-md-3 col-sm-6">
                    <div
                      style={{
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        padding: "0.9rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}
                      >
                        {stat.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#7f8c8d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: "#2c3e50",
                        }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Session Metrics */}
              <div className="row g-2">
                {[
                  {
                    label: "Accuracy",
                    value: session.metrics.accuracy,
                    color: "#4A90E2",
                  },
                  {
                    label: "Recall",
                    value: session.metrics.recall,
                    color: "#2ecc71",
                  },
                  {
                    label: "Precision",
                    value: session.metrics.precision,
                    color: "#9b59b6",
                  },
                  {
                    label: "F1 Score",
                    value: session.metrics.f1Score,
                    color: "#e67e22",
                  },
                ].map((metric, metricIdx) => (
                  <div key={metricIdx} className="col-md-3 col-sm-6">
                    <div
                      style={{
                        background: `${metric.color}10`,
                        borderLeft: `4px solid ${metric.color}`,
                        borderRadius: "6px",
                        padding: "0.7rem 1rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#7f8c8d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {metric.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: "700",
                          color: metric.color,
                        }}
                      >
                        {metric.value.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;
```

### src/pages/Upload.jsx

```jsx
import React, { useState, useRef, useEffect } from "react";
import "../styles/main.css";
import { api } from "../services/api";

const Upload = ({ onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]); // Pending files
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    try {
      const saved = localStorage.getItem("uploadedFilesHistory");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }); // Successfully uploaded files
  const [uploadProgress, setUploadProgress] = useState({}); // { fileName: percentage }
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    patientId: "",
    recordingDate: "",
    sessionType: "Resting State",
    notes: "",
  });

  const [datasetFiles, setDatasetFiles] = useState([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const files = await api.getDatasetFiles();
        setDatasetFiles(files);
      } catch (error) {
        console.error("Failed to load local datasets", error);
      }
    };
    fetchDatasets();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const validExtensions = [
      "edf",
      "cdv",
      "csv",
      "bdf",
      "mat",
      "fif",
      "set",
      "vhdr",
    ];
    const newFiles = Array.from(fileList).filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return validExtensions.includes(extension);
    });

    if (newFiles.length !== fileList.length) {
      alert(
        "Some files were rejected. Supported formats: .edf, .bdf, .csv, .mat, .fif, .set, .vhdr",
      );
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeUploadedFile = (indexToRemove) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("uploadedFilesHistory", JSON.stringify(newFiles));
      return newFiles;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select a file first.");
      return;
    }
    if (!formData.patientId || !formData.recordingDate) {
      alert("Please fill in the required fields (Patient ID, Recording Date).");
      return;
    }

    setIsUploading(true);

    try {
      for (const file of files) {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const response = await api.uploadDataset(file, formData);

        // Set progress to 100 after successful upload
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        setUploadedFiles((prev) => {
          const newFiles = [...prev, { name: file.name, size: file.size }];
          localStorage.setItem(
            "uploadedFilesHistory",
            JSON.stringify(newFiles),
          );
          return newFiles;
        });

        // Store active dataset for the Dashboard
        localStorage.setItem(
          "activeDataset",
          JSON.stringify({
            filename: file.name,
            patientId: formData.patientId,
          }),
        );
      }

      setFiles([]);
      setUploadProgress({});
      setFormData({
        patientId: "",
        recordingDate: "",
        sessionType: "Resting State",
        notes: "",
      });

      // If running inside Dashboard, close upload view
      if (onUploadComplete) {
        setTimeout(() => onUploadComplete(), 1000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f0f4f8",
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      <div className="container-xl">
        {/* Stats Cards */}
        <div className="row mb-4 g-3">
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Total Uploads</div>
                <div className="fw-bold fs-5">{uploadedFiles.length}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-success">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Processing</div>
                <div className="fw-bold fs-5">
                  {isUploading ? "Active" : "Idle"}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center gap-3">
              <div className="bg-light p-2 rounded-circle text-info">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="small text-muted">Status</div>
                <div className="fw-bold fs-5">Secure Connection</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Column: Upload Zone */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <h5 className="fw-bold mb-4">Upload EEG Dataset</h5>

              <div
                className={`upload-zone p-5 rounded-3 text-center d-flex flex-column align-items-center justify-content-center ${dragActive ? "bg-light border-primary" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !isUploading && inputRef.current.click()}
                style={{
                  border: "2px dashed #cbd5e1",
                  minHeight: "300px",
                  cursor: isUploading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  background: dragActive ? "#f1f5f9" : "#fff",
                  opacity: isUploading ? 0.6 : 1,
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  accept=".edf,.bdf,.csv,.mat,.fif,.set,.vhdr"
                  style={{ display: "none" }}
                  disabled={isUploading}
                />

                <div className="mb-3 p-3 rounded-circle bg-light">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h6 className="fw-semibold mb-2">
                  Drag and drop your EEG file here
                </h6>
                <p className="text-muted small mb-3">or click to browse</p>
                <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Supported: .edf, .bdf, .csv, .mat, .fif, .set, .vhdr • Max 500
                  MB
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Form */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-3 shadow-sm h-100">
              <h5 className="fw-bold mb-4">Dataset Metadata</h5>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Patient ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="e.g., P001234"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  disabled={isUploading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Recording Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control bg-light border-0"
                  name="recordingDate"
                  value={formData.recordingDate}
                  onChange={handleInputChange}
                  disabled={isUploading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">
                  Session Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select bg-light border-0"
                  name="sessionType"
                  value={formData.sessionType}
                  onChange={handleInputChange}
                  disabled={isUploading}
                >
                  <option>Resting State</option>
                  <option>Motor Imagery</option>
                  <option>Visual Evoked Potential</option>
                  <option>P300 Speller</option>
                  <option>Sleep Monitoring</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">
                  Additional Notes
                </label>
                <textarea
                  className="form-control bg-light border-0"
                  rows="3"
                  placeholder="Any additional information about this recording..."
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  disabled={isUploading}
                ></textarea>
              </div>

              <button
                className="btn btn-primary w-100 py-2 fw-semibold"
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                  background: isUploading ? "#cbd5e1" : "var(--primary)",
                  border: "none",
                  color: "#fff",
                }}
              >
                {isUploading ? "Uploading..." : "Upload Dataset"}
              </button>
              {files.length === 0 && !isUploading && (
                <p className="text-center mt-2 text-muted small">
                  Please select a file first
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Local Datasets Section */}
        {datasetFiles.length > 0 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="bg-white p-4 rounded-3 shadow-sm">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-server me-2 text-primary"></i>Available
                  Local Datasets
                </h5>
                <p className="text-muted small mb-3">
                  These files are already preprocessed on the server. Select one
                  to immediately start streaming without uploading.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {datasetFiles.map((df, idx) => (
                    <button
                      key={idx}
                      className="btn btn-outline-primary d-flex align-items-center gap-2"
                      onClick={() => {
                        localStorage.setItem(
                          "activeDataset",
                          JSON.stringify({
                            filename: df.filename,
                            patientId: df.subject || "S1",
                          }),
                        );
                        if (onUploadComplete) onUploadComplete();
                      }}
                      disabled={isUploading}
                    >
                      <i className="fas fa-file-waveform"></i>
                      {df.filename}{" "}
                      <span className="badge bg-light text-dark ms-2">
                        {df.size_mb} MB
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending / Uploading Queue */}
        {(files.length > 0 || isUploading) && (
          <div className="row mt-4">
            <div className="col-12">
              <div
                className="bg-white p-4 rounded-3 shadow-sm"
                style={{ borderLeft: "4px solid #f59e0b" }}
              >
                <h6 className="fw-bold mb-3">Pending Uploads</h6>
                <div className="d-flex flex-column gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="p-3 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-warning text-dark rounded-pill">
                            {index + 1}
                          </span>
                          <span className="small fw-semibold">{file.name}</span>
                          <span className="small text-muted">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        {!isUploading && (
                          <button
                            onClick={() => removeFile(index)}
                            className="btn btn-sm btn-link text-danger text-decoration-none"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                      {/* Progress Bar */}
                      {isUploading && (
                        <div className="progress" style={{ height: "6px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{
                              width: `${uploadProgress[file.name] || 0}%`,
                              transition: "width 0.2s ease",
                            }}
                            aria-valuenow={uploadProgress[file.name] || 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Queue */}
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="bg-white p-4 rounded-3 shadow-sm"
              style={{ borderLeft: "4px solid var(--primary)" }}
            >
              {uploadedFiles.length > 0 ? (
                <>
                  <h6 className="fw-bold mb-3">Uploaded Files</h6>
                  <div className="d-flex flex-column gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between p-3 bg-light rounded border border-success border-opacity-25"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <div>
                            <div className="fw-semibold small">{file.name}</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {(file.size / 1024 / 1024).toFixed(2)} MB •
                              Uploaded just now
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUploadedFile(index)}
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h6 className="fw-bold mb-3 text-primary">
                    Upload Guidelines
                  </h6>
                  <ul className="small text-muted mb-0 ps-3">
                    <li className="mb-1">
                      Accepted formats: .edf, .bdf, .csv, .mat, .fif, .set,
                      .vhdr
                    </li>
                    <li className="mb-1">
                      Maximum file size: 500 MB per dataset
                    </li>
                    <li className="mb-1">
                      Ensure all patient identifiers are properly anonymized
                      before upload
                    </li>
                    <li>
                      Complete all required metadata fields for proper dataset
                      cataloging
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
```

### src/services/api.js

```js
// API Base URL - dynamically use the same hostname as the frontend to avoid IPv6/CORS/PNA issues
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `http://${window.location.hostname}:8000`;

// Helper functions for auth token
const getAuthToken = () => localStorage.getItem("auth_token");
const setAuthToken = (token) => localStorage.setItem("auth_token", token);
const removeAuthToken = () => localStorage.removeItem("auth_token");

// Helper to create headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// API functions
export const api = {
  // Signup
  async signup(userData) {
    try {
      const url = `${API_BASE_URL}/api/auth/signup`; // Change this if your backend route differs
      console.log("Sending signup request to:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMessage = "Signup failed";
        try {
          const error = await response.json();
          errorMessage = error.detail || JSON.stringify(error);
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.access_token) setAuthToken(data.access_token);
      return data;
    } catch (error) {
      if (
        error.message.includes("Failed to fetch") ||
        error.name === "TypeError"
      ) {
        console.error("Network error details:", error);
        throw new Error(
          `Cannot connect to backend at ${API_BASE_URL}. Make sure your FastAPI server is running on port 8000. Test: ${API_BASE_URL}/docs`,
        );
      }
      throw error;
    }
  },

  // Login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      let msg = error.detail || "Login failed";
      if (Array.isArray(msg)) msg = msg.map((e) => e.msg).join(", ");
      else if (typeof msg === "object") msg = JSON.stringify(msg);
      throw new Error(msg);
    }
    const data = await response.json();
    if (data.access_token) setAuthToken(data.access_token);
    return data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      // Only remove token and throw auth error for 401/403
      if (response.status === 401 || response.status === 403) {
        removeAuthToken();
        throw new Error("Not authenticated");
      }
      // For other errors, throw with status info
      const error = await response
        .json()
        .catch(() => ({ detail: "Failed to get user" }));
      throw new Error(error.detail || `Server error: ${response.status}`);
    }
    return await response.json();
  },

  logout() {
    removeAuthToken();
  },

  // Dataset folder
  async getDatasetFiles() {
    const response = await fetch(`${API_BASE_URL}/api/dataset/files`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch dataset files");
    }
    return await response.json();
  },

  // Upload Dataset
  async uploadDataset(file, metadata) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", metadata.patientId);
    formData.append("recordingDate", metadata.recordingDate);
    formData.append("sessionType", metadata.sessionType);
    formData.append("notes", metadata.notes);

    const headers = { Accept: "application/json" };
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/api/upload/dataset`, {
      method: "POST",
      headers: headers, // FormData automatically sets the correct Content-Type with boundary
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Upload failed");
    }
    return await response.json();
  },

  // Example for predictions (update as needed)
  async predictSignal(eegData, sessionId = null) {
    const response = await fetch(`${API_BASE_URL}/api/prediction/predict`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ eeg_data: eegData, session_id: sessionId }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }
    return await response.json();
  },

  // WebSocket for prediction stream
  // Callbacks: { onStreamStart, onPrediction, onComplete, onError, onClose }
  connectPredictionStream(sessionId, patientId, filename, callbacks = {}) {
    const wsUrl =
      API_BASE_URL.replace(/^http/, "ws") +
      `/api/prediction/stream/${sessionId}?patient_id=${encodeURIComponent(patientId)}&filename=${encodeURIComponent(filename)}`;
    console.log("[WS] Connecting to:", wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("[WS] Connected successfully");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "stream_start":
          console.log(`[WS] Stream started: ${data.total_trials} trials`);
          if (callbacks.onStreamStart) callbacks.onStreamStart(data);
          break;
        case "prediction":
          if (callbacks.onPrediction) callbacks.onPrediction(data);
          break;
        case "stream_complete":
          console.log(
            `[WS] Stream complete: ${data.total_trials} trials processed`,
          );
          if (callbacks.onComplete) callbacks.onComplete(data);
          break;
        case "status":
          console.log(`[WS] Status: ${data.message}`);
          break;
        case "error":
          console.error("[WS] Server error:", data.message);
          if (callbacks.onError) callbacks.onError(new Error(data.message));
          break;
        default:
          // Legacy format fallback (no type field) — treat as prediction
          if (data.action) {
            if (callbacks.onPrediction) callbacks.onPrediction(data);
          } else if (data.error) {
            if (callbacks.onError) callbacks.onError(new Error(data.error));
          }
          break;
      }
    };

    ws.onerror = (error) => {
      console.error("[WS] Native error event:", error, "URL was:", wsUrl);
      if (callbacks.onError)
        callbacks.onError(
          new Error(
            "WebSocket connection error. Make sure the backend server is running on port 8000.",
          ),
        );
    };

    ws.onclose = (event) => {
      console.log(
        `[WS] Connection closed. Code: ${event.code}, Reason: ${event.reason}`,
      );
      if (callbacks.onClose) callbacks.onClose(event);
    };

    return ws;
  },

  // Sessions
  async createSession() {
    const response = await fetch(`${API_BASE_URL}/api/sessions/`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create session");
    }
    const data = await response.json();
    return { ...data, session_id: data.id || data._id };
  },

  async updateSession(sessionId, updates) {
    const response = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update session");
    }
    return await response.json();
  },

  async endSession(sessionId) {
    const response = await fetch(
      `${API_BASE_URL}/api/sessions/${sessionId}/end`,
      {
        method: "POST",
        headers: getHeaders(true),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to end session");
    }
    return await response.json();
  },

  async getUserSessions() {
    const response = await fetch(`${API_BASE_URL}/api/sessions/`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch sessions");
    }
    return await response.json();
  },

  // Performance
  async getSessionPerformance(sessionId) {
    const response = await fetch(
      `${API_BASE_URL}/api/performance/session/${sessionId}`,
      {
        method: "GET",
        headers: getHeaders(true),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch performance");
    }
    return await response.json();
  },

  async getAllPerformance() {
    const response = await fetch(`${API_BASE_URL}/api/performance/`, {
      method: "GET",
      headers: getHeaders(true),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch performance");
    }
    return await response.json();
  },

  async addWordToHistory(sessionId, word) {
    const response = await fetch(
      `${API_BASE_URL}/api/sessions/${sessionId}/add_word`,
      {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify({ word }),
      },
    );
    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add word");
      } catch (e) {
        throw new Error("Failed to add word");
      }
    }
    return await response.json();
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };
```

### src/styles/dashboard.css

```css
/* ===========================DASHBOARD================================= */
/* Variables for easy color adjustments */
:root {
  /* Chat App Variables */
  --bg-color: #ffffff;
  --sidebar-bg: #f7f7f8;
  --text-color: #202123;
  --light-text-color: #6a6a6a;
  --accent-color: #aa98ff;
  --hover-color: #e5e5e5;
  --border-color: #e0e0e0;

  /* Keyboard Variables (renamed for clarity where needed) */
  --color-background: #ffffff;
  --color-card-bg: #ffffff;
  --color-text-primary: #202123;
  --color-text-secondary: #6a6a6a;
  --color-blue-primary: #4a7ffc;
  --color-purple-primary: #8a4ffc;
  --color-red-primary: #f24a4a;
  --color-key-bg: #f8f8f8;
  --color-key-border: #e0e6ed;
  --color-output-border: #d3dae0;
  --color-modal-phrase-border: #d7e4ff;
  --color-modal-phrase-bg: #f5f8ff;
  --color-blue-customized: rgb(81, 181, 240);
}

/* --- App Layout --- */
.chat-app {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* --- Sidebar Styling --- */
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  margin-bottom: 24px;
  cursor: pointer;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.sidebar-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}

.chatgpt-logo {
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0.05em;
}

.sidebar-header i {
  color: #ffffff;
  opacity: 0.9;
}

.new-chat {
  margin-bottom: 8px;
}

.sidebar-action-btn {
  width: 100%;
  padding: 13px 20px;
  background: #ffffff;
  border: 2px solid transparent;
  border-radius: 14px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.sidebar-action-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.sidebar-action-btn:active,
.sidebar-action-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.search-bar {
  padding: 8px 10px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #64748b;
}

.nav-links {
  margin-bottom: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  text-decoration: none;
  color: #475569;
  border-radius: 12px;
  margin: 4px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item i {
  margin-right: 10px;
  color: #64748b;
  width: 16px;
}

.nav-item:hover,
.chat-list li a:hover {
  background-color: #f1f5f9;
  transform: translateX(4px);
}

.active-link {
  background-color: #eff6ff;
  color: #3b82f6;
  font-weight: 500;
}

/* --- Chat History --- */
.chat-history-section {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 5px;
}

.section-title {
  color: #64748b;
  font-size: 12px;
  padding: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.chat-list {
  list-style: none;
  padding: 0;
}

.chat-list li a {
  display: block;
  padding: 8px 10px;
  text-decoration: none;
  color: #64748b;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- Sidebar Footer --- */
.sidebar-footer {
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-logout-btn {
  width: 100%;
  padding: 13px 20px;
  background: #ffffff;
  border: 2px solid transparent;
  border-radius: 14px;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.sidebar-logout-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
}

.sidebar-logout-btn:active {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: #ef4444;
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
}

.user-info:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.user-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.username {
  font-weight: 600;
  color: #1e293b;
  flex-grow: 1;
}

.user-info i {
  color: #94a3b8;
}

.status-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 5px 10px;
  margin-top: 5px;
}

.status {
  color: #64748b;
  font-size: 12px;
}

.upgrade-btn {
  background-color: transparent;
  color: #64748b;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upgrade-btn:hover {
  background-color: #f1f5f9;
}

/* --- Main Content Styling --- */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-header {
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 50px;
  flex-shrink: 0;
}

.user-controls i {
  font-size: 20px;
  margin-left: 15px;
  color: var(--light-text-color);
  cursor: pointer;
}

/* --- Keyboard Specific Styles --- */
.keyboard-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
  overflow-y: auto;
  background-color: var(--color-modal-phrase-bg);
}

.keyboard-container {
  width: 100%;
  max-width: 80%;
  background-color: var(--color-card-bg);
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow:
    0 0 12px rgb(120, 174, 236),
    0 0 24px var(--color-modal-phrase-border);
  padding-bottom: 100px;
  margin-bottom: 30px;
}

/* --- Keyboard Component Styles --- */
.keyboard-container header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.keyboard-container .title {
  color: var(--color-blue-primary);
  font-size: 1.5em;
  font-weight: 600;
  margin: 0;
}

.keyboard-container .subtitle {
  color: var(--color-text-secondary);
  font-size: 0.9em;
  margin-top: 5px;
}

.brain-signal-indicator {
  position: absolute;
  top: -10px;
  right: 0;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: 600;
  color: #4caf50;
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
}

.brain-signal-indicator .dot {
  height: 8px;
  width: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.brain-signal-indicator.inactive {
  display: none;
}

.output-section {
  margin-bottom: 30px;
}

.output-header {
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
  font-weight: 600;
  margin-bottom: 10px;
}

.output-header i {
  margin-right: 8px;
  color: var(--color-blue-primary);
}

.output-box {
  min-height: 125px;
  padding: 15px 20px;
  border: 2px solid var(--color-modal-phrase-border);
  border-radius: 12px;
  background-color: var(--color-modal-phrase-bg);
  color: var(--color-text-secondary);
  font-size: 1.5em;
  line-height: 1.4;
  cursor: text;
  display: flex;
  align-items: center;
  word-wrap: break-word;
}

.keyboard-toggles {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}

.toggle-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: transparent;
  color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-output-border);
}

.toggle-btn.active {
  color: white;
  box-shadow: 0 4px 15px rgba(74, 127, 252, 0.4);
  background-color: var(--color-blue-primary);
  border: 2px solid var(--color-blue-primary);
}

.toggle-btn:hover:not(.active) {
  background-color: var(--color-modal-phrase-bg);
  border: 2px solid var(--color-blue-customized);
}

.suggestions-section {
  margin-bottom: 30px;
  text-align: center;
}

.suggestions-label {
  color: var(--color-text-secondary);
  font-size: 0.85em;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.suggestions-label i {
  color: var(--color-purple-primary);
  margin-right: 5px;
}

.suggestions-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.suggestion-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  background-color: #f2f6fa;
  color: var(--color-text-primary);
  transition: background-color 0.2s;
}

.suggestion-btn.primary {
  background-color: var(--color-blue-primary);
  color: var(--color-card-bg);
  box-shadow: 0 4px 10px rgba(74, 127, 252, 0.2);
}

.suggestion-btn:hover {
  opacity: 0.8;
}

.keyboard-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.keyboard-grid:not(.new-numeric-layout) {
  width: 95%;
  margin: 0 auto;
}

.keyboard-grid:not(.new-numeric-layout) .key-row.centered {
  width: 65%;
  margin: 0 auto;
}

.key-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.key-btn {
  flex-grow: 1;
  padding: 15px 5px;
  height: 55px;
  border: 2px solid var(--color-modal-phrase-border);
  border-radius: 8px;
  background-color: white;
  color: black;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.01);
  transition: background-color 0.1s;
  min-width: 40px;
}

.key-btn:hover {
  background-color: var(--color-modal-phrase-bg);
  border: 2px solid var(--color-blue-customized);
}

.function-row {
  margin-top: 15px;
  align-items: stretch;
}

.func-btn {
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

.clear-key {
  background: linear-gradient(
    90deg,
    rgba(123, 104, 238, 1) 0%,
    rgba(128, 0, 128, 1) 100%
  );
  color: var(--color-card-bg);
  box-shadow: 0 4px 10px rgba(138, 79, 252, 0.4);
  flex-basis: 15%;
}

.quick-speak {
  flex-basis: 20%;
  color: var(--color-card-bg);
  box-shadow: 0 4px 10px rgba(138, 79, 252, 0.4);
  background: linear-gradient(
    90deg,
    rgba(123, 104, 238, 1) 0%,
    rgba(128, 0, 128, 1) 100%
  );
}

.space-key {
  flex-basis: 45%;
  background-color: var(--color-key-bg);
  color: var(--color-text-primary);
  border: 1px solid var(--color-key-border);
}

.del-key {
  flex-basis: 15%;
  background-color: var(--color-red-primary);
  color: var(--color-card-bg);
  box-shadow: 0 4px 10px rgba(242, 74, 74, 0.4);
}

.func-btn:hover {
  opacity: 0.9;
  border: 2px solid black;
}

.hidden {
  display: none !important;
}

.new-numeric-layout {
  width: 380px;
  max-width: 90%;
  margin: 0 auto 20px auto;
}

.new-numeric-layout .simple-row {
  justify-content: space-between;
  width: 100%;
  margin: 0;
}

.new-numeric-layout .key-btn {
  flex: 1 1 23%;
  max-width: 90px;
  padding: 20px 5px;
}

.new-numeric-layout + .function-row {
  width: auto;
  margin-left: 0;
  margin-right: 0;
}

/* --- Quick Speak Modal Styling --- */
.keyboard-modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.keyboard-modal.show {
  display: flex;
  justify-content: center;
  align-items: center;
}

.keyboard-modal .modal-content {
  background-color: var(--color-card-bg);
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

.keyboard-modal .modal-title {
  color: var(--color-text-primary);
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 20px;
}

.keyboard-modal .close-btn {
  color: #999;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  line-height: 1;
}

.keyboard-modal .close-btn:hover,
.keyboard-modal .close-btn:focus {
  color: var(--color-red-primary);
}

.modal-phrases {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(80vh - 120px);
  overflow-y: auto;
  padding-right: 5px;
}

.phrase-btn {
  width: 100%;
  padding: 15px 15px;
  border: 1px solid var(--color-modal-phrase-border);
  border-radius: 10px;
  background-color: var(--color-modal-phrase-bg);
  color: var(--color-text-primary);
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.phrase-btn:hover {
  background-color: var(--color-modal-phrase-border);
  border-color: var(--color-blue-primary);
}

/* Media Queries */
@media (max-width: 768px) {
  .keyboard-container {
    padding: 15px;
    max-width: 95%;
  }

  .suggestions-row {
    flex-wrap: wrap;
  }

  .suggestion-btn {
    margin-bottom: 8px;
    flex-grow: 1;
    min-width: 100px;
  }

  .key-btn {
    height: 45px;
    font-size: 0.9em;
    min-width: 30px;
  }

  .keyboard-grid:not(.new-numeric-layout) .key-row.centered {
    width: 100%;
  }

  .func-btn {
    padding: 10px 15px;
    font-size: 0.9em;
  }

  .new-numeric-layout {
    width: 100%;
  }

  .new-numeric-layout .key-btn {
    max-width: none;
  }

  .sidebar {
    width: 200px;
  }
}

/* Enhanced Sidebar Interactivity - Removed as styles are now integrated above */

/* ===========================MODERN KEYBOARD LAYOUT================================= */
.modern-keyboard-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #f0f4f8;
  padding: 24px;
  overflow-y: auto;
  min-height: 0;
}

.keyboard-header {
  text-align: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.keyboard-title {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
}

.keyboard-layout-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Left Panel Styles */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  min-height: 0;
}

.mode-section,
.quick-speak-section {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mode-section:hover,
.quick-speak-section:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.section-label {
  color: #475569;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 18px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mode-btn {
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 16px;
  background: #f8fafc;
  color: #64748b;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.mode-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
}

.mode-btn:hover:not(.active) {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #475569;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.quick-speak-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-speak-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-speak-btn:hover {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  transform: translateX(4px);
}

.quick-speak-btn i {
  color: #94a3b8;
  font-size: 0.875rem;
}

.quick-speak-btn:hover i {
  color: white;
}

/* Right Panel Styles */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  min-height: 0;
}

.display-section,
.suggestions-section-new,
.keyboard-section {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.display-section:hover,
.suggestions-section-new:hover,
.keyboard-section:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.speak-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.speak-btn:hover {
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
  transform: translateY(-2px);
}

.speak-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.display-box {
  min-height: 80px;
  max-height: 120px;
  overflow-y: auto;
  padding: 22px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  color: #1e293b;
  font-size: 1.5rem;
  line-height: 1.6;
  word-wrap: break-word;
  word-break: break-word;
}

.suggestions-section-new {
  padding: 20px 24px;
}

.suggestions-section-new .suggestions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-chip {
  padding: 10px 22px;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid transparent;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.suggestion-chip:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

/* Keyboard Grid Styles */
.abc-keyboard,
.num-keyboard {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.key-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.key-row.row-offset-1 {
  padding: 0 40px;
}

.key-row.row-offset-2 {
  padding: 0 120px;
}

.key-btn-modern {
  flex: 1;
  min-width: 50px;
  max-width: 80px;
  aspect-ratio: 1;
  background: #ffffff;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.key-btn-modern:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.25);
}

.key-btn-modern.selected {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  border: 2px solid #1e40af;
  z-index: 10;
  position: relative;
}

.key-btn-modern:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.25);
}

.control-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  margin-top: 14px;
}

.control-btn {
  padding: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.space-btn {
  background: #ffffff;
  color: #475569;
}

.space-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.comma-btn,
.period-btn {
  background: #ffffff;
  color: #475569;
}

.comma-btn:hover,
.period-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.delete-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border-color: transparent;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35);
}

.clear-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-color: transparent;
}

.clear-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.35);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .keyboard-layout-grid {
    grid-template-columns: 1fr;
  }

  .left-panel {
    flex-direction: row;
  }

  .mode-section,
  .quick-speak-section {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .left-panel {
    flex-direction: column;
  }

  .key-row.row-offset-1 {
    padding: 0 20px;
  }

  .key-row.row-offset-2 {
    padding: 0 60px;
  }

  .control-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .key-btn-modern {
    max-width: none;
  }
}
```

### src/styles/main.css

```css
:root {
  --primary: #1a73e8;
  --primary-dark: #0a3e86;
  --muted: #6b7280;
  --bg: #ffffff;
  --card: #f8fafc;
  --glass: rgba(255, 255, 255, 0.6);
  --radius: 12px;
}

html,
body {
  height: 100%;
}

body {
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    Arial;
  background: var(--bg);
  color: #071225;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

/* NAVBAR */
.navbar {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85)
  );
  backdrop-filter: blur(6px);
  transition:
    box-shadow 0.28s ease,
    background 0.28s ease;
}

.navbar.shadowed {
  box-shadow: 0 10px 30px rgba(12, 34, 70, 0.08);
}

.nav-link {
  color: rgba(7, 18, 37, 0.8);
  font-weight: 600;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 8px;
}

.btn-primary {
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border: none;
  box-shadow: 0 8px 24px rgba(26, 115, 232, 0.12);
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-primary a {
  color: #fff !important;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(26, 115, 232, 0.18);
}

.btn-outline-primary {
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
  transition: all 0.3s ease;
}

.btn-outline-primary a {
  color: var(--primary);
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.btn-outline-primary:hover {
  background: var(--primary);
  color: #fff;
}

.btn-outline-primary:hover a {
  color: #fff;
}

/* HERO */
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.hero .eyebrow {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 0.6rem;
}

.hero h1 {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.02;
  font-weight: 800;
  margin-bottom: 0.6rem;
}

.hero p.lead {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 56ch;
}

/* Neural background glow + nodes */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}

@keyframes slowPulse {
  0% {
    transform: scale(1);
    opacity: 0.95;
  }

  50% {
    transform: scale(1.06);
    opacity: 0.85;
  }

  100% {
    transform: scale(1);
    opacity: 0.95;
  }
}

.floating-icon {
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 16px;
  background: linear-gradient(180deg, #fff, #eef8ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 28px rgba(11, 32, 63, 0.06);
  z-index: 3;
  pointer-events: none;
  transition: transform 0.45s ease;
}

/* Hero mock card */
.hero-card {
  background: linear-gradient(180deg, #ffffff, #f7fbff);
  border-radius: 16px;
  padding: 1.1rem;
  box-shadow: 0 18px 50px rgba(11, 32, 63, 0.07);
  border: 1px solid rgba(10, 60, 134, 0.04);
  z-index: 4;
}

#about {
  height: 80vh;
}

.about-full {
  min-height: 95vh;
  display: flex;
  align-items: center;
}

.about-img-wrapper {
  height: 100%;
}

#about h1 {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  margin-bottom: 3rem;
  text-align: center;
}

.stat-box {
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: 0.25s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.09);
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 6px;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.3;
  font-weight: 500;
}

.stats-row > .col-4 {
  display: flex;
}

.stat-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(26, 115, 232, 0.25);
  /* soft blue glow (#1A73E8 tint) */
  background-color: rgba(26, 115, 232, 0.05);
  /* very light blue background tint */
}

/* HOW IT WORKS */
.how-it-works-section {
  min-height: 80vh;
  display: flex;
  align-items: center;

  justify-content: center;
}

#how-it-works h1 {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  margin-bottom: 3rem;
  text-align: center;
}

.how-it-works-section .card {
  transition: all 0.3s ease;
}

.how-it-works-section .card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.how-it-works-section .card:hover {
  border-color: var(--primary);
  /* turns blue on hover */
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(26, 115, 232, 0.15);
}

.how-it-works-section img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* ================================ */

/* typed text effect */
.typed {
  font-weight: 700;
  color: var(--primary);
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  background: var(--primary);
  margin-left: 6px;
  vertical-align: middle;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* STAT CARDS */
.stat-card {
  transition:
    transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1),
    box-shadow 0.28s;
  background: var(--card);
  border-radius: 12px;
  padding: 1.15rem;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(10, 46, 100, 0.06);
}

/* TIMELINE / STEPS */
.step {
  background: white;
  border-radius: 12px;
  padding: 1.15rem;
  box-shadow: 0 8px 28px rgba(8, 26, 50, 0.04);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease;
}

.step:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(8, 26, 50, 0.06);
}

/* CORE FEATURES */

/* testimonials carousel */
/* .testimonial { border-radius:12px; padding:1.25rem; background:linear-gradient(180deg,#fff,#f7fbff); box-shadow:0 12px 36px rgba(11,32,63,0.06); } */
/* .testimonial .meta { font-weight:700; color:var(--primary); } */

/* CTA */
.big-cta {
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  color: white;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 18px 40px rgba(26, 115, 232, 0.12);
}

footer {
  background: #f5f9ff;
  padding: 2.2rem 0;
  border-top: 1px solid rgba(10, 60, 134, 0.04);
}

/* small screens */
@media (max-width: 991px) {
  .neural-bg {
    display: none;
  }

  .floating-icon {
    display: none;
  }

  .hero {
    padding-top: 4rem;
    padding-bottom: 3rem;
    min-height: calc(80vh - 76px);
  }
}

/* focus accessibility */
a:focus,
button:focus,
input:focus {
  outline: 3px solid rgba(26, 115, 232, 0.14);
  outline-offset: 4px;
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .neural-bg,
  .floating-icon,
  .feature-card,
  .step {
    animation: none;
    transition: none;
  }

  .typing-cursor {
    animation: none;
    opacity: 1;
  }
}

/* ===================================================================BOTTOM ======================================================================= */

/* ======================================TESTIMONIALS========================= */
:root {
  --quote-color: rgba(255, 255, 255, 0.5);
  --image-size: 70px;
  --card-gap: 30px;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: var(--text-color);
  overflow-x: hidden;
}

/* --- Section and Wrapper --- */
.testimonial-section {
  /* FIX: Increased top padding to prevent floating image from being clipped */
  padding: 70px 20px 50px;
  width: 100%;
  /* Used the gradient from your previous request */
  background: transparent;
}

.slider-wrapper {
  position: relative;
  /* FIX: Increased Max Width to ensure 3 cards fit comfortably without cutting */
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

/* --- Slider and Buttons --- */
.testimonial-container {
  display: flex;
  gap: var(--card-gap);
  overflow: hidden;
  /* Use 'hidden' as scroll is JS controlled */
  scroll-behavior: smooth;
  padding: 20px 0;
  margin: 0 50px;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(62, 107, 255);
  color: var(--text-color);
  border: none;
  padding: 15px 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.slider-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.left-btn {
  left: 0;
}

.right-btn {
  right: 0;
}

/* --- Testimonial Card Styling --- */
.testimonial-card {
  /* FIX: Conservative calculation ensures three full cards fit */
  flex: 0 0 calc(33% - 20px);
  min-width: 280px;

  /* Appearance and Glassmorphism */
  background: white;
  border-radius: 15px;
  padding: 30px;
  /* Adjust top padding to leave space for the image to float up */
  padding-top: calc(30px + var(--image-size) / 2 + 10px);

  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-6px);
  /* Changed shadow color to match the purple/pink theme slightly better */
  box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
}

/* --- User Image Positioning (Floating effect) --- */
.user-image-wrapper {
  position: absolute;
  /* Places the image centered on the card's top edge */
  top: calc(-1 * var(--image-size) / 2);
  left: 30px;
  z-index: 5;
}

.user-image {
  width: var(--image-size);
  /* 70px */
  height: var(--image-size);
  /* 70px */
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

/* --- Content Styling --- */
.quote-text {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
  /* Ensures quote content starts after the image's lowest point */
  margin-top: calc(var(--image-size) / 2);
  color: black;
}

.user-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: black;
}

.user-title {
  font-size: 0.9rem;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  color: black;
}

.quote-icon {
  /* Styling for the large " symbol */
  font-family: Arial, sans-serif;
  content: "“";
  /* Used a single quote char as a large visual element */
  font-size: 80px;
  color: var(--primary);
  line-height: 1;
  font-weight: 900;
  position: absolute;
  bottom: 10px;
  right: 20px;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* --- Responsive Adjustments (Kept your media queries simple) --- */
@media (max-width: 1000px) {
  .testimonial-card {
    flex: 0 0 calc(50% - 15px);
  }
}

@media (max-width: 768px) {
  .slider-btn {
    display: none;
  }

  .testimonial-container {
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    margin: 0;
  }

  .testimonial-card {
    flex: 0 0 100%;
    scroll-snap-align: center;
  }
}

/*  */

:root {
  --footer-bg-color: #0c1833;
  /* Dark blue background */
  --logo-color: #3abff8;
  /* Light blue/cyan for the logo element */
  --link-hover-color: #3abff8;
  /* Link hover color */
  --text-color-light: #ffffff;
  --text-color-faded: rgba(255, 255, 255, 0.7);
  /* Faded white for descriptions/links */
}

footer {
  background: var(--footer-bg-color);
}

/* --- Main Footer Container --- */
.conceptual-footer {
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  font-family: Arial, sans-serif;
  padding-top: 50px;
  /* Top padding to lift content */
  border-radius: 20px 20px 0 0;
  /* Rounded top corners, matching the image style */
  position: relative;
}

/* --- Content Wrapper (Using Flexbox for columns) --- */
.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--footer-bg-color);
}

/* --- Individual Columns --- */
.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px;
  /* Minimum width for link columns */
}

.footer-col-info {
  flex-grow: 2;
  /* Make the first column wider */
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

/* --- Logo and Description --- */
.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
  /* You would typically use a background image for the logo icon */
}

.footer-description {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

/* --- Link Lists --- */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

/* --- Social Icons --- */
.social-icons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff !important;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-icon-link i {
  color: #ffffff;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(58, 191, 248, 0.3);
}

/* --- Address Text --- */
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
}

/* --- Copyright Section --- */
.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- Responsiveness (Example for stacking columns on smaller screens) --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }

  .footer-col {
    margin-bottom: 30px;
    min-width: 45%;
    /* Two columns per row */
  }

  .footer-col-info,
  .footer-col-address {
    max-width: 100%;
    /* Full width for logo/address on very small screens */
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .footer-col {
    min-width: 100%;
    /* Stack all columns */
    padding: 0 10px;
  }
}

/* =========================FOOTER============================ */

/* --- 4. FOOTER STYLES (Provided by User) --- */

.mindkey-footer {
  /* Ensure the footer background is set */
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  padding-top: 50px;
  padding-bottom: 20px;
  border-radius: 20px 20px 0 0;
}

.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px 40px;
  /* Adjusted padding */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px;
}

.footer-col-info {
  flex-grow: 2;
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
}

.footer-description,
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-light);
  border-radius: 3px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
}

.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- RESPONSIVENESS --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }

  .footer-col {
    margin-bottom: 30px;
    min-width: 45%;
  }

  .footer-col-info,
  .footer-col-address {
    max-width: 100%;
    min-width: 100%;
  }

  .form-map-wrapper {
    flex-direction: column;
  }

  .map-placeholder {
    min-height: 300px;
  }

  .banner-content {
    padding-left: 50px;
  }
}

@media (max-width: 576px) {
  .info-cards-wrapper {
    flex-direction: column;
  }

  .footer-col {
    min-width: 100%;
    padding: 0 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .banner-title {
    font-size: 2.5rem;
  }

  .banner-content {
    padding-left: 20px;
  }
}

/* =======================CONTACT ========================================*/

/* --- GLOBAL & CONTACT SECTION STYLES --- */

:root {
  /* Footer Colors */
  --footer-bg-color: #0c1833;
  --logo-color: #3abff8;
  --link-hover-color: #3abff8;
  --text-color-light: #ffffff;
  --text-color-faded: rgba(255, 255, 255, 0.7);

  /* Contact Page Colors */
  --contact-form-bg: #f5f8fd;
  /* Light blue background for info cards */
  --primary-blue: #007bff;
  /* Button color */
  --light-text: #6c757d;
  /* Muted text */
  --icon-color: #007bff;
  /* Blue icon color */
  --primary-tint: rgba(26, 115, 232, 0.05);
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #fff;
  overflow-x: hidden;
}

/* Reusable Container */
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

/* Ensure Bootstrap containers are properly centered */
.container-lg {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
}

.container {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
}

/* --- 1. CONTACT BANNER HEADER --- */
.contact-banner {
  height: 300px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  /* Placeholder Background Image (Replace with your own image URL) */
  display: flex;
  align-items: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding-left: 100px;
}

.banner-title {
  color: #fff;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.breadcrumb {
  color: #fff;
  font-size: 0.85rem;
}

.breadcrumb a {
  color: #fff;
  text-decoration: none;
  opacity: 0.8;
}

/* --- 2. INFO CARDS SECTION --- */
.info-cards-section {
  padding: 60px 0;
}

.info-cards-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.info-card {
  flex: 1;
  padding: 30px;
  text-align: center;
  background-color: var(--primary-tint);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  min-height: 120px;
}

.info-card i {
  color: var(--icon-color);
  font-size: 1.2rem;
  margin-right: 10px;
  vertical-align: middle;
}

.card-text {
  display: block;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
}

.card-subtext {
  display: block;
  font-size: 0.9rem;
  color: var(--light-text);
}

/* --- 3. FORM AND MAP SECTION --- */
.form-map-section {
  padding: 40px 0 80px;
}

.form-map-wrapper {
  display: flex;
  gap: 30px;
}

.contact-form-col {
  flex: 1;
  padding-right: 20px;
}

.map-col {
  flex: 1;
}

.form-header-small {
  display: inline-block;
  padding: 5px 15px;
  background-color: var(--contact-form-bg);
  color: var(--primary-blue);
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 15px 0 10px;
}

.form-description {
  font-size: 0.9rem;
  color: var(--light-text);
  margin-bottom: 30px;
}

/* Form Styling */
.form-group {
  margin-bottom: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row input {
  flex: 1;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* 1. Makes the row a flexible container */
.contact-form-col .form-row {
  display: flex;
  gap: 20px;
  /* Adds space between the 'Your Name' and 'Your Email' fields */
  margin-bottom: 20px;
  /* Add some space below this row */
}

/* 2. Makes each input group take up an equal share of the available space */
.contact-form-col .form-row .form-group {
  flex: 1;
  /* Shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

/* 3. Ensures the <input> element inside the form-group fills 100% of its parent group's width */
.contact-form-col .form-row .form-group input {
  width: 100%;
}

.send-button:hover {
  background-color: #0056b3;
}

/* NEW */
:root {
  /* Define a primary color variable, assuming it's the blue used in the logo and link */
  --primary: #1a73e8;
  --primary-blue: #1a73e8;
}

/* Ensure the span in the logo uses the correct variable */
.navbar-brand .fw-bold {
  color: var(--primary) !important;
}

/* --- NEW STYLES FOR NEURAL BACKGROUND EFFECT --- */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}

@keyframes slowPulse {
  0% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.05) rotate(5deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* You might need to add positioning/z-index to your .contact-banner or .banner-content
           to ensure the text appears above the new effect. */
.contact-banner {
  position: relative;
  overflow: hidden;
  /* background-image will be set inline in components */
  background-size: cover;
  /* Ensures the image covers the entire banner */
  background-repeat: no-repeat;
  /* Prevents the image from tiling */
  background-position: right center;
  /* <-- THIS IS THE KEY CHANGE */
  min-height: 250px;
  /* Example: ensure banner has a visible height */
  display: flex;
  /* Helps vertically center content if needed */
  align-items: center;
  /* Vertically centers content */
  justify-content: center;
  /* Horizontally centers content */
  text-align: center;
  /* Centers text within the banner content */
  color: white;
  /* Ensure text is visible over the background */
}

.banner-content {
  z-index: 2;
  /* Ensure content is above the neural-bg */
  position: relative;
}

/* --- END OF NEW STYLES --- */

/* END */

/* Map Styling (Using iframe placeholder) */
.map-placeholder {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.map-placeholder iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* --- 4. FOOTER STYLES (Provided by User) --- */

.mindkey-footer {
  /* Ensure the footer background is set */
  background-color: var(--footer-bg-color);
  color: var(--text-color-light);
  padding-top: 50px;
  padding-bottom: 20px;
  border-radius: 20px 20px 0 0;
}

.footer-content-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px 40px;
  /* Adjusted padding */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-col {
  flex-grow: 1;
  padding: 0 15px;
  min-width: 150px;
}

.footer-col-info {
  flex-grow: 2;
  max-width: 35%;
  min-width: 300px;
}

.footer-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color-light);
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--logo-color);
  margin-bottom: 15px;
}

.footer-description,
.footer-address-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-color-faded);
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: var(--text-color-faded);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--link-hover-color);
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color-light);
  border-radius: 3px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.social-icon-link:hover {
  background-color: var(--link-hover-color);
}

.footer-copyright {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color-faded);
  padding: 20px 0;
}

/* --- RESPONSIVENESS --- */
@media (max-width: 992px) {
  .footer-content-wrapper {
    flex-wrap: wrap;
  }

  .footer-col {
    margin-bottom: 30px;
    min-width: 45%;
  }

  .footer-col-info,
  .footer-col-address {
    max-width: 100%;
    min-width: 100%;
  }

  .form-map-wrapper {
    flex-direction: column;
  }

  .map-placeholder {
    min-height: 300px;
  }

  .banner-content {
    padding-left: 50px;
  }
}

@media (max-width: 576px) {
  .info-cards-wrapper {
    flex-direction: column;
  }

  .footer-col {
    min-width: 100%;
    padding: 0 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .banner-title {
    font-size: 2.5rem;
  }

  .banner-content {
    padding-left: 20px;
  }
}

/* TESTING================================================ */
/* ----------------- GLOBAL VARIABLES ----------------- */
:root {
  --primary-blue: #007bff;
  --dark-text: #212529;
  --light-text: #6c757d;
  --bg-light: #f8f9fa;
  --card-bg: #ffffff;
}

/* ----------------- ABOUT SECTION ----------------- */
.about-us-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 15px;
}

.about-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
}

/* IMAGE SIDE - Animate entering from Left Screen edge */
.about-image-col {
  flex: 1;
  min-width: 45%;
  position: relative;
  opacity: 1 !important;
  transform: none !important;
  transition: all 1.2s ease-out;
}

.about-image-col.active {
  opacity: 1;
  transform: translateX(0);
}

.image-stack {
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  max-width: 550px;
}

.img-main-placeholder {
  width: 90%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background: #e7f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a64b9;
  font-weight: bold;
}

.img-offset-placeholder {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 250px;
  border-radius: 8px;
  border: 5px solid #fff;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translate(10%, 30px);
  background: #e7f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a64b9;
  font-weight: bold;
}

/* TEXT SIDE - Animate entering from Right Screen edge */
.about-text-col {
  flex: 1;
  max-width: 55%;
  opacity: 0;
  transform: translateX(100vw);
  transition: all 1.2s ease-out;
}

.about-text-col.active {
  opacity: 1;
  transform: translateX(0);
}

.about-tag {
  padding: 5px 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  display: inline-block;
  border-radius: 5px;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark-text);
  margin-bottom: 20px;
}

.about-paragraph {
  margin-bottom: 15px;
  color: var(--light-text);
}

/* Trust icons list */
.trust-points {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.trust-points li {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: var(--dark-text);
}

.trust-points i {
  color: #28a745;
  margin-right: 8px;
}

/* Button */
.read-more-button {
  padding: 10px 22px;
  border: none;
  background: var(--primary-blue);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  margin-top: 10px;
  transition: 0.3s;
}

.read-more-button:hover {
  background: #0056b3;
}

/* ---------------- SERVICES SECTION (No conflicts) ---------------- */
.features-section {
  background: var(--bg-light);
  padding: 80px 0;
  text-align: center;
}

/* Heading animation */
.section-title,
.section-description,
.section-tag {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
}

.section-title.active,
.section-description.active,
.section-tag.active {
  opacity: 1;
  transform: translateY(0);
}

/* Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

/* Card animation */
.service-box {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.8s ease-out;
}

.service-box.show {
  opacity: 1;
  transform: translateY(0);
}

/* icons */
.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-blue);
  background: rgba(0, 123, 255, 0.1);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

/* ---------------- RESPONSIVE ---------------- */
@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }

  .about-text-col,
  .about-image-col {
    transform: none;
    opacity: 1;
  }

  .about-text-col {
    max-width: 100%;
  }
}

/* =============================================ABOUT CSS ====================================== */

:root {
  --primary-blue: #007bff;
  /* Standard bright blue */
  --dark-text: #212529;
  /* Dark heading text */
  --light-text: #6c757d;
  /* Grey paragraph text */
  --bg-light: #f8f9fa;
  /* Very light background color */
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  /* Simulate a light background */
}

/* Container for the whole section */
.about-us-container {
  max-width: 1200px;
  margin: 80px auto;
  /* Centering the block */
  padding: 0 15px;
}

/* Flex layout for the two main columns */
.about-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
}

/* --- LEFT COLUMN: IMAGE STACK --- */
.about-image-col {
  flex: 1;
  position: relative;
  min-width: 45%;
}

.image-stack {
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  max-width: 550px;
  /* Constraint the image column size */
}

/* Placeholder styling for the main image */
.img-main-placeholder {
  width: 90%;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #e0e0e0;
  /* Light grey background */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #495057;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-dasharray="5,5"/><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" stroke-dasharray="5,5"/></svg>');
}

/* Placeholder styling for the offset image */
.img-offset-placeholder {
  position: absolute;
  bottom: 0;
  left: 0;
  /* Changed from right to left to better match the image composition */
  width: 50%;
  height: 250px;
  border-radius: 8px;
  border: 5px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translate(10%, 30px);
  /* Move slightly right and down */
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #495057;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-dasharray="5,5"/><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" stroke-dasharray="5,5"/></svg>');
}

/* --- RIGHT COLUMN: TEXT CONTENT --- */
.about-text-col {
  flex: 1;
  max-width: 55%;
}

.about-tag {
  display: inline-block;
  padding: 5px 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-blue);
  border: 1px solid var(--primary-blue);
  border-radius: 5px;
  /* Used a standard radius as the image shows a slightly rounded edge */
  text-transform: uppercase;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark-text);
  margin-bottom: 20px;
  line-height: 1.3;
}

.about-paragraph {
  margin-bottom: 15px;
  color: var(--light-text);
  line-height: 1.6;
  font-size: 1rem;
}

.trust-points {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 25px;
}

.trust-points li {
  margin-bottom: 10px;
  font-size: 1rem;
  color: var(--dark-text);
  display: flex;
  align-items: center;
}

.trust-points li .fa {
  color: var(--primary-blue);
  margin-right: 10px;
  font-size: 1.1rem;
}

.read-more-button {
  background-color: var(--primary-blue);
  color: white !important;
  padding: 12px 35px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
  display: inline-block;
  border: none;
  cursor: pointer;
}

.read-more-button:hover {
  background-color: #0056b3;
}

/* --- RESPONSIVENESS FOR MOBILE/TABLET --- */
@media (max-width: 992px) {
  .about-wrapper {
    flex-direction: column;
  }

  .about-image-col,
  .about-text-col {
    flex: none;
    max-width: 100%;
    width: 100%;
  }

  .about-image-col {
    order: 2;
    /* Images below text on small screens */
    padding-right: 0;
  }

  .about-text-col {
    order: 1;
  }

  .image-stack {
    padding-bottom: 70px;
    margin: 0 auto;
    /* Center the image stack */
  }

  .img-main-placeholder {
    width: 100%;
  }

  .img-offset-placeholder {
    transform: translate(0, 30px);
    /* Adjust positioning */
    left: 50%;
    margin-left: -5%;
    /* Center bias */
  }
}

/* Services */
:root {
  --primary-blue: #007bff;
  /* Main brand blue */
  --dark-heading: #212529;
  /* Darker text for titles */
  /* --body-text: #6c757d;    Lighter text for paragraphs */
  --bg-light: #f8f9fa;
  /* Light background color for the section */
  --card-bg: #ffffff;
  /* White background for cards */
  --card-shadow: rgba(0, 0, 0, 0.05);
  /* Subtle shadow for cards */
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--bg-light);
  /* Light background for the page */
  line-height: 1.6;
  color: var(--body-text);
}

.features-section {
  padding: 80px 0;
  /* Vertical padding for the section */
  text-align: center;
  /* Center align all content initially */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-tag {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
  /* Ensures it takes full width for centering */
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark-heading);
  margin-bottom: 20px;
  line-height: 1.2;
}

.section-description {
  max-width: 700px;
  margin: 0 auto 50px auto;
  /* Center and add space below */
  font-size: 1rem;
  color: var(--body-text);
}

/* Feature Cards Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* Responsive grid */
  gap: 30px;
  /* Space between cards */
  margin-top: 40px;
}

/* Individual Feature Card */
.feature-card {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px var(--card-shadow);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  /* Lift effect on hover */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  /* Size of the icon */
  color: var(--primary-blue);
  background-color: rgba(0, 123, 255, 0.1);
  /* Light blue background for icon circle */
  border-radius: 50%;
  /* Makes it a circle */
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  /* Center the icon */
  position: relative;
  /* For the inner circle */
}

.feature-icon::before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid var(--primary-blue);
  /* Inner circle border */
  border-radius: 50%;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--dark-heading);
  margin-bottom: 10px;
}

.feature-description {
  font-size: 0.95rem;
  color: var(--body-text);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .section-description {
    margin-bottom: 30px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    /* Stack cards on very small screens */
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .feature-card {
    padding: 25px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .feature-icon::before {
    width: 40px;
    height: 40px;
  }
}

/*  Animation*/

/* Fade + Slide Up Animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Animation for images section  */
/* Slide-in Animations (Reversed Direction) */
.reveal-left,
.reveal-right {
  opacity: 0;
  transition: all 0.9s ease;
}

.reveal-left {
  transform: translateX(-50px);
  /* Images come from left */
}

.reveal-right {
  transform: translateX(50px);
  /* Text comes from right */
}

.reveal-left.active,
.reveal-right.active {
  opacity: 1;
  transform: translateX(0);
}

/* =====================END ABOUT================================== */

/* ========================FAQS======================================== */
:root {
  --primary-blue: #007bff;
  --dark-heading: #212529;
  /* --body-text: #6c757d; */
  --bg-light: #f8f9fa;
}

body {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  line-height: 1.6;
  overflow-x: hidden;
}

/* === FAQ SECTION === */
.faq-section {
  position: relative;
  /* so the .neural-bg stays behind it */
  background-color: white;
  padding: 100px 0;
  overflow: hidden;
}

/* --- Animated Gradient Background --- */
.neural-bg {
  position: absolute;
  right: -12%;
  top: -18%;
  width: 80vmax;
  height: 80vmax;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(26, 115, 232, 0.12),
    rgba(10, 62, 134, 0.06) 26%,
    rgba(255, 255, 255, 0) 45%
  );
  filter: blur(80px);
  z-index: 1;
  pointer-events: none;
  transform-origin: center;
  animation: slowPulse 8s ease-in-out infinite;
}

@keyframes slowPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* === FAQ CONTENT === */
.faq-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
  /* above background */
}

.faq-content-col {
  flex: 1;
  max-width: 55%;
  padding-right: 20px;
  opacity: 0;
  transform: translateX(-100%);
  transition:
    opacity 1.5s,
    transform 1.5s;
}

.faq-content-col.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.section-tag {
  font-size: 0.9rem;
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--dark-heading);
  margin-bottom: 40px;
  line-height: 1.2;
}

/* === Accordion Styling === */
.accordion-item {
  margin-bottom: 18px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.accordion-item:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  color: var(--dark-heading);
  font-size: 1.05rem;
}

.accordion-header .icon {
  margin-left: auto;
  color: var(--primary-blue);
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.accordion-item.active {
  border-color: var(--primary-blue);
}

.accordion-item.active .icon {
  transform: rotate(45deg);
}

.accordion-body {
  padding: 0 25px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
  color: var(--body-text);
  font-size: 0.95rem;
  border-top: 1px solid #f1f1f1;
}

.accordion-body-text {
  padding-top: 20px;
  padding-bottom: 25px;
}

/* === Image Column === */
.faq-image-col {
  flex: 1;
  max-width: 45%;
  text-align: center;
  padding: 20px;
  opacity: 1 !important;
  transform: none !important;
  transition:
    opacity 1.5s,
    transform 1.5s;
}

.faq-image-col.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.illustration-placeholder {
  width: 100%;
  max-width: 500px;
  height: 400px;
  background: url("./src/faqs-removebg-preview.png") no-repeat center center /
    contain;
  margin: 0 auto;
  display: block;
}

/* === Responsive === */
@media (max-width: 992px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }

  .faq-content-col,
  .faq-image-col {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .illustration-placeholder {
    height: 300px;
    background-image: url("./src/faqs-removebg-preview.png");
  }
}

/* SIGNUP MODAL================================ */

/* ======================================================
   FORM & MODAL STYLES (REQUIRED FOR SIGNUP MODAL)
   ====================================================== */

/* Form Container Styling (Content inside the modal) */
.form-container {
  background-color: white;
  padding: 30px 20px 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
  box-sizing: border-box;
}

/* Heading */
.form-container h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

/* Input Fields */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #fff;
}

/* Password field wrapper */
.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #777;
  font-size: 18px;
}

/* Error Text */
#passError {
  color: red;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}

/* Dropdown Styling */
select {
  cursor: pointer;
  background-color: #f9f9f9;
}

/* Consent */
.consent-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
}

.consent-box input {
  margin-right: 10px;
}

/* Main Login Button */
.login-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
}

.login-button:hover {
  background-color: #0056b3;
}

/* Forgot Password link */
.forgot-password {
  text-align: right;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 20px;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* Signup Prompt and Link */
.signup-prompt {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
}

.signup-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.signup-link:hover {
  text-decoration: underline;
}

/* Main Signup Button */
.signup-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
}

.signup-button:hover {
  background-color: #0056b3;
}

/* Login Prompt and Link */
.login-prompt {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}

/* OR separator */
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  margin: 20px 0;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eee;
}

.separator:not(:empty)::before {
  margin-right: 0.5em;
}

.separator:not(:empty)::after {
  margin-left: 0.5em;
}

/* ======================================================
   MODAL OVERLAY STYLES (FOR BLUR EFFECT)
   ====================================================== */

.custom-modal {
  position: fixed !important;
  z-index: 9999 !important;
  /* Very high z-index to ensure it's above navbar */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  /* The key to the blurred background effect */
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);

  /* Center the modal content using flex */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Content/Box */
.custom-modal .modal-content {
  background-color: transparent;
  padding: 0;
  width: 90%;
  max-width: 550px;
  position: relative;
  margin: 0;
  z-index: 10000 !important;
  /* Ensure modal content is above overlay */
}

/* Form Container */
.custom-modal .form-container {
  position: relative;
  z-index: 10001 !important;
  /* Ensure form is on top */
}

/* Close Button (X icon) for auth modals */
.custom-modal .close-btn {
  color: #000;
  font-size: 36px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 3px;
  z-index: 10002 !important;
  /* Ensure close button is on top */
  cursor: pointer;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.7);
  background: transparent;
  border: none;
  line-height: 1;
}

.custom-modal .close-btn:hover,
.custom-modal .close-btn:focus {
  color: #ccc;
}

/* Sidebar Action Buttons */
.sidebar-action-btn {
  width: 100%;
  text-align: center;
  border: 1px solid transparent;
  background: transparent;
  color: #ececf1;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.sidebar-action-btn:hover {
  border-color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
}

.sidebar-action-btn.active {
  background-color: #4a90e2 !important;
  color: white !important;
  border-color: #4a90e2;
}

/* Custom Button Styles for Modals */
.btn-danger {
  background: linear-gradient(90deg, #dc3545, #c82333);
  border: none;
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.12);
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(220, 53, 69, 0.18);
}

.btn-secondary {
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  border: 2px solid #6c757d;
  color: #6c757d;
  background: transparent;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #6c757d;
  color: #fff;
}
```

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

