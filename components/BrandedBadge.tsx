import { Badge } from './ui/badge';

type BrandedBadgeProps = {
  label: string;
  variant: 'baemin' | 'coupang';
};

export default function BrandedBadge({ label, variant }: BrandedBadgeProps) {
  return (
    <Badge className='w-[50px] justify-center' variant={variant}>
      {label}
    </Badge>
  );
}
