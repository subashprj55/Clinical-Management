# Clinical Management System

A React-based clinical management application designed to efficiently manage and display patient information. The application is styled with Ant Design and Tailwind CSS for a modern look and optimized for responsive, user-friendly interactions.

## Demo

[Live Demo Link](https://clinical-management-amber.vercel.app) 


## Installation

To get started with this project, clone the repository and install the required dependencies:

## Clone the repository
` git clone https://github.com/subashprj55/Clinical-Management.git `

## Navigate to the project directory
`cd Clinical-Management`

## Install dependencies
`npm install`

---


## Usage

### Development Server

To start the development server, run:

```bash
npm start
```

This will run the application locally at [http://localhost:3000](http://localhost:3000).

### Build

To build the application for production, run:

```bash
npm run build
```

The production build will be available in the `build/` directory.


---

## Dependencies

The project uses the following key dependencies:

- **React**: Version `^19.0.0` for building the UI.
- **TypeScript**: Version `^4.4.2` for type-safe development.
- **Ant Design**: Version `^5.23.2` for UI components.
- **Zustand**: Version `^5.0.3` for state management.
- **React Icons**: Version `^5.4.0` for a wide range of icons.


---

## Key Components

### Breadcrumb Section
Displays the navigation path using Ant Design's `Breadcrumb` component.

### Heading Section
Handles the application heading, filter toggles, and notification system.

### Patients Info Section
Displays an overview of patient stats like the number of new patients, average wait time, and urgent cases using custom cards.

### Table Section
Interactive table with filtering, pagination, and customizable columns.

