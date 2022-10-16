import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://fs:8081/",
    realm: "hanss-realm",
    clientId: "gcash-client",
});

export default keycloak;