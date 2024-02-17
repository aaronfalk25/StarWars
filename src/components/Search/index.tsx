import React from 'react';

interface SearchProps {
    peopleMap: Map<string, string>
    searchCallback: (searchResults: string[]) => void
}

const Search: React.FC<SearchProps> = ({peopleMap, searchCallback}) => {
    function doSearch(e: React.FormEvent) {
        e.preventDefault();

        const input = document.getElementById('search') as HTMLInputElement;
        const searchTerm: string = input.value;

        // Length must be at least 2 to limit too many calls
        if (searchTerm.length < 2) {
            alert('Search term must be at least 2 characters');
            return;
        }

        // Build array of search results that contains the character's URL identifier
        const searchResults: string[] = [];
        peopleMap.forEach((value, key) => {
            if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchResults.push(value);
            }
        });

        searchCallback(searchResults);
    }
    
    return (
        <div className="search-container">
            <form onSubmit={doSearch}>
                <div>
                    <input id="search" type="text" placeholder="Search for a character" />
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}

export default Search