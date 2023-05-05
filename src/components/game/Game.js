import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteGame, getSingleGame } from "../../managers/GameManager"

export const Game = () => {
    const [game, setGame] = useState([])
    const { game_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleGame(game_id).then((data) => setGame(data));
    }, [game_id])

    const clickDeleteButton = () => {
        deleteGame(game_id)
        .then(navigate('/games'))
    }

    return (
        <>
            <div className="game__title">{game?.title} by {game?.maker}</div>
            <div className="game__players">{game?.number_of_players} players needed</div>
            <div className="game__skillLevel">Skill level is {game?.skill_level}</div>
            <button
                key={`edit--${game.id}`}
                type="button"
                onClick={() => { navigate(`/edit_game/${game_id}`) }}>Edit Game</button>
            <button
                key={`event__delete--${game.id}`}
                type="button"
                onClick={clickDeleteButton}>Delete Event</button>
        </>
    )
}