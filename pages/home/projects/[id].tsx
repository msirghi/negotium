import { ProjectContainer } from '../../../src/components/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {useTranslation} from "next-i18next";
import {StaticProps} from "../../../src/common/constants/types";

const Project = () => {
  const t = useTranslation();
  console.log('t: ', t);

  return <ProjectContainer />;
};

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'settings'])),
    },
  };
}

export default Project;
