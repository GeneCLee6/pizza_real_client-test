import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { requestCurrentOperation } from "../services/operations";

const useOperations = () => {
	const { data: currentOperationData } = useQuery(
		["fetchCurrentOperation"],
		() => requestCurrentOperation(),
	);
	const [currentOperation, setCurrentOperation] = useState(null);
	useEffect(() => {
		currentOperationData?.length && setCurrentOperation(currentOperationData);
	}, [currentOperationData]);

	return {
		currentOperation,
	};
};

export default useOperations;
