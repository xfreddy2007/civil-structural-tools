import { HBeamCrossSectionProps } from './stealSpec';

export type SteelSectionProps = {[key: string]: HBeamCrossSectionProps}

const parseSteelSectionJson = (data:HBeamCrossSectionProps[]) => {
  let steelSections:SteelSectionProps = {};
  data.map((section) => {
    steelSections[section.section] = {...section};
  });
  return steelSections;
};

export default parseSteelSectionJson;
