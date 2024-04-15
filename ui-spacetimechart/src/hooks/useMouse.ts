import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DataPoint,
  MouseState,
  Point,
  SpaceTimeChartContextType,
  SpaceTimeChartProps,
} from '../lib/types';
import { getEventPosition, getEventWheelDelta } from '../utils/events';

type Handlers = Pick<SpaceTimeChartProps, 'onPan' | 'onMouseMove' | 'onClick' | 'onZoom'>;

/**
 * This hook handles SpaceTimeChart mouse tracking and interactions.
 * It is an internal hook, and should only be used inside SpaceTimeChart.
 */
export function useMouse(
  dom: HTMLElement | null,
  handlers: Handlers,
  getData: SpaceTimeChartContextType['getData']
) {
  const handlersRef = useRef<Handlers>(handlers);
  const [panningState, setPanningState] = useState<
    { type: 'idle' } | { type: 'panning'; initialPosition: Point; initialData: DataPoint }
  >({ type: 'idle' });
  const [mouseState, setMouseState] = useState<MouseState>({
    isHover: false,
    position: { x: NaN, y: NaN },
  });
  const { position, down } = mouseState;

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Generate event handlers:
  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (!dom) return;

      const { onClick } = handlersRef.current;
      if (onClick) {
        const position = getEventPosition(event, dom);
        onClick({
          event,
          position,
          data: getData(position),
        });
      }
    },
    [dom, getData]
  );
  const downHandler = useCallback(
    (e: MouseEvent) => {
      if (!dom) return;

      setMouseState((state) => ({
        ...state,
        down: { ctrl: e.ctrlKey, shift: e.shiftKey },
      }));
    },
    [dom]
  );
  const upHandler = useCallback(() => {
    if (!dom) return;

    setMouseState((state) => ({ ...state, down: undefined }));
  }, [dom]);
  const moveHandler = useCallback(
    (event: MouseEvent) => {
      if (!dom) return;

      const position = getEventPosition(event, dom);
      const { x, y } = position;
      const width = dom.offsetWidth;
      const height = dom.offsetHeight;
      const isHover = x >= 0 && x <= width && y >= 0 && y <= height;
      setMouseState((state) => ({
        ...state,
        position,
        isHover,
      }));

      const { onMouseMove } = handlersRef.current;
      if (onMouseMove)
        onMouseMove({
          event,
          isHover,
          position,
          // TODO
          data: { position: NaN, time: NaN },
        });
    },
    [dom]
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
    dom.addEventListener('mousedown', downHandler);
    return () => {
      dom.removeEventListener('mousedown', downHandler);
    };
  }, [dom, downHandler]);
  useEffect(() => {
    document.addEventListener('mouseup', upHandler);
    return () => {
      document.removeEventListener('mouseup', upHandler);
    };
  }, [upHandler]);
  useEffect(() => {
    document.addEventListener('mousemove', moveHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
    };
  }, [moveHandler]);
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
    const { onPan } = handlersRef.current;

    if (panningState.type === 'panning' && onPan)
      onPan({
        isPanning: true,
        position,
        initialPosition: panningState.initialPosition,
        data: getData(position),
        initialData: panningState.initialData,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return mouseState;
}
