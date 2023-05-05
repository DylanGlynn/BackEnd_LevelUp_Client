import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleEvent, deleteEvent } from "../../managers/EventManager"
import { click } from "@testing-library/user-event/dist/click"

export const Event = () => {
    const [event, setEvent] = useState([])
    const { event_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleEvent(event_id).then((data) => setEvent(data));
    }, [event_id])

    const clickDeleteButton = () => {
        deleteEvent(event_id)
        .then(navigate('/events'))
    }

    return (
        <>
            <div className="event__description">{event.description}</div>
            <div className="event__organizer">Organized by {event.organizer?.user?.first_name} {event.organizer?.user?.last_name}</div>
            <div className="event__game">To play {event.game?.title}</div>
            <div className="event__timeDate">At {event.time} on {event.date}</div>
            <button
                key={`event__edit--${event.id}`}
                type="button"
                onClick={() => { navigate(`/edit_event/${event.id}`) }}>Edit Event</button>
            <button
                key={`event__delete--${event.id}`}
                type="button"
                onClick={clickDeleteButton}>Delete Event</button>
        </>
    )
}