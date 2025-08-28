import { writeFileSync } from "fs";  
  
function JSONtoFile(object, filename) {
    writeFileSync(`${filename}.json`, JSON.stringify(object));
}

export {JSONtoFile}