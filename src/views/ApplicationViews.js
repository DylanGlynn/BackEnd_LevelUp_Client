import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { Games } from "../components/game/Games"
import { Game } from "../components/game/Game"
import { Event } from "../components/event/Event"
import { Events } from "../components/event/Events"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />}/>
                <Route path="/events/new" element={<EventForm />}/>
                <Route path="/events/:event_id" element={<Event />}/>
                <Route path="/edit_event/:event_id" element={<EventForm />}/>
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:game_id" element={<Game />} />
                <Route path="/edit_game/:game_id" element={<GameForm />} />
            </Route>
        </Routes>
    </>
}