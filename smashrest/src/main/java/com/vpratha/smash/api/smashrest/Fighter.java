package com.vpratha.smash.api.smashrest;

public class Fighter {

    private long id;
    private String name;
    private String icon;
    
    public Fighter() {
    }

    public Fighter(long id, String name, String icon) {
        this.id = id;
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
