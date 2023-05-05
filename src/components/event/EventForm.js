import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGames } from "../../managers/GameManager"
import { createEvent, getSingleEvent, updateEvent } from "../../managers/EventManager"


export const EventForm = () => {
    const navigate = useNavigate()
    const [gamesList, setGamesList] = useState([])
    const initialState = {
        description: "",
        date: "",
        time: "",
        game: 0,
    }
    const [currentEvent, setCurrentEvent] = useState(initialState)
    const { event_id } = useParams()

    useEffect(() => {
        getGames().then(data => setGamesList(data))
        if (event_id) {
            getSingleEvent(event_id).then((eventObj) => {
                setCurrentEvent(eventObj);
            })
        }
    }, [event_id])

    const changeEventState = (e) => {
        const { name, value } = e.target;
        setCurrentEvent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (event_id) {
            let newEvent = {
                ...currentEvent,
                description: currentEvent.description,
                date: currentEvent.date,
                time: currentEvent.time,
                game: parseInt(currentEvent.game),
            }
            updateEvent(newEvent)
                .then(() => navigate(`/events/${event_id}`))

        } else {
            let newEvent = {
                ...currentEvent,
                description: currentEvent.description,
                date: currentEvent.date,
                time: currentEvent.time,
                game: parseInt(currentEvent.game),
            }
            createEvent(newEvent)
                .then(() => navigate("/events"))
        }
    }


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description of new event: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">What game are you playing? </label>
                    <select
                        required
                        name="game"
                        className="form-control"
                        value={currentEvent?.game}
                        onChange={changeEventState}
                    >
                        <option value="">Select the game, already!!!</option>
                        {gamesList.map(game => (
                            <option value={game.id} key={`game--${game.id}`}>{game.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={handleSubmit}
                className="btn btn-primary">
                {event_id ? "Update Event." : "Create Event!"}
            </button>
        </form>
    )
}