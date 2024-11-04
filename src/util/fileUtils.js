const fs = require('fs');
const path = require('path');

function saveContentToFile(fileName, transcriptContent) {
    const filePath = path.join(__dirname, `../../${fileName}`);
    fs.writeFileSync(filePath, transcriptContent);
  
    console.log(`Transcript saved to ${filePath}`);
  }

function readContentFromFile(fileName) {
  const filePath = path.join(__dirname, `../../${fileName}`);
  /* AI generated validation */
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${fileName}`);
  }
  /* AI generated code ENDS */
  return fs.readFileSync(filePath, 'utf-8');
}

module.exports = {
  saveContentToFile,
  readContentFromFile,
};
