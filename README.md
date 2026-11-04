# Dogstudio — 3D Interactive Portfolio

An experimental 3D website inspired by dog studios. This project combines interactive 3D graphics, smooth animations, and a minimal editorial design to create an engaging browsing experience.

The main idea is to make the website feel more like an interactive experience rather than a traditional portfolio.

## ✨ Features

- **Interactive 3D Model:** A 3D dog model rendered using Three.js and React Three Fiber.
- **Matcap Transitions:** The 3D model changes its material appearance when hovering over different projects.
- **Scroll-Based Animations:** GSAP ScrollTrigger controls the model's position and rotation while scrolling.
- **Interactive Projects:** Hover over project titles to reveal their corresponding background images.
- **Custom Shader:** A GLSL-based shader creates smooth transitions between different matcap textures.
- **Responsive Layout:** Designed to provide a consistent experience across different screen sizes.
- **Minimal Design:** Dark visual theme, bold typography, and clean layouts inspired by modern creative studios.

## 🛠️ Tech Stack

| Technology         | Purpose                            |
| ------------------ | ---------------------------------- |
| React              | Building the user interface        |
| TypeScript         | Type safety and maintainable code  |
| Three.js           | 3D graphics rendering              |
| React Three Fiber  | Using Three.js with React          |
| React Three Drei   | 3D helpers and utilities           |
| GSAP               | Animations and transitions         |
| GSAP ScrollTrigger | Scroll-based animations            |
| CSS                | Layout, styling, and hover effects |

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd your-project-folder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 5. Create a Production Build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎨 How It Works

### Interactive 3D Scene

The website uses React Three Fiber to render a 3D scene containing a dog model and environmental elements.

The model uses custom Matcap materials, allowing its appearance to change dynamically without replacing the entire 3D object.

### Hover Interactions

Each project title is connected to a specific Matcap texture and background image.

When a visitor hovers over a project:

- The corresponding background image becomes visible.
- The 3D model transitions to a different material.
- Moving away restores the default material.

### Scroll Animations

GSAP and ScrollTrigger animate the 3D model as the visitor moves through the page.

The model changes its position and rotation across different sections, creating a continuous visual experience.

## 📌 Future Improvements

- Add more interactive 3D elements.
- Improve mobile interactions.
- Add smoother page transitions.
- Optimize 3D assets and rendering performance.
- Add more advanced shader effects.

## 👨‍💻 Author

**Abdul Rehman**

Web Developer | Exploring 3D Web Experiences

---

*Built with React, Three.js, and GSAP. Focused on creativity, interaction, and experimentation.*
