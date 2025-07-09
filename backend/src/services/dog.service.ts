export const getPaginatedDogs = async (page: number, count: number) => {
	const response = await fetch("https://random.dog/doggos");

	if (!response.ok) {
		throw new Error("Failed to fetch dogs");
	}

	const data = await response.json();

	const startIndex = (page - 1) * count;
	const endIndex = startIndex + count;

	const paginatedDogs = data.slice(startIndex, endIndex);

	return paginatedDogs;
};
