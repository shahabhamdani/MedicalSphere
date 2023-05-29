-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 02:46 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicalsphere`
--

-- --------------------------------------------------------

--
-- Table structure for table `admincredentials`
--

CREATE TABLE `admincredentials` (
  `AD_ID` bigint(20) UNSIGNED NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admincredentials`
--

INSERT INTO `admincredentials` (`AD_ID`, `EMAIL`, `PASSWORD`) VALUES
(1, 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `alldoctors`
--

CREATE TABLE `alldoctors` (
  `DOC_ID` bigint(20) NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `REGNO` varchar(20) NOT NULL,
  `SPECIALIZATION` varchar(20) NOT NULL,
  `LOCATION` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alldoctors`
--

INSERT INTO `alldoctors` (`DOC_ID`, `NAME`, `EMAIL`, `PHONE_NUMBER`, `REGNO`, `SPECIALIZATION`, `LOCATION`) VALUES
(1, 'doc1', 'doc1@gmail.com', 123453798, 'dreg1', 'spl1', 'dloc1'),
(2, 'doc2', 'doc2@gmail.com', 62354, 'dreg2', 'spl2', 'dloc2'),
(3, 'doc3', 'doc3@gmail.com', 364587, 'dreg3', 'spl3', 'dloc3'),
(4, 'doc4', 'doc4@gmail.com', 343, 'dreg4', 'spl4', 'dloc4'),
(5, 'doc5', 'doc5@gmail.com', 324324, 'dreg5', 'spl5', 'dloc5'),
(6, 'doc6', 'doc6@gmail.com', 9423659, 'dreg6', 'spl6', 'dloc6'),
(7, 'doc7', 'doc7@gmail.com', 86253, 'dreg7', 'spl7', 'dloc7'),
(9, 'doc8', 'doc8@gmail.com', 23523, 'dreg8', 'spl8', 'dloc8'),
(95, 'TestDoc', 'testdoc@gmail.com', 0, '000', 'Phd', 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `text`, `image`, `date`, `time`) VALUES
(20, 'Taking care of your health is essential for a happy life', 'Taking care of your health is essential for a happy life. Eat a balanced diet, exercise regularly, get enough sleep, avoid smoking and excessive alcohol consumption, and prioritize mental health. Small changes can make a big difference in your overall well-being.Taking care of your health is essential for a happy life. Eat a balanced diet, exercise regularly, get enough sleep, avoid smoking and excessive alcohol consumption, and prioritize mental health. Small changes can make a big difference in your overall well-being.Taking care of your health is essential for a happy life. Eat a balanced diet, exercise regularly, get enough sleep, avoid smoking and excessive alcohol consumption, and prioritize mental health. Small changes can make a big difference in your overall well-being.', '1680715819624.png', '2023-04-05', '22:19');

-- --------------------------------------------------------

--
-- Table structure for table `confirmedappointments`
--

CREATE TABLE `confirmedappointments` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `PHONE_NUMBER` int(11) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctorcredentials`
--

CREATE TABLE `doctorcredentials` (
  `DOC_ID` bigint(20) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctorcredentials`
--

INSERT INTO `doctorcredentials` (`DOC_ID`, `EMAIL`, `PASSWORD`) VALUES
(1, 'doc1@gmail.com', 'dpass1'),
(2, 'doc2@gmail.com', 'dpass2'),
(3, 'doc3@gmail.com', 'dpass3'),
(4, 'doc4@gmail.com', 'dpass4'),
(5, 'doc5@gmail.com', 'dpass5'),
(6, 'doc6@gmail.com', 'dpass6'),
(9, 'doc8@gmail.com', 'dpass8');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `SL_NO` bigint(20) UNSIGNED NOT NULL,
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `REMARK` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `PHONE_NUMBER` int(11) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `FEEDBACK` tinyint(1) NOT NULL,
  `MED_CODE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicine_inventory`
--

CREATE TABLE `medicine_inventory` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine_inventory`
--

INSERT INTO `medicine_inventory` (`id`, `name`, `price`) VALUES
(1, 'Abilify', 891.19),
(2, 'Aciphex', 314.84),
(3, 'Actonel', 169.53),
(4, 'Actos', 354.09),
(5, 'Adderall', 753.02),
(6, 'Advair Diskus', 1123.08),
(7, 'Aggrenox', 228.78),
(8, 'Aldactone', 23.07),
(9, 'Aldara', 124.89),
(10, 'Allegra', 51.41),
(11, 'Altace', 30.18),
(12, 'Ambien', 155.91),
(13, 'Amitiza', 358.53),
(14, 'Amitriptyline', 16.86),
(15, 'Amlodipine', 12.34),
(16, 'Amoxicillin', 6.7),
(17, 'Aricept', 193.89),
(18, 'Asacol', 638.48),
(19, 'Atenolol', 13.68),
(20, 'Ativan', 132.62),
(21, 'Augmentin', 20.5),
(22, 'Avapro', 81.28),
(23, 'Avastin', 2133.56),
(24, 'Azithromycin', 11.73),
(25, 'Bactrim', 16.62),
(26, 'Benicar', 81.27),
(27, 'Boniva', 324.1),
(28, 'Botox', 825.61),
(29, 'Brilinta', 385.42),
(30, 'Bystolic', 161.53),
(31, 'Celebrex', 173.44),
(32, 'Celexa', 22.96),
(33, 'Cialis', 276.24),
(34, 'Cipro', 12.95),
(35, 'Citalopram', 8.93),
(36, 'Claritin', 39.12),
(37, 'Clindamycin', 31.09),
(38, 'Clobetasol', 50.24),
(39, 'Clonazepam', 18.71),
(40, 'Clopidogrel', 29.97),
(41, 'Combivent', 455.83),
(42, 'Concerta', 457),
(43, 'Acetaminophen', 7.99),
(44, 'Ibuprofen', 6.49),
(45, 'Aspirin', 5.79),
(46, 'Naproxen', 8.99),
(47, 'Lisinopril', 10.49),
(48, 'Metformin', 12.99),
(49, 'Atorvastatin', 19.99),
(50, 'Levothyroxine', 13.99),
(51, 'Simvastatin', 15.49),
(52, 'Losartan', 11.99),
(53, 'Azithromycin', 24.99),
(54, 'Amlodipine', 9.99),
(55, 'Amoxicillin', 15.99),
(56, 'Omeprazole', 11.49),
(57, 'Metoprolol', 12.99),
(58, 'Hydrochlorothiazide', 8.99),
(59, 'Furosemide', 9.49),
(60, 'Citalopram', 12.99),
(61, 'Fluticasone', 15.99),
(62, 'Fluoxetine', 13.49),
(63, 'Gabapentin', 11.99),
(64, 'Escitalopram', 14.49),
(65, 'Prednisone', 9.99),
(66, 'Sertraline', 12.99),
(67, 'Trazodone', 11.99),
(68, 'Warfarin', 12.49),
(69, 'Metronidazole', 10.99),
(70, 'Pantoprazole', 13.99),
(71, 'Carvedilol', 11.99),
(72, 'Clonazepam', 15.49),
(73, 'Loratadine', 8.99),
(74, 'Tramadol', 12.99),
(75, 'Meloxicam', 9.99),
(76, 'Quetiapine', 14.49),
(77, 'Albuterol', 11.99),
(78, 'Tamsulosin', 16.99),
(79, 'Fluconazole', 13.49),
(80, 'Doxycycline', 12.99),
(81, 'Ciprofloxacin', 15.99),
(82, 'Bupropion', 30);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `PATIENT_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `GENDER` varchar(7) NOT NULL,
  `DOB` varchar(10) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `MARITAL_STATUS` varchar(10) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`PATIENT_ID`, `NAME`, `GENDER`, `DOB`, `EMAIL`, `PHONE_NUMBER`, `MARITAL_STATUS`, `ADDRESS`) VALUES
(1, 'pat1', 'Male', '1999-04-29', 'pat1@gmail.com', 76475, 'Sin', 'ploc1'),
(2, 'pat2', 'Female', '1990-07-04', 'pat2@gmail.com', 653743647, 'Mar', 'ploc2'),
(3, 'pat3', 'Male', '2020-06-24', 'pat3@gmail.com', 76876876, 'Married', 'ploc3'),
(4, 'Rikza', 'Female', '2023-03-08', 'rikza@gmail.com', 3065949602, 'Single', 'Rawalpindi'),
(5, 'Uswa', 'Female', '2023-03-16', 'uswa@gmail.com', 3065949602, 'Married', 'Rawalpindi');

-- --------------------------------------------------------

--
-- Table structure for table `patientcredentials`
--

CREATE TABLE `patientcredentials` (
  `PATIENT_ID` int(11) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patientcredentials`
--

INSERT INTO `patientcredentials` (`PATIENT_ID`, `EMAIL`, `PASSWORD`) VALUES
(1, 'pat1@gmail.com', 'ppass1'),
(2, 'pat2@gmail.com', 'ppass2'),
(3, 'pat3@gmail.com', 'ppass3'),
(4, 'rikza@gmail.com', 'rikza123'),
(5, 'uswa@gmail.com', 'uswa123');

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(255) NOT NULL,
  `MEDICINE` varchar(255) NOT NULL,
  `MED_CODE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registerdoctor`
--

CREATE TABLE `registerdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `REGNO` varchar(20) NOT NULL,
  `SPECIALIZATION` varchar(20) NOT NULL,
  `LOCATION` varchar(15) NOT NULL,
  `FEE` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `validdoctor`
--

CREATE TABLE `validdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `FEE` int(255) NOT NULL,
  `SPECIALIZATION` varchar(15) NOT NULL,
  `LOCATION` varchar(15) NOT NULL,
  `REGNO` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `validdoctor`
--

INSERT INTO `validdoctor` (`DOC_ID`, `NAME`, `EMAIL`, `PHONE_NUMBER`, `FEE`, `SPECIALIZATION`, `LOCATION`, `REGNO`) VALUES
(1, 'Dr, Hamza Faroo', 'doc1@gmai.com', 3430000000, 500, 'FPSC', 'Islamabad', '3499'),
(2, 'Dr. Naila Shahi', 'doc2@gmail.com', 3430322233, 1500, 'Gynecologist', 'Rawalpindi', '3923'),
(3, 'Dr. Burhan Amja', 'doc3@gmail.com', 3430000003, 1400, 'Orthopedist ', 'Taxila', '2323'),
(4, 'Dr. Wajid Shah', 'doc4@gmail.com', 3430000000, 500, 'MBBS', 'Islamabad', '2324'),
(5, 'Dr. Fatima Tahi', 'doc5@gmail.com', 3430000000, 1000, 'ENT Specialist', 'Rawalpindi', '3245'),
(6, 'Dr Zubair ', 'doc6@gmail.com', 3430000000, 2000, 'Gastroentologis', 'Rawalpindi', '4521'),
(9, 'Dr. Shahid', 'doc8@gmail.com', 3430000000, 3000, 'Neurologist', 'Rawalpindi', '9893');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admincredentials`
--
ALTER TABLE `admincredentials`
  ADD UNIQUE KEY `ad_id` (`AD_ID`),
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `alldoctors`
--
ALTER TABLE `alldoctors`
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirmedappointments`
--
ALTER TABLE `confirmedappointments`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

--
-- Indexes for table `doctorcredentials`
--
ALTER TABLE `doctorcredentials`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD UNIQUE KEY `SL_NO` (`SL_NO`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

--
-- Indexes for table `medicine_inventory`
--
ALTER TABLE `medicine_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD UNIQUE KEY `PATIENT_ID` (`PATIENT_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `patientcredentials`
--
ALTER TABLE `patientcredentials`
  ADD PRIMARY KEY (`PATIENT_ID`),
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`MED_CODE`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  ADD UNIQUE KEY `id` (`DOC_ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `validdoctor`
--
ALTER TABLE `validdoctor`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admincredentials`
--
ALTER TABLE `admincredentials`
  MODIFY `AD_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `SL_NO` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `medicine_inventory`
--
ALTER TABLE `medicine_inventory`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `PATIENT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patientcredentials`
--
ALTER TABLE `patientcredentials`
  MODIFY `PATIENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `validdoctor`
--
ALTER TABLE `validdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
