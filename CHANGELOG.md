## 09:00

### Features Added
- Initialized project structure
- Added `AGENTS.md` with hackathon workflow rules
- Created `CHANGELOG.md` with predefined format

### Files Modified
- AGENTS.md
- CHANGELOG.md
- README.md

### Issues Faced
- None

## 12:47

### Features Added
- Added local template image assets (template_acm.png, template_clique.png)
- Refactored AGENTS.md, README.md, and CHANGELOG.md to use 24-hour time format (HH:MM) instead of "Hour X"

### Files Modified
- AGENTS.md
- CHANGELOG.md
- README.md
- template_acm.png
- template_clique.png

### Issues Faced
- Initial remote image download attempt failed, resolved by using provided local files

## 22:58

### Features Added
- Set up the base Express server for the RESQ.AI backend
- Hooked up the PostgreSQL database and created the Prisma schema
- Built the Risk API to fetch actual data from OpenWeather and calculate disaster chances
- Created the core AI Report API to process location insights and save them to the DB

### Files Modified
- Added `package.json`, `server.js`, and `.env.example`
- Created Prisma schema in `prisma/schema.prisma`
- Added the DB and Axios config files in the `config/` folder
- Built the API routes and controllers for `risk` and `report`
- Set up a global error handling middleware

### Issues Faced
- Figured out how to split the backend structure into modular pieces so both of us could code and commit without causing merge conflicts
- Had to write fallback weather data logic just in case the OpenWeather API rate limits us
