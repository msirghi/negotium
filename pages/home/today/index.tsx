import { TodayContainer } from '../../../src/components/today';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StaticProps} from "../../../src/common/constants/types";

const Today = () => {
  return <TodayContainer />;
};

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export default Today;
