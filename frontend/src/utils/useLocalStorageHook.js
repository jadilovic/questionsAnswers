const useLocalStorageHook = () => {
	const saveCurrentQuestionObject = (question) => {
		localStorage.setItem('currentQuestion', JSON.stringify(question));
	};

	const getCurrentQuestionObject = () => {
		return JSON.parse(localStorage.getItem('currentQuestion'));
	};

	const saveCurrentAnswerObject = (answer) => {
		localStorage.setItem('currentAnswer', JSON.stringify(answer));
	};

	const getCurrentAnswerObject = () => {
		return JSON.parse(localStorage.getItem('currentAnswer'));
	};

	return {
		saveCurrentQuestionObject,
		getCurrentQuestionObject,
		saveCurrentAnswerObject,
		getCurrentAnswerObject,
	};
};

export default useLocalStorageHook;
