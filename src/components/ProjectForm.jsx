import { useNavigate, useParams } from "react-router-dom";
import "./ProjectForm.css";
import { useCallback, useEffect, useState } from "react";
import { getProjectById, createProject, deleteProject, updateProject } from "../services/getAllProjects.jsx";
import { SuppliesList } from "./SuppliesList.jsx";
import { getAllLocations } from "../services/Locations.js";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export const ProjectForm = ({ loggedInUser }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [roomLocations, setRoomLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [initialFormState, setInitialFormState] = useState({});
	const [isFormDirty, setIsFormDirty] = useState(false);
	const [project, setProject] = useState({
		id: "",
		title: "",
		description: "",
		imageURL: "",
		startDate: "",
		endDate: "",
		statusId: 4,
		locationId: "",
		userId: loggedInUser?.id || "",
		supplies: [],
	});

	const fetchProject = useCallback(async () => {
		try {
			const data = await getProjectById(id);
			setProject({
				...data,
				locationId: data.locationId || "",
			});
			setInitialFormState(JSON.stringify(data));
		} catch (error) {
			console.error("Error fetching project at fetchProject in ProjectDetails.jsx:", error);
		}
	}, [id]);

	const fetchLocations = useCallback(async () => {
		try {
			const data = await getAllLocations();
			setRoomLocations(data);
		} catch (error) {
			console.error("Error fetching room locations at fetchLocations in CreateProject.jsx:", error);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(project).length > 0) {
			setIsFormDirty(JSON.stringify(project) !== initialFormState);
		}
	}, [project, initialFormState]);

	useEffect(() => {
		if (id) {
			fetchProject();
		}

		fetchLocations();
	}, [id, fetchProject, fetchLocations]);

	const handleChange = (e) => {
		setProject({ ...project, [e.target.name]: e.target.value });
	};

	const handleStatusChange = (e) => {
		setProject({ ...project, statusId: Number(e.target.value) });
	};

	const handleSuppliesChange = (updatedSupplies) => {
		setProject({
			...project,
			supplies: updatedSupplies,
		});
	};

	const handleSave = async () => {
		setIsLoading(true);

		// If status is cancelled, automatically set end date
		// if (project?.statusId === 2) {

		// }

		if (project?.id) {
			await handleUpdate();
		} else {
			await handleCreate();
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const handleCreate = async () => {
		try {
			const newProject = await createProject(project);
			navigate(`/projects/${newProject.id}`);
		} catch (error) {
			console.error("Error creating project at handleSave:", error);
		}
	};

	const handleUpdate = async () => {
		try {
			await updateProject(id, { ...project });
			fetchProject();
		} catch (error) {
			console.error("Error updating project at handleSave:", error);
		}
	};

	const handleClearForm = () => {
		setProject({
			id: "",
			title: "",
			description: "",
			imageURL: "https://via.placeholder.com/150",
			startDate: "",
			endDate: "",
			statusId: 4,
			locationId: "",
			userId: loggedInUser?.id || "",
			supplies: [],
		});
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to Delete this project?")) {
			try {
				await deleteProject(id);
				navigate("/projects");
			} catch (error) {
				console.error("Error deleting project at handleDelete:", error);
			}
		}
	};

	return (
		<Container className="project-form">
			<Row>
				<Col>
					<h1 className="project-form-header">{project?.id ? `Project #${project.id}` : "Create New Project"}</h1>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Card className="project-image-card">
						<div className="project-image-container">
							<Card.Img variant="top" src={project.imageURL} alt={project.title} className="project-image" />
						</div>
						<Card.Body>
							<Form.Label className="project-details">Image URL</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Image URL"
								value={project.imageURL}
								onChange={(e) =>
									handleChange({
										target: { name: "imageURL", value: e.target.value },
									})
								}
							/>
						</Card.Body>
					</Card>
				</Col>

				<Col md={8}>
					<Form>
						<Form.Group controlId="title" className="project-details-card">
							<Form.Label className="project-details">Title</Form.Label>
							<Form.Control type="text" name="title" value={project.title} onChange={handleChange} />
						</Form.Group>
						<Form.Group controlId="description" className="project-details-card">
							<Form.Label className="project-details">Description</Form.Label>
							<Form.Control as="textarea" rows={3} name="description" value={project.description} onChange={handleChange} />
						</Form.Group>
						<Row>
							<Col>
								<Form.Group controlId="startDate" className="project-details-card">
									<Form.Label className="project-details">Start Date</Form.Label>
									<Form.Control type="date" name="startDate" value={project.startDate} onChange={handleChange} />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="endDate" className="project-details-card">
									<Form.Label className="project-details">End Date</Form.Label>
									<Form.Control type="date" name="endDate" value={project.endDate} onChange={handleChange} />
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="location" className="project-details-card">
									<Form.Label className="project-details">Location</Form.Label>
									<Form.Control as="select" name="locationId" value={project.locationId} onChange={handleChange}>
										{roomLocations.map((location) => (
											<option key={location.id} value={location.id}>
												{location.roomName}
											</option>
										))}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="status" className="project-details-card">
									<Form.Label className="project-details">Status</Form.Label>
									<Form.Check
										type="radio"
										id="ongoing"
										label="Ongoing"
										value="3"
										checked={Number(project.statusId) === 3}
										onChange={handleStatusChange}
									/>
									<Form.Check
										type="radio"
										id="completed"
										label="Completed"
										value="1"
										checked={Number(project.statusId) === 1}
										onChange={handleStatusChange}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="status" className="project-details-card">
									<Form.Label className="project-details">&#8203;</Form.Label>
									<Form.Check
										type="radio"
										id="cancelled"
										label="Cancelled"
										value="2"
										checked={Number(project.statusId) === 2}
										onChange={handleStatusChange}
									/>
									<Form.Check
										type="radio"
										id="planning"
										label="Planning Stage"
										value="4"
										checked={Number(project.statusId) === 4}
										onChange={handleStatusChange}
									/>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col>
					<SuppliesList project={project} onSuppliesChange={handleSuppliesChange} />
					{isFormDirty && <span className="changes-made">Changes Made - Please Click Save</span>}
				</Col>
			</Row>

			<Row>
				<Col className="text-right">
					<Button variant="primary" onClick={handleSave} disabled={isLoading}>
						{isLoading ? "Saving..." : project?.id ? "Update Project" : "Create Project"}
					</Button>
					{!project?.id && (
						<Button variant="secondary" onClick={handleClearForm}>
							Clear Form
						</Button>
					)}
					{project?.id && (
						<Button variant="danger" onClick={handleDelete}>
							Delete Project
						</Button>
					)}
					{!project?.id && (
						<Button variant="link" onClick={() => navigate("/projects")}>
							Cancel
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
};

ProjectForm.propTypes = {
	loggedInUser: PropTypes.shape({
		id: PropTypes.number,
	}),
};
