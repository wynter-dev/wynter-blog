import CategoryManager from '@/components/admin/category/CategoryManager';

export default function CategoriesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">카테고리 관리</h1>
      <CategoryManager />
    </div>
  );
}