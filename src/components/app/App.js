import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { MainPage, ComicsPage } from "../pages";
// import SingleComicPage from "../pages/SingleComicsPage";
import AppHeader from "../appHeader/AppHeader";
// import Page404 from "../pages/404";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicsPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/comics">
                <ComicsPage />
              </Route>
              <Route exact path="/comics/:comicId">
                <SingleComicPage />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};
export default App;

// import { useState } from "react";
// import { BrowserRouter as Roter, Route, Switch } from "react-router-dom";
// import AppHeader from "../appHeader/AppHeader";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/errorBoundary";

// import decoration from "../../resources/img/vision.png";
// import { Router } from "react-router-dom/cjs/react-router-dom.min";

// const App = () => {
//   const [selectedChar, setChar] = useState(null);

//   const onCharSelected = (id) => {
//     setChar(id);
//   };

//   // return (
//   //   <Router>
//   //     <div className="app">
//   //       <AppHeader />
//   //       <main>
//   //         <Switch>
//   //           <Route exact path="/">
//   //             <ErrorBoundary>
//   //               <RandomChar />
//   //             </ErrorBoundary>

//   //             <div className="char__content">
//   //               <ErrorBoundary>
//   //                 <CharList onCharSelected={onCharSelected} />
//   //               </ErrorBoundary>

//   //               <ErrorBoundary>
//   //                 <CharInfo charId={selectedChar} />
//   //               </ErrorBoundary>
//   //             </div>

//   //             <img className="bg-decoration" src={decoration} alt="vision" />
//   //           </Route>
//   //           <Route exact path="/comics">
//   //             <AppBaner />
//   //             <ComicsList />
//   //           </Route>
//   //         </Switch>
//   //       </main>
//   //     </div>
//   //   </Router>
//   // );
// };

// export default App;
