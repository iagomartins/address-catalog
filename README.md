# Address Catalog

A modern, responsive address catalog application built with Vue 3, TypeScript, and SQLite (browser-based). This application allows you to manage addresses with full CRUD operations, export data to CSV, and supports multiple languages.

## Features

- ✅ **Full CRUD Operations**: Create, read, update, and delete address records
- ✅ **Browser-based SQLite Database**: Data stored locally in the browser using SQLite WASM
- ✅ **CSV Export**: Export all address records to CSV format
- ✅ **Multi-language Support**: English and Portuguese (PT-BR)
- ✅ **Responsive Design**: Mobile-first design with collapsible accordion view on mobile devices
- ✅ **State Management**: Centralized state management using Pinia
- ✅ **Modular Architecture**: Reusable UI components and feature-based organization
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Modern UI**: Built with Tailwind CSS and Headless UI components

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI
- **Icons**: Font Awesome
- **Database**: SQLite WASM (@sqlite.org/sqlite-wasm)
- **Internationalization**: Vue I18n
- **Build Tool**: Vite
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Prerequisites

- **Node.js**: ^20.19.0 || >=22.12.0
- **npm** or **yarn**

## Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd address-catalog
```

2. Install dependencies:
```sh
npm install
```

## Development

### Run Development Server

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Type Checking

```sh
npm run type-check
```

### Linting

```sh
npm run lint
```

### Code Formatting

```sh
npm run format
```

## Building for Production

### Build

```sh
npm run build
```

This command will:
- Run type checking
- Compile and minify the code for production
- Output files to the `dist` directory

### Preview Production Build

```sh
npm run preview
```

## Testing

### Run Unit Tests

```sh
npm run test:unit
```

Tests are located in `src/components/__tests__/` and use Vitest with Vue Test Utils.

## Project Structure

```
address-catalog/
├── src/
│   ├── assets/              # Static assets (CSS, images)
│   │   ├── base.css         # Base styles and CSS variables
│   │   └── main.css         # Main stylesheet (Tailwind imports)
│   ├── components/          # Vue components
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Modal.vue
│   │   │   ├── Card.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   ├── Table.vue
│   │   │   ├── TableHeader.vue
│   │   │   ├── TableRow.vue
│   │   │   └── TableRowMobile.vue
│   │   ├── addresses/       # Address-specific components
│   │   │   ├── AddressTable.vue
│   │   │   ├── AddressList.vue
│   │   │   └── AddressTableActions.vue
│   │   ├── CatalogTable.vue
│   │   ├── MainHeader.vue
│   │   ├── MainModal.vue
│   │   ├── ConfirmModal.vue
│   │   ├── LanguageSwitcher.vue
│   │   └── AppLoading.vue
│   ├── db/                  # Database layer
│   │   └── SQLite.ts        # SQLite composable
│   ├── stores/              # Pinia stores
│   │   ├── addresses.ts     # Address data store
│   │   ├── ui.ts            # UI state store
│   │   └── language.ts      # Language preference store
│   ├── types/               # TypeScript type definitions
│   │   ├── Address.ts
│   │   └── DbId.ts
│   ├── lang/                # Internationalization files
│   │   ├── en/
│   │   │   └── en.json
│   │   └── pt/
│   │       └── pt.json
│   ├── views/               # Route views
│   │   └── HomeView.vue
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── App.vue              # Root component
│   ├── main.ts              # Application entry point
│   └── i18n.ts              # i18n configuration
├── public/                  # Public static files
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration (if exists)
└── package.json
```

## Architecture

### State Management (Pinia Stores)

The application uses separate Pinia stores for different concerns:

- **`addresses.ts`**: Manages address data and CRUD operations
  - State: `addresses[]`, `isLoading`, `error`
  - Actions: `fetchAddresses()`, `createAddress()`, `updateAddress()`, `deleteAddress()`, `exportToCSV()`
  - Getters: `completedAddresses`, `pendingAddresses`

- **`ui.ts`**: Manages UI state (modals, loading states)
  - State: `isModalOpen`, `activeModal`, `isLoading`
  - Actions: `openModal()`, `closeModal()`, `setLoading()`

- **`language.ts`**: Manages language preference
  - State: `language`
  - Actions: `update()`

### Component Architecture

The application follows a modular component architecture:

1. **UI Components** (`components/ui/`): Reusable, generic components
2. **Feature Components** (`components/addresses/`): Feature-specific components
3. **Layout Components**: Header, modals, etc.

### Responsive Design

- **Desktop (≥768px)**: Full table layout with all columns visible
- **Mobile (<768px)**: Collapsible accordion list view with expandable rows
- **Header**: Responsive navigation with hamburger menu on mobile
- **Modals**: Full-screen on mobile, centered dialog on desktop

### Database

The application uses SQLite WASM for browser-based data storage. The database is initialized automatically and stores data in the browser's OPFS (Origin Private File System).

**Database Schema:**
```sql
CREATE TABLE orders_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  completed TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### Creating an Address

1. Click the "Create" button (or "+" icon)
2. Fill in the form with:
   - Name
   - Address
   - Phone
   - Email
3. Click "Create" to save

### Updating Status

- Click the status icon (checkmark or spinner) to toggle between completed/pending

### Deleting an Address

- Click the trash icon to delete an address
- Confirm the deletion in the modal

### Exporting Data

- Click the "Export" button to download all addresses as a CSV file

### Changing Language

- Use the language switcher in the header to toggle between English and Portuguese

## Environment Variables

If you need to configure environment variables, create a `.env` file in the root directory:

```env
# Example environment variables (if needed)
VITE_APP_TITLE=Address Catalog
VITE_API_URL=http://localhost:3000
```

Access environment variables in your code using `import.meta.env.VITE_*`.

**Note**: Only variables prefixed with `VITE_` are exposed to the client-side code.

## Security

- All SQL queries use parameterized queries to prevent SQL injection
- Input validation on all form fields
- Type-safe operations with TypeScript

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Note**: SQLite WASM requires a modern browser with support for:
- WebAssembly
- SharedArrayBuffer
- OPFS (Origin Private File System)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (includes type-check) |
| `npm run build-only` | Build without type-check |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint and fix issues |
| `npm run format` | Format code with Prettier |
| `npm run test:unit` | Run unit tests with Vitest |

## Troubleshooting

### Database Issues

If you encounter database initialization errors:
- Clear your browser's storage (Local Storage, IndexedDB, OPFS)
- Refresh the page
- Check browser console for detailed error messages

### Build Issues

If the build fails:
- Ensure you're using the correct Node.js version (^20.19.0 || >=22.12.0)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Run `npm run type-check` to identify TypeScript errors

### Styling Issues

If styles aren't loading:
- Ensure Tailwind CSS is properly configured
- Check that `main.css` imports Tailwind
- Verify PostCSS configuration
