import faker from "faker";
import { Advisor, Order } from "../interfaces/advisors";

export const generateAdvisors = (amountOfAdvisors: number): Advisor[] => {
	const advisors = [];
	for (let id = 1; id <= amountOfAdvisors; id++) {
		const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
		const language = faker.address.country();
		const reviews = +faker.datatype.number(3000);
		advisors.push({
			id,
			name,
			language,
			reviews,
			status: Math.random() > 0.25 ? "online" : "offline",
		});
	}
	return advisors;
};

const DESC_ORDER: Order = "desc";

export const descendingComparator = (
	a: Advisor,
	b: Advisor,
	orderBy: keyof Advisor
): number => {
	if (b[orderBy] < a[orderBy]) return -1;

	if (b[orderBy] > a[orderBy]) return 1;

	return 0;
};

export const getComparator = (
	order: Order,
	orderBy: keyof Advisor
): ((a: Advisor, b: Advisor) => number) => {
	return order === DESC_ORDER
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const arraySort = (
	array: Advisor[],
	comparator: (a: Advisor, b: Advisor) => number
): Advisor[] => {
	const arrayCopy = [...array];
	arrayCopy.sort((a, b) => comparator(a, b));
	return arrayCopy;
};
