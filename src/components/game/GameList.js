import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"
import { Games } from "./Games.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return <>
        {
            games.map(
                (game) => <Games key={game.id} game={game} />
            )
        }
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}>
            Register New Game
        </button>
    </>
}