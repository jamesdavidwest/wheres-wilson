import { useEffect, useState } from "react";
import "./Projects.css";
import { getAllProjects, getProjectByStatus } from "../components/getAllProjects.jsx";
import { useNavigate } from "react-router-dom";

export const ProjectsList = () => {
	const [projects, setProjects] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate()

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = () => {
		if (selectedStatus) {
			getProjectByStatus(selectedStatus)
				.then((data) => setProjects(data))
				.catch((error) => console.error("Error:", error));
		} else {
			getAllProjects()
				.then((data) => setProjects(data))
				.catch((error) => console.error("Error:", error));
		}
	};

	const handleStatusFilter = (e) => {
		setSelectedStatus(e.target.value);
	};

	useEffect(() => {
		fetchProjects();
	}, [selectedStatus]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

	return (
		<div className="projects-container">
			<h1>Welcome to your Dashboard!</h1>
			<div className="projects-header">
				<button>Create New Project</button>
				<select value={selectedStatus} onChange={handleStatusFilter}>
					<option value="">All Projects</option>
					<option value="1">Completed</option>
					<option value="2">Cancelled</option>
					<option value="3">Ongoing</option>
				</select>
			</div>
			<div className="projects-grid">
				{projects.map((project) => (
					<div 
            className="project-card" 
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
          >
						<h3>Project #{project.id}</h3>
						<img src={project.imageURL} alt={project.title} />
						<p>{project.title}</p>
						<p>Status: {project.statusId}</p>
					</div>
				))}
			</div>
		</div>
	);
};
