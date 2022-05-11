const ip = "http://13.209.5.252:8000";

export const API_URL = Platform.OS === "ios" ? ip + "/api" : ip + "/api";
