const Home = () => {
	return (
		<div className="mx-4 sm:mx-6 md:ml-32 md:mr-28 flex flex-col justify-center gap-4  ">
			<img
				src="hero.jpg"
				alt="hero"
				className=" relative w-full object-cover"
			/>
			<div className=" text-black gap-4  w-11/12  flex flex-col justify-center  text-center ">
				<h1 className="font-bold text-4xl ">
					Unfiltered Reviews for Hostels & PGs—From Students, For Students!
				</h1>
				<p className="text-md">
					Choosing the right hostel or PG can be challenging, but with real
					reviews from students like you, it's easier than ever! Our platform
					lets you read, rate, and share genuine experiences about the places
					you’ve lived in. Whether you're looking for a budget-friendly PG or a
					comfortable hostel, get unfiltered insights before making a decision.
					Know before you move—because where you stay matters!
				</p>
			</div>
		</div>
	);
};
export default Home;
