// import fnView from "./view";
import fnTemplateView from "./template";

// reducer
import fnReducer from "./todo.reducer";

const obRootElement = document.getElementById("app");
// listState
// zvacsa byva to object
// aby sa v buducnosti mohli pridavat dalsie atributy
// listState = []
const obInitState = {
  data: []
};

function fnRootApp(obState, fnReducer, fnAppView, obRootElement) {
  let currentState = obState;
  console.log("state current state", currentState);
  // ui template generator
  // reciver currentState and fnDispatch
  // fnDispatch for calling reducer
  let currentView = fnAppView(currentState, fnDispatch);

  obRootElement.appendChild(currentView);

  function fnDispatch(obAction) {
    // chybicka sa vloudila
    //  do reducera si davala obState co je defaultny state
    // do premenenej currentState kumulujeme data z reducera
    // reducer ziskaval len obState a ten sa nidky nemenil
    // menit sa ma premenna  currentState
    //
    currentState = fnReducer(currentState, obAction);
    // console.log("updatedState, ", currentState);
    let updatedView = fnAppView(currentState, fnDispatch);
    obRootElement.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

fnRootApp(obInitState, fnReducer, fnTemplateView, obRootElement);
