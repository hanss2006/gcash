package com.hanss.gcash.runner;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakAdminConfig {

    @Bean
    public Keycloak keycloakAdmin() {
        return KeycloakBuilder.builder()
                .serverUrl("http://fs:8180")
                .realm("master")
                .username("admin")
                .password("Vdi123$")
                .clientId("admin-cli")
                .build();
    }
}
