/**
 * These are configuration settings for the production environment.
 * Do not include API secrets in this file or anywhere in your JS.
 */
const prodEnv = {
  API_URL: process.env.API_URL,
  JAN_WEB_URL: process.env.WEB_URL,
  MIX_PANEL_TOKEN: process.env.MIX_PANEL_TOKEN,
  SSE_INFERENCE_ENDPOINT: process.env.SSE_INFERENCE_ENDPOINT,
  BE_KEY: process.env.BE_KEY,
  UX_CAM_API_KEY: process.env.UX_CAM_API_KEY,
  CF_CLIENT_API_KEY: process.env.CF_CLIENT_API_KEY,
  CF_CLIENT_API_SECRET: process.env.CF_CLIENT_API_SECRET,
  ACCOUNT_ID: process.env.ACCOUNT_ID,
  UX_CAM_ENABLED: process.env.UX_CAM_ENABLED,
  DISCORD_INVITATION_URL: process.env.DISCORD_INVITATION_URL,
  PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL,
  SUPPORT_URL: process.env.SUPPORT_URL,
};

export default prodEnv;
