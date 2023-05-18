import {
    GET_FIRST_PAGE_NEW_CATEGORY_SUCCESS,
    GET_FIRST_PAGE_NEW_CATEGORY_FAILURE,
    GET_FIRST_PAGE_NEW_SORT_SUCCESS,
    GET_FIRST_PAGE_NEW_SORT_FAILURE,
    GET_PAGE_SUCCESS,
    GET_PAGE_FAILURE,
    LOADING
} from './photoActions';



const initialState = {
    currentCategory: 'backgrounds',
    currentPageNumber: 1,
    currentSortType: 'id',
    currentTotalNumOfPhotos: 0,
    currentPaginatedList: [],
    currentPageSize: 9,
    isNextButtonDisabled: false,
    currentError: '',
    loading: false
}



const photoReducer = (state = initialState, action) => {
    let totalPages;
    switch (action.type) {
        case LOADING: {
            // Update loading state
            return {
                ...state,
                loading: true
            }
        }
        case GET_FIRST_PAGE_NEW_CATEGORY_SUCCESS:
            // Calculate total pages based on the number of photos and page size
            totalPages = Math.ceil(action.payload.currentTotalNumOfPhotos / state.currentPageSize);
            // Update state with new category data
            return {
                ...state,
                loading: false,
                currentCategory: action.payload.currentCategory,
                currentPageNumber: action.payload.currentPageNumber,
                currentSortType: action.payload.currentSortType,
                currentTotalNumOfPhotos: action.payload.currentTotalNumOfPhotos,
                currentPaginatedList: action.payload.currentPaginatedList,
                isNextButtonDisabled: action.payload.currentPageNumber >= totalPages,
                error: ''
            }
        case GET_FIRST_PAGE_NEW_SORT_SUCCESS:
            // Calculate total pages based on the number of photos and page size
            totalPages = Math.ceil(state.currentTotalNumOfPhotos / state.currentPageSize);
            // Update state with new sort data
            return {
                ...state,
                loading: true,
                currentPageNumber: action.payload.currentPageNumber,
                currentSortType: action.payload.currentSortType,
                currentPaginatedList: action.payload.currentPaginatedList,
                isNextButtonDisabled: action.payload.currentPageNumber >= totalPages,
                error: ''
            }
        case GET_PAGE_SUCCESS:
            // Calculate total pages based on the number of photos and page size
            totalPages = Math.ceil(state.currentTotalNumOfPhotos / state.currentPageSize);
            // Update state with new page data
            return {
                ...state,
                loading: false,
                currentPageNumber: action.payload.currentPageNumber,
                currentPaginatedList: action.payload.currentPaginatedList,
                isNextButtonDisabled: action.payload.currentPageNumber >= totalPages,
                error: ''
            }
        case GET_FIRST_PAGE_NEW_CATEGORY_FAILURE:
        case GET_FIRST_PAGE_NEW_SORT_FAILURE:
        case GET_PAGE_FAILURE:
            // Update state in case of failure
            return {
                ...state,
                loading: false,
                currentPageNumber: 1,
                currentTotalNumOfPhotos: 0,
                currentPaginatedList: [],
                isNextButtonDisabled: true,
                currentError: action.payload.currentError
            }

        default:
            return state;
    }
}

export default photoReducer;