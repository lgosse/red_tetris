// import { configureStore } from "../helpers/server";
// import { createRenderer } from "react-dom/test-utils";
// import chai from "chai";
// import equalJSX from "chai-equal-jsx";

// import React from "react";
// import { Provider } from "react-redux";
// import { combineReducers } from "redux";
// import { mount, configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-15";

// import { ConnectedRouter, push } from "react-router-redux";
// import { Switch, Route } from "react-router";

// // make sure to import your connected component, not your react class
// import App from "../../src/client/containers/App";
// // Routed components
// import Home from "../../src/client/containers/views/home/Home";
// import Ranking from "../../src/client/containers/views/Ranking";
// import NotFound from "../../src/client/containers/views/NotFound";

// configure({ adapter: new Adapter() });

// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const window = new JSDOM("").window;
// global.document = window.document;
// global.window = window;
// for (let key in window) {
//   if (!window.hasOwnProperty(key)) continue;
//   if (key in global) continue;

//   global[key] = window[key];
// }

// import { createMemoryHistory } from "history";
// const history = createMemoryHistory();

// import reducers from "../../src/client/reducers";
// const myReducer = combineReducers({ ...reducers });

// import { setupIntegrationTest } from "../../utils.js";

// chai.should();
// chai.use(equalJSX);

// describe("Router", function() {
//   describe("#ranking", function() {
//     let store;
//     let dispatchSpy;
//     let router;

//     beforeEach(() => {
//       router = {};
//       ({ store, dispatchSpy } = setupIntegrationTest(
//         { myReducer },
//         router,
//         history
//       ));
//     });

//     it("should link to /ranking", function() {
//       try {
//         const app = mount(
//           <Provider store={store}>
//             <ConnectedRouter history={history}>
//               <App>
//                 <Switch>
//                   <Route exact path="/" component={Home} />
//                   <Route path="/ranking" component={Ranking} />
//                   <Route component={NotFound} />
//                 </Switch>
//               </App>
//             </ConnectedRouter>
//           </Provider>
//         );

//         app
//           .find("a")
//           .find("#ranking-link")
//           .simulate("click");

//         console.log(store.getState().router.location);
//         console.log(history);
//       } catch (e) {
//         console.error(e);
//       }
//     });
//     it("should render Ranking component", function() {});
//   });

//   describe("#new-game", function() {
//     it("should link to /new-game", function() {});
//     it("should render NewGame component", function() {});
//   });

//   describe("#404", function() {
//     it("should render NotFound component", function() {});
//   });
// });
