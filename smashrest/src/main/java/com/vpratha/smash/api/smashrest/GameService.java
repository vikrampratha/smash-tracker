package com.vpratha.smash.api.smashrest;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    GameRepository repo;
    
    List<Game> selectAll() {
        try {
            List<Game> list = new ArrayList<Game>();
            repo.findAll().forEach(
                (GameEntity ge) -> {
                    list.add(
                        new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate())
                    );
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    Game selectOne(long id) {
        try {
            Optional<GameEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                GameEntity ge = opt.get();
                return new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate());
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    Game insert(Game g) {
        try {
            GameEntity ge = new GameEntity(g.getPlayer1Id(), g.getPlayer2Id(), g.getFighter1Id(), g.getFighter2Id(), g.getOutcome(), g.getDate());
            ge = repo.save(ge);
            return new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate());
        } catch (Exception e) {
            return null;
        }
    }

    Game update(long id, Game g) {
        try {
            Optional<GameEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                GameEntity ge = opt.get();
                ge.setPlayer1Id(g.getPlayer1Id());
                ge.setPlayer2Id(g.getPlayer2Id());
                ge.setFighter1Id(g.getFighter1Id());
                ge.setFighter2Id(g.getFighter2Id());
                ge.setOutcome(g.getOutcome());
                ge.setDate(g.getDate());
                ge = repo.save(ge);
                return new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate());
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    boolean delete(long id) {
        try {
            repo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    List<Game> selectAllWithPlayerId(long id) {
        try {
            List<Game> list = new ArrayList<Game>();
            repo.findByPlayer1Id(id).forEach(
                (GameEntity ge) -> {
                    list.add(
                        new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate())
                    );
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    List<Game> selectAllWithPlayerIdAndOutcome(long id, int outcome) {
        try {
            List<Game> list = new ArrayList<Game>();
            repo.findByPlayer1IdAndOutcome(id, outcome).forEach(
                (GameEntity ge) -> {
                    list.add(
                        new Game(ge.getId(), ge.getPlayer1Id(), ge.getPlayer2Id(), ge.getFighter1Id(), ge.getFighter2Id(), ge.getOutcome(), ge.getDate())
                    );
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    Stats getStatsByPlayerId(long id) {
        try {
            int totalGames = repo.countByPlayer1Id(id);
            int totalWins = repo.countByPlayer1IdAndOutcome(id, 1);
            return new Stats(totalGames, totalWins);
        } catch (Exception e) {
            return null;
        }
    }

    List<GameView> selectAllClean(long id) {
        try {
            System.out.println("selectAllClean id="+id);
            List<GameView> list = new ArrayList<GameView>();
            repo.findAllClean(id).forEach(
                (Map<String, Object> m) -> {
                    System.out.println(m);
                    list.add(
                        new GameView(((BigInteger) m.get("id")).longValue(), 
                                        (String) m.get("player1"), (String) m.get("player2"), 
                                        (String) m.get("fighter1"), (String) m.get("fighter2"), 
                                        (int) m.get("outcome"), (Date) m.get("date"))
                    );
                }
            );
            return list;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
