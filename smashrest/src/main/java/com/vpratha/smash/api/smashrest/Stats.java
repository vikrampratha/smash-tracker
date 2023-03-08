package com.vpratha.smash.api.smashrest;

public class Stats {

    private int totalGames;
    private int totalWins;
    
    public Stats() {
    }

    public Stats(int totalGames, int totalWins) {
        this.totalGames = totalGames;
        this.totalWins = totalWins;
    }

    public int getTotalGames() {
        return totalGames;
    }

    public void setTotalGames(int totalGames) {
        this.totalGames = totalGames;
    }

    public int getTotalWins() {
        return totalWins;
    }

    public void setTotalWins(int totalWins) {
        this.totalWins = totalWins;
    }
    
}
