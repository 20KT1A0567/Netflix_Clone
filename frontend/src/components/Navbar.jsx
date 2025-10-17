import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();
	const { setContentType } = useContentStore();
	const navigate = useNavigate();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
			{/* Left Section - Logo and Links */}
			<div className="flex items-center gap-10 z-50">
				<Link to="/">
					<img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40" />
				</Link>

				<div className="hidden sm:flex gap-4 items-center text-white">
					<Link to="/" className="hover:underline" onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to="/" className="hover:underline" onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to="/history" className="hover:underline">
						Search History
					</Link>
				</div>
			</div>

			{/* Right Section - Search, Avatar, Logout, Menu */}
			<div className="flex gap-3 items-center z-50 text-white">
				<Link to="/search">
					<Search className="size-6 cursor-pointer hover:text-gray-300" />
				</Link>

				<img
					src={user?.image ? user.image : "/defaultAvatar.png"}
					alt="Avatar"
					className="h-8 w-8 rounded-full object-cover cursor-pointer border border-gray-500"
					onClick={() => navigate("/profile")}
				/>

				<LogOut
					className="size-6 cursor-pointer hover:text-red-400"
					onClick={logout}
				/>

				<div className="sm:hidden">
					<Menu
						className="size-6 cursor-pointer hover:text-gray-300"
						onClick={toggleMobileMenu}
					/>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 text-white">
					<Link to="/" className="block hover:underline p-2" onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to="/" className="block hover:underline p-2" onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to="/history" className="block hover:underline p-2" onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
	);
};

export default Navbar;
