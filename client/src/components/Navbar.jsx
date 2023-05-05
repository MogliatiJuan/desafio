import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="display: flex;">
			<div className=" flex justify-end space-x-6 mr-1.5 mb-5">
				<Link to="/" className="text-gray-50 text-2xl flex items-center">
					<span className="material-symbols-outlined text-2x1">home</span>Home
				</Link>
				<Link to="/register" className="text-gray-50 text-2xl ">
					Register
				</Link>
				<Link to="/login" className="text-gray-50 text-2xl">
					Login
				</Link>
				<Link to="/profile" className="text-gray-50 text-2xl flex items-center">
					<span className="material-symbols-outlined">person</span>Profile
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
