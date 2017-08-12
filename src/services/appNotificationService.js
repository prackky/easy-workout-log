const appNotifications = [
  {
    id: 'custom-weight-units',
    text: 'Ewolo 2.0.0: Ability to set default units for weight and choose between lbs and kgs when logging exercises.',
    showAll: true // TODO: add ability to show notifications per user
  },
  {
    id: 'standardized-menus',
    text: 'Ewolo 2.6.3: Dashboard progress filters + standardized menus, click to open and click to close.',
    showAll: true // TODO: add ability to show notifications per user
  }
];

export const getAppNotification = () => {
  return appNotifications[1];
  // return null;
}
