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
-   countProductVariants (V)
-   countPublishedProductVariants (V)
-   isPublished (V)

## ProductBrand

-   id (PK)
-   createdAt
-   updatedAt
-   title (UNQ)
-   description?
-   logoUrl?
-   countProductVariants (V)
-   countPublishedProductVariants (V)
-   isPublished (V)

## Product

-   id (PK)
-   createdAt
-   updatedAt
-   categoryId (FK to Category)
-   productBrandId? (FK to Brand)
-   title
-   description?
-   specificationInJson?
-   isPublished
-   countVariants (V)

## ProductColor

-   id (PK)
-   createdAt
-   updatedAt
-   productId (FK to Product)
-   title
-   thumbnailUrl?
-   UNQ (productId, colorName)

## ProductVariant

-   id (PK)
-   createdAt
-   updatedAt
-   productColorId (FK to ProductColor)
-   size
-   productVariantCode (UNQ)
-   productVariantUrl (UNQ)
-   maxRetailPrice
-   discountedPrice
-   currentStock (V)
-   (UNQ of productColorId, size)

## ProductVariantStockEntry

-   id (PK)
-   createdAt
-   updatedAt
-   productVariantId (FK to ProductVariant)
-   quantity
