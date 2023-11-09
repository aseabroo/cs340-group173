/* Group 137 Project Step 3 Draft: DML
 Augustus Seabrooke, Andrew Pruitt
*/

/*
 Citation for the following DML:
 Date: 11/02/2023
 Based on sample_data_manipulation_queries.sql from Exploration - Database Application Design.
 Foundational structure was adapted and customized with specific values pertinent to our database.
 Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-database-application-design
*/

--colon (:) indicates variable names

-- SELECT Queries

-- 1. Fetch all Users
SELECT * FROM Users;

-- 2. Fetch a specific appliance by ID
SELECT * FROM Appliances WHERE applianceID = :applianceIDInput;

-- 3. Fetch all OTA updates available for an appliance
SELECT ota.* FROM OTA_Updates ota
JOIN OTA_UpdatesAppliances oua ON ota.updateID = oua.otaUpdatesUpdateID
WHERE oua.applianceID = :applianceIDInput;

-- 4. Fetch customer service records with a filter (e.g., status)
SELECT * FROM CustomerServices WHERE status = :statusInput;

-- 5. Fetch all appliances for a specific user
SELECT a.* 
FROM Appliances a
JOIN Users u ON u.userID = a.userID
WHERE u.userID = :userIDInput;

-- 6. Select all customer service records for a specific appliance
SELECT cs.*
FROM CustomerServices cs
JOIN Appliances a ON cs.applianceID = a.applianceID
WHERE a.applianceID = :applianceIDInput;



-- INSERT Statements

-- 1. Insert New User
INSERT INTO Users (email, name, address, phone) VALUES ( :emailInput,:nameInput, :addressInput, :phoneInput );

-- 2. Insert New Appliance
INSERT INTO Appliances (model, datePurchased, lastupdated, userID) VALUES (:modelInput, :datePurchasedInput, :lastUpdatedInput, :userIDInput);

-- 3. Insert New OTA Update
INSERT INTO OTA_Updates (updateVersion, releaseDate, updateSize, status) VALUES (:updateVersionInput, :releaseDateInput, :updateSizeInput, :statusInput);

-- 4. Link Appliance to OTA Update (Many-to-Many)
INSERT INTO OTA_UpdatesAppliances (otaUpdatesUpdateID, appliancesAppliancesID) VALUES (:otaUpdatesUpdateIDInput, :appliancesAppliancesIDInput);

-- 5. Insert New Customer Service Record
INSERT INTO CustomerServices (userID, issueDescription, resolutionStatus, dateReported, applianceID) VALUES (:userIDInput, :issueDescriptionInput, :resolutionStatusInput, :dateReportedInput, :applianceIDInput );

-- UPDATE Statement with NULLable relationship


--  Update CustomerServices and set applianceID to NULL 
UPDATE CustomerServices
SET applianceID = NULL
WHERE otaUpdatesUpdateID = :otaUpdatesUpdateIDInput AND appliancesApplianceID = :appliancesApplianceIDInput;

UPDATE CustomerServices 
SET applianceID = NULL 
WHERE serviceID = :serviceIDInput;


-- Update a user's details
UPDATE Users
SET name = :nameInput, email = :emailInput, phone = :phoneInput
WHERE userID = :userIDInput;

-- Delete a user and all related records in dependent tables (CASCADE delete)
DELETE FROM Users
WHERE userID = :userIDInput;


-- DELETE Statement (Many-to-Many Relationship)

-- Delete a link between an Appliance and OTA Update
DELETE FROM OTA_UpdatesAppliances
WHERE otaUpdatesupdateID = :otaUpdatesUpdateIDInput AND appliancesapplianceID = :appliancesApplianceIDInput;

-- DYNAMIC DROP-DOWN/Search Query

-- Dynamic search for Appliances by model, datePurchased, or lastUpdated.
SELECT applianceID, model
FROM Appliances
WHERE model LIKE :modelInput OR 
      DATE_FORMAT(datePurchased, '%Y-%m-%d') LIKE :datePurchasedInput OR 
      DATE_FORMAT(lastUpdated, '%Y-%m-%d') LIKE :lastUpdatedInput
ORDER BY model;

