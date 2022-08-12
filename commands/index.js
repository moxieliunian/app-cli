import help from "./help.js";
import clear from "./clear.js";

export default (command) => {
  switch (command) {
    case '--help':
    case '-h':
      help()
      break
    case 'clear':
      clear()
      break
  }
}
