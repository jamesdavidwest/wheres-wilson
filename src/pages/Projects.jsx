import { useCallback, useEffect, useState } from "react";
import "./Projects.css";
import { getProjectsByUserId, getProjectByStatus } from "../services/getAllProjects.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllProjectStatuses } from "../services/ProjectStatus.jsx";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

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
			const projectFetch = selectedStatus ? getProjectByStatus(selectedStatus) : getProjectsByUserId(loggedInUser.id);

			projectFetch
				.then((data) => {
					const userProjects = data.filter((project) => project.userId === loggedInUser.id);
					setProjects(userProjects);
				})
				.catch((error) => console.error(`Error at fetchProjects ${selectedStatus ? "getProjectByStatus" : "getProjectsByUserId"}:`, error));
		} else {
			setProjects([]);
		}
	}, [selectedStatus, loggedInUser]);

	const handleStatusFilter = (e) => {
		setSelectedStatus(e.target.value);
	};

	useEffect(() => {
		// console.log(loggedInUser);
		fetchProjects();
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
		<Container className="projects-container">
			<h1 className="projects-header">Projects Dashboard</h1>
			<div className="projects-create-status">
				<Button variant="primary" size="sm" onClick={handlesCreateProject}>
					Create New Project
				</Button>
				<Form.Select value={selectedStatus} onChange={handleStatusFilter} size="sm">
					<option value="">All Projects</option>
					<option value="1">Completed</option>
					<option value="2">Cancelled</option>
					<option value="3">Ongoing</option>
					<option value="4">Planning Stage</option>
				</Form.Select>
			</div>
			<Row className="projects-grid">
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
						<Col key={project.id} xs={12} sm={6} md={4} lg={3}>
							<div className="project-card" onClick={() => handleProjectClick(project.id)}>
								<img src={project.imageURL} alt={project.title} className="project-card-img" />
								<h3>Project #{project.id}</h3>
								<p>
									<b>{project.title}</b>
								</p>
								<p>Started on {startDateString}</p>
								<p>Ended on {endDateString}</p>
								<p>Status: {statusName}</p>
							</div>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

ProjectsList.propTypes = {
	loggedInUser: PropTypes.shape({
		id: PropTypes.number,
	}),
};
