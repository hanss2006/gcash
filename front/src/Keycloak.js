import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://fs:8443/",
    realm: "hanss-realm",
    clientId: "gcash-client",
});

export default keycloak;