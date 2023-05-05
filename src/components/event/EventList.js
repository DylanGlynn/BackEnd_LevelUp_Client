import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"
import { Events } from "./Events.js"

export const EventList = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return <>
        {
            events.map((event) => <Events key={event.id} event={event} setEvents={setEvents} />
            )
        }
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}>
            Register New Event
        </button>
    </>
}