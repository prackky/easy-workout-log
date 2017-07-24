import avatar1 from '../account/avatar-1.png';
import avatar5 from '../account/avatar-5.png';
import avatar4 from '../account/avatar-4.png';

export const getAvatar = (sex) => {
  if (sex === 2) { // male
    return avatar1;
  }

  if (sex === 3) { // female
    return avatar5;
  }

  return avatar4;
}
