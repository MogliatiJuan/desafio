import { useForm } from "react-hook-form";
import { registerUser } from "../api/user.api";
import { toast } from "react-toastify";

const Form = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("fullname", data.fullname);
			formData.append("birthday", data.birthday);
			formData.append("dni", data.dni);
			formData.append("email", data.email);
			formData.append("password", data.password);
			formData.append("profileImage", data.profileImage[0]);
			await registerUser(formData);
			toast.success("User registered");
			reset();
		} catch (error) {
			toast.error(error.data);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col space-y-8 border-2 rounded-lg p-4"
		>
			<input
				className="w-80 rounded-sm p-1 text-gray-900"
				type="text"
				{...register("name", {
					required: "First name is required",
					minLength: 3,
					maxLength: 16,
				})}
				aria-invalid={errors.name ? "true" : "false"}
				placeholder="First Name"
			/>
			{errors.name && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.name?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1"
				type="text"
				{...register("fullname", {
					required: "Last name is required",
					minLength: 2,
					maxLength: 50,
				})}
				aria-invalid={errors.fullname ? "true" : "false"}
				placeholder="Last Name"
			/>
			{errors.fullname && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.fullname?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1"
				type="date"
				{...register("birthday", {
					required: "Date of birth is required",
					valueAsDate: true,
				})}
				aria-invalid={errors.birthday ? "true" : "false"}
				placeholder="YYYY-MM-DD"
			/>
			{errors.birthday && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.birthday?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1"
				type="text"
				{...register("dni", { required: "DNI is required", maxLength: 16 })}
				aria-invalid={errors.dni ? "true" : "false"}
				placeholder="DNI"
			/>
			{errors.dni && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.dni?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1"
				type="email"
				{...register("email", {
					required: "Email address is required",
					maxLength: 100,
					pattern:
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				})}
				aria-invalid={errors.email ? "true" : "false"}
				placeholder="name@example.com"
			/>
			{errors.email && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.email?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1"
				type="password"
				{...register("password", {
					required: "Password is required",
					minLength: 6,
					maxLength: 100,
				})}
				aria-invalid={errors.password ? "true" : "false"}
				placeholder="Password"
			/>
			{errors.password && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span class="material-symbols-outlined">info</span>
					{errors.password?.message}
				</p>
			)}
			<input
				className="w-80 rounded-sm p-1 text-slate-50"
				type="file"
				{...register("profileImage", {
					required: "Profile image is required",
					maxLength: 255,
				})}
				aria-invalid={errors.profileImage ? "true" : "false"}
				placeholder="Profile image"
				accept="image/jpeg, image/png, image/jpg"
			/>
			{errors.profileImage && (
				<p role="alert" className="text-slate-50 flex items-center">
					<span className="material-symbols-outlined">info</span>
					{errors.profileImage?.message}
				</p>
			)}

			<input
				type="submit"
				value="Register"
				disabled={isSubmitting}
				className="text-gray-50 my-4 w-24 border border-gray-50 self-center rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
			/>
		</form>
	);
};

export default Form;
