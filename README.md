# FlixHive Angular Client

A modern, responsive movie application built with Angular 19 and Angular Material. FlixHive allows users to browse movies, view detailed information, manage their profiles, and maintain a list of favorite films.

## 🌟 Live Demo

**[View Live Application](https://cinchronicity.github.io/FlixHive-Angular-client/)**

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)

## ✨ Features

- **🎬 Movie Browsing**: Browse a comprehensive collection of movies with detailed information
- **👤 User Authentication**: Secure user registration and login system
- **💖 Favorites Management**: Add/remove movies from personal favorites list
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Beautiful purple-gold gradient theme with glassmorphism effects
- **🔍 Movie Details**: View comprehensive movie information including:
  - Synopsis and plot details
  - Director information and biography
  - Genre descriptions
  - Movie ratings and metadata
- **👥 User Profile**: Manage personal information and view favorite movies
- **🎭 Interactive Dialogs**: Modal dialogs for detailed movie information

## 🛠 Technology Stack

- **Frontend Framework**: Angular 19.2.x
- **UI Components**: Angular Material 19.2.x
- **Styling**: SCSS with custom themes
- **HTTP Client**: Angular HttpClient with RxJS
- **Routing**: Angular Router
- **State Management**: Angular Services
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Angular CLI**: Version 19.x or higher

### Install Angular CLI globally:
```bash
npm install -g @angular/cli@19
```

### Verify installations:
```bash
node --version
npm --version
ng version
```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/cinchronicity/FlixHive-Angular-client.git
cd FlixHive-Angular-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
The application connects to a backend API. Ensure the API endpoints in your services point to the correct backend URL.

## 🔧 Development

### Start Development Server
```bash
ng serve
```
- Navigate to `http://localhost:4200/`
- The application will automatically reload when you modify source files

### Development Server Options
```bash
# Start with specific port
ng serve --port 4200

# Start and open browser automatically
ng serve --open

# Start with live reload
ng serve --live-reload
```

### Code Generation
```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new module
ng generate module module-name

# View all available generators
ng generate --help
```

## 🏗 Building

### For Development
Building is handled automatically by the development server:
```bash
ng serve
```

### For Deployment
Building is handled automatically by the GitHub Pages deployment tool. See the [Deployment](#deployment) section below for the complete workflow.

**Note**: Manual building is not required for this project as the deployment process handles building automatically with the correct configuration.


## 🚀 Deployment

### Deploy to GitHub Pages

#### Prerequisites for Deployment:
```bash
# Install GitHub Pages deployment tool
npm install angular-cli-ghpages --save-dev
```

#### Deployment Steps:


1. **Deploy the app**:
  To build the app in production, you must connect it to a remote server on GitHub.
  Configure your app to a remote server by running the following command:

   ```bash
   ng deploy --base-href=https://GithubUserName.github.io/GithubRepoName/
   ```


#### Important Notes:
- Replace `GithubUserName` and `GithubRepoName` with your actual GitHub username and repository name
- The `--dir=dist/flix-hive-angular-client/browser` path is specific to Angular v17+ build output structure
- Ensure your backend API allows CORS requests from your GitHub Pages domain

- For a complete list of available schematics (such as components, directives, or pipes), run:

```
ng generate --help
```

#### Complete Deployment Workflow:
```bash
# 1. Make changes to your code
git add .
git commit -m "Your commit message"
git push origin master

# 2. Build and deploy
ng build --configuration production --base-href=https://yourusername.github.io/your-repo-name/
npx angular-cli-ghpages --dir=dist/flix-hive-angular-client/browser
```

### Alternative Deployment Options
- **Netlify**: Drag and drop the `dist/flix-hive-angular-client/browser` folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI tools

## 📁 Project Structure

```
src/
├── app/
│   ├── fetch-api-data.service.ts          # API service for backend communication
│   ├── movie-card/                        # Movie display component
│   ├── movie-director-dialog/              # Director information modal
│   ├── movie-genre-dialog/                 # Genre information modal
│   ├── movie-synopsis-dialog/              # Synopsis display modal
│   ├── user-login-form/                    # User authentication
│   ├── user-profile/                       # User profile management
│   ├── user-registration-form/             # New user registration
│   ├── welcome-page/                       # Landing page
│   ├── app-routing.module.ts               # Application routing
│   ├── app.component.*                     # Root component
│   └── app.module.ts                       # Root module
├── index.html                              # Main HTML file
├── main.ts                                 # Application bootstrap
└── styles.scss                             # Global styles
```

## 🔗 API Integration

This application integrates with a Node.js/Express backend API that provides:

- **User Authentication**: Registration and login endpoints
- **Movie Data**: Comprehensive movie information
- **User Management**: Profile updates and favorites management

### Key API Endpoints:
- `POST /users` - User registration
- `POST /login` - User authentication
- `GET /movies` - Fetch all movies
- `GET /movies/:title` - Fetch specific movie
- `PUT /users/:username` - Update user profile
- `POST /users/:username/movies/:movieId` - Add to favorites
- `DELETE /users/:username/movies/:movieId` - Remove from favorites

## 🎨 Design Features

- **Color Scheme**: Purple-gold gradient theme
- **UI Framework**: Angular Material components
- **Responsive Design**: Mobile-first approach
- **Glassmorphism Effects**: Modern translucent design elements
- **Smooth Animations**: CSS transitions and Angular animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project was created as part of the CareerFoundry Full-Stack Web Development Program.

## 🙏 Acknowledgments

- **CareerFoundry** for the project requirements and guidance
- **Angular Team** for the excellent framework and documentation
- **Angular Material** for the UI components
