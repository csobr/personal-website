import React, { useState, useEffect } from 'react';
import Projects from '../components/projects';
import Pagination from '../components/pagination';
import axios from 'axios';

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(1);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const res = await axios.get('projects.json').then();
      setProjects(res.data);
      setLoading(false);
    };
    fetchProject();
  }, []);

  //Get current project
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <main>
      <div className="projects--wrapper">
        <h2 className="projects--header">Projects</h2>
        <div className="grid">
          <Projects projects={currentProjects} loading={loading} />
          <Pagination
            projectsPerPage={projectsPerPage}
            totalProjects={projects.length}
            paginate={paginate}
          />
        </div>
      </div>
    </main>
  );
}
export default Project;
