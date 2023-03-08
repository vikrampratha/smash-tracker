package com.vpratha.smash.api.smashrest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FighterService {

    @Autowired
    FighterRepository repo;

    List<Fighter> selectAll() {
        try {
            List<Fighter> list = new ArrayList<Fighter>();
            repo.findAll().forEach(
                (FighterEntity fe) -> {
                    list.add(
                        new Fighter(fe.getId(), fe.getName(), fe.getIcon())
                    );
                }
            );
            return list;
        } catch (Exception e) {
            return null;
        }
    }

    Fighter selectOne(long id) {
        try {
            Optional<FighterEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                FighterEntity fe = opt.get();
                return new Fighter(fe.getId(), fe.getName(), fe.getIcon());
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
    
    Fighter insert(Fighter f) {
        try {
            FighterEntity fe = new FighterEntity(f.getName(), f.getIcon());
            fe = repo.save(fe);
            return new Fighter(fe.getId(), fe.getName(), fe.getIcon());
        } catch (Exception e) {
            return null;
        }
    }

    Fighter update(long id, Fighter f) {
        try {
            Optional<FighterEntity> opt = repo.findById(id);
            if (opt.isPresent()) {
                FighterEntity fe = opt.get();
                fe.setName(f.getName());
                fe.setIcon(f.getIcon());
                fe = repo.save(fe);
                return new Fighter(fe.getId(), fe.getName(), fe.getIcon());
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
