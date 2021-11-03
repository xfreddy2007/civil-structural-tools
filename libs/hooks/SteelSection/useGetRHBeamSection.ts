import useFetchdata from "../useFetchdata";
import parseSteelSectionJson from "@/libs/utils/parseSteelSectionJson";

const useGetRHBeamSection = () => {
  const { data } = useFetchdata('RHBeam');
  const sections = data && Object.keys(data).length > 1 ? parseSteelSectionJson(data) : '';

  return sections;
}

export default useGetRHBeamSection;