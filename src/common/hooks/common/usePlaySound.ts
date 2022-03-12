import { Sounds } from '../../constants/enums';
import NotificationSound from '../../../assets/sounds/notification.mp3';
import useSound from 'use-sound';
import { useSelector } from 'react-redux';
import { notificationsEnabledSelector } from '../../../redux/selectors/account.selector';

export const usePlaySound = (type: Sounds) => {
  const notificationsEnabled = useSelector(notificationsEnabledSelector);

  const getSoundByType = () => {
    if (type === Sounds.NOTIFICATION && notificationsEnabled) {
      return NotificationSound;
    }
  };
  const [play] = useSound(getSoundByType()!);

  return { play };
};
