import Image from 'next/image';
import { Row } from '../../../common/utilities/row/Row';
import { RowDirection } from '../../../../common/constants/enums';

export const LandingFooter = () => {
  return (
    <Row alignHorizontalCenter direction={RowDirection.COLUMN} alignVerticalCenter>
      <Image height={200} width={200} src={'/static/negotium-logo_white.png'} />
    </Row>
  );
};
