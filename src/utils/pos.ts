/**
 * 获取dom元素的相对位置
 * @param el HTMLElement
 * @param offset { x: number, y: number}
 */
export function getElementPosition(el: HTMLElement, offset: { x: number, y: number }) {
  const docElm = document.documentElement;
  const docElmRect = docElm.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  return {
    x: (elRect.left - docElmRect.left - offset.x),
    y: (elRect.top - docElmRect.top - offset.y)
  };
}
