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
@RequestMapping("player")
public class PlayerController {

    @Autowired
    PlayerService svc;

    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<Player>> readAll() {
        List<Player> list = svc.selectAll();
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK); 
    }

    @CrossOrigin
    @GetMapping("/others/{id}")
    public ResponseEntity<List<Player>> readAllOthers(@PathVariable("id") long id) {
        List<Player> list = svc.selectAllOthers(id);
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK); 
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Player> readOne(@PathVariable("id") long id) {
        Player p = svc.selectOne(id);
        return (p == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(p, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("")
    public ResponseEntity<Player> create(@RequestBody Player in) {
        Player p = svc.insert(in);
        return (p == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> update(@PathVariable("id") long id, @RequestBody Player in) {
        Player p = svc.update(id, in);
        return (p == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(p, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        boolean b = svc.delete(id);
        return (!b)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(HttpStatus.OK);
    }
}
