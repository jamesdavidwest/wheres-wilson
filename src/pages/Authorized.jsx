import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

export const Authorized = ({ children, authorized }) => {
	const location = useLocation();

	if (authorized === false) {
		return <Navigate to={"/signin"} state={{ from: location }} replace />;
	} else {
		// return <div>Loading...</div>;
	}

	return <>{children}</>; 
};

Authorized.propTypes = {
	children: PropTypes.node.isRequired,
	authorized: PropTypes.bool.isRequired,
};
