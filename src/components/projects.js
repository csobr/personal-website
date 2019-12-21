import React from "react";

const Projects = ({ projects, loading }) => {
  if (loading) {
    return (
      <div className="loader">
        <div className="circle circle-fill"></div>
      </div>
    );
  }
  return (
    <div>
      {projects.map(project => (
        <div key={project.name}>
          <div className="item">
            <div className="item--image">
              <img
                loading="lazy"
                src={project.backgroundImage}
                alt="Project Image"
              ></img>
            </div>
            <div className="item--text">
              <p className="item--name">{project.name}</p>
              <p className="item--year">{project.year}</p>
              <p className="item--description">{project.description}</p>
              <p className="item--stack">{project.stack}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
