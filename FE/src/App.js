import './App.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GetFirstPageNewCatagory, GetFirstPageNewSort, GetPage } from './redux/photoActions';
import { Button, useDisclosure } from '@chakra-ui/react';
import { css } from '@emotion/react';
import TypeSelectionModal from './components/TypeSelectionModal';
import PaginatedList from './components/PaginatedList';
import SpinnerLoader from './components/SpinnerLoader';
import AlertModal from './components/AlertModal';


function App(props) {
  // Destructuring props and state variables
  const { photoMappedState, GetFirstPageNewCatagory, GetPage } = props;
  const {
    currentCategory,
    currentPageNumber,
    currentSortType,
    currentPaginatedList,
    currentPageSize,
    isNextButtonDisabled,
    loading,
    currentError
  } = photoMappedState;

  // State variables
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryTypes] = useState(['backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health', 'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music']);
  const [modalContent, setModalContent] = useState();
  const [modalContentType, setModalContentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effects
  useEffect(() => {
    setIsLoading(loading);
  }, [loading])

  useEffect(() => {
    GetFirstPageNewCatagory(currentCategory, currentSortType, currentPageSize)
  }, []);

  useEffect(() => {
    if (currentError) {
      console.log("current error: ", currentError);
    };
  }, [currentError])

  // Event handlers
  const handlePrev = () => {
    GetPage(currentPageNumber - 1, currentPageSize)
  }

  const handleNext = () => {
    GetPage(currentPageNumber + 1, currentPageSize)
  }

  const handleChooseTypeButton = () => {
    onOpen();
    setModalContentType('category')
    setModalContent(categoryTypes);
  }

  const handlePhotoClick = (photo) => {
    onOpen();
    setModalContentType('photo');
    setModalContent(photo);
  }

  const onCloseErrorModal = () => {
    return currentError === '';
  }

  const disabledStyles = css`
  &:hover {
    background-color: rgb(250, 250, 255) !important;
    color: initial !important;
    cursor: not-allowed !important;
  }
`;

  return (
    <>
      <AlertModal show={currentError !== ''} onClose={onCloseErrorModal} alertMessage={currentError} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "1% auto",
        width: '45%'
      }}>
        <div id='buttons'>
          <Button
            id='prev'
            variant='solid'
            onClick={handlePrev}
            isDisabled={currentPageNumber === 1 || isLoading}
            css={(currentPageNumber === 1 || isLoading) && disabledStyles}
          >
            Prev
          </Button>
          <Button
            variant='solid'
            onClick={() => handleChooseTypeButton()}
            isDisabled={isLoading}
            css={isLoading && disabledStyles}
          >
            Choose Type
          </Button>
          <Button
            variant='solid'
            onClick={handleNext}
            isDisabled={isNextButtonDisabled || isLoading}
            css={(isNextButtonDisabled || isLoading) && disabledStyles}
          >
            Next
          </Button>
        </div>
        <div id='photosScreen'>
          {
            isLoading ? <SpinnerLoader isLoading={isLoading} />
              :
              <PaginatedList currentPaginatedList={currentPaginatedList} handlePhotoClick={handlePhotoClick} />
          }
        </div>
        <TypeSelectionModal
          categoryTypes={categoryTypes}
          isOpen={isOpen}
          onClose={onClose}
          currentPageSize={currentPageSize}
          currentSortType={currentSortType}
          modalContent={modalContent}
          modalContentType={modalContentType}
          GetFirstPageNewCatagory={GetFirstPageNewCatagory}
        />
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  photoMappedState: state,
})


const mapDispatchToProps = {
  GetFirstPageNewCatagory,
  GetFirstPageNewSort,
  GetPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
