import { useCallback, useEffect, useState } from "react";
import "./SuppliesList.css";
import { createSupply, getSuppliesByProjectId, getSupplyByName, updateSupply } from "../services/Supplies.jsx";
import PropTypes from "prop-types";

export const SuppliesList = ({ projectId }) => {
	const [supplies, setSupplies] = useState([]);
	const [newSupplyName, setNewSupplyName] = useState("");
	const [newSupplyQuantity, SetNewSupplyQuantity] = useState(1);
	const [newSupplyPrice, setNewSupplyPrice] = useState(0);

	const fetchSupplies = useCallback(async () => {
		try {
			const data = await getSuppliesByProjectId(projectId);
			setSupplies(data);
		} catch (error) {
			console.error("Error fetching supplies at fetchSupplies:", error);
		}
	}, [projectId]);

	useEffect(() => {
		fetchSupplies();
	}, [fetchSupplies]);

	const handleAddNewSupply = async () => {
		try {
			let supply = await getSupplyByName(newSupplyName);
			if (!supply) {
				supply = await createSupply({ name: newSupplyName, costEach: 0 });
			}
			await updateSupply(supply.id, { projectId, quantity: newSupplyQuantity });
			setNewSupplyName("");
			SetNewSupplyQuantity(1);
			setNewSupplyPrice(0);
			fetchSupplies();
		} catch (error) {
			console.error("Error adding new supply at handleAddNewSupply:", error);
		}
	};

	const totalCost = supplies.reduce((total, supply) => total + supply.costEach * supply.quantity, 0);

	return (
		<div className="supplies-list">
			<h3>Supplies</h3>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{supplies.map((supply) => (
						<tr key={supply.id}>
							<td>{supply.name}</td>
							<td>{supply.quantity}</td>
							<td>${supply.costEach.toFixed(2)}</td>
							<td>${(supply.costEach * supply.quantity).toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="add-new-item">
				<input type="text" placeholder="Item Name" value={newSupplyName} onChange={(e) => setNewSupplyName(e.target.value)} />
				<input
					type="number"
					min="1"
					placeholder="Quantity"
					value={newSupplyQuantity}
					onChange={(e) => SetNewSupplyQuantity(parseInt(e.target.value))}
				/>
				<input
					type="number"
					min="0.01"
					step="0.01"
					placeholder="Price Per Unit"
					value={newSupplyPrice}
					onChange={(e) => SetNewSupplyQuantity(parseFloat(e.target.value))}
				/>
				<button onClick={handleAddNewSupply}>Add New Item</button>
			</div>
			<div className="total-cost">
				<h4>Total Cost: ${totalCost.toFixed(2)}</h4>
			</div>
		</div>
	);
};

SuppliesList.propTypes = {
	projectId: PropTypes.number.isRequired,
};
