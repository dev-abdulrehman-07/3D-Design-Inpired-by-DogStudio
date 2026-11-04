import { projects } from "../data/Project.data";

function ProjectsSection() {
    return (
        <section id="section-2" className="projects-section">
            

            <div className="titles">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        img-title={project.id}
                        className="title"
                    >
                        <div className="title-meta">
                            <small>{project.date}</small>
                            <small>0{index + 1}</small>
                        </div>

                        <h1>{project.title}</h1>

                        <i className="ri-arrow-up-right-line project-arrow" />
                    </div>
                ))}
            </div>
        </section>
    );
}
export default ProjectsSection
