# smash-tracker backlog
## pages
- Home page
    - (DONE) provide a list of player1s (users)
    - (DONE) "login" button 
    - (DONE) navigate to landing page
    - add player
        - (DONE) provide add player option
        - prevent invalid player names from being added
        - update picker when new player is added
            - w/o having to refresh the page
        - notify user when player is added successfully
    - option to change player names
- Landing page (DEPRECATED) 
    - games button to navigate to games page
    - show high level stats of users
- Games page
    - (DONE) list all games
    - (DONE) filter by outcome/opponent
    - (DONE) filter by fighters
    - update/delete (allows to correct mistakes in data entry)
    - redesign games flatlist view
- Add game page
    - show label on hover of fighter
    - add calendar to select game time and date (deprecated)
    - (DONE) order (desc) the list of games by date
    - (DONE) arrange UI components
    - notify user when game is added successfully
## features
    - (DONE) "login"
    - win rate
    - win rate filters
    - fighter stats
## UI
    - (DONE) images for each fighter
    - better cards for games
    - pie chart win rate
    - add custom alert function based on rne dialog
    - visually appealing add new games screen
    - visually appealing games screen
    - visually appealing stats screen
## UI for games screen
    - variable width for each game card in list based on parent component dimensions (events, landscape mode)
    - each game card has same width
    - I can just add a win rate to the games screen (apply whatever filters, #wins/#total) and forget about stats page
## UI for add games screen
    - lower the add game button (make it stop clinging to the top)