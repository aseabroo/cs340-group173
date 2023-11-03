---Start of DDL Script 

--- Disable foreign key checks to avoid errors during creation
SET FOREIGN_KEY_CHECKS=0;

--- Drop existing tables if they exist
DROP TABLE IF EXISTS AppliancesUpdates;
DROP TABLE IF EXISTS CustomerServices;
DROP TABLE IF EXISTS OTA_Updates;
DROP TABLE IF EXISTS Appliances;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS OTA_UpdatesAppliances;


---------------------------------------------------------------------------
-- Create Entity Tables
---------------------------------------------------------------------------

-- Users table records the details of the users owning the smart devices
CREATE OR REPLACE TABLE Users (
    userID int NOT NULL AUTO_INCREMENT UNIQUE,
    email varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    phone varchar(20) NULL,
    PRIMARY KEY(userID)
);
ALTER TABLE Users AUTO_INCREMENT = 1000;

-- Appliances table records details of the specific household appliances integrated with WIFI and BLE capabilities
CREATE OR REPLACE TABLE Appliances (
    applianceID int NOT NULL AUTO_INCREMENT UNIQUE,
    model varchar(50) NOT NULL,
    datePurchased DATE NOT NULL,
    lastUpdated DATE NOT NULL,
    userID INT NOT NULL,
    PRIMARY KEY (applianceID),
    INDEX fk_customerServices_Users1_idx (userID ASC) VISIBLE,
    CONSTRAINT fk_Appliances_Users1 FOREIGN KEY(userID) REFERENCES Users(userID)
);
ALTER TABLE Users AUTO_INCREMENT = 2000; --incremented to prevent overlap with UserIDs

-- CustomerServices table records interaction with users for support and maintenance
CREATE OR REPLACE TABLE CustomerServices (
    serviceID int NOT NULL AUTO_INCREMENT UNIQUE,
    issueDescription varchar(500) NOT NULL,
    resolutionStatus ENUM('resolved', 'pending', 'escalated'),
    dateReported DATE NOT NULL,
    userID int NOT NULL,
    applianceID int NOT NULL,
    PRIMARY KEY(serviceID),
    INDEX fk_customerServices_Appliances1_idx (applianceID ASC) VISIBLE,
    INDEX fk_customerServices_Users1_idx (userID ASC) VISIBLE,
    CONSTRAINT fk_customerServices_Users1 FOREIGN KEY(userID) REFERENCES Users(userID),
    CONSTRAINT fk_customerServices_Appliances1 FOREIGN KEY(applianceID) REFERENCES Appliances(applianceID)
);
ALTER TABLE Users AUTO_INCREMENT = 4000; --incremented to prevent overlap with other iDs

-- OTA_Updates table represents and logs the OTA updates 
CREATE OR REPLACE TABLE OTA_Updates (
    updateID INT NOT NULL AUTO_INCREMENT UNIQUE,
    updateVersion varchar(20) NULL,
    releaseDate DATE NULL,
    updateSize int NULL,
    status varchar(45) NULL,
    PRIMARY KEY (updateID)
);
ALTER TABLE Users AUTO_INCREMENT = 3000; --incremented to prevent overlap with other iDs

-- OTA_UpdatesAppliances is an intersection table facilitating the M:N relationship between OTA_Updates and the Appliances they apply to
CREATE OR REPLACE TABLE OTA_UpdatesAppliances(
    otaUpdatesUpdateID INT NOT NULL,
    appliancesApplianceID INT NOT NULL,
    PRIMARY KEY(otaUpdatesUpdateID,appliancesApplianceID),
    INDEX fk_OTA_UpdatesAppliances_Appliances1_idx (appliancesApplianceID ASC) VISIBLE,
    INDEX fk_OTA_UpdatesAppliances_OTA_Updates1_idx (otaUpdatesUpdateID ASC) VISIBLE, 
    CONSTRAINT fk_OTA_UpdatesAppliances_OTA_Updates1 FOREIGN KEY(otaUpdatesUpdateID) REFERENCES OTA_Updates(updateID) ON DELETE CASCADE,
    CONSTRAINT fk_OTA_UpdatesAppliances_Appliances1 FOREIGN KEY(AppliancesApplianceID) REFERENCES Appliances(applianceID) ON DELETE CASCADE
);


---------------------------------------------------------------------------
-- INSERT example data into respective tables 
---------------------------------------------------------------------------

-- Insert sample data into USERS
INSERT INTO Users (email, name, address, phone)
VALUES ('john.doe@example.com','John Doe','123 Oak Street','987-654-3210'),
('jane.smith@example.com','Jane Smith','456 Maple Avenue','123-456-7890'),
('alice.johnson@example.com','Alice Johnson','789 Pine Road','234-567-8901');

-- INSERT sample data into Appliances
INSERT INTO Appliances (userID,model,datePurchased,lastUpdated)
VALUES ((SELECT userID FROM Users WHERE email ='john.doe@example.com'),'SmartOvenx100','2021-03-15','2023-03-21'),
((SELECT userID FROM Users WHERE email ='jane.smith@example.com'),'CleanRobotV2','2022-06-09','2023-04-11'),
((SELECT userID FROM Users WHERE email ='alice.johnson@example.com'),'ClimateHubPro','2023-01-2','2023-04-0');

-- Insert sample data into OTA_updates
INSERT INTO OTA_Updates (updateVersion, releaseDate, updateSize, status)
VALUES ('v2.1.4','2023-03-21',150,'completed'),
('v3.2.0','2023-04-11',200,'pending'),
('v1.3.7','2023-04-03',120,'completed');

-- INSERT sample data into CustomerServices
INSERT INTO CustomerServices (userID,applianceID,issueDescription,dateReported,resolutionStatus)
VALUES ((SELECT userID FROM Users WHERE email ='john.doe@example.com'),2001,'Oven heating irregularly','2023-03-25','resolved'),
((SELECT userID FROM Users WHERE email ='jane.smith@example.com'), 2002, 'Robot Misses sopts while cleaning','2023-04-12', 'pending' ),
((SELECT userID FROM Users WHERE email ='alice.johnson@example.com'), NULL, 'Climate Hub app syncing issues', '2023-04-05', 'escalated');

-- INSERT sample data into OTA_UpdatesAppliances
INSERT INTO OTA_UpdatesAppliances (otaUpdatesUpdateID, appliancesApplianceID)
VALUES ((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v2.1.4'), (SELECT applianceID FROM Appliances WHERE model = 'SmartOvenx100')),
((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v3.2.0'), (SELECT applianceID FROM Appliances WHERE model = 'SmartOvenx100')),
((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v3.2.0'), (SELECT applianceID FROM Appliances WHERE model = 'CleanRobotV2')),
((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v1.3.7'), (SELECT applianceID FROM Appliances WHERE model = 'ClimateHubPro')),
((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v1.3.7'), (SELECT applianceID FROM Appliances WHERE model = 'SmartOvenx100')),
((SELECT updateID FROM OTA_Updates WHERE updateVersion = 'v1.3.7'), (SELECT applianceID FROM Appliances WHERE model = 'CleanRobotV2'));

-- Re-enable foreign key checks and commit the changes
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- End of DDL Script