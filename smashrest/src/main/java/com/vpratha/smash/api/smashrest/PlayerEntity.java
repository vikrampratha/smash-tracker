package com.vpratha.smash.api.smashrest;

import javax.persistence.*;


@Entity
@Table(name = "player")
public class PlayerEntity {

    @Id
    // @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "player_gen")
    // @SequenceGenerator(name = "player_gen", sequenceName = "player_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    public PlayerEntity() {
    }

    public PlayerEntity(String username) {
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
