import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetails.css";
import { useCallback, useEffect, useState } from "react";
import { getProjectById, updateProject, deleteProject } from "../services/getAllProjects.jsx";
import { SuppliesList } from "./SuppliesList.jsx";

export const ProjectDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [status, setStatus] = useState("");

	const fetchProject = useCallback(async () => {
		try {
			const data = await getProjectById(id);
			setProject(data);
			setStatus(data.status);
		} catch (error) {
			console.error("Error fetching project at fetchProject in ProjectDetails.jsx:", error);
		}
	}, [id]);

	useEffect(() => {
		fetchProject();
	}, [fetchProject]);

	const handleChange = (e) => {
		setProject({ ...project, [e.target.name]: e.target.value });
	};

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	};

	const handleSave = async () => {
		try {
			await updateProject(id, { ...project, status });
		} catch (error) {
			console.error("Error updating project at handleSave:", error);
		}
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

	if (!project) {
		return <div>Loading...</div>;
	}

	return (
		<div className="project-details">
			<h1>Project #{project.id}</h1>
			<div className="project-info">
				<div className="project-image">
					<img src={project.imageURL} alt={project.title} />
					<button>Upload Project Image</button>
				</div>
				<div className="project-fields">
					<label>
						Title:
						<input type="text" name="title" value={project.title} onChange={handleChange} />
					</label>
					<label>
						Description:
						<textarea name="description" value={project.description} onChange={handleChange} />
					</label>
					<label>
						Start Date:
						<input type="date" name="startDate" value={project.startDate} onChange={handleChange} />
					</label>
					<label>
						End Date:
						<input type="date" name="endDate" value={project.endDate} onChange={handleChange} />
					</label>
					<label>
						Location:
						<input type="text" name="location" value={project.location} onChange={handleChange} />
					</label>
				</div>
			</div>
			<div className="supplies-info">
				<h2>Supplies Needed</h2>
				<SuppliesList projectId={project.id} />
			</div>
			<div className="project-status">
				<h3>Status:</h3>
				<label>
					<input type="radio" value="Ongoing" checked={status === "Ongoing"} onChange={handleStatusChange} />
					Ongoing
				</label>
				<label>
					<input type="radio" value="Completed" checked={status === "Completed"} onChange={handleStatusChange} />
					Completed
				</label>
				<label>
					<input type="radio" value="Cancelled" checked={status === "Cancelled"} onChange={handleStatusChange} />
					Cancelled
				</label>
			</div>
			<div className="project-actions">
				<button onClick={handleSave}>Save Changes</button>
				<button onClick={() => navigate("/projects")}>Projects Menu</button>
				<button onClick={handleDelete}>Delete Project</button>
			</div>
		</div>
	);
};
