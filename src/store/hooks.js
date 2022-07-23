import { useContext } from "react/cjs/react.production.min";
import { CanvasContext } from '../Context';

export function useCanvasData() {
  const canvas = useContext(CanvasContent)

  return canvas.getCanvas();
}

export function useCanvasCmps() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvasCmps();
}
