'use client';

import {useMemo} from 'react';
import {CATEGORIES, EnhancedCategoryNode} from '@/utils/category';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

type Props = {
  value: string[];
  onChange: (path: string[]) => void;
};

export default function CategorySelect({value, onChange}: Props) {

  const depthLists = useMemo(() => {
    const lists: EnhancedCategoryNode[][] = [];
    let currentLevel: EnhancedCategoryNode[] = CATEGORIES;

    lists.push(currentLevel);

    for (const selected of value) {
      const found = currentLevel.find(c => c.value === selected);
      if (!found || !found.children) break;

      currentLevel = found.children;
      lists.push(currentLevel);
    }

    return lists;
  }, [value]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg font-medium">카테고리</label>

      <div className="flex flex-wrap gap-x-2 gap-y-4">

        {depthLists.map((list, depth) => (
          <Select
            key={depth}
            value={value[depth] ?? ''}
            onValueChange={(v) => {
              const newPath = [...value];
              newPath[depth] = v;
              newPath.splice(depth + 1); // 하위 depth 초기화
              onChange(newPath);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="선택해주세요" />
            </SelectTrigger>

            <SelectContent>
              {list.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

      </div>
    </div>
  );
}
