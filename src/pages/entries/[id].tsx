import { ChangeEvent, useMemo, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import { DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { Layout } from 'components';
import { Entry, EntryStatus } from 'interfaces';
import { dbEntries } from 'database';
import { useEntriesContext } from 'context/entries';
import { getFormatDistanceToNow } from 'utils/dateFunctions';

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useEntriesContext();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(entry.description || '');
  const [status, setStatus] = useState<EntryStatus>(entry.status || 'pending');
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length === 0 && touched, [inputValue, touched]);
  const title = useMemo(() => inputValue.substring(0, 20) + '...', [inputValue]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry = {
      ...entry,
      description: inputValue,
      status,
    };
    updateEntry(updatedEntry, true);
    router.push('/');
  };

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push('/');
  };

  return (
    <Layout title={title}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={`Creado hace ${getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ mt: 2, mb: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, bgcolor: 'error.dark' }}
        onClick={onDelete}>
        <DeleteOutlined />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
