import cors from "cors";
import { ORIGIN_WHITELIST } from "../../constants";

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS origin: ${origin}`));
    }
  },
});

export default corsMiddleware;
