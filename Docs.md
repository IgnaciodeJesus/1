# Requirements:
- npm installed
- nodejs installed

# Setup:

npm i -g @nestjs/cli
nest new ey-risk-web-scrapping-real-time

# Module, Services & Controllers generated:
- nest generate module tasks
- nest generate service tasks
- nest generate module search
- nest generate service search
- nest generate controller search
- nest generate module world-bank
- nest generate service world-bank
- nest generate controller world-bank
- nest generate module ofac
- nest generate service ofac
- nest generate controller ofac
- nest generate module unified-search
- nest generate service unified-search
- nest generate controller unified-search

# Additional npm Libraries used in this project:
- axios
- selenium-webdriver
- chromedriver
- decompress
- csv-parser
- @nestjs/schedule
- @nestjs/throttler
- xml2js
- --save-dev @types/xml2js

comand -> npm install axios decompress decompress-unzip csv-parser @nestjs/schedule @nestjs/throttler

# Remember to add the chromedriver.exe to the path in the environment variables
Chromedriver -> [(┛ಠ_ಠ)┛彡┻━┻](https://googlechromelabs.github.io/chrome-for-testing/)

# Run the project:
First option to check code updates in real time, 2 option to miau (static)
npm run start:dev
npm run start

# Cron Functionality sample
![alt text](ey-risk-web-scrapping-real-time\cron_patterns.PNG)