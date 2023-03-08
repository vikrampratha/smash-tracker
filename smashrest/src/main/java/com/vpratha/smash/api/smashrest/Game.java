package com.vpratha.smash.api.smashrest;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Game {

    private long id;
    private long player1Id;
    private long player2Id;
    private long fighter1Id;
    private long fighter2Id;
    private int outcome;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;
    
    public Game() {
    }

    public Game(long id, long player1Id, long player2Id, long fighter1Id, long fighter2Id, int outcome, Date date) {
        this.id = id;
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.fighter1Id = fighter1Id;
        this.fighter2Id = fighter2Id;
        this.outcome = outcome;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public long getPlayer1Id() {
        return player1Id;
    }

    public void setPlayer1Id(long player1Id) {
        this.player1Id = player1Id;
    }

    public long getPlayer2Id() {
        return player2Id;
    }

    public void setPlayer2Id(long player2Id) {
        this.player2Id = player2Id;
    }

    public long getFighter1Id() {
        return fighter1Id;
    }

    public void setFighter1Id(long fighter1Id) {
        this.fighter1Id = fighter1Id;
    }

    public long getFighter2Id() {
        return fighter2Id;
    }

    public void setFighter2Id(long fighter2Id) {
        this.fighter2Id = fighter2Id;
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
