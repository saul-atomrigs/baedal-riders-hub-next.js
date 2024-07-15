import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function WeekSelect() {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='-- 주 --' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>2024년 7월 1주</SelectItem>
        <SelectItem value='dark'>2024년 7월 2주</SelectItem>
      </SelectContent>
    </Select>
  );
}
