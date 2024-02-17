import './globals.css';
import React, { useEffect, useState } from 'react';
import api from './api';
import {Character} from './interfaces';
import Search from './components/Search';

const Home: React.FC = () => {
  const [peopleMap, setPeopleMap] = useState(new Map<string, string>());
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const cachedMap = localStorage.getItem('peopleMap');

    if (cachedMap) {
      setPeopleMap(new Map(JSON.parse(cachedMap)));
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

      localStorage.setItem('peopleMap', JSON.stringify(Array.from(peopleMap.entries())));
      setPeopleMap(pMap);
    }

    console.log(peopleMap);
  }

  // Fetch data on component mount
  useEffect(() => {
      fetchData();
      setLoading(false);
  }, []);

  // Handle search
  const searchCallback = (searchResults: string[]) => {
    if (searchResults.length === 0) {
      alert('No results found');
      return;
    }

    searchResults.forEach(async (url: string) => {
      const res = await api.get(`/people/${url}`);
      const person: Character = res.data;
      console.log(person);
    });
  }



  if (loading) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full gap-6 mt-4">
          <h1> Star Wars Character Explorer </h1>
          <p> Enter a character's name and find additional information on them!</p>
        <div>
          <Search 
            peopleMap={peopleMap} 
            searchCallback={searchCallback} 
          />
        </div>
      </main>
    </>
  );
}

export default Home;
