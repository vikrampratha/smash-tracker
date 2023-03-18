package com.vpratha.smash.api.smashrest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository repo;

    List<Player> selectAll() {
        try {
            List<Player> list = new ArrayList<Player>();
            repo.findAll().forEach(
                (PlayerEntity pe) -> {
                    list.add(
                        new Player(pe.getId(), pe.getUsername(), pe.getPassword())
                    );
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    List<Player> selectAllOthers(long id) {
        try {
            List<Player> list = new ArrayList<Player>();
            repo.findAll().forEach(
                (PlayerEntity pe) -> {
                    if (pe.getId() != id) {           // maybe change by adding repo method that queries select all others from db
                        list.add(
                            new Player(pe.getId(), pe.getUsername(), pe.getPassword())
                        );
                    }
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    Player selectOne(long id) {
        try {
            Optional<PlayerEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                PlayerEntity pe = opt.get();
                return new Player(pe.getId(), pe.getUsername(), pe.getPassword());
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    Player insert(Player p) {
        try {
            PlayerEntity pe = new PlayerEntity(p.getUsername(), p.getPassword());
            pe = repo.save(pe);
            return new Player(pe.getId(), pe.getUsername(), pe.getPassword());
        } catch (Exception e) {
            return null;
        }
    }

    Player update(long id, Player p) {
        try {
            Optional<PlayerEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                PlayerEntity pe = opt.get();
                pe.setUsername(p.getUsername());
                pe = repo.save(pe);
                return new Player(pe.getId(), pe.getUsername(), pe.getPassword());
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
    
}
