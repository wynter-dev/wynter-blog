'use client';

import {useState} from 'react';
import type {CategoryNode} from '@/constants/categories';
import {RAW_CATEGORIES} from '@/constants/categories';

export function useCategoryManager() {
  const [categories, setCategories] = useState<CategoryNode[]>(RAW_CATEGORIES);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [editingValue, setEditingValue] = useState('');
  const [newValue, setNewValue] = useState('');

  // 선택한 노드 찾기
  const getSelectedCategory = () => {
    let node: CategoryNode | null = null;
    let current = categories;

    for (const v of selectedPath) {
      node = current.find((c) => c.value === v) ?? null;
      if (!node) return null;
      current = node.children ?? [];
    }
    return node;
  };

  // 수정
  const updateCategoryLabel = () => {
    if (!editingValue.trim()) return;

    const updated = structuredClone(categories);

    let current = updated;
    for (let i = 0; i < selectedPath.length; i++) {
      const v = selectedPath[i];
      const node = current.find((c) => c.value === v);
      if (!node) return;

      if (i === selectedPath.length - 1) {
        node.label = editingValue;
        node.value = editingValue.toLowerCase().replace(/\s+/g, '-');
      }

      current = node.children ?? [];
    }

    setCategories(updated);
  };

  // 추가
  const addNewCategory = () => {
    const newLabel = newValue.trim();
    if (!newLabel) return;

    const newNode: CategoryNode = {
      label: newLabel,
      value: newLabel.toLowerCase().replace(/\s+/g, '-'),
      children: [],
    };

    const updated = structuredClone(categories);

    if (selectedPath.length === 0) {
      updated.push(newNode);
      setCategories(updated);
      setNewValue('');
      return;
    }

    let curr = updated;
    for (let i = 0; i < selectedPath.length; i++) {
      const v = selectedPath[i];
      const node = curr.find((c) => c.value === v);
      if (!node) return;

      if (i === selectedPath.length - 1) {
        if (!node.children) node.children = [];
        node.children.push(newNode);
      }

      curr = node.children ?? [];
    }

    setCategories(updated);
    setNewValue('');
  };

  // 삭제
  const deleteCategory = () => {
    if (selectedPath.length === 0) return;

    const updated = structuredClone(categories);

    const remove = (nodes: CategoryNode[], depth: number): CategoryNode[] => {
      if (depth === selectedPath.length - 1) {
        return nodes.filter((n) => n.value !== selectedPath[depth]);
      }

      return nodes.map((n) => {
        if (n.value === selectedPath[depth] && n.children) {
          return {...n, children: remove(n.children, depth + 1)};
        }
        return n;
      });
    };

    setCategories(remove(updated, 0));
    setSelectedPath([]);
    setEditingValue('');
  };

  const selected = getSelectedCategory();
  const selectedDepth = selectedPath.length;
  const canAdd = selectedDepth < 3;

  return {
    categories,
    setCategories,
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
  };
}
