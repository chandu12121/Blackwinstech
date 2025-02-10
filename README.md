Contact Management API
A simple backend API for managing contacts with clean code, API design, and functionality.

Features
API Endpoints
GET /contacts → Fetch all contacts (ID, Name, Email, Phone Number, Address, Created At).
POST /contacts → Create a new contact with required (Name, Email, Phone) and optional (Address) fields.
PUT /contacts/:id → Update an existing contact by ID with validation.
DELETE /contacts/:id → Delete a contact by ID and return a success message.
GET /contacts/:id → Fetch a single contact by ID.
Search Contacts → Search by Name or Email.
Validation → Ensures required fields are properly validated.
