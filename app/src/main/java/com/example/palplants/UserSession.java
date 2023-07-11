package com.example.palplants;

public class UserSession {
    private static UserSession instance;
    private String username;
    private String email;

    private UserSession() {
        // Constructor privado para evitar instancias directas
    }

    public static synchronized UserSession getInstance() {
        if (instance == null) {
            instance = new UserSession();
        }
        return instance;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void clearSession() {
        username = null;
        email = null;
    }
}