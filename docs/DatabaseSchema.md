# Database Schema

PK - Primary Key<br/>
UNQ - Unique<br/>
FK - Foreign Key<br/>
V - Data for view (should be refreshed or auto-calculate on update)<br />
? - Nullable<br />
<br />

## Admin

-   id (PK)
-   createdAt
-   updatedAt
-   username (UNQ)
-   hashedPassword

## Category

-   id (PK)
-   createdAt
-   updatedAt
-   ?parentCategoryId (FK to Self)
-   title (UNQ)
-   categoryUrl (UNQ)
-   categoryKeywords?
-   description?
-   thumbnailUrl?
-   coverPhotoUrl?
-   countSubCategories (V)
-   countPublishedSubCategories (V)
-   countProducts (V)
-   countPublishedProducts (V)
-   isPublished (V)

## Product

-   id (PK)
-   createdAt
-   updatedAt
-   categoryId (FK to Category)
-   productCode (UNQ)
-   title
-   productUrl (UNQ)
-   productKeywords?
-   thumbnailUrl?
-   description?
-   specificationInJson?
-   isPublished
-   countVariants (V)

## Color

-   id (PK)
-   createdAt
-   updatedAt
-   title (UNQ)
-   hexCode (UNQ)

## Brand

-   id (PK)
-   createdAt
-   updatedAt
-   title (UNQ)
-   description?
-   logoUrl
-   isPublished (V)
-   countProducts (V)

## ProductVariant

-   id (PK)
-   createdAt
-   updatedAt
-   productId (FK to Product)
-   colorId? (FK to Color)
-   size
-   variantCode (UNQ)
-   retailPrice
-   discountedPrice
-   productVariantCode (V)
-   countStock (V)
-   (UNQ of productId, colorId, size)

## ProductVariantStockEntry

-   id (PK)
-   createdAt
-   updatedAt
-   productVariantId (FK to ProductVariant)
-   quantity
