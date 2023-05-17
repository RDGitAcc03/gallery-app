import React, { memo } from 'react';
import Photo from './Photo';

const PaginatedList = memo(({ currentPaginatedList, handlePhotoClick }) => {
  return (
    currentPaginatedList && currentPaginatedList?.map(photo => <Photo key={crypto.randomUUID()} photo={photo} onClick={() => handlePhotoClick(photo)} />)
  )
});

export default PaginatedList;