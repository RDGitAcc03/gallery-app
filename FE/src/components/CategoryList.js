import './CategoryList.css';
import React, { useState } from 'react';

function CategoryList({ tempSearchValue, handleCategorySearch, handleInputFocus, categoriesFitSearchValue, updateTypeSelection }) {

    // State variable to track the index of the selected category
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        const { key } = e;

        // move down
        if (key === "ArrowDown") {
            e.preventDefault(); // prevent scrolling
            setSelectedCategoryIndex((prevIndex) =>
                prevIndex < categoriesFitSearchValue.length - 1 ? prevIndex + 1 : prevIndex
            );
        }

        // move up
        if (key === "ArrowUp") {
            e.preventDefault(); // prevent scrolling
            setSelectedCategoryIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }

        // select the current item
        if (key === "Enter") {
            if (selectedCategoryIndex !== -1) {
                updateTypeSelection(categoriesFitSearchValue[selectedCategoryIndex]);
            }
        }
    };


    return (
        <>
            <input
                id="searchInput"
                type="text"
                className={!tempSearchValue ? 'inputStyleCenter' : ''}
                value={tempSearchValue}
                placeholder='Enter a category:'
                onChange={(e) => handleCategorySearch(e)}
                onFocus={handleInputFocus}
                autoFocus="autofocus"
                onKeyDown={handleKeyDown}
            />
            <ul>
                {categoriesFitSearchValue?.map((fitCategory, index) => (
                    <li
                        onClick={() => updateTypeSelection(fitCategory)}
                        key={crypto.randomUUID()}
                        className={`categoryListItem ${
                            index === selectedCategoryIndex ? "selected" : ""
                          }`}
                    >
                        {fitCategory}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CategoryList;