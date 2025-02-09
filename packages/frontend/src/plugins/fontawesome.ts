import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFolder, faFile, faFilePdf, faFileImage, faFileWord, faFileText } from '@fortawesome/free-solid-svg-icons'; 

// Add icons to the library
library.add(
    faFolder,
    faFile,
    faFilePdf,
    faFileImage,
    faFileWord,
    faFileText
);

export default FontAwesomeIcon;
