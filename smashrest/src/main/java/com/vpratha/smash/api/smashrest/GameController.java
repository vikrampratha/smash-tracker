package com.vpratha.smash.api.smashrest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("game")
public class GameController {

    @Autowired
    GameService svc;
    
    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<Game>> readAll() {
        List<Game> list = svc.selectAll();
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> readOne(@PathVariable("id") long id) {
        Game g = svc.selectOne(id);
        return (g == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(g, HttpStatus.OK);
    }

    @GetMapping("/player/{id}")
    public ResponseEntity<List<Game>> readAllWithPlayerId(@PathVariable("id") long id) {
        List<Game> list = svc.selectAllWithPlayerId(id);
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/player/{id}/outcome/{outcome}")
    public ResponseEntity<List<Game>> readAllWithPlayerIdAndOutcome(@PathVariable("id") long id, @PathVariable("outcome") int outcome) {
        List<Game> list = svc.selectAllWithPlayerIdAndOutcome(id, outcome);
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/player/{id}/stats")
    public ResponseEntity<Stats> readStatsByPlayerId(@PathVariable("id") long id) {
        Stats s = svc.getStatsByPlayerId(id);
        return (s == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(s, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/player/{id}/clean")
    public ResponseEntity<List<GameView>> readAllClean(@PathVariable("id") long id) {
        System.out.println("id = " + id);
        List<GameView> list = svc.selectAllClean(id);
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(list, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("")
    public ResponseEntity<Game> create(@RequestBody Game in) {
        Game g = svc.insert(in);
        return (g == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(g, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> update(@PathVariable("id") long id, @RequestBody Game in) {
        Game g = svc.update(id, in);
        return (g == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(g, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        boolean b = svc.delete(id);
        return (!b)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(HttpStatus.OK);
    }
}
