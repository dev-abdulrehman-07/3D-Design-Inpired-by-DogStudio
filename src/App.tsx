import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene.Comp";
import HeroSection from "./components/HeroSection.comp";
import ProjectsSection from "./components/ProjectsSection.comp";
import EndingSection from "./components/EndingSection.comp";
import { projects } from "./data/Project.data";

function App() {
  return (
    <main>
      <div className="images">
        {projects.map((project) => (
          <img
            key={project.id}
            id={project.id}
            src={project.image}
            alt={project.title}
          />
        ))}
      </div>

      <Canvas
        id="canvas-elem"
        camera={{ position: [0, 0, 0.7], fov: 45 }}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Scene />
      </Canvas>

      <HeroSection />
      <ProjectsSection />
      <EndingSection />
    </main>
  );
}

export default App;
