import fnView from "./view";

export default function fnTemplateView(
  // obAppState = {} povodna . type bol object
  obAppState = {
    data: []
  },
  //  fnDispatch = () => consle.log('default dispatch called')
  fnDispatch = () => null
) {
  const obState = { inputValue: "" };

  const setState = e => Object.assign(obState, { inputValue: e.target.value });

  // obFormView start
  // elem : input > onkeyup
  // elem : button > textNode > save
  const obFormView = fnView(
    "div",
    null,
    fnView("input", { onkeyup: e => setState(e) }),
    fnView(
      "button",
      {
        className: "save-button",
        onclick: () =>
          obState.inputValue.length >= 3 &&
          fnDispatch({
            type: "ADD_ITEM_INTO_LIST",
            payload: obState.inputValue
          })
      },
      "save"
    )
  ); // obFormView end

  console.log("VIEW state", obState);

  const obListView = fnView(
    "ul",
    null,
    ...obAppState.data.map((item, index) =>
      fnView(
        "li",
        null,
        fnView("input", {
          value: item,
          onchange: e =>
            fnDispatch({
              type: "UPDATE_ITEM",
              payload: {
                value: e.target.value,
                index: index
              }
            })
        }),
        fnView(
          "button",
          {
            className: "remove-button",
            onclick: () =>
              fnDispatch({
                type: "REMOVE_ITEM_FROM_LIST",
                payload: Number(index)
              })
          },
          "x"
        )
      )
    )
  );

  return fnView("div", { className: "app-container" }, obFormView, obListView);
}
