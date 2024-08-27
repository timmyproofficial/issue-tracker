import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

interface Props {
  status: Status;
}

const StatusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={StatusMap[status].color}>{StatusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
