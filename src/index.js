// import fnView from "./view";
import fnTemplateView from "./template";

const obRootElement = document.getElementById("app");
// listState
// zvacsa byva to object
// aby sa v buducnosti mohli pridavat dalsie atributy
// listState = []
const obInitState = {
  data: []
};

function fnReducer(obState, obAction) {
  if (obAction.type === "ADD_ITEM_INTO_LIST") {
    return {
      ...obState,
      data: obState.data.concat(obAction.payload)
    };
  } // end
  if (obAction.type === "REMOVE_ITEM_FROM_LIST") {
    console.log("REMOVE_ITEM_FROM_LIST", obAction.payload);
    const obList = obState.data.filter((item, index) => {
      return index !== obAction.payload;
    });
    return {
      ...obState,
      data: obList
    };
  } // end

  if (obAction.type === "UPDATE_ITEM") {
    return {
      ...obState,
      data: obState.data.map((item, index) => {
        return index === obAction.payload.index ? obAction.payload.value : item;
      })
    };
  } else {
    return obState;
  }
}

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
    console.log("updatedState, ", currentState);
    let updatedView = fnAppView(currentState, fnDispatch);
    obRootElement.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

fnRootApp(obInitState, fnReducer, fnTemplateView, obRootElement);

/* fnReducer(obInitState, {
  type: "ADD_ITEM_INTO_LIST",
  payload: "vyžehliť"
}); 

fnReducer(obInitState, {
  type: "REMOVE_ITEM_FROM_LIST",
  payload: 0
}); 

function fnDispatch(msg) {
  alert(msg);
}

obRootElement.appendChild(fnTemplateView(obInitState, fnDispatch));*/
