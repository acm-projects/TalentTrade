import { useState } from "react";

const SearchBar = () => {
    //show search items when search bar is selected
    const [isFocused, setIsFocused] = useState(false);
    //search terms is what the user is searching
    const [searchTerm, setSearchTerm] = useState("")
    //search items is what should show up in the search bar as reccommended optioons for users to search for (not users itself)
    //example items:
    const items = [
        "Technical Skills",
        "Communication",
        "Artistic",
        "Physical",
        "Musical",
        "Outdoors",
        "Culinary",
        "Craftsmanship",
        "Languagr and Cultural"
    ]
    const [searchItems, setSearchItems] = useState(items)

    const handleSearch = (event) => {
        const term = event.target.value
        setSearchTerm(term);

        //searchTerm has the thing the user is searching for
        console.log(searchTerm)

        //return to default categories when search is empty?
        if (term === "") {
            setSearchItems(items)
        }
        else {
            //insert code for searching terms
        }
    }

    return(
        <div className="search-bar-container c">
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..."
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="search-input c"
            />
            {isFocused && (
                <ul className="search-items c">
                    {searchItems.map((item, index) => (
                        <li key={index} className="search-item c">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default SearchBar