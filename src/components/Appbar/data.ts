import type { LinkType } from '../../constants/types';

type MenuType = {
	title: string;
	link: LinkType;
};

type DataType = {
	menu: MenuType[];
};

const data: DataType = {
	menu: [
		{
			title: 'Home',
			link: {
				href: '/',
			}
		},
		{
			title: 'Profile',
			link: {
				href: '/profile',
			}
		},
		{
			title: 'My Favorites',
			link: {
				href: '/my-favorites',
			}
		}
	]
};

export default data;