export default function fnReducer(obState, obAction) {
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
