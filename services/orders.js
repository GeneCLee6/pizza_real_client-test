import { post } from "../utils/axios.js";

export const requestCreateOrder = async (payload) => {
	const url = "/orders";
	const data = { ...payload };
	return await post(url, data).then((response) => response.data);
};
