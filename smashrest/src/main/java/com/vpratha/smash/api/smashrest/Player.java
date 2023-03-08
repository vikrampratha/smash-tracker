package com.vpratha.smash.api.smashrest;

public class Player {

    private long id;
    private String username;
    
    public Player() {
    }

    public Player(long id, String username) {
        this.id = id;
        this.username = username;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }  
    
}
