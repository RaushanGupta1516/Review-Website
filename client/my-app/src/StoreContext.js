import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [token, setToken] = useState("");
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [review_list, setreview_list] = useState([]);
	const apiUrl = "http://localhost:2000";

	const getReviewList = async () => {
		try {
			let res = await axios.get(apiUrl + "/review");
			setreview_list(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getUserData = async (token) => {
		try {
			const res = await axios.get(`${apiUrl}/user/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setLoggedInUser(res.data.user);
		} catch (error) {
			console.log("Failed to fetch user data:", error);
			setLoggedInUser(null);
		}
	};

	useEffect(() => {
		const initialize = async () => {
			await getReviewList();
			const savedToken = localStorage.getItem("token");
			if (savedToken) {
				setToken(savedToken);
				await getUserData(savedToken);
			}
		};
		initialize();
	}, []);

	const contextVal = {
		review_list,
		apiUrl,
		token,
		setToken,
		loggedInUser,
		setLoggedInUser,
		getUserData, 
	};

	return (
		<StoreContext.Provider value={contextVal}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
