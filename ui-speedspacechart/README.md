### SpeedSpaceChart
The `SpeedSpaceChart` is a component that visualizes the speed and position data of a simulation. It's part of the `ui-speedspacechart` module in your workspace.

### How it works
The `SpeedSpaceChart` component takes mainly three props: `width`, `height`, and `data`. The `width` and `height` props define the size of the chart, while the `data` prop is an `OsrdSimulationState` object that contains the simulation data to be visualized.

The `OsrdSimulationState` object includes various properties such as `consolidatedSimulation`wich is an array of SimulationTrain objects, each representing a train in the simulation.

The `SpeedSpaceChart` component uses a `useState` hook to create a `store` state variable. This `store` contains the speed, stops, electrification, and slopes data extracted from the `data` prop, as well as the `ratioX` and `leftOffset` properties for scaling and positioning the chart, and a `cursor` property for tracking the cursor position.

The `SpeedSpaceChart` component renders a `div` element that contains various layers for different parts of the chart. These layers include `CurveLayer`, `AxisLayerY`, `MajorGridY`, and others. Each layer is a separate and independant component that takes the `width`, `height`, and `store` props and is responsible for rendering a specific part of the chart.

The `useCanvas` hook takes a drawing function, the `width` and `height` of the canvas, the `store`, and optionally a function to set the `store`. It returns a reference to the canvas element. The drawing function is called with the `canvas` context, the `width` and `height`, the `store`, and the `setStore` function (if provided).

### Usage
Here is an example of how to use the `SpeedSpaceChart` component:

```js
import SpeedSpaceChart from 'ui-speedspacechart/src/components/SpeedSpaceChart';
import OSRD_SAMPLE from 'ui-speedspacechart/src/stories/assets/sampleData';

const MyComponent = () => {
  return (
    <SpeedSpaceChart
      width={1440}
      height={521.5}
      data={OSRD_SAMPLE}
    />
  );
};
```

In this example, `OSRD_SAMPLE` is a sample `OsrdSimulationState` object imported from `ui-speedspacechart/src/stories/assets/sampleData.ts`. In a real application, you would replace OSRD_SAMPLE with your actual simulation data.