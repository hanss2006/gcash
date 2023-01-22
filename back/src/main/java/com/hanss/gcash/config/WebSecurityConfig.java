package com.hanss.gcash.config;

//import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

//@RequiredArgsConstructor
//@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/api-docs", "/api-docs/**", "/api-docs.yaml").permitAll()
                .anyRequest().authenticated();
        http.oauth2ResourceServer().jwt();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable();
        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder(OAuth2ResourceServerProperties oAuth2ResourceServerProperties) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(oAuth2ResourceServerProperties.getJwt().getJwkSetUri()).build();
        jwtDecoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(oAuth2ResourceServerProperties.getJwt().getIssuerUri()));
        return jwtDecoder;
    }

    /*
    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .requestMatchers(HttpMethod.GET, "/actuator/**").hasRole(ADMIN)
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs", "/v3/api-docs/**").permitAll()
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/admin").hasRole(ADMIN)
                .requestMatchers("/**").hasAnyRole(ADMIN, USER)
                .anyRequest().denyAll();
        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthConverter);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable();
        return http.build();
    }

    public static final String ADMIN = "GCASH_ADMIN";
    public static final String USER = "GCASH_USER";
    */


}