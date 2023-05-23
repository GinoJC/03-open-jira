import React, { DragEvent, FC } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from 'interfaces';
import { useUIContext } from 'context/ui';
import { getFormatDistanceToNow } from 'utils/dateFunctions';

interface Props {
  entry: Entry;
}

const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter();

  const { startDragging, endDragging } = useUIContext();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  };

  const onDragEnd = () => endDragging();

  return (
    <Card
      sx={{ mb: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={() => router.push(`entries/${entry._id}`)}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
          <Typography variant="body2">Hace {getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
