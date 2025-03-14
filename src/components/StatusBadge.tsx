
import React from 'react';
import { cn } from '@/lib/utils';
import { BuildStatus } from '@/types';
import { CheckCircle, XCircle, AlertTriangle, Clock, CircleSlash } from 'lucide-react';

interface StatusBadgeProps {
  status: BuildStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: BuildStatus) => {
    const normalizedStatus = status.toUpperCase();
    
    switch (normalizedStatus) {
      case 'SUCCESS':
        return {
          icon: CheckCircle,
          label: 'Success',
          className: 'bg-success/10 text-success border-success/20',
        };
      case 'FAILURE':
        return {
          icon: XCircle,
          label: 'Failed',
          className: 'bg-error/10 text-error border-error/20',
        };
      case 'UNSTABLE':
        return {
          icon: AlertTriangle,
          label: 'Unstable',
          className: 'bg-warning/10 text-warning border-warning/20',
        };
      case 'IN_PROGRESS':
        return {
          icon: Clock,
          label: 'In Progress',
          className: 'bg-primary/10 text-primary border-primary/20',
        };
      case 'ABORTED':
      case 'NOT_BUILT':
        return {
          icon: CircleSlash,
          label: normalizedStatus === 'ABORTED' ? 'Aborted' : 'Not Built',
          className: 'bg-muted text-muted-foreground border-muted/50',
        };
      default:
        return {
          icon: AlertTriangle,
          label: status,
          className: 'bg-secondary text-secondary-foreground',
        };
    }
  };

  const { icon: Icon, label, className: statusClassName } = getStatusConfig(status);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        'transition-all duration-300',
        statusClassName,
        className
      )}
    >
      <Icon size={14} className="flex-shrink-0" />
      <span>{label}</span>
    </div>
  );
};

export default StatusBadge;
