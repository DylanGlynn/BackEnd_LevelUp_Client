import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGame, getGameTypes, getSingleGame, updateGame } from "../../managers/GameManager";

export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const initialState = {
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        type_id: 0,
    }
    const [currentGame, setCurrentGame] = useState(initialState)
    const { game_id } = useParams()

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
        if (game_id) {
            getSingleGame(game_id).then((gameObj) => {
                setCurrentGame(gameObj);
            })
        }
    }, [game_id])

    const changeGameState = (e) => {
        const { name, value } = e.target;
        setCurrentGame((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        if (game_id) {
            let game = {
                ...currentGame,
                maker: currentGame.maker,
                title: currentGame.title,
                number_of_players: parseInt(currentGame.number_of_players),
                skill_level: parseInt(currentGame.skill_level),
                type: parseInt(currentGame.type_id)
            }
            updateGame(game)
                .then(() => navigate(`/games/${game_id}`))
        } else {
            let game = {
                ...currentGame,
                maker: currentGame.maker,
                title: currentGame.title,
                number_of_players: parseInt(currentGame.number_of_players),
                skill_level: parseInt(currentGame.skill_level),
                type: parseInt(currentGame.type_id)
            }
            createGame(game)
                .then(() => navigate("/games"))
        }
    }

    return (
        <form className="gameForm">
            {game_id
                ? <h2 className="gameForm__title">Edit Game</h2>
                : <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type_id">Game Type: </label>
                    <select
                        required
                        name="type_id"
                        className="form-control"
                        value={currentGame?.type_id}
                        onChange={changeGameState}
                    >
                        <option value="">Select the type of game, please.</option>
                        {gameTypes.map(type => (
                            <option value={type.id} key={`type--${type.id}`}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level required: </label>
                    <input type="text" name="skill_level" required className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="text" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={handleSubmit}
                className="btn btn-primary">
                {game_id ? "Update Game." : "Create Game!"}
            </button>
        </form>
    )
}