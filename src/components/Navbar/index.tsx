import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Navbar = () => {

	const supabaseClient = useSupabaseClient();

	const { user } = useUser();

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
	};

	return (
		<div className="py-4 mx-auto">
			<div className="relative flex items-center justify-between">
				<Link
					href="/"
					aria-label="Company"
					title="Company"
					className="inline-flex items-center">
					<span className="text-xl font-bold tracking-wide uppercase">
						LOGO.
					</span>
				</Link>
				
				<div className="items-center gap-4">
					{!user ? (
						<>
							<button>
								<Link href="/sign-in">Login</Link>
							</button>
						</>
					) : (
						<>
							<button type="button">
								<Link href="/dashboard">Dashboard</Link>
							</button>
							<button onClick={handleLogout}>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
