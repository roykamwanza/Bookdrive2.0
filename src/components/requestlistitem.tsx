import React from 'react';
import { RequestCard } from './requestcard';
import { TripStatusView } from './tripstatusview';
import type { RideRequest } from '../types/driver';

interface RequestListItemProps {
  request: RideRequest;
  onAccept: (request: RideRequest) => void;
  onReject: (request: RideRequest) => void;
  onDone: (request: RideRequest) => void;
  onAdvance: (request: RideRequest) => void;
}

export function RequestListItem({
  request,
  onAccept,
  onReject,
  onDone,
  onAdvance,
}: RequestListItemProps) {
  if (request.status === 'pending') {
    return (
      <RequestCard request={request} onAccept={onAccept} onReject={onReject} />
    );
  }

  if (request.status === 'accepted') {
    return <TripStatusView request={request} onDone={onDone} onAdvance={onAdvance} />;
  }

  // 'declined' renders nothing
  return null;
}
