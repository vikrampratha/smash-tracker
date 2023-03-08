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
@RequestMapping("fighter")
public class FighterController {

    @Autowired
    FighterService svc;

    @CrossOrigin
    @GetMapping("")
    public ResponseEntity<List<Fighter>> readAll() {
        List<Fighter> list = svc.selectAll();
        return (list == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(list, HttpStatus.OK); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fighter> readOne(@PathVariable("id") long id) {
        Fighter f = svc.selectOne(id);
        return (f == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(f, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Fighter> create(@RequestBody Fighter in) {
        Fighter f = svc.insert(in);
        return (f == null)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(f, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fighter> update(@PathVariable("id") long id, @RequestBody Fighter in) {
        Fighter f = svc.update(id, in);
        return (f == null)
            ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
            : new ResponseEntity<>(f, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        boolean b = svc.delete(id);
        return (!b)
            ? new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
            : new ResponseEntity<>(HttpStatus.OK);
    }
    
}
