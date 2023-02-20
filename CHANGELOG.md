## [2.0.6]() 02-20-2023

### Features

- 

### Performance improvement

-

### Improvement

- `build` command, delete `dist` folder before rebuild project
- The date in `Calendar.List` was removed as it was redundant, replace by `Receive dividends` if value is superior to 0
- Use `Utils.Math` instead math formula

### Bugs fixes

- 

<br/>

## [2.0.5](https://github.com/KronosDev-Core/app-KronosFinancial/commit/596ce7e5852fcde172b7ed0389630d86ca78a69d) 02-19-2023

### Features

- Navbar (Navigation)
- Icons (Home, Logout, User)

### Performance improvement

-

### Improvement

- Improve input components (Errors, Icons, Input)
- Adapt form in `Calendar` with new input components
- Add routes (account, auth)

### Bugs fixes

- The icon in Button component moves out of place when the screen size changes

<br/>

## [2.0.4](https://github.com/KronosDev-Core/app-KronosFinancial/commit/76afcaea65b8a7c5dd69fcba71512f0ed2ed8aad) 02-18-2023

### Features

- 

### Performance improvement

-

### Improvement

- i18n of code, Texts, ... (dividende => dividend)
- Undo `remove all alias (@.../\*), is not working in linux environnement`
- Chores: Update deps
- Clean code

### Bugs fixes

- Top-Level await `const axiosInstance = (await import('...'));`

<br/>

## [2.0.3](https://github.com/KronosDev-Core/app-KronosFinancial/commit/30dac21ee54160127ec9c7b431ad82eba5b9ee0f) 02-10-2023

### Features

- Add `CHANGELOG.md`

### Performance improvement

-

### Improvement

- Reorganization of the project structure
- i18n of code, Texts, ... (dividende => dividend)
- Clean code
- Remove `dayjs` package and added build of `dayjs_next` with my own `businessDays` plugin

### Bugs fixes

- Remove all alias (@.../\*), is not working in linux environnement

<br/>

## [2.0.2](https://github.com/KronosDev-Core/app-KronosFinancial/commit/704a834f2148b46818d562989435145db649da71) 01-26-2023

### Features

- Add form `buyStock` in `Calendar` page
- Create new component
- Added new Icon

### Performance improvement

- Update context, replace Zustand by Jotai
- Split Calendar page in 3 Container

### Improvement

- Added new ts path "@utils"
- Clean code
- Update component

<br/>

## [2.0.1](https://github.com/KronosDev-Core/app-KronosFinancial/commit/4d1814fcc8cdf08fbb82ed7e918a583300ab62ce) 01-19-2023

### Features

- Add a list of dividends selected by the user in the calendar page
- Split all block in page calendar to container
- Add a new component DividendeItem
- Adapt api dividende to get dividends with value strictly equals

<br/>

## [2.0.0](https://github.com/KronosDev-Core/app-KronosFinancial/commit/cfe2d93b01a9f0cddd380ddc584c9784eb887ed8) 01-04-2023

### Features

- Improvements
- Add Calendar view

<br/>

## [1.1.6](https://github.com/KronosDev-Core/app-KronosFinancial/commit/0648455849c7c6ab73eceaa969b974fcfd5a5eb6) 12-22-2022

### Features

- Improvements
- Add route for future update

<br/>

## [1.1.5](https://github.com/KronosDev-Core/app-KronosFinancial/commit/d9d83d9386f631994e5c705d993a63bd84add65e) 12-20-2022

### Features

- Adaptation of the frontend due to the new backend
- Simplification of calls to the api
- other improvements

<br/>

## [1.1.4](https://github.com/KronosDev-Core/app-KronosFinancial/commit/9ddcb4a46838255b163dc20e929c5ea50c4cea3d) 12-14-2022

### Features

- Update & Clean package
- Improvements

<br/>

## [1.1.3](https://github.com/KronosDev-Core/app-KronosFinancial/commit/bb87ecaa65203dd686d3967d1a79cc6c00a231f5) 12-14-2022

### Features

- Add Status
- Adaptation of the type to the schema
- Visual graph in the table
- Other improvements

<br/>

## [1.1.2](https://github.com/KronosDev-Core/app-KronosFinancial/commit/0e8cf8141cac75431c556de097d927de7919238b) 12-14-2022

### Features

- Rework StatisticsItem
- Rework how to use DayJs

<br/>

## [1.1.1](https://github.com/KronosDev-Core/app-KronosFinancial/commit/d6564210201ed34f4c0809e7238a5da006ee8bcb) 12-13-2022

### Features

- Simplification of the strategy
- Upgrade of the BuyStock form

<br/>

## [1.1.0](https://github.com/KronosDev-Core/app-KronosFinancial/commit/700f48779a85353ec5f09ae0811a6379f7005ee3) 12-12-2022

### Features

- Table reorganization
- Fixing bugs
- Adaptation of data schema (DB & API modification)

<br/>

## [1.0.0](https://github.com/KronosDev-Core/app-KronosFinancial/commit/fa51a44b425ad26e3eded1749d610819f05a9d68) 12-11-2022

### Features

- Initialization of the React project
