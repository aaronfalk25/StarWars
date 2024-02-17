import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Alert from '../Alert';

interface SearchProps {
    peopleMap: Map<string, string>
    searchCallback: (searchResults: string[]) => void
}

const Search: React.FC<SearchProps> = ({peopleMap, searchCallback}) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    function doSearch(e: React.FormEvent) {
        e.preventDefault();

        const input = document.getElementById('search') as HTMLInputElement;
        const searchTerm: string = input.value;

        // Length must be at least 2 to limit too many calls
        if (searchTerm.length < 2) {
            setAlertMessage("Search term must be at least 2 characters");
            setShowAlert(true);
            return;
        }

        // Build array of search results that contains the character's URL identifier
        const searchResults: string[] = [];
        peopleMap.forEach((value, key) => {
            if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchResults.push(value);
            }
        });

        if (searchResults.length === 0) {
            setAlertMessage("No results found");
            setShowAlert(true);
            return;
        }

        setShowAlert(false);
        searchCallback(searchResults);
    }
    
    return (
        <div className="search-container">
            
            <form onSubmit={doSearch}>
                <div>
                    <input id="search" type="text" placeholder="Search for a character" />
                    <button type="submit">
                    Search&nbsp;
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </form>
            {
            showAlert && (
                <Alert 
                    message={alertMessage}
                    onClose={handleCloseAlert}
                />
            )
            }
        </div>
    )
}

export default Search;