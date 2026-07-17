// src/components/driver-request/RequestListItem.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RequestCard } from './requestcard';
import { TripStatusView } from './tripstatusview';
import { DRIVER_REQUEST_STRINGS } from '../../constants/driver-request/strings';
import { TRIP_DISPLAY_STATUS } from '../../types/driver-request/driver';
import type { RideRequest } from '../../types/driver-request/driver';

interface RequestListItemProps {
  request: RideRequest;
  onAccept: (request: RideRequest) => void;
  onReject: (request: RideRequest) => void;
}

export function RequestListItem({
  request,
  onAccept,
  onReject,
}: RequestListItemProps) {
  const { t } = useTranslation();

  if (request.status === 'pending') {
    return (
      <RequestCard request={request} onAccept={onAccept} onReject={onReject} />
    );
  }

  if (request.status === 'accepted') {
    return (
      <TripStatusView
        status={TRIP_DISPLAY_STATUS.EN_ROUTE}
        message={t(
          'driver.tripAcceptedMessage',
          DRIVER_REQUEST_STRINGS.tripAcceptedMessage
        )}
      />
    );
  }

  // 'declined' renders nothing
  return null;
}
