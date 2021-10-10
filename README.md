# anno1800helper
Assistant tool(s) for game Anno 1800, made with [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [Ant Design](https://ant.design/).

Demo: [Anno 1800 Helper](http://blog.glkwhr.com/anno1800helper/)

Game: [Anno 1800](https://www.ubisoft.com/en-us/game/anno-1800/)


## Features
### Production Calculator
- Enter population or house amount for each population level

- Click `Calculate` button
  - The required workforce and the amount of each kind of factories will be calculated (from population needs) and displayed below
  - You can adjust factory amount (or efficiency), the corresponding efficiency (or amount) will be updated accordingly (for current population)

### Mobile Optimized (ish)
There have been some great tools with the similar functionality, but few of them is optimized for mobile devices. Because one of the major purposes for this project is to use smartphone or tablet to do the calculation while playing the game.

#### View on Smartphone
![smartphone_demo](https://user-images.githubusercontent.com/4232536/56857177-66bbd800-691f-11e9-8ffd-8a581eb9a145.gif)

#### View on Tablet
![tablet_demo](https://user-images.githubusercontent.com/4232536/56857197-720f0380-691f-11e9-95d0-2c8cf4e2b93b.gif)  
  

## Wishlist
- [x] adjust boost when factory count changes

- [x] group factories by product type

- [x] allow input house amount

- [x] add required workforce to calculation result

- [ ] group population levels by population type (new world/old world)

- [ ] distinguish happiness products from normal products

- [ ] allow adding multiple islands

- [ ] XML parsing: generate data in `.js` file

- [ ] refactor logic part code


## Similar Projects
- [Anno1800Calculator](https://github.com/NiHoel/Anno1800Calculator) by NiHoel  
  A comprehensive calculator for Anno 1800. It's a great project in both functionality and coding. I learned a lot by reading the code. NiHoel has a very elegant abstruction of game data. The raw data (`params_2019-04-17_full.js`) I use in my project is from this project. Appreciate it a lot!

- [anno1800assistant](https://github.com/Beesbeesbeesbees/anno1800assistant) by Beesbeesbeesbees  
  This tool supports adding mutiple islands and do the calculation at the same time. Pretty handy in the mid/late stage of the game. There's also an awesome AnnoXMLParser in the repo, which makes it easier to read game assets.


## Update
### 04/26/19
- Allow input house amount  
