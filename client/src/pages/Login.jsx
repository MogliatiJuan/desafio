import { useForm } from "react-hook-form";
import { loginUser } from "../api/user.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		await loginUser(data);
		reset();
		navigate("/");
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-8 border-2 rounded-lg p-4"
			>
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
						{" "}
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
						{" "}
						<span className="material-symbols-outlined">info</span>
						{errors.password?.message}
					</p>
				)}
				<input
					type="submit"
					value="Login"
					disabled={isSubmitting}
					className="text-gray-50 my-4 w-24 border border-gray-50 self-center rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors duration-400 active:-translate-y-1"
				/>
			</form>
		</div>
	);
};

export default Login;
