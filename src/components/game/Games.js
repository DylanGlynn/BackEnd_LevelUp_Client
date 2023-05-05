import { Link, useParams } from "react-router-dom"

export const Games = ({ game }) => {
    return (
        <article className="games">
                <Link to={`/games/${game.id}`}>{game?.title}</Link>
                <div className="game__title">By {game?.maker}</div>
                <div className="game__players">{game?.number_of_players} players needed</div>
                <div className="game__skillLevel">Skill level is {game?.skill_level}</div>
        </article>
    )
}