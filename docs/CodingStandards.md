# Coding Standards

<br />

## Database Entity Standards:

-   Put entity class in <code>/src/domain</code> folder.
-   Extends Entity with custom shared <code>BaseEntity</code> class.
-   Use individual branded types for each id of entity. eg. use <code>AdminId</code> type instead of <code>string</code>

<br />

## Service Function Standards:

-   Recommended to implement <code>DatabaseSession</code> in each service function to maintain transaction for each request/instance.
-   In case of list service always return tuple of list and count.

<br />

## API Standards:

-   Use POST method for all the request throughout the system.
-   Parse all the incoming data of API request of body, params or query. Parse data with the help of yup.
-   Always put API version as suffix of API endpoint path eg. <code>admin/login/v1</code>

<br />

## File & Folder Structure Standards:

-   <code>/docs</code> (documentations)
-   <code>/dist</code> (compiled/generated js code for production)
-   <code>/src</code> (source code)

    -   <code>/apis</code> (all the APIs and its test cases)
    -   <code>/core</code> (app level modules)
        -   <code>/auth</code> (authentication and authorization)
        -   <code>/configs</code> (all env and other system level configs)
        -   <code>/database</code> (orm base, db connection, ormconfigs, db migrations)
        -   <code>/http</code> (base server code)
    -   <code>/domain</code> (service functions)
    -   <code>/utils</code> (helper functions)

<br />

-   Write test cases in <code>\*.spec.ts</code> file.
-   Recommended to put specs/test files alongside the source code files in the same directory.
-   Use capitalize name for entity/feature folder eg. Admin, Product, etc. (use lowercase for the other folder names)
