export default function fnView(strType, obProps, ...arrChildren) {
  const obHTMLObject =
    strType && typeof strType === "string" && document.createElement(strType);

  if (
    obProps &&
    typeof obProps === "object" &&
    typeof obProps.length === "undefined"
  )
    Object.assign(obHTMLObject, obProps);

  if (
    arrChildren &&
    typeof arrChildren === "object" &&
    typeof arrChildren.length !== "undefined"
  ) {
    for (let child of arrChildren) {
      if (typeof child === "string" || typeof child === "number") {
        obHTMLObject.appendChild(document.createTextNode(child));
      } else {
        obHTMLObject.appendChild(child);
      }
    }
  }
  return obHTMLObject;
}
