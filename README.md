# FurEver Shelter Portal

FurEver Shelter Portal is a modern web application designed to streamline dog adoption and shelter management. Built with Next.js and React, it provides a robust dashboard for shelters to manage their dogs, review and process adoption applications, and connect with potential adopters. The portal also allows users to browse available dogs, submit adoption applications, and track the status of their applications.

## Features

- **Dog Adoption Platform:** Easily browse dogs, filter by breed or age, and view detailed dog profiles.
- **Shelter Dashboard:** Shelter staff can manage dog listings, review and process adoption applications, and update dog statuses.
- **Adoption Applications:** Users can submit applications to adopt dogs, view their application status, and communicate with shelters.
- **User Profiles:** Adopters can view their adoption history and manage their account.
- **Shelter Details:** Shelters can update their information and view associated staff and dogs.
- **Secure API:** RESTful endpoints for user, dog, breed, adoption, and shelter management.

## Technologies Used

- **JavaScript (Next.js, React)**
- **CSS (Tailwind, custom styles)**
- **Prisma ORM** (for database operations)
- **Node.js/Express API routes**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

### Prerequisites

- Node.js and npm/yarn/pnpm/bun installed

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/amrith-r-naik/dams-website.git
    cd dams-website
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Configure environment variables**
    - Copy `.env.example` to `.env.local` and fill in the required values (e.g., for database connection).
    - Set up your database (see Prisma documentation).

4. **Run database migrations** (if using Prisma)
    ```bash
    npx prisma migrate dev
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

### Editing

- Main pages are in `src/pages/`
- API routes are in `src/pages/api/`
- Components are in `src/components/`

### API Routes

- All API endpoints are mapped under `/api/*` (e.g., `/api/dogs`, `/api/adoption`)
- See the respective files in `src/pages/api/` for implementation details.

## Project Structure

```
src/
  components/         # Reusable React components (navigation, footer, UI elements)
  pages/              # Main app pages (dogs, shelter dashboard, adoptions, etc.)
    api/              # API endpoints (RESTful routes for dogs, adoptions, users, shelters)
  styles/             # Global and component-level CSS
```

## Contributing

Pull requests are welcome! Please open issues for feature requests or bug reports.

## License

MIT (or specify your license)

## Author

[amrith-r-naik](https://github.com/amrith-r-naik)

---

### Professional Repository Name Suggestions

- **FurEver-Shelter-Portal**
- **ShelterAdopt**
- **CanineConnect**
- **ShelterManager**
- **AdoptEase**

Recommended: **FurEver-Shelter-Portal**
