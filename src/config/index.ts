import BaseConfig from "./config.base";
import ProdConfig from "./config.prod";
import DevConfig from "./config.dev";

const ServiceConfig = {
  inputTokenCap: 10000,
  responseTokenCap: 500,
};

let EnvConfig = ProdConfig;
if (process.env.ENV === "development") {
  EnvConfig = DevConfig;
}

const Config = { ...BaseConfig, ...ProdConfig, ...ServiceConfig, ...EnvConfig };

export default Config;
