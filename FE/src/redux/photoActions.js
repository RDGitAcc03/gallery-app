import axios from 'axios';
import instance  from '../axiosContext';

// Action types
export const GET_FIRST_PAGE_NEW_CATEGORY_SUCCESS = 'GET_FIRST_PAGE_NEW_CATEGORY_SUCCESS';
export const GET_FIRST_PAGE_NEW_CATEGORY_FAILURE = 'GET_FIRST_PAGE_NEW_CATEGORY_FAILURE';

export const GET_FIRST_PAGE_NEW_SORT_SUCCESS = 'GET_FIRST_PAGE_NEW_SORT_SUCCESS';
export const GET_FIRST_PAGE_NEW_SORT_FAILURE = 'GET_FIRST_PAGE_NEW_SORT_FAILURE';

export const GET_PAGE_SUCCESS = 'GET_PAGE_SUCCESS';
export const GET_PAGE_FAILURE = 'GET_PAGE_FAILURE';

export const LOADING = 'LOADING';


// Fetches all photos from Pixabay API and returns the total number of photos
const setAllPhotosFromPixabayToMemory = async function (newCategory) {
    try {
        const response = await axios.get(`${instance}/photos/getPhotosFromPixabay?category=${newCategory}`);
        let numOfPhotos = response?.data.totalNumOfPhotos;
        return numOfPhotos;
    }
    catch (err) {
        console.log(err.message);
        throw new Error(err);
    }
}

// Sorts the list of photos by the given sort type
const sortListOfPhotosByType = async function (sortBy) {
    try {
        await axios.get(`${instance}/photos/sortList?sortBy=${sortBy}`);
    }
    catch (err) {
        console.log(err.message);
        throw new Error(err);
    }
}

// Fetches a specific page of photos from memory based on the page number and page size
const getCurrentPageOfPhotosFromMemory = async function (pageNumber, pageSize) {
    try {
        const response = await axios.get(`${instance}/photos/getPageFromMemory?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const paginatedList = response?.data.paginated;
        return paginatedList;
    } catch (err) {
        console.log(err.message);
        throw new Error(err);
    }
}

// Action creator to get the first page of photos for a new category
export const GetFirstPageNewCatagory = (newCatagory, newSortType, pageSize) => {
    return async function (dispatch) {
        try {
            dispatch({ type: LOADING });
            let totalNumOfPhotos = await setAllPhotosFromPixabayToMemory(newCatagory);
            await sortListOfPhotosByType(newSortType);
            let paginatedList = await getCurrentPageOfPhotosFromMemory(1, pageSize)
            dispatch({
                type: GET_FIRST_PAGE_NEW_CATEGORY_SUCCESS,
                payload: {
                    currentCategory: newCatagory,
                    currentPageNumber: 1,
                    currentSortType: newSortType,
                    currentTotalNumOfPhotos: totalNumOfPhotos,
                    currentPaginatedList: paginatedList
                }
            });
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: GET_FIRST_PAGE_NEW_CATEGORY_FAILURE,
                payload: {
                    currentError: err.message
                }
            })
            throw new Error(err);
        }
    }
}

// Action creator to get the first page of photos for a new sort type
export const GetFirstPageNewSort = (newSortType, pageSize) => {
    return async function (dispatch) {
        try {
            await sortListOfPhotosByType(newSortType);
            let paginatedList = await getCurrentPageOfPhotosFromMemory(1, pageSize)
            dispatch({
                type: GET_FIRST_PAGE_NEW_SORT_SUCCESS,
                payload: {
                    currentPageNumber: 1,
                    currentSortType: newSortType,
                    currentPaginatedList: paginatedList
                }
            });
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: GET_FIRST_PAGE_NEW_SORT_FAILURE,
                payload: {
                    currentError: err.message
                }
            })
            throw new Error(err);
        }
    }
}

// Action creator to get a specific page of photos
export const GetPage = (newPageNumber, pageSize) => {
    return async function (dispatch) {
        try {
            let paginatedList = await getCurrentPageOfPhotosFromMemory(newPageNumber, pageSize);
            dispatch({
                type: GET_PAGE_SUCCESS,
                payload: {
                    currentPageNumber: newPageNumber,
                    currentPaginatedList: paginatedList
                }
            });
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: GET_PAGE_FAILURE,
                payload: {
                    currentError: err.message
                }
            })
            throw new Error(err);
        }
    }
}
