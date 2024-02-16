import './globals.css';
import React, { useEffect, useState } from 'react';
import api from './api';
import {Character} from './interfaces';

const Home: React.FC = () => {
  let peopleMap: Map<string, string> = new Map();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const cachedMap = localStorage.getItem('peopleMap');

    if (cachedMap) {
      peopleMap = new Map(JSON.parse(cachedMap));
    }
    else {
      let i = 0;
      let data: any;
      do {
        
        let res: any = await api.get(`/people?page=${++i}`);
        data = res.data;  

        console.log(data);
        
        data.results.map((person: Character) => {
          peopleMap.set(person.name, person.url.split('/').slice(-2,-1).join(''));
        
        })
  
      } while (data.next && data.next !== null)

      localStorage.setItem('peopleMap', JSON.stringify(Array.from(peopleMap.entries())));
    }

    console.log(peopleMap);
  }


  useEffect(() => {
      fetchData();
      setLoading(false);
  }, []);



  if (loading) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full gap-6">
        <h1> Star Wars Profile Page </h1>
        <div>

        </div>
      </main>
    </>
  );
}

export default Home;
