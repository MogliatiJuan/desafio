import { useEffect, useState } from "react";
import { desactivateUser, home } from "../api/user.api";
import { toast } from "react-toastify";
import FormUpdate from "../components/FormUpdate";

const Home = () => {
	const [data, setData] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await toast.promise(home(), {
					pending: "Promise is pending",
					success: "Data loaded",
					error: "Error loading data. Please login",
				});
				setData(result.data);
			} catch (error) {
				toast.error(error);
			}
		};
		getData();
	}, []);

	const handleClick = async (id) => {
		try {
			await toast.promise(desactivateUser(id), {
				pending: "Promise is pending",
				success: "User desactivated",
				error: "Error to desactivate user",
			});
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			toast.error(error);
		}
	};

	const handleEdit = (id) => {
		setSelectedUser(id);
		setHidden(true);
	};

	return (
		<div>
			{Array.isArray(data) ? (
				<>
					<h2 className="text-gray-50 text-3xl ml-2">List of users:</h2>

					<ul>
						{data.map((user) => (
							<div key={user.id} className="flex flex-col justify-center my-6">
								<li className="text-gray-50 text-3xl self-center font-serif">
									Name: {user.name}
								</li>
								<img
									className="w-44 max-w-xs self-center"
									src={user.profileImage}
								/>
								<button
									className="flex flex-row justify-center items-center text-gray-50 my-4 p-2 w-28 border border-gray-50 self-center rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
									onClick={() => handleEdit(user.id)}
									hidden={hidden}
								>
									<span className="material-symbols-outlined p-1">edit</span>{" "}
									Edit user
								</button>
								<button
									className=" flex flex-row justify-center items-center text-gray-50 self-center my-4 w-28 p-2 border border-gray-50 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
									onClick={() => handleClick(user.id)}
								>
									<span className="material-symbols-outlined">block</span>
									Desactivate
								</button>
								{selectedUser === user.id && (
									<FormUpdate userId={selectedUser} />
								)}
							</div>
						))}
					</ul>
				</>
			) : (
				<h1 className="text-gray-50 text-3xl ml-2">{data}</h1>
			)}
		</div>
	);
};

export default Home;
