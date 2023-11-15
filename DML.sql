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

----------------------------------------------------------
-- Users
----------------------------------------------------------

-- Select statements for Users
SELECT * FROM Users;

-- Add new User
INSERT INTO Users (email, name, address, phone) VALUES ( :emailInput,:nameInput, :addressInput, :phoneInput );

-- Edit User 
UPDATE Users 
SET name=:nameInput, email=:emailInput, address=:addressInput, phone=:phoneInput
WHERE userID = :userIDInput;

-- Delete User
DELETE FROM Users WHERE userID=:userIDInput;

----------------------------------------------------------
-- Appliances
----------------------------------------------------------

-- Select statements for Appliances and dropdowns
SELECT * FROM Appliances;
SELECT applianceID FROM Appliances;
SELECT model FROM Appliances;
SELECT datePurchased FROM Appliances;
SELECT lastUpdated FROM Appliances;

-- Search Queries
SELECT * FROM Appliances WHERE applianceID = :applianceIDInput;
SELECT * FROM Appliances WHERE model = :modelInput;
SELECT * FROM Appliances WHERE applianceID = :applianceIDInput AND model = :modelInput AND datePurchased = :datePurchasedInput AND lastUpdated = :lastUpdatedInput; 

-- Add new Appliance
INSERT INTO Appliances (model, datePurchased, lastupdated, userID) 
VALUES (:modelInput, :datePurchasedInput, :lastUpdatedInput, :userIDInput);

-- Edit Appliance
UPDATE Appliances 
SET userID = :userIDInput, model=:modelInput, datePurchased=:datePurchasedInput, lastUpdated=:lastUpdatedInput
WHERE applianceID = :applianceIDInput;

-- Delete Appliance (deletion will cascade delete the M:N)
DELETE FROM Appliances WHERE applianceID = :applianceIDInput;

-- scrapped functionality
SELECT applianceID, model
FROM Appliances
WHERE model LIKE :modelInput OR 
      DATE_FORMAT(datePurchased, '%Y-%m-%d') LIKE :datePurchasedInput OR 
      DATE_FORMAT(lastUpdated, '%Y-%m-%d') LIKE :lastUpdatedInput
ORDER BY model;

----------------------------------------------------------
-- OTA_Updates
----------------------------------------------------------

-- Select statements for display and dropdowns
SELECT * FROM OTA_Updates;
SELECT applianceID FROM OTA_Updates;

-- Add new update
INSERT INTO OTA_Updates (updateVersion, releaseDate, updateSize, status) VALUES (:updateVersionInput, :releaseDateInput, :updateSizeInput, :statusInput);

-- Edit update
UPDATE OTA_Updates
SET updateVersion=:updateVersionInput, releaseDate=:releaseDateInput, updateSize=:updateSizeInput
WHERE updateID=:updateIDInput;

-- Delete update
DELETE FROM OTA_Updates WHERE updateID=:updateIDInput;

----------------------------------------------------------
-- CustomerServices
----------------------------------------------------------

-- Select statements for display and dropdown
SELECT * FROM CustomerServices;
SELECT COLUMN_TYPE FROM INFORMATION.SCHEMA.COLUMNS WHERE TABLE_NAME = OTA_Updates AND COLUMN_NAME = status;
SELECT applianceID FROM CustomerServices;
SELECT userID FROM CustomerServices;

-- add new ticket
INSERT INTO CustomerServices (userID, issueDescription, resolutionStatus, dateReported, applianceID) VALUES (:userIDInput, :issueDescriptionInput, :resolutionStatusInput, :dateReportedInput, :applianceIDInput );

-- edit ticket (can be used to NULL the applianceID, terminating the connection to appliances)
UPDATE CustomerServices
SET userID=:userIDInput, applianceID=:applianceIDInput, issueDescription=:issueDescriptionInput, dateReported=:datePurchasedInput, resolutionStatus=:resolutionStatusInput
WHERE serviceID=:serviceIDInput;

UPDATE CustomerServices
SET applianceID = NULL
WHERE otaUpdatesUpdateID = :otaUpdatesUpdateIDInput AND appliancesApplianceID = :appliancesApplianceIDInput;

-- delete ticket
DELETE FROM CustomerServices WHERE serviceID=:serviceIDInput;

----------------------------------------------------------
-- OTA_UpdatesAppliances
----------------------------------------------------------

-- select statements for display and dropdown
SELECT * FROM OTA_UpdatesAppliances
SELECT otaUpdatesUpdateID FROM OTA_UpdatesAppliances;
SELECT appliancesApplianceID FROM OTA_UpdatesAppliances;

-- add new 
INSERT INTO OTA_UpdatesAppliances (otaUpdatesUpdateID, appliancesAppliancesID) VALUES (:otaUpdatesUpdateIDInput, :appliancesAppliancesIDInput);

-- edit 
UPDATE OTA_UpdatesAppliances
SET otaUpdatesUpdateID=:otaUpdatesUpdateIDInput1, appliancesApplianceID=:appliancesApplianceIDInput1
WHERE otaUpdatesUpdateID=:otaUpdatesUpdateIDInput AND appliancesApplianceID=:appliancesApplianceIDInput;

-- delete
DELETE FROM OTA_UpdatesAppliances WHERE otaUpdatesUpdateID=:otaUpdatesUpdateIDInput AND appliancesApplianceID=:appliancesApplianceIDInput;


