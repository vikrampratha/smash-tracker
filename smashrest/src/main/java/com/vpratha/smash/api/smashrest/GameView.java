package com.vpratha.smash.api.smashrest;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class GameView {

    private long id;
    private String player1;
    private String player2;
    private String fighter1;
    private String fighter2;
    private int outcome;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;
    
    public GameView() {
    }


    public GameView(long id, String player1, String player2, String fighter1, String fighter2, int outcome, Date date) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.outcome = outcome;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getFighter1() {
        return fighter1;
    }

    public void setFighter1Id(String fighter1) {
        this.fighter1 = fighter1;
    }

    public String getFighter2() {
        return fighter2;
    }

    public void setFighter2(String fighter2) {
        this.fighter2 = fighter2;
    }

    public int getOutcome() {
        return outcome;
    }

    public void setOutcome(int outcome) {
        this.outcome = outcome;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    

}
