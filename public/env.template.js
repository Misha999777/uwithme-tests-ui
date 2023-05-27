/* eslint-disable no-template-curly-in-string */
window["env"] = window["env"] || {};

window["env"]["BASE_URL"] = "${SCHEMA}${TESTSYSTEM_SERVER_HOST}";
window["env"]["AUTHORITY"] = "${SCHEMA}${TESTSYSTEM_KEYCLOAK_HOST}/realms/${TESTSYSTEM_KEYCLOAK_REALM}";