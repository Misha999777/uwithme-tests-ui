/* eslint-disable no-template-curly-in-string */
window["env"] = window["env"] || {};

window["env"]["BASE_URL"] = "https://${TESTSYSTEM_SERVER_HOST}";
window["env"]["AUTHORITY"] = "https://${TESTSYSTEM_KEYCLOAK_HOST}/realms/${TESTSYSTEM_KEYCLOAK_REALM}";