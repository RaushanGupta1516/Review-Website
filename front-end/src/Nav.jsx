const Nav = () => {
	return (
		<div className="flex justify-between items-center py-4 px-6 mb-3 md:px-16 lg:px-32 relative">
			<div className="flex items-center gap-3">
				<img src="logo.png" alt="logo" className="h-20" />
			</div>

			<div className="md:flex">
				<ul className="flex justify-center gap-5 font-semibold text-sm lg:text-base">
					<li>Home</li>

					<li>Reviews</li>

					<li>About</li>

					</ul>
			</div>

			<div className=" md:flex gap-4">
				<button className="border border-blue-800 text-xs md:text-sm rounded-full px-4 py-1">
					Add Review
				</button>
				<button className="border border-blue-800 text-xs md:text-sm rounded-full px-4 py-1">
					Sign In
				</button>
			</div>
		</div>
	);
};
export default Nav;
