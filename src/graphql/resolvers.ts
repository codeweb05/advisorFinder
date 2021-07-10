import { Advisor, Order } from "./../interfaces/advisors";
import { generateAdvisors, getComparator, arraySort } from "../utils/utils";

const advisors = generateAdvisors(1500);

const delay = 500;
const ONLINE_STATUS = "online";

const returnAdvisorsList = (): Promise<Advisor[]> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve([...advisors]);
		}, delay);
	});

export const resolvers = {
	Query: {
		advisors: async (
			_: any,
			{
				limit,
				offset,
				searchValue,
				shouldShowOnline,
				order,
				orderBy,
			}: {
				limit: number;
				offset: number;
				searchValue: string;
				shouldShowOnline: boolean;
				order: Order;
				orderBy: keyof Advisor;
			}
		) => {
			let advisorsList: Advisor[] = await returnAdvisorsList();

			//search text
			if (searchValue) {
				advisorsList = advisorsList.filter((advisor) => {
					const { name, language } = advisor;
					const indexOfNameSearchQuery = name
						.toLowerCase()
						.indexOf(searchValue.trim().toLowerCase());
					const indexOfLanguageSearchQuery = language
						.toLowerCase()
						.indexOf(searchValue.trim().toLowerCase());
					const isFound =
						indexOfNameSearchQuery !== -1 || indexOfLanguageSearchQuery !== -1;
					return isFound;
				});
			}

			//show only online status advisors
			if (shouldShowOnline) {
				advisorsList = advisorsList.filter(
					(advisor) => advisor.status === ONLINE_STATUS
				);
			}

			//sort advisors
			advisorsList = arraySort(advisorsList, getComparator(order, orderBy));
			return advisorsList.slice(offset).slice(0, limit);
		},
	},
};
