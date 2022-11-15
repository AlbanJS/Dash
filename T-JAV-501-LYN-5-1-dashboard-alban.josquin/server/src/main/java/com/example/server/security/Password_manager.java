package com.example.server.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Password_manager {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public String PasswordHash(String password) throws Exception {
        try {
            return encoder.encode(password);
        } catch (Exception e) {
            throw new Exception(e);
        }

    }

    public boolean PasswordVerify(String password, String result) throws Exception {
        try {
            return encoder.matches(password, result);
        } catch (Exception e) {
            throw new Exception(e);
        }

    }
}
