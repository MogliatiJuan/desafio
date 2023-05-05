import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getDataUser } from "../api/user.api";
import FormUser from "../components/FormUser";

const Profile = () => {
	const [userData, setUserData] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const token = localStorage.getItem("token");
				const decodedToken = jwt(token);
				const result = await toast.promise(getDataUser(decodedToken.id), {
					pending: "Promise is pending",
					success: "Data loaded",
					error: "Error loading data. Please login",
				});
				setUserData(result.data);
			} catch (error) {
				toast.error(error);
			}
		};
		getData();
	}, []);

	const handleEdit = (id) => {
		setSelectedUser(id);
		setHidden(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
			{userData === "" ? (
				<h2 className=" font-serif text-lg text-gray-50 flex items-center justify-center h-screen">
					Necesitas iniciar sesión para entrar aqui.
				</h2>
			) : (
				<div className="flex flex-col items-center justify-center">
					<h2 className="text-gray-50 text-2xl font-serif">
						Welcome {userData.name}
					</h2>
					<div className="">
						<h3 className="text-gray-50 m-2">
							Information asociated with your account:
						</h3>
						<p className="text-gray-50 m-2">Name: {userData.name}</p>
						<p className="text-gray-50 m-2">Fullname: {userData.fullname}</p>
						<p className="text-gray-50 m-2">Birthday: {userData.birthday}</p>
						<p className="text-gray-50 m-2">DNI: {userData.dni}</p>
						<p className="text-gray-50 m-2">Email: {userData.email}</p>
						<p className="text-gray-50 m-2">URL image: {userData.profileImage}</p>
						<p className="text-gray-50 m-2">Personal ID: {userData.id}</p>
					</div>
					<button
						className=" flex items-center  p-1 text-gray-50 self-center my-4 w-24 border border-gray-50 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
						onClick={() => handleEdit(userData.id)}
						hidden={hidden}
					>
						<span className="material-symbols-outlined">edit</span>Edit user
					</button>
					{selectedUser === userData.id && <FormUser userId={selectedUser} />}
					<button
						className="text-gray-50 self-center my-4 w-24 border border-gray-50 rounded-md hover:bg-slate-50 hover:text-red-800 hover:text-lg hover:font-bold transition-all duration-400"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			)}
		</>
	);
};

export default Profile;
