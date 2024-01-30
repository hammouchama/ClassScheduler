import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Menu',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-dashboard-line',
    badge: {
      variant: 'success',
      text: '03',
    },
    link: '/dashboard',
  },
  {
    id: 3,
    label: 'Assistants',
    icon: 'ri-user-settings-line',
    subItems: [
      {
        id: 4,
        label: 'List of Assistants',
        link: '/dashboard/assistants/list',
        parentId: 3,
      },
      {
        id: 5,
        label: 'Add new Assistant',
        link: '/dashboard/assistants/new',
        parentId: 3,
      },
    ],
  },
  {
    id: 6,
    label: 'Formations',
    icon: 'ri-user-settings-line',
    subItems: [
      {
        id: 7,
        label: 'List of Formations',
        link: '/dashboard/formations/list',
        parentId: 6,
      },
      {
        id: 8,
        label: 'Add new Formation',
        link: '/dashboard/formations/new',
        parentId: 6,
      },
    ],
  },
  {
    id: 9,
    label: 'Company',
    icon: 'ri-user-settings-line',
    subItems: [
      {
        id: 10,
        label: 'List of Company',
        link: '/dashboard/company/list',
        parentId: 9,
      },
      {
        id: 11,
        label: 'Add new Company',
        link: '/dashboard/company/new',
        parentId: 9,
      },
    ],
  },
  {
    id: 10,
    label: 'Trainer',
    icon: 'ri-user-settings-line',
    subItems: [
      {
        id: 11,
        label: 'List of Trainers',
        link: '/dashboard/trainer/list',
        parentId: 10,
      },
    ],
  },
  {
    id: 12,
    label: 'Other',
    isTitle: true,
  },
  {
    id: 13,
    label: 'Calendar',
    icon: 'ri-calendar-2-line',
    link: '/dashboard/calendar',
  },
];


// for assistant 

export const MENU_Assistant: MenuItem[] = [
  {
    id: 1,
    label: 'Menu',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-dashboard-line',
    badge: {
      variant: 'success',
      text: '03',
    },
    link: '/dashboard',
  },
  {
    id: 3,
    label: 'Company',
    icon: 'ri-user-settings-line',
    subItems: [
      {
        id: 4,
        label: 'List of Company',
        link: '/dashboard/company/list',
        parentId: 3,
      },
      {
        id: 5,
        label: 'Add new Company',
        link: '/dashboard/company/new',
        parentId: 3,
      },
    ],
  },
  {
    id: 6,
    label: 'Other',
    isTitle: true,
  },
  {
    id: 7,
    label: 'Calendar',
    icon: 'ri-calendar-2-line',
    link: '/dashboard/calendar',
  },
];
