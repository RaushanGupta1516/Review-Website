
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
	const [token, setToken] = useState("");
	const apiUrl = "http://localhost:2000";
	const [review_list, setreview_list] = useState([]);
	

	const getReviewList = async () => {
		try {
			let res = await axios.get(apiUrl + "/review");
			setreview_list(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		const loadReviewList = async () => {
			await getReviewList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
			}
		};
		loadReviewList();
	}, []);

	
	const contextVal = {
		review_list,
		apiUrl,
		token,
		setToken,
	};
	return (
		<StoreContext.Provider value={contextVal}>
			{props.children}
		</StoreContext.Provider>
	);
};
export default StoreContextProvider;
