import * as fs from 'fs';

import { BANNER_FOLDER } from './constants';

export const printBanner = (
  bannerName: string,
  options?: {
    newLine?: boolean;
    displayError?: boolean;
  }
) => {
  try {
    // Checking if banner exists
    if (!fs.existsSync(`${BANNER_FOLDER}/${bannerName}.txt`)) {
      if (options ? options.displayError : true)
        console.log(`Banner ${bannerName} does not exist!`);
      if (options?.newLine) console.log('');
      return false;
    }

    // Loadingg the banner
    const bannerFile = fs.readFileSync(`${BANNER_FOLDER}/${bannerName}.txt`);
    const bannerText = bannerFile.toString().trimEnd();

    // Printing the banner
    console.log(bannerText);
    if (options?.newLine) console.log('');
  } catch (error) {
    console.log(error);
  }
};
