"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ roomId,children }: {roomId: string, children: ReactNode }) {
  return (
    <LiveblocksProvider
    throttle={16}
    authEndpoint={'/api/liveblocks-auth'}
   >
      <RoomProvider initialPresence={{
        cursor: null,
      }} id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}