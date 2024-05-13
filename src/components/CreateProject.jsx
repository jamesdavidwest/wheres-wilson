// import { useNavigate } from "react-router-dom";
// import "./ProjectDetails.css";
// import { useEffect, useState } from "react";
// import { createProject } from "../services/getAllProjects.jsx";
// import { SuppliesList } from "./SuppliesList.jsx";
// import { getAllLocations } from "../services/Locations.js";
// import PropTypes from "prop-types";

// export const CreateProject = ({ loggedInUser }) => {
// 	const navigate = useNavigate();
// 	const [roomLocations, setRoomLocations] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [project, setProject] = useState({
// 		id: "",
// 		title: "",
// 		description: "",
// 		imageURL: "",
// 		startDate: "",
// 		endDate: "",
// 		statusId: 4, // Set default status to "Planning Stage"
// 		locationId: "",
// 		userId: loggedInUser?.id || "",
// 		supplies: [],
// 	});

// 	useEffect(() => {
// 		fetchLocations();
// 	}, []);

// 	const fetchLocations = async () => {
// 		try {
// 			const data = await getAllLocations();
// 			setRoomLocations(data);
// 		} catch (error) {
// 			console.error("Error fetching room locations at fetchLocations in CreateProject.jsx:", error);
// 		}
// 	};

// 	const handleChange = (e) => {
// 		setProject({ ...project, [e.target.name]: e.target.value });
// 	};

// 	const handleStatusChange = (e) => {
// 		setProject({ ...project, statusId: Number(e.target.value) });
// 	};

// 	const handleSuppliesChange = (updatedSupplies) => {
// 		setProject({
// 			...project,
// 			supplies: updatedSupplies,
// 		});
// 	};

// 	const handleSave = async () => {
// 		try {
// 			setIsLoading(true);
// 			const newProject = await createProject(project);
// 			navigate(`/projects/${newProject.id}`);
// 		} catch (error) {
// 			console.error("Error creating project at handleSave:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	const handleClearForm = () => {
// 		setProject({
// 			id: "",
// 			title: "",
// 			description: "",
// 			imageURL: "https://via.placeholder.com/150",
// 			startDate: "",
// 			endDate: "",
// 			statusId: 4,
// 			locationId: "",
// 			userId: loggedInUser?.id || "",
// 			supplies: [],
// 		});
// 	};

// 	// const handleDelete = async () => {
// 	// 	if (window.confirm("Are you sure you want to Delete this project?")) {
// 	// 		try {
// 	// 			await deleteProject(id);
// 	// 			navigate("/projects");
// 	// 		} catch (error) {
// 	// 			console.error("Error deleting project at handleDelete:", error);
// 	// 		}
// 	// 	}
// 	// };

// 	return (
// 		<div className="project-details">
// 			<h1>Create New Project</h1>
// 			<div className="project-info">
// 				<div className="project-image">
// 					<img src={project.imageURL} alt={project.title} />
// 					<button>Upload Project Image</button>
// 				</div>
// 				<div className="project-fields">
// 					<label>
// 						Title:
// 						<input type="text" name="title" value={project.title} onChange={handleChange} />
// 					</label>
// 					<label>
// 						Description:
// 						<textarea name="description" value={project.description} onChange={handleChange} />
// 					</label>
// 					<label>
// 						Start Date:
// 						<input type="date" name="startDate" value={project.startDate} onChange={handleChange} />
// 					</label>
// 					<label>
// 						End Date:
// 						<input type="date" name="endDate" value={project.endDate} onChange={handleChange} />
// 					</label>
// 					<label>
// 						Location:
// 						<select name="locationId" value={project.locationId} onChange={handleChange}>
// 							{roomLocations.map((location) => (
// 								<option key={location.id} value={location.id}>
// 									{location.roomName}
// 								</option>
// 							))}
// 						</select>
// 					</label>
// 				</div>
// 			</div>
// 			<div className="supplies-info">
// 				<h2>Supplies Needed</h2>
// 				<SuppliesList project={project} onSuppliesChange={handleSuppliesChange} />
// 				{/* {isFormDirty && <span className="changes-made">Changes Made - Please Click Save</span>} */}
// 			</div>
// 			<div className="project-status">
// 				<h3>Status:</h3>
// 				<label>
// 					<input type="radio" value="3" checked={Number(project.statusId) === 3} onChange={handleStatusChange} />
// 					Ongoing
// 				</label>
// 				<label>
// 					<input type="radio" value="1" checked={Number(project.statusId) === 1} onChange={handleStatusChange} />
// 					Completed
// 				</label>
// 				<label>
// 					<input type="radio" value="2" checked={Number(project.statusId) === 2} onChange={handleStatusChange} />
// 					Cancelled
// 				</label>
// 				<label>
// 					<input type="radio" value="4" checked={Number(project.statusId) === 4} onChange={handleStatusChange} />
// 					Planning Stage
// 				</label>
// 			</div>
// 			<div className="project-actions">
// 				<button onClick={handleSave} disabled={isLoading}>
// 					{isLoading ? "Saving..." : project?.id ? "Update Project" : "Create Project"}
// 				</button>
// 				<button onClick={() => navigate("/projects")}>Projects Menu</button>
// 				<button onClick={handleClearForm}>Clear Form</button>
// 			</div>
// 		</div>
// 	);
// };

// CreateProject.propTypes = {
// 	loggedInUser: PropTypes.shape({
// 		id: PropTypes.number,
// 	}),
// };
