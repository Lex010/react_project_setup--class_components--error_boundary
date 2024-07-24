import { saveAs } from 'file-saver';
import { Parser } from '@json2csv/plainjs';

export const downloadSelectedItems = (
  items: { name: string; description: string; detailsUrl: string }[],
) => {
  const parser = new Parser();
  const csv = parser.parse(items);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${items.length}_selected_items.csv`);
};
