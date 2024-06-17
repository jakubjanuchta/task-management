import { Project, SelectedProject } from '../src/types/project';
import { Story } from '../src/types/story';

type Item = Project | SelectedProject | Story;

enum ItemsKeys {
  projects = 'projects',
  selectedProject = 'selectedProject',
  stories = 'stories',
}

type ItemType = keyof typeof ItemsKeys;

const setItems = (itemType: ItemType, items: Item[]) => {
  const itemKey = ItemsKeys[itemType];

  localStorage.setItem(itemKey, JSON.stringify(items));
};

export const getItems = (itemType: ItemType) => {
  const itemKey = ItemsKeys[itemType];

  const items = localStorage.getItem(itemKey);

  return items ? JSON.parse(items) : [];
};

export const getSingleItem = (itemType: ItemType, itemId: Item['_id']) =>
  getItems(itemType).find((i: Item) => i._id === itemId);

export const createItem = (itemType: ItemType, item: Item) => {
  const items = getItems(itemType);

  setItems(itemType, [...items, item]);
};

export const removeItem = (itemType: ItemType, itemId: Item['_id']) => {
  const items = getItems(itemType).filter((i: Item) => i._id !== itemId);

  setItems(itemType, [...items]);
};

export const updateItem = (itemType: ItemType, item: Item) => {
  const items = getItems(itemType);

  const updatedItems = items.map((i: Item) => (i._id === item._id ? {...i, ...item} : i));

  setItems(itemType, updatedItems);
};
