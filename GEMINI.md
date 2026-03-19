# VB Hub - Gemini CLI Context

This document serves as the foundational mandate for the Gemini CLI agent within the VB Hub project. It outlines the project's architecture, technology stack, development workflows, and coding standards.

## Project Overview
**VB Hub** is a platform for the volleyball community, connecting individual players and businesses. It provides features for profiles, business directories, posts, and messaging.

### Core Technology Stack
- **Framework**: [Ruby on Rails 8.1.2](https://rubyonrails.org)
- **Ruby Version**: 3.3.0+ (as seen in .ruby-version)
- **Database**: PostgreSQL (pg gem)
- **Asset Pipeline**: [Propshaft](https://github.com/rails/propshaft)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (via tailwindcss-rails)
- **JavaScript**: [Importmaps](https://github.com/rails/importmap-rails) (ESM) with [Hotwire](https://hotwired.dev) (Turbo & Stimulus)
- **Authentication**: [Devise](https://github.com/heartcombo/devise)
- **Background Jobs**: [Solid Queue](https://github.com/rails/solid_queue)
- **Caching**: [Solid Cache](https://github.com/rails/solid_cache)
- **Real-time**: [Solid Cable](https://github.com/rails/solid_cable)
- **Deployment**: [Kamal](https://kamal-deploy.org) and [Thruster](https://github.com/basecamp/thruster/)

## Project Structure
```text
app/
├── assets/                 # Propshaft assets
│   ├── images/
│   ├── stylesheets/        # Global CSS
│   └── tailwind/           # Tailwind 4 entry point (application.css)
├── controllers/            # Rails controllers (Application, Home, Directory)
├── helpers/                # View helpers
├── javascript/             # Stimulus controllers and application JS
├── models/                 # ActiveRecord models (User, Business, Post, Message)
└── views/                  # ERB templates
config/
├── routes.rb               # Application routing
├── application.rb          # Core Rails configuration
└── database.yml            # PostgreSQL configuration (includes Solid DBs)
db/
├── schema.rb               # Main database schema
├── migrate/                # Migrations for primary database
├── cache_schema.rb         # Solid Cache schema
├── queue_schema.rb         # Solid Queue schema
└── cable_schema.rb         # Solid Cable schema
bin/
├── dev                     # Start development server and Tailwind watcher
├── setup                   # Standard Rails setup script
├── ci                      # Run full CI suite (rubocop, brakeman, tests)
├── rails                   # Rails CLI
└── kamal                   # Deployment CLI
```

## Building and Running
### Development
```bash
# Initial setup
bin/setup

# Start development server (Puma + Tailwind watcher)
bin/dev

# Run Solid Queue worker (if needed separately)
bin/jobs
```

### Quality Control
```bash
# Run full CI check (Linting + Security + Tests)
bin/ci

# Run Rubocop individually
bin/rubocop

# Run security audits
bin/brakeman
bin/bundler-audit
```

### Testing
```bash
# Run all tests
bin/rails test
```

## Database Schema (ActiveRecord)
- **User**: Core profile (email, name, role, volleyball_bio, home_facility). Uses Devise for auth.
- **Business**: Business profiles linked to a user. Includes industry, location, website_url.
- **Post**: Content created by users or businesses.
- **Message**: Direct messaging between users (sender_id, receiver_id).

## Development Conventions

### Ruby & Rails Style
- **Rails 8 Omakase**: Follow modern Rails defaults and the omakase styling provided by `rubocop-rails-omakase`.
- **Standard Rails MVC**: Logic should reside in models where possible (Fat Model, Skinny Controller).
- **Hotwire**: Prefer Turbo Frames/Streams and Stimulus for interactivity over custom JS.
- **Tailwind 4**: Use modern Tailwind 4 features. CSS is managed in `app/assets/tailwind/application.css`.

### Authentication
- Authentication is handled by **Devise**.
- Use `before_action :authenticate_user!` in controllers where login is required.

### Deployment
- Deployment is managed via **Kamal**.
- Production uses **Thruster** as an HTTP proxy for caching and compression.
- Solid Queue/Cache/Cable are used in production to keep infrastructure simple (DB-backed).

## Important Note for Agents
This project uses **Tailwind CSS v4** which is imported directly in CSS via `@import "tailwindcss";`. No separate `tailwind.config.js` is typically needed as configuration is handled within the CSS file or via Rails-specific integration. JavaScript uses **Importmaps**, meaning there is no Node.js/npm build step for JS assets.
