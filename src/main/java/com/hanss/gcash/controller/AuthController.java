package com.hanss.gcash.controller;

import com.hanss.gcash.security.jwt.JwtUtils;
import com.hanss.gcash.security.payload.request.LoginRequest;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;

/*
@CrossOrigin(origins = "*", maxAge = 3600)
*/
@RestController
@RequestMapping("/")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Value("${hanss.app.authUrl}")
    private String authUrl;

    @Value("${hanss.app.jwtClientId}")
    private String jwtClientId;

    @PostMapping("/login")
    @Operation(summary = "Login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, @RequestParam(required = true) String clientId) {
        String URL_AUTH = "http://%1$s/api/auth/signin?clientId=%2$s";
        String url = String.format(URL_AUTH, this.authUrl, clientId);

        RestTemplate restTemplate = new RestTemplate();

        // Send request with GET method and default Headers.
        String result = restTemplate.postForObject(url, loginRequest, String.class);

        if (result.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        } else {
            return ResponseEntity.ok(result);
        }
    }

 /*
    @GetMapping("/test")
    @Operation(summary = "Test endpoint", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> registerUser() {
        return ResponseEntity.ok(("Passed"));
    }


    @PostMapping("/signup")
    @Operation(summary = "Signup endpoint", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), 
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        roles.add(roleRepository.findByName(ERole.valueOf(role)).get());
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }*/
}
