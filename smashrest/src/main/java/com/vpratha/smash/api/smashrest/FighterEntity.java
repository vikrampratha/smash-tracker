package com.vpratha.smash.api.smashrest;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Table(name = "fighter")
public class FighterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "icon", unique = true, nullable = false)
    private String icon;

    public FighterEntity() {
    }

    public FighterEntity(String name, String icon) {
        this.name = name;
        this.icon = icon;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
    
}
