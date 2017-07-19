const ewoloContent = Object.freeze({
  weightHelpModalContent: [
    'Select the relevant units using the dropdown. You can change your default weight units in account settings.',
    'Currently only lbs and kgs are supported. Calculations are done using 1 kg = 2.2 lbs.'
  ],
  tempoHelpModalContent: [
    'The speed of the exercise. For e.g. 101 means 1 second eccentric (negative), 0 second mid-point and 1 second concentric (positive).',
    'Keep value at 101 (default) if unsure.'
  ],
  restHelpModalContent: [
    'The rest in seconds between sets.',
    'Setting this to 0 indicates that the next exercise is a super-set. Keep at 60 seconds (default) if unsure.'
  ]
});

export default ewoloContent;
