package com.hanss.gcash.service;

import com.hanss.gcash.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class LoginService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.authorization-grant-type}")
    private String grantType;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.auth-server-url}")
    private String keyCloakUrl;


    public ResponseEntity<LoginResponse> login(LoginRequest loginrequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", grantType);
        map.add("username", loginrequest.getUsername());
        map.add("password", loginrequest.getPassword());

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map,headers);

        ResponseEntity<LoginResponse> response = restTemplate.postForEntity("https://fs:8443/auth/realms/hanss-realm/protocol/openid-connect/token", httpEntity, LoginResponse.class);
        return new ResponseEntity<>(response.getBody(),HttpStatus.OK);
    }

    public LoginResponse refresh(TokenRequest refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", "refresh_token");
        parameters.add("client_id", clientId);
        parameters.add("client_secret", clientSecret);
        parameters.add("refresh_token", refreshToken.getToken());

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(parameters, headers);

        return restTemplate.exchange(getAuthUrl(),
                HttpMethod.POST,
                entity,
                LoginResponse.class).getBody();
    }

    private String getAuthUrl() {
        return UriComponentsBuilder.fromHttpUrl(keyCloakUrl)
                .pathSegment("realms")
                .pathSegment(realm)
                .pathSegment("protocol")
                .pathSegment("openid-connect")
                .pathSegment("token")
                .toUriString();
    }

    public ResponseEntity<Response> logout(TokenRequest refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("refresh_token", refreshToken.getToken());


        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map,headers);

        ResponseEntity<Response> response = restTemplate.postForEntity("https://fs:8443/auth/realms/hanss-realm/protocol/openid-connect/logout", httpEntity, Response.class);

        Response res = new Response();
        if(response.getStatusCode().is2xxSuccessful()) {
            res.setMessage("Logged out successfully");
        }
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    public ResponseEntity<IntrospectResponse> introspect(TokenRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("token", request.getToken());


        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map,headers);

        ResponseEntity<IntrospectResponse> response = restTemplate.postForEntity("https://fs:8443/auth/realms/hanss-realm/protocol/openid-connect/token/introspect", httpEntity, IntrospectResponse.class);
        return new ResponseEntity<>(response.getBody(),HttpStatus.OK);
    }
}