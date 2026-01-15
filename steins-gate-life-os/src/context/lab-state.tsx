'use client';

import { createContext, useContext, useMemo, useReducer } from "react";
import { computeDashboardReport, updateWorldline, updateXPState } from "@/lib/engines";
import { initialLabState } from "@/lib/initial-state";
import type {
  AgentTransmission,
  LabState,
  RandomEvent,
  XPEngineState,
} from "@/lib/types";

type LabAction =
  | { type: "xp:apply"; payload: { gain?: number; penalty?: number } }
  | { type: "worldline:shift"; payload: { delta: number } }
  | { type: "event:trigger"; payload: RandomEvent }
  | { type: "transmission:inject"; payload: AgentTransmission };

interface LabContextValue {
  state: LabState;
  xpState: XPEngineState;
  triggerEvent: (event: RandomEvent) => void;
  pushTransmission: (transmission: AgentTransmission) => void;
}

const LabContext = createContext<LabContextValue | null>(null);

function reducer(state: LabState, action: LabAction): LabState {
  switch (action.type) {
    case "xp:apply": {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          xp: updateXPState(state.dashboard.xp, action.payload),
        },
      };
    }
    case "worldline:shift": {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          divergence: updateWorldline(state.dashboard.divergence, action.payload.delta),
        },
      };
    }
    case "event:trigger": {
      const event = action.payload;
      let nextState = { ...state };
      if (event.effect === "xp_gain") {
        nextState = reducer(nextState, {
          type: "xp:apply",
          payload: { gain: event.magnitude },
        });
      } else if (event.effect === "xp_loss") {
        nextState = reducer(nextState, {
          type: "xp:apply",
          payload: { penalty: -event.magnitude },
        });
      } else {
        nextState = reducer(nextState, {
          type: "worldline:shift",
          payload: { delta: event.magnitude },
        });
      }
      return {
        ...nextState,
        dashboard: {
          ...nextState.dashboard,
          randomEvents: [
            { ...event, narrative: `${event.narrative} (resolved)` },
            ...nextState.dashboard.randomEvents.filter((item) => item.id !== event.id),
          ],
        },
      };
    }
    case "transmission:inject": {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          transmissions: [action.payload, ...state.dashboard.transmissions].slice(0, 6),
        },
      };
    }
    default:
      return state;
  }
}

export function LabStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialLabState);

  const value = useMemo<LabContextValue>(() => {
    const dashboard = computeDashboardReport(state);
    return {
      state: { dashboard },
      xpState: dashboard.xp,
      triggerEvent: (event) => dispatch({ type: "event:trigger", payload: event }),
      pushTransmission: (transmission) =>
        dispatch({ type: "transmission:inject", payload: transmission }),
    };
  }, [state]);

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLabState() {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error("useLabState must be used within LabStateProvider");
  }
  return context;
}
