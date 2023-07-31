import { getRemoteConfig, getBoolean } from "firebase/remote-config";
import { firebaseApp } from "@/utils/firebase";

export enum RemoteConfigKeys {
  ENABLE_USER_PROFILE = "show_user_profile",
  ENABLE_USER_PROFILE_V2 = "show_user_profile_v2",
  ENABLE_UX_CAM = "enable_ux_cam",
  ENABLE_MODEL_GET_STARTED = "enable_model_get_started",
  ENABLE_PIN_CONVERSATION = "enable_pin_conversation",
  ENABLE_OFFLINE_MODEL = "enable_offline_model",
  ENABLE_APP_RATING = "enable_app_rating",
  ENABLE_FORCE_LOGIN = "enable_force_login",
}

export const useRemoteConfig = () => {
  const remoteConfig = getRemoteConfig(firebaseApp);

  const getConfig = (key: RemoteConfigKeys): boolean => {
    return getBoolean(remoteConfig, key);
  };
  return { getConfig };
};
