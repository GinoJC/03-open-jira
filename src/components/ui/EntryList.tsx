import { List, Paper } from '@mui/material';
import React, { DragEvent, FC, useMemo } from 'react';
import { EntryCard } from './';
import { EntryStatus } from 'interfaces';
import { useEntriesContext } from 'context/entries';
import { useUIContext } from 'context/ui';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useEntriesContext();
  const { isDragging, endDragging } = useUIContext();

  const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries, status]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((entry) => entry._id === id)!;
    updateEntry({ ...entry, status: status });
    endDragging();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper sx={{ height: '100vh', overflow: 'auto', bgcolor: 'transparent' }}>
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all .3s', px: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EntryList;
