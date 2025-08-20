# AI Genesis: Interactive Meta-Tutorial

## Overview

AI Genesis is an innovative interactive meta-tutorial website that demonstrates the process of its own creation. This full-stack TypeScript application serves as both a functional web application and a living case study, showcasing the symbiotic relationship between human creativity and artificial intelligence in modern web development.

The project features a unique narrative structure where each section represents a phase in the development process, from initial concept to deployment. It includes interactive debugging workshops, live translation demonstrations, and an innovative "Control Hub" navigation system that replaces traditional navigation patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: TailwindCSS with custom CSS variables for theming, shadcn/ui components for consistent UI patterns
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: react-i18next for multi-language support (Polish, English, Japanese)
- **Theme System**: Custom theme provider with light/dark mode support and system preference detection

### Component Architecture
- **Design System**: shadcn/ui components providing consistent, accessible UI primitives
- **Layout**: Innovative "Control Hub" - a collapsible sidebar navigation that expands on hover
- **Interactive Elements**: Custom components for debugging workshops, translation demos, and code examples
- **Accessibility**: WCAG AA compliance with proper ARIA labels, focus management, and keyboard navigation

### Backend Architecture
- **Runtime**: Express.js server with TypeScript
- **Development**: Integrated Vite development server with HMR support
- **API Structure**: RESTful endpoints for contact form submission with Zod validation
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Session Management**: Express session handling with memory storage for development

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM configured for production readiness
- **Schema Management**: Centralized schema definitions in shared directory for type safety across frontend and backend
- **Validation**: Zod schemas for runtime type validation and data integrity

### Development and Testing
- **Testing Framework**: Vitest with React Testing Library for component testing
- **Type Safety**: Strict TypeScript configuration with comprehensive type checking
- **Code Quality**: ESM modules throughout, consistent import patterns, and path aliases for clean imports

### SEO and Performance
- **Meta Management**: react-helmet-async for dynamic meta tags and SEO optimization
- **Performance**: Lazy loading, optimized builds, and efficient asset management
- **Accessibility**: Comprehensive ARIA support, semantic HTML, and keyboard navigation patterns

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for production deployment
- **@tanstack/react-query**: Advanced server state management with caching and synchronization
- **wouter**: Lightweight routing library for single-page application navigation
- **react-helmet-async**: SEO and meta tag management for improved search engine optimization
- **react-i18next**: Internationalization framework supporting multiple languages

### UI and Styling
- **@radix-ui/react-***: Comprehensive collection of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant handling for component styling
- **framer-motion**: Animation library for smooth transitions and interactive elements

### Form and Data Handling
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers, specifically Zod integration
- **zod**: Schema validation for runtime type safety and form validation

### Development Tools
- **drizzle-kit**: Database schema management and migration tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking and enhanced developer experience
- **@testing-library/react**: Testing utilities for React components
- **vitest**: Fast unit test runner with TypeScript support

### Production Deployment
- **Netlify Functions**: Serverless backend for contact form processing
- **PostgreSQL**: Production database for data persistence
- **Express.js**: Server framework for API endpoints and middleware

The architecture emphasizes type safety, developer experience, and maintainability while providing a scalable foundation for both development and production environments.