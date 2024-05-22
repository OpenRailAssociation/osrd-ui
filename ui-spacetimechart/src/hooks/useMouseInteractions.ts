import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type DataPoint,
  type MouseContextType,
  type Point,
  type SpaceTimeChartContextType,
  type SpaceTimeChartProps,
} from '../lib/types';
import { getEventPosition, getEventWheelDelta } from '../utils/events';

type Handlers = Pick<SpaceTimeChartProps, 'onPan' | 'onMouseMove' | 'onClick' | 'onZoom'>;

/**
 * This hook handles SpaceTimeChart mouse interactions.
 * It is an internal hook, and should only be used inside SpaceTimeChart.
 */
export function useMouseInteractions(
  dom: HTMLElement | null,
  { position, hoveredItem, down, isHover }: MouseContextType,
  handlers: Handlers,
  getData: SpaceTimeChartContextType['getData']
) {
  const handlersRef = useRef<Handlers>(handlers);
  const [panningState, setPanningState] = useState<
    { type: 'idle' } | { type: 'panning'; initialPosition: Point; initialData: DataPoint }
  >({ type: 'idle' });

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Generate event handlers:
  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (!dom) return;

      const { onClick } = handlersRef.current;
      if (onClick) {
        onClick({
          event,
          position,
          data: getData(position),
          hoveredItem,
        });
      }
    },
    [dom, getData, hoveredItem, position]
  );
  const wheelHandler = useCallback(
    (event: WheelEvent) => {
      const { onZoom } = handlersRef.current;
      if (onZoom && dom)
        onZoom({
          delta: getEventWheelDelta(event),
          position: getEventPosition(event, dom),
          event,
        });
    },
    [dom]
  );

  // Bind event handlers:
  useEffect(() => {
    if (!dom) return;
    dom.addEventListener('click', clickHandler);
    return () => {
      dom.removeEventListener('click', clickHandler);
    };
  }, [dom, clickHandler]);
  useEffect(() => {
    if (!dom) return;
    dom.addEventListener('wheel', wheelHandler);
    return () => {
      dom.removeEventListener('wheel', wheelHandler);
    };
  }, [dom, wheelHandler]);

  // Listen to "up" and "down" updates:
  useEffect(() => {
    const { onPan } = handlersRef.current;

    if (down) {
      // Start panning:
      setPanningState({
        type: 'panning',
        initialPosition: position,
        initialData: getData(position),
      });
    } else {
      // Stop panning:
      if (panningState.type === 'panning' && onPan)
        onPan({
          isPanning: false,
          position,
          initialPosition: panningState.initialPosition,
          data: getData(position),
          initialData: panningState.initialData,
        });

      if (panningState.type !== 'idle') setPanningState({ type: 'idle' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [down]);

  // Listen to "move" updates:
  useEffect(() => {
    const { onPan, onMouseMove } = handlersRef.current;

    if (onMouseMove) {
      onMouseMove({
        position,
        isHover: isHover,
        data: getData(position),
        hoveredItem,
      });
    }

    if (panningState.type === 'panning' && onPan)
      onPan({
        isPanning: true,
        position,
        initialPosition: panningState.initialPosition,
        data: getData(position),
        initialData: panningState.initialData,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position.x, position.y]);
}
