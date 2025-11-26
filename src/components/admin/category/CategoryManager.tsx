'use client';

import {Button} from '@/components/ui/button';
import {useCategoryManager} from '@/hooks/admin/category/useCategoryManager';
import type {CategoryNode} from '@/constants/categories';
import {JSX, useState} from 'react';

export default function CategoryManager() {
  const {
    categories,
    selectedPath,
    setSelectedPath,
    editingValue,
    setEditingValue,
    newValue,
    setNewValue,
    selected,
    canAdd,
    updateCategoryLabel,
    addNewCategory,
    deleteCategory,
  } = useCategoryManager();

  const [saving, setSaving] = useState(false);

  const saveCategories = async () => {
    if (saving) return;

    setSaving(true);

    const res = await fetch('/api/admin/categories/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({categories}),
    });

    setSaving(false);

    if (res.ok) {
      alert('카테고리가 저장되었습니다.');
    } else {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const renderTree = (items: CategoryNode[], path: string[] = []): JSX.Element => (
    <ul className="ml-4 border-l border-gray-300 pl-4">
      {items.map((item: CategoryNode) => {
        const itemPath = [...path, item.value];
        const isSelected = JSON.stringify(itemPath) === JSON.stringify(selectedPath);

        return (
          <li key={item.value} className="mb-2">
            <button
              onClick={() => {
                setSelectedPath(itemPath);
                setEditingValue(item.label);
              }}
              className={`px-2 py-1 rounded text-sm transition
                ${
                isSelected
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200'
              }
              `}
            >
              {item.label}
            </button>

            {item.children && item.children.length > 0 &&
              renderTree(item.children, itemPath)}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="max-w-4xl">
      <section className="py-2">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">카테고리 트리</h2>
          <Button onClick={saveCategories} disabled={saving}>
            {saving ? '저장 중...' : '전체 저장'}
          </Button>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-h-[700px] overflow-y-auto">
          {renderTree(categories)}
        </div>
      </section>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        {/* 선택됨 */}
        <section className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">선택한 카테고리</h3>
            {selected && (
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
              {selected.label}
            </span>
            )}
          </div>

          <Button
            variant="destructive"
            disabled={!selected}
            onClick={deleteCategory}
          >
            선택 삭제
          </Button>
        </section>

        {/* 수정 */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">카테고리 이름 수정</h3>

          <div className="flex justify-between items-center gap-6">
            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-300 bg-white
                       focus:ring-2 focus:ring-green-400 outline-none text-gray-800"
            />

            <Button onClick={updateCategoryLabel}>
              수정하기
            </Button>
          </div>
        </section>

        {/* 추가 */}
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">새 카테고리 추가</h3>
          {
            canAdd
              ? (
                <div className="flex justify-between items-center gap-6">
                  <input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-300 bg-white
                       focus:ring-2 focus:ring-green-400 outline-none text-gray-800"
                  />

                  <Button onClick={addNewCategory}>
                    추가하기
                  </Button>
                </div>
              )
              : (
                <span className="text-red-700 font-semibold text-sm rounded-md">카테고리는 최대 3depth까지만 등록 가능</span>
              )
          }
        </section>
      </div>
    </div>
  );
}
