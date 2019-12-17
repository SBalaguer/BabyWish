**ROUTES**
_Products_

1. Create Products
   Method: POST
   Route: /api/products/create
   Info: Name, Category (ENUM), Price, PictureURL, AvailableStock

_User_

1. Create User -- this is sign up
   Method: POST
   Route: /api/user/create
   Information: Name, Role, DueDate / BirthDay, FirstPregnancy, Address, PhoneNumber, Email, Password.
   Importante: We are using Passport
2. Get a single User
   Method: GET
   Route: /api/user/id
   Returns: Gets all user information from one user
3. Get a all Users
   Method: GET
   Route: /api/user/
   Returns: Gets all user information from all users
4. Edit a user
   Method: PATCH
   Route: /api/user/edit/id
   Info: It will update only the information that we send. This route does not update password.
5. Sign in
   Method: POST
   Route: /authentication/sign-in
   required fields: email, password
6. Sign out
   Method: POST
   Route: /authentication/sign-out

_WishList_

1. Create Wishlist
   Method: POST
   Route: /api/wishlist/create/id
   Information: Id in this case is the users Id
   Important: We need to call this method once the user has been created so as to automatically create the first wishlist.
2. Get a Wishlist
   Method: GET
   Route: /api/wishlist/id
   Information: Id of the wishlist
   Returns: the entire wishlist, which is \_id, userId, products wich is Array of Objets [{id, productId, amountWanted, amountBought}]
3. Make a parent Add items to the wishlist
   Method: PATCH
   Route: /api/wishlist/id
   Information: ID of the wishlist
   Adds a new item for the products Array.
   Information: ProductId, Amount Wanted and Amount Bought (starts at 0)
4. Make a gifter gift one item in the wishlist
   Method: Patch
   Route: /api/wishlist/gifter/id
   Find a wishlist and update the amount bought for that specific item
5. Delete item from wishlist from Parent Side
   Method: Patch
   Route: /api/wishlist/remove/id
   Information: ID of the wishlist and ID of the product
   Find a wishlist by id and remove the product from the array
6. Get Wishlist by User ID
   Method: GET
   Route: /api/wishlist/user/id
   Information: User ID
   Next Step: Make this method bring all the wishlists for that specific user.

SANTI TEST WISHLIST
http://localhost:3000/wishlist/5df92c900f7b158f8c21e7fb
