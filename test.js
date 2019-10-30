console.log("hello")
let x=Math.floor((Math.random() * 6) + 1);

console.log("value of x: ", x)


router.post('/player/:lobbyId', async (req, res) => {
    let score;
      let score1=0;
      let score2=0;
    let randomNumber = Math.floor((Math.random() * 6) + 1);
      console.log("random number value: ", randomNumber)  
    const player1='Player1'
      const player2='Player2'
    
    const lobby = await Lobby.findByPk(req.params.lobbyId, { includes: [Player] })
    const turn = lobby.turn
    
    Console.log("value of turn :", turn)
    
