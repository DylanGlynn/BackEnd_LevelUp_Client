export const getEvents = () => {
    return fetch('http://localhost:8000/events', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleEvent = (event_id) => {
    return fetch(`http://localhost:8000/events/${event_id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (newEvent) => {
    return fetch('http://localhost:8000/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newEvent),
    })
        .then(response => response.json())
}

export const updateEvent = (eventObj) => {
    return fetch(`http://localhost:8000/events/${eventObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(eventObj),
    })
        .then(response => response.json)
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
}

export const leaveEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/leave`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
}

export const joinEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
        .then(response => response.json())
}