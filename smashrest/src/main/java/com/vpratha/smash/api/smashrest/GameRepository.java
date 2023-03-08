package com.vpratha.smash.api.smashrest;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameRepository extends JpaRepository<GameEntity, Long> {

    List<GameEntity> findByPlayer1Id(long id);
    List<GameEntity> findByPlayer1IdAndOutcome(long id, int outcome);

    int countByPlayer1Id(long id);
    int countByPlayer1IdAndOutcome(long id, int outcome);

    /**
     * Shows all games with clean fields.
     * 
     * Returns all games in the database for a given Player1Id.
     * The games show usernames and names instead of IDs.
     * @param id The target Player1Id
     * @return A list of all games with clean fields that have Player1Id == id
     */
    @Query(
        value = " SELECT g.id, g.date, g.outcome, "
                + " p1.username as player1, p2.username as player2, "
                + " f1.name as fighter1, f2.name as fighter2 "
                + " from Game g, Player p1, Player p2, Fighter f1, Fighter f2 "
                + " where g.player1Id = p1.id "
                + " and g.player2Id = p2.id " 
                + " and g.fighter1Id = f1.id " 
                + " and g.fighter2Id = f2.id " 
                + " and g.player1Id = ?1 "
                + " order by g.date desc ", 
        nativeQuery = true
    )
    List<Map<String, Object>> findAllClean(long id);
}
