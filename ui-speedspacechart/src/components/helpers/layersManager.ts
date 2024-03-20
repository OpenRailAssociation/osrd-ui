import * as d3 from "d3";
import type { Store } from "../../types/chartTypes";

export const zoomX = (store: Store, setStore: React.Dispatch<React.SetStateAction<Store>>) =>
  d3.zoom().on("zoom", (event) => {
    const ratio = event.transform.k;
    const leftOffset = event.transform.x;
    setStore(() => ({
      ...store,
      ratio,
      leftOffset,
    }));
  });

export const resetZoom = () => d3.zoom().transform(d3.select("#front-interactivity-layer"), d3.zoomIdentity);
