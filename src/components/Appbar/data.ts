import type { LinkType } from '../../constants/types';

type MenuType = {
	title: string;
  iconType: string;
	link: LinkType;
};

type DataType = {
	menu: MenuType[];
};

const data: DataType = {
	menu: [
		{
			title: 'Home',
			iconType: 'home',
			link: {
				href: '/',
			}
		},
		{
			title: 'Profile',
			iconType: 'person',
			link: {
				href: '/profile',
			}
		},
		{
			title: 'My Favorites',
			iconType: 'favorite',
			link: {
				href: '/my-favorites',
			}
		}
	]
};

export default data;