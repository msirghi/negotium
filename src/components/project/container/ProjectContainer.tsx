import {useRouter} from "next/router";

export const ProjectContainer = () => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};
