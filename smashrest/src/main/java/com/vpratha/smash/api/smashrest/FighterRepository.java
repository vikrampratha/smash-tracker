package com.vpratha.smash.api.smashrest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FighterRepository extends JpaRepository<FighterEntity, Long> {
    
}
