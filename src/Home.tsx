import './globals.css';
import React, { useEffect, useState } from 'react';
import api from './api';
import {Character} from './interfaces';
import Search from './components/Search';
import Profile from './components/Profile';
import Loading from './components/Loading';
import Alert from './components/Alert';

const Home: React.FC = () => {
  const [peopleMap, setPeopleMap] = useState(new Map<string, string>());
  const [mounting, setMounting] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSuccess, setDataSuccess] = useState<boolean>(true);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [searchCharacters, setSearchCharacters] = useState<Character[]>([]);

  const fetchData = async () => {
    /**
     * This function first checks if the user has cached information.
     * If not, it fetches the data from the API and caches it.
     */
    setLoading(true);
    const cachedMap = localStorage.getItem('peopleMap');

    if (cachedMap) {
      // Use cached data, if available
      setPeopleMap(new Map(JSON.parse(cachedMap)));
      setDataSuccess(true);
      setLoading(false);
    }
    else {
      // For every page of people fetched from the API, build a people map that can be cached for future use
      let pMap = new Map<string, string>();
      
      try {
        let i = 0;
        let data: any;

        do {
            let res: any = await api.get(`/people?page=${++i}`);
            data = res.data;  
            
            data.results.map((person: Character) => {
                pMap.set(person.name, person.url.split('/').slice(-2,-1).join(''));
            })     
      
        } while (data.next && data.next !== null)
      } catch (error) {
          setLoading(false);
          setDataSuccess(false);
          return;
      }

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
    // Update characters with found search results
    try {
      const characters: Character[] = await Promise.all(
        searchResults.map(async (url: string) => {
          const res = await api.get(`/people/${url}`);
          return res.data;
        })
      );

      setSearchCharacters(characters);
    }
    catch (error) {
      // Show error if search failure
      setShowAlert(true);
      setAlertMessage("Failed to fetch search results. Please try again later.");
    }
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

  if (!dataSuccess) return (<>
    <main className="overlay flex min-h-screen flex-col items-center w-full">
      <h1 className='mt-4'> Star Wars Character Explorer </h1>
      <p> Data failed to fetch. Please try again later. </p>
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
                      <Profile name={character.name} character={character} key={character.name}/>
                    ))}
                  </div>
                  </div>
                )}
            </div>
            <div>
            {showAlert && (
                <Alert 
                    message={alertMessage}
                    onClose={handleCloseAlert}
                />
            )}
            </div>
      </main>
    </>
  );
}

export default Home;
