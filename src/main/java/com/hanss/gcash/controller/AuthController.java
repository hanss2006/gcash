package com.hanss.gcash.controller;

import com.hanss.gcash.model.*;
import com.hanss.gcash.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
@CrossOrigin(origins = "*", maxAge = 3600)
*/

/**
 * REST auth user.
 */
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    private LoginService loginservice;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@RequestBody LoginRequest loginrequest) {
        return loginservice.login(loginrequest);
    }
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@RequestBody TokenRequest refreshToken) {
        return ResponseEntity.ok(loginservice.refresh(refreshToken));
    }
    @PostMapping("/logout")
    public ResponseEntity<Response> logout (@RequestBody TokenRequest refreshToken) {
        return loginservice.logout(refreshToken);
    }

    @PostMapping("/introspect")
    public ResponseEntity<IntrospectResponse> introspect(@RequestBody TokenRequest token) {
        return loginservice.introspect(token);
    }
}
