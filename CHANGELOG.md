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

## 01:18

### Features Added
- Added the real OpenWeather API keys into our `.env` file for the backend
- Set up a `.gitignore` so we don't accidentally leak our API keys or push massive `node_modules` folders to GitHub
- Used GitHub's `Co-authored-by` trick in our commit messages so we both get credit while coding on the same laptop!

### Files Modified
- `server/.env`
- `.gitignore`

### Issues Faced
- Our terminal kept throwing errors because it couldn't find the `git` command, so we had to figure out how to commit and push everything using just the VS Code buttons
- We made a messy commit by accident, but managed to use the "Undo Last Commit" feature to fix it and force sync it to keep our GitHub history clean
