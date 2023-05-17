import React, { useState } from 'react';
import '../components/TypeSelectionModal.css';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import CategoryList from './CategoryList';
import PhotoModal from './PhotoModal';

function TypeSelectionModal({ GetFirstPageNewCatagory, currentSortType, currentPageSize, categoryTypes, isOpen, onClose, modalContent, modalContentType }) {

    // State variables
    const [categoriesFitSearchValue, setCategoriesFitSearchValue] = useState(categoryTypes);
    const [tempSearchValue, setTempSearchValue] = useState('');

    // Function to handle input focus
    const handleInputFocus = () => {
        setCategoriesFitSearchValue(categoryTypes);
    }

    // Function to handle category search
    const handleCategorySearch = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const searchValue = e.target.value;
        setTempSearchValue(searchValue);
        const matchingCategories = categoryTypes.filter((category) =>
            category.toLowerCase().includes(searchValue.toLowerCase()));
        setCategoriesFitSearchValue(matchingCategories);
    }

    // Function to update the type selection
    const updateTypeSelection = (category) => {
        setTempSearchValue(category);
        onClose();
        GetFirstPageNewCatagory(category, currentSortType, currentPageSize);
    }

    return (
        <Modal id='modal' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader style={{ textAlign: 'center' }}>
                    { modalContentType === 'category' ? "Choose For Category Type:" : modalContent?.user }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody id='modalBody'>
                    {modalContentType === "category" && (
                        <CategoryList tempSearchValue={tempSearchValue} handleCategorySearch={handleCategorySearch} handleInputFocus={handleInputFocus} categoriesFitSearchValue={categoriesFitSearchValue} updateTypeSelection={updateTypeSelection} />
                    )}
                    {modalContentType !== "category" && (
                        <PhotoModal modalContent={modalContent} />
                    )}
                </ModalBody>
            </ModalContent>

        </Modal>
    )
}

export default TypeSelectionModal;