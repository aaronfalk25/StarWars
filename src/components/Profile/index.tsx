import React, { useState, useEffect } from 'react'
import {Character, Planet, Film, Starship} from '../../interfaces'
import Modal from '../Modal'
import api from '../../api'

interface ProfileProps {
    name: string,
    character: Character
}

const Profile: React.FC<ProfileProps> = ({name, character}) => {

    const [films, setFilms] = useState<Film[]>([]);
    const [starships, setStarships] = useState<Starship[]>([]);
    const [homeworld, setHomeworld] = useState<Planet>();

    // Helper function to get the identifier from the URL
    function parseUrl(url: string): string {
        return url.split('/').slice(-3,-1).join('/');
    }

    useEffect(() => {
        const fetchFilms = async () => {
            const filmData: Film[] = [];
            for (let i = 0; i < character.films.length; i++) {
                const film: any = await api.get(parseUrl(character.films[i]));
                filmData.push(film.data);
            }
            setFilms(filmData);
        }

        const fetchStarships = async () => {
            const starshipData: Starship[] = [];
            for (let i = 0; i < character.starships.length; i++) {
                const starship: any = await api.get(parseUrl(character.starships[i]));
                starshipData.push(starship.data);
            }
            setStarships(starshipData);
        }

        const fetchHomeworld = async () => {
            const homeworld: any = await api.get(parseUrl(character.homeworld));
            setHomeworld(homeworld.data);
        }

        fetchFilms();
        fetchStarships();
        fetchHomeworld();
    }, [character.films, character.starships, character.homeworld])

    return (
        <div id={name} className="profile">
            <h2>About me: {character.name}</h2>
            <div className="card">  
                <p>Height (cm): {character.height}</p>
                <p>Mass (kg): {character.mass}</p>
                <p>Hair Color: {character.hair_color}</p>
                <p>Skin Color: {character.skin_color}</p>
                <p>Eye Color: {character.eye_color}</p>
                <p>Birth Year: {character.birth_year}</p>
                <p>Gender: {character.gender}</p>
            </div>
            <div className="card"> 
                {character.films.length > 0 && (
                    <Modal openText="See films"> 
                        <h2>Films</h2>
                        <ul>
                            {films.map((film: Film) => {
                                return <li key={film.title}> - {film.title}</li>
                        })}
                        </ul>
                    </Modal>
                )}
                
                {character.starships.length > 0 && (
                    <Modal openText="See starships"> 
                        <h2>Starships</h2>
                        <ul>
                            {starships.map((starship: Starship) => {
                                return <li key={starship.name}> - {starship.name}</li>
                            })}
                        </ul>
                    </Modal>
                )}

                <Modal openText="See homeworld"> 
                    <h2>Homeworld</h2>
                    {homeworld?.name !== "unknown" ? 
                    <a href={`https://starwars.fandom.com/wiki/${homeworld?.name}`} target="_blank" rel="noopener noreferrer">
                    {homeworld?.name}
                    </a>
                    : 
                    <p>{homeworld?.name}</p>
                    }
                    <div className='mt-8'>
                        <h3> Details </h3>
                        <p>Climate: {homeworld?.climate}</p>
                        <p>Terrain: {homeworld?.terrain}</p>
                        <p>Gravity: {homeworld?.gravity}</p>
                        <p>Population: {homeworld?.population}</p>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default Profile;