import { Link, useNavigate } from "react-router-dom"
import { getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"

export const Events = ({ event, setEvents }) => {
    const clickJoinEvent = () => {
        joinEvent(event.id)
            .then(getEvents().then(data => setEvents(data)))
    }

    const clickLeaveEvent = () => {
        leaveEvent(event.id)
            .then(getEvents().then(data => setEvents(data)))
    }

    return (
        <article className="events">
            <Link to={`/events/${event.id}`} className="event__description">{event.description}</Link>
            <div className="event__dateTime">At {event.time} on {event.date}</div>
            <div className="event__host event__game">{event?.organizer?.user?.first_name} {event?.organizer?.user?.last_name} will be hosting a game of {event.game?.title}</div>
            {
                event.joined ?
                    <button className="btn btn-3 icon-leave" value={event.id}
                        onClick={clickLeaveEvent}>Leave Event...</button>
                    :
                    <button className="btn btn-2 icon-join" value={event.id}
                        onClick={clickJoinEvent}>Join Event!</button>
            }
        </article>
    )
}