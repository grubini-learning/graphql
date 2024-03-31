# Dealership

## Requirements

1. As an admin I want to be able to group cars together
2. As an admin I want to have an Automatic group, where I can give the group a list of features and have my collection of cars be grouped based on the features I provided.
3. As an admin I want to be able to publish and un-publish groups
4. As an admin I want to check if a car is part of a group

## Shape

1. Group
   - title -> String
   - description -> HTML
   - image -> String
     1.1 Relationships to Car

- A car can belong to many groups
- A group can have many cars

## Design Process

1. Always start with a high-level view of objects and their relationships before dealing with specific fields
2. Never expose implementation details in your API
3. Design your API around the business domain not implementation details
4. It's easier to add fields than to remove them
5. group closely related fields together into sub objects
6. Always check wether list fields should be paginated or not
7. Always use object references instead of ID fields
8. Choose field name based on what makes sense, not based on the implementation
9. Use enums for fields which can only take a finite set of values
10. The API should provide business logic, not just the data
11. Write separate mutations for separate logical actions on a resource
12. For a relationship mutation always consider wether it would be useful to operate on multiple elements at once.
13. Prefix mutation names with the object they are mutating for alphabetical grouping
14. Structure mutation inputs to reduce duplication, even if this requires relaxing required constraints on certain fields
15. Mutations should provide user/business level errors via a `userErrors` field on the mutation payload
