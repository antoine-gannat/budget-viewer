export interface ICategory {
  name: string;
  matchingTitles: string[];
}

const CATEGORY_STORAGE_KEY = 'categories';

export const getSavedCategories = (): ICategory[] => {
  return JSON.parse(
    localStorage.getItem(CATEGORY_STORAGE_KEY) || '[]'
  ) as ICategory[];
};

export const saveCategories = (categories: ICategory[]) => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
};
