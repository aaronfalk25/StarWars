import './globals.css';
import React, { useEffect, useState } from 'react';
import api from './api';
import {Character} from './interfaces';
import Search from './components/Search';
import Profile from './components/Profile';
import Loading from './components/Loading';

const Home: React.FC = () => {
  const [peopleMap, setPeopleMap] = useState(new Map<string, string>());
  const [mounting, setMounting] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCharacters, setSearchCharacters] = useState<Character[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const cachedMap = localStorage.getItem('peopleMap');

    if (cachedMap) {
      setPeopleMap(new Map(JSON.parse(cachedMap)));
      setLoading(false);
    }
    else {
      let i = 0;
      let data: any;
      let pMap = new Map<string, string>();

      do {
        
        let res: any = await api.get(`/people?page=${++i}`);
        data = res.data;  

        console.log(data);
        
        data.results.map((person: Character) => {
          pMap.set(person.name, person.url.split('/').slice(-2,-1).join(''));
        
        })
  
      } while (data.next && data.next !== null)

      localStorage.setItem('peopleMap', JSON.stringify(Array.from(pMap.entries())));
      setPeopleMap(pMap);
      setLoading(false);
    }
  }

  // Fetch data on component mount
  useEffect(() => {
      fetchData();
      setMounting(false);
  }, []);

  
  const handleSearch = async (searchResults: string[]) => {
    if (searchResults.length === 0) {
      setSearchCharacters([]);
      alert('No results found');
      return;
    }

    // Handle search
    const characters: Character[] = await Promise.all(
      searchResults.map(async (url: string) => {
        const res = await api.get(`/people/${url}`);
        return res.data;
      })
    );

    setSearchCharacters(characters);

    console.log(characters)
    console.log(searchResults)
  }



  if (mounting) return null;

  if (loading) return (<>
      <main className="overlay flex min-h-screen flex-col items-center w-full">
        <h1 className='mt-4'> Star Wars Character Explorer </h1>
        <p> Loading Initial Data... </p>
        <Loading /> 
      </main>
      </>
      );

  return (
    <>
      <main className="overlay flex min-h-screen flex-col items-center w-full">
            <h1 className='mt-4'> Star Wars Character Explorer </h1>
          <p> Enter a character's name and find additional information on them!</p>
          <div>
            <Search 
              peopleMap={peopleMap} 
              searchCallback={handleSearch} 
            />
          </div>
          <div>
            {searchCharacters.length > 0 && (
              <div className="mx-auto w-5/6">
                <div className="flex flex-wrap justify-center gap-4">
                  {searchCharacters.map((character: Character) => (
                    <Profile key={character.name} character={character} />
                  ))}
                </div>
                </div>
              )}
          </div>
      </main>
    </>
  );
}

export default Home;
