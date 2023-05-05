import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUser } from "../api/user.api";

const FormUser = ({ userId }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		const formData = Object.keys(data).reduce((acc, input) => {
			if (data[input] !== "") {
				acc[input] = data[input];
			}
			return acc;
		}, {});
		if (Object.keys(formData).length === 0) {
			toast.info("All fields are empty");
			return;
		}
		try {
			await toast.promise(updateUser(formData, userId), {
				pending: "Promise is pending",
				success: "User updated",
				error: "Error to update user",
			});
			reset();
			window.location.reload();
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-2 ml-4 items-center"
			>
				<input
					type="text"
					{...register("name")}
					placeholder="name"
					className="w-72 rounded-sm p-1"
				/>
				<input
					type="text"
					{...register("fullname")}
					placeholder="fullname"
					className="w-72 rounded-sm p-1"
				/>
				<input
					type="date"
					{...register("birthday")}
					className="w-72 rounded-sm p-1"
				/>
				<input
					type="text"
					{...register("dni")}
					placeholder="DNI"
					className="w-72 rounded-sm p-1"
				/>
				<input
					type="text"
					{...register("email")}
					placeholder="email"
					className="w-72 rounded-sm p-1"
				/>
				<input
					type="submit"
					value="Upload"
					disabled={isSubmitting}
					className="text-gray-50 my-4 w-24 border border-gray-50 self-center rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
				/>
			</form>
		</>
	);
};

export default FormUser;
