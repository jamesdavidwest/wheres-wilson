import { useCallback, useEffect, useState } from "react";
import "./Projects.css";
import { getProjectsByUserId, getProjectByStatus } from "../services/getAllProjects.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllProjectStatuses } from "../services/ProjectStatus.jsx";

export const ProjectsList = ({ loggedInUser }) => {
	const [projects, setProjects] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("");
	const navigate = useNavigate();
	const [projectStatuses, setProjectStatuses] = useState([]);

	// useEffect(() => {
	// 	fetchProjects();
	// }, [loggedInUser, selectedStatus, fetchProjects]);

	// const fetchProjects = useCallback(() => {
	// 	if (selectedStatus) {
	// 		getProjectByStatus(selectedStatus, loggedInUser.id)
	// 			.then((data) => {
	// 				const userProjects = data.filter((project) => project.userId === loggedInUser.id)
	// 				setProjects(userProjects)
	// 			})
	// 			.catch((error) => console.error("Error:", error));
	// 	} else {
	// 		getAllProjects()
	// 			.then((data) => {
	// 				const userProjects = data.filter((project) => project.userId === loggedInUser.id)
	// 				setProjects(userProjects)
	// 			})
	// 			.catch((error) => console.error("Error:", error));
	// 	}
	// }, [selectedStatus, loggedInUser.id]);

	const fetchProjects = useCallback(() => {
		if (loggedInUser && loggedInUser.id) {
			const projectFetch = selectedStatus 
				? getProjectByStatus(selectedStatus) 
				: getProjectsByUserId(loggedInUser.id);

				projectFetch.then((data) => {
					const userProjects = data.filter((project) => project.userId === loggedInUser.id);
					setProjects(userProjects);
				})
				.catch((error) => console.error(`Error at fetchProjects ${selectedStatus ? 'getProjectByStatus' : 'getProjectsByUserId'}:`, error));
		} else {
			setProjects([]);
		}
	}, [selectedStatus, loggedInUser]); 

	const handleStatusFilter = (e) => {
		setSelectedStatus(e.target.value);
	};

	useEffect(() => {
		// console.log(loggedInUser);
		fetchProjects()
	}, [selectedStatus, fetchProjects, loggedInUser]);

	useEffect(() => {
		getAllProjectStatuses()
			.then((data) => {
				setProjectStatuses(data);
			})
			.catch((error) => {
				console.error("Error fetching project statuses at useEffect in fetchProjects:", error);
			});
	}, []);

	const handleProjectClick = (projectId) => {
		navigate(`/projects/${projectId}`);
	};

	const handlesCreateProject = () => {
		navigate(`/projects/new`);
	};

	return (
		<div className="projects-container">
			<h1>Welcome to your Dashboard!</h1>
			<div className="projects-header">
				<button onClick={handlesCreateProject}>Create New Project</button>
				<select value={selectedStatus} onChange={handleStatusFilter}>
					<option value="">All Projects</option>
					<option value="1">Completed</option>
					<option value="2">Cancelled</option>
					<option value="3">Ongoing</option>
					<option value="4">Planning Stage</option>
				</select>
			</div>
			<div className="projects-grid">
				{projects.map((project) => {
					const status = projectStatuses.find((status) => status.id === project.statusId);
					const statusName = status ? status.name : "Unknown";

					const startDateString = new Date(project.startDate).toLocaleDateString("en-US", {
						year: "2-digit",
						month: "numeric",
						day: "numeric",
					});

					const endDateString = project.endDate
						? new Date(project.endDate).toLocaleDateString("en-US", {
							year: "2-digit",
							month: "numeric",
							day: "numeric",
						})
						: "TBD";

					return (
						<div className="project-card" key={project.id} onClick={() => handleProjectClick(project.id)}>
							<h3>Project #{project.id}</h3>
							<img src={project.imageURL} alt={project.title} />
							<p>{project.title}</p>
							<p>Start Date: {startDateString}</p>
							<p>End Date: {endDateString}</p>
							<p>Status: {statusName}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

ProjectsList.propTypes = {
	loggedInUser: PropTypes.shape({
		id: PropTypes.number,
	}),
};
