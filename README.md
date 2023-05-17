# Store-app is a gallery project.

#### Cd fe/ and then run 'npm start'  ####
#### Cd be/ and then run 'node index.js' ####



 3 Functions that i built in the redux (action creators) :


 1 # GetFirstPageNewCatagory (newCatagory, newSortType, pageSize)

 This function takes a newCategory, a newSortType and a pageSize .
 It sets the cache memory in the server with photos for the specified newCategory,
 which is by default the first category from categories .
 It only returns the total number of photos .
 Contiousley (very important - otherwise, the cache gets depleted), 
 It sorts the photos in the cache based on the new sort type, which is by default 'id' .
 Eventually, it assigns into an array the first page of photos (starting over), of the given page size,
 Which is by default 9 .

 2 # GetFirstPageNewSort (newSortType, pageSize)

 This function takes a newSortType and a pageSize .
 It sorts the photos in the cache based on the new sort type, which is by default 'id' .
 Eventually, it assigns into an array the first page of photos (starting over), of the given page size,
 Which is by default 9 .

 3 # GetPage (newPageNumber, pageSize)
 
 This function takes a newPageNumber and pageSize . 
 It only assigns into an array the page of photos that is specified, of the given page size.
 It could be used to increment or decrement a page (as I implemented), and can also be used to
 Easily move between pages in case of a suitable UI.

Notes:
- The design is responsive
- You can eighter type a category, click on it or move with keyboard keys.

Stack:
- FE: React.js, Redux
- BE: Node.js (express.js)


