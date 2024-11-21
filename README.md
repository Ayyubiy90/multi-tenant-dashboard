# 🏢 Multi-tenant Dashboard Analytics Platform

Welcome to the **Multi-tenant Dashboard Analytics Platform**! This project is a real-time analytics dashboard designed to serve multiple customer organizations (tenants) with different user roles and permission levels. 

## 📖 Table of Contents
- [Background](#background)
- [Core Features](#core-features)
- [Technical Requirements](#technical-requirements)
- [Assessment Tasks](#assessment-tasks)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimization](#performance-optimization)

## 📚 Background
The goal of this project is to create a secure, scalable, and efficient analytics dashboard that provides insights for different organizations while ensuring tenant isolation and data security.

## 🚀 Core Features
- **Multi-tenant Dashboard**: 
  - Displays analytics data for different organizations.
  - Implements tenant isolation to ensure data security.
  - Supports tenant-specific themes and customizations.

- **User  Management**:
  - Supports multiple user roles:
    - **Admin**: Full access to organization settings and all data.
    - **Manager**: Access to specific department data and team management.
    - **Viewer**: Read-only access to assigned dashboards.
  - Implements role-based access control (RBAC).

- **Analytics Display**:
  - Creates widgets for displaying:
    - Daily active users
    - Revenue metrics
    - User engagement statistics
  - Implements real-time updates.
  - Allows widget customization based on user permissions.

## 🔧 Technical Requirements
- **Architecture**:
  - Built using Next.js 14+ with App Router.
  - Proper route organization for multi-tenant support.
  - Scalable state management solution.

- **Performance Optimization**:
  - Efficient data fetching strategies.
  - Proper caching mechanisms.
  - Optimization for large datasets.
  - Handling of concurrent user sessions.

- **Code Organization**:
  - Follows component-driven development.
  - Implements proper type safety with TypeScript.
  - Creates reusable hooks and utilities.

## 📝 Assessment Tasks
### Task 1: Multi-tenant Route Structure
- Create a route structure that supports:
  - `/[tenant]/dashboard`
  - `/[tenant]/settings`
  - `/[tenant]/users`
  
- Demonstrate:
  - Handling tenant-specific middleware.
  - Implementing tenant isolation.
  - Managing tenant-specific configurations.

### Task 2: Real-time Dashboard Widget
- Create a reusable dashboard widget component that:
  - Accepts different data types.
  - Implements real-time updates.
  - Handles loading and error states.
  - Considers performance optimization.
  - Implements proper access control based on user role.

### Task 3: Performance Optimization
- Optimize the dashboard for performance by:
  - Implementing efficient data fetching.
  - Using proper caching strategies.
  - Handling server-side vs client-side rendering decisions.
  - Implementing pagination or infinite scroll for large datasets.

## 💻 Installation
To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayyubiy90/multi-tenant-dashboard.git
   ```

2. Navigate to the project directory:
    ```bash
    cd multi-tenant-dashboard
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

## 🏗️ Usage
- Access the dashboard by navigating to http://localhost:3000/[tenant]/dashboard.
- Use different tenant IDs to see how the dashboard adapts to different organizations.

## 🏛️ Architecture Decisions
- Utilized Next.js for its server-side rendering capabilities, enhancing performance and SEO.
- Implemented a modular architecture to facilitate easy maintenance and scalability.

## ⚡ Performance Optimization
- Implemented caching strategies using React Query to minimize data fetching.
- Optimized rendering decisions to balance client-side and server-side rendering based on user roles and data sensitivity.