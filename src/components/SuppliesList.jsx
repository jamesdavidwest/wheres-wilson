import { useState } from "react";
import "./SuppliesList.css";
import { getSupplyByName } from "../services/Supplies.jsx";
import PropTypes from "prop-types";

export const SuppliesList = ({ project, onSuppliesChange }) => {
	const [newSupplyName, setNewSupplyName] = useState("");
	const [newSupplyQuantity, setNewSupplyQuantity] = useState(1);
	const [newSupplyPrice, setNewSupplyPrice] = useState(0);

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
			id: Date.now(),
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

	return (
		<div className="supplies-list">
			{project?.supplies?.length > 0 && (
				<table>
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
									<button onClick={() => handleDeleteSupply(supply)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{!project?.supplies?.length && <div>Add some supplies!</div>}
			<div className="add-new-item">
				<input
					type="text"
					placeholder="Item Name"
					name="newSupplyName"
					value={newSupplyName}
					onChange={(e) => setNewSupplyName(e.target.value)}
					onBlur={handleNewSupplyPriceLookup}
				/>
				<input type="number" min="1" name="Quantity" placeholder="Quantity" value={newSupplyQuantity} onChange={handleSupplyQuantity} />
				<input
					type="number"
					min="0.01"
					step="0.01"
					name="Price Per Unit"
					placeholder="Price Per Unit"
					value={newSupplyPrice}
					onChange={(e) => setNewSupplyPrice(e.target.value)}
				/>
				<br />
				<br />
				<button onClick={handleAddNewSupply}>Add New Item</button>
			</div>

			<div className="total-cost">
				<h4>Total Cost: ${totalCost.toFixed(2)}</h4>
			</div>
		</div>
	);
};

SuppliesList.propTypes = {
	project: PropTypes.object.isRequired,
	onSuppliesChange: PropTypes.func.isRequired,
};
