const appNotifications = [
  {
    id: 'custom-weight-units',
    text: 'Ewolo 2.0.0: Ability to set default units for weight and choose between lbs and kgs when logging exercises.',
    show: 'all'
  },
  {
    id: 'standardized-menus',
    text: 'Ewolo 2.6.3: Dashboard progress filters + standardized menus, click to open and click to close.',
    show: 'all'
  },
  {
    id: 'analytics',
    text: 'Ewolo 3.0.0: Check the analytics page for an in-depth exercise analysis!',
    show: 'logged-in'
  }
];

export const getAppNotification = () => {
  return appNotifications[2];
  // return null;
}
