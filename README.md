# PlanIt_Automation

## Project Overview

This project automates functional UI test cases for the **Jupiter Toys** sample web application:  
🔗 http://jupiter.cloud.planittesting.com

The solution uses a modern automation framework designed using **Object-Oriented Programming (OOP)** principles. It is structured for maintainability, reusability, and scalability, and is compatible with **CI/CD pipelines** like **Jenkins**, **GitHub Actions**, or **GitLab CI**.

## Tools and Framework

    - Code Editor: VS Code
    - Language: Type script
    - Automation Framework: Playwright
    - Design Pattern: 	Page Object Model (POM)
    - Fixtures: Custom fixtures injected for page abstraction
    - CI/CD Compatibility:	Easily runnable in pipelines with tags and isolated test cases
    - Reporting: Allure and json reports

## Getting Started

- Cloning repository
  - The automation scripts can be cloned from repository 'https://github.com/harry81ful/PlanIt_Automation'
- Prerequisites

  - VS code or any other tool of choice installed
  - Node.Js is installed
  - Java JDK is installed (for allure reporting) with environment path variable set correctly

- Installation

  - After cloning the repository, users can install dependencies using <npm install>. User can also install separately all the required tools
  - Install playwright from the extensions (VS code as an example)

- Clean Install
  - If you get version conflicts or unexpected errors <rm -rf node_modules package-lock.json> and <npm cache clean --force>
  - Install dependencies with <npm install -D playwright@latest >
  - Faker for generating names, address, phone number etc using <npm install -D @faker-js/faker>
  - Allure reports can installed using <npm install -D allure-playwright> and install command line with <npm install -g allure-commandline --save-dev>

## Running tests

- All tests: All tests can be run with <npx playwright test>

- Individual tests:

  - If users want to run individual test then we can make use of tags in the code <npx playwright test --grep @testCase1>
  - The second test case requires to be run five times which can be achieved by <npx playwright test --grep @testCase2 --repeat-each 5>
    Note: Since I am using custom fixture for a clean test script the available repeat method in playwright can not be used

- Generate Reports: Reports can be generated in multiple ways.

  - Reports in terminal and configured in playwright.config.ts

    1. 'dot' format to indicate the tests completed
    2. 'json' format report in terminal and as a separate json file

  - Playwright reports: in-built which will open when a test is run (can be configured in playwright.config.ts)
  - Allure Reports :

        1. Generate report with <allure generate ./allure-results --clean>
        2. To open the report <allure open ./allure-report>

    Note: A github workflow has been set up to push the generated report and can be viewd at <https://harry81ful.github.io/PlanIt_Automation/>
