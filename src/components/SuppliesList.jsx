import { useState } from "react";
import "./SuppliesList.css";
import { getSupplyByName } from "../services/Supplies.jsx";
import PropTypes from "prop-types";
import { Table, Form, Button, Row, Col } from "react-bootstrap";

export const SuppliesList = ({ project, onSuppliesChange }) => {
	const [newSupplyName, setNewSupplyName] = useState("");
	const [newSupplyQuantity, setNewSupplyQuantity] = useState("");
	const [newSupplyPrice, setNewSupplyPrice] = useState("");

	const handleNewSupplyPriceLookup = async (e) => {
		const name = e.target.value;

		try {
			const supply = await getSupplyByName(name);

			if (supply) {
				setNewSupplyPrice(supply.costEach.toFixed(2));
			} else {
				setNewSupplyPrice("");
			}
		} catch (error) {
			console.error("Error fetching supply by name at handleNewSupplyPriceLookup:", error);
		}
	};

	const handleAddNewSupply = () => {
		if (!newSupplyName) {
			console.error("Missing supply name");

			return;
		}

		if (!newSupplyQuantity) {
			console.error("Missing supply quantity");

			return;
		}

		if (!newSupplyPrice) {
			console.error("Missing price");

			return;
		}

		const newSupply = {
			id: crypto.randomUUID(),
			name: newSupplyName,
			quantity: newSupplyQuantity,
			costEach: parseFloat(newSupplyPrice),
		};

		onSuppliesChange([...project.supplies, newSupply]);
		setNewSupplyName("");
		setNewSupplyQuantity(1);
		setNewSupplyPrice("");
	};

	const handleDeleteSupply = (supply) => {
		const newSupplies = project.supplies.filter(({ id }) => id !== supply.id);

		onSuppliesChange(newSupplies);
	};

	const totalCost = project?.supplies?.reduce((total, supply) => total + (supply.costEach || 0) * (supply.quantity || 0), 0) ?? 0;

	const handleSupplyQuantity = (e) => {
		const { value } = e.target;

		if (value) {
			setNewSupplyQuantity(parseInt(value));
		} else {
			setNewSupplyQuantity("");
		}
	};

	const handlePriceChange = (e) => {
		setNewSupplyPrice(e.target.value);
	};

	return (
		<div className="supplies-list">
			<Row>
				<Col md={4}>
					<h4>Add New Supply</h4>
					<div className="add-new-item">
						<Form.Group controlId="newSupplyName">
							<Form.Label>Item Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter item name"
								name="newSupplyName"
								value={newSupplyName}
								onChange={(e) => setNewSupplyName(e.target.value)}
								onBlur={handleNewSupplyPriceLookup}
							/>
						</Form.Group>
						<Form.Group controlId="newSupplyQuantity">
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type="number"
								min="1"
								name="Quantity"
								placeholder="Enter quantity"
								value={newSupplyQuantity}
								onChange={handleSupplyQuantity}
							/>
						</Form.Group>
						<Form.Group controlId="newSupplyPrice">
							<Form.Label>Price Per Unit</Form.Label>
							<Form.Control
								type="text"
								name="Price Per Unit"
								placeholder="Enter item price"
								value={newSupplyPrice}
								onChange={handlePriceChange}
							/>
						</Form.Group>
						<Button variant="primary" onClick={handleAddNewSupply}>
							Add New Item
						</Button>
					</div>
				</Col>
				<Col md={8}>
					<h4>Current Project Supplies</h4>
					{project?.supplies?.length > 0 ? (
						<Table striped bordered>
							<thead>
								<tr>
									<th>Name</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{project?.supplies?.map((supply, index) => (
									<tr key={index}>
										<td>{supply.name}</td>
										<td>{supply.quantity || 1}</td>
										<td>${(supply.costEach || 0).toFixed(2)}</td>
										<td>${((supply.costEach || 0) * (supply.quantity || 0)).toFixed(2)}</td>
										<td>
											<Button variant="danger" size="sm" onClick={() => handleDeleteSupply(supply)}>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					) : (
						<div>No supplies added yet.</div>
					)}
					<div className="total-cost">
						<h4>Total Cost: ${totalCost.toFixed(2)}</h4>
					</div>
				</Col>
			</Row>
		</div>
	);
};

SuppliesList.propTypes = {
	project: PropTypes.object.isRequired,
	onSuppliesChange: PropTypes.func.isRequired,
};
