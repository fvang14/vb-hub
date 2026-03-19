# VB Hub - Agent Guidelines

VB Hub is a Rails 8.1 application for the volleyball community, connecting players and businesses.

## Build/Lint/Test Commands

```bash
# Development
./bin/rails server                    # Start dev server (http://localhost:3000)
./bin/rails console                  # Open Rails console
./bin/rails runner "puts 'Hello'"    # Run arbitrary Ruby code

# Database
./bin/rails db:create                # Create development/test databases
./bin/rails db:migrate               # Run pending migrations
./bin/rails db:seed                  # Seed database with sample data
./bin/rails db:reset                # Drop, create, migrate, and seed
./bin/rails db:schema:load          # Load schema (faster than migrations)
./bin/rails db:migrate:status       # Show migration status

# Generate
./bin/rails generate scaffold ModelName # Generate full CRUD scaffold
./bin/rails generate model ModelName   # Generate model and migration
./bin/rails generate migration AddField # Generate empty migration

# Testing
./bin/rails test                           # Run all tests
./bin/rails test test/models/user_test.rb  # Run specific test file
./bin/rails test test/models/              # Run all tests in directory
./bin/rails test:system                   # Run system tests (Capybara)
./bin/rails test:all                       # Run all test types

# Linting
./bin/rubocop                              # Run RuboCop on all files
./bin/rubocop --autocorrect                # Auto-fix offenses
./bin/rubocop -a app/models/user.rb        # Lint specific file
bundle audit                               # Check gems for security vulnerabilities
brakeman                                  # Check for Rails security issues

# Docker
docker compose up                        # Start all services
docker compose up -d                     # Start in detached mode
docker compose down                      # Stop services
docker compose logs -f                   # Follow logs
```

## Project Structure

```
app/
├── assets/                  # CSS, JS, images (managed by Propshaft)
├── controllers/            # Rails controllers
├── helpers/                # View helpers
├── jobs/                   # ActiveJob classes
├── mailers/                # ActionMailer classes
├── models/                 # ActiveRecord models
└── views/                  # ERB templates
    ├── layouts/            # Application layouts
    ├── shared/             # Reusable partials (_navbar.html.erb)
    └── [controller]/       # Views for each controller
config/
├── routes.rb               # Route definitions
├── database.yml           # Database configuration
└── environments/          # Environment-specific settings
db/
├── migrate/                # Database migrations
├── schema.rb               # Current schema (auto-generated)
└── seeds.rb                # Database seeds
test/
├── controllers/            # Controller tests
├── models/                 # Model tests
├── fixtures/               # Test fixtures (.yml files)
└── test_helper.rb         # Test configuration
```

## Code Style Guidelines

### Ruby
- Follow [RuboCop Rails Omakase](https://github.com/rails/rubocop-rails-omakase/) style
- Use 2-space indentation
- Prefer single quotes for strings without interpolation
- Use `attr_accessor`, `attr_reader`, or `attr_writer` for simple accessors
- Use `delegate` for delegating methods to associated objects

### Naming Conventions
- **Files**: snake_case (`user.rb`, `home_controller.rb`)
- **Classes/Modules**: PascalCase (`User`, `ApplicationController`)
- **Methods/Variables**: snake_case (`user_name`, `find_by_email`)
- **Database tables**: snake_case plural (`users`, `businesses`)
- **Constants**: SCREAMING_SNAKE_CASE

### Rails Patterns
- Use concerns in `app/models/concerns/` for shared model behavior
- Use service objects in `app/services/` for complex business logic
- Keep controllers thin; push logic to models or service objects
- Use `before_action` for shared controller concerns
- Use `flash[:notice]` and `flash[:alert]` for user messages

### ActiveRecord
- Use scopes for commonly-used query conditions
- Use `validates` for simple validations
- Use `validate` (singular) for custom validations
- Use `dependent: :destroy` for associated destroy behavior
- Use `class_name:` and `foreign_key:` when naming differs from convention

### Views (ERB)
- Use `<%= %>` for output, `<% %>` for logic without output
- Use `render partial: 'shared/navbar'` for partials (underscore prefix)
- Use `content_for(:title)` for page-specific content in layouts
- Prefer `link_to` over raw `<a>` tags
- Use Tailwind CSS classes for styling

### Migrations
- Use `create_table`, `add_column`, `remove_column`, etc.
- Always include `t.timestamps` in tables
- Use `t.references` for foreign keys
- Add indexes for foreign keys and columns used in queries
- Use `change` method; fallback to `up`/`down` only when necessary
- Migration filename format: `YYYYMMDDHHMMSS_create_model_name.rb`

### Testing
- Use `assert` methods from `ActiveSupport::TestCase`
- Use `get`, `post`, `patch`, `delete` for controller tests
- Use `assert_response :success` or `assert_response :redirect`
- Use fixtures in `test/fixtures/` for test data
- Keep tests focused: one assertion per test when practical

## Environment Variables

Store sensitive values in environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `VB_HUB_DATABASE_PASSWORD` - Production database password
- `RAILS_MAX_THREADS` - Database connection pool size

## Authentication

- Uses Devise gem for authentication
- User model includes: email, password, name, home_facility, volleyball_bio, role
- Configure Devise in `config/initializers/devise.rb`
- Permit additional params in `ApplicationController#configure_permitted_parameters`

## Models

### User
- Devise modules: database_authenticatable, registerable, recoverable, rememberable, validatable
- Associations: has_many :businesses, has_many :posts, has_many :sent_messages, has_many :received_messages

### Business
- Belongs_to :user
- Has_many :posts
- Validates presence of: name, description

### Post
- Belongs_to :user (optional)
- Belongs_to :business (optional)
- Must have either user_id or business_id (custom validation)
- Validates presence of: content

### Message
- Belongs_to :sender, class_name: "User"
- Belongs_to :receiver, class_name: "User"
- Validates presence of: content

## Routes

```ruby
root "home#index"
get "home/index"
get "directory", to: "directory#index"
devise_for :users
get "up" => "rails/health#show"  # Health check endpoint
```
