import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface PortfolioItem {
  id: number;
  category: string;
  client: string;
  image_url: string;
  description?: string;
}

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    client: '',
    image_url: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const mockData: PortfolioItem[] = [
      { id: 1, category: 'Брендинг', client: 'TechCorp', image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/3a78e3e0-1179-4b2e-9a34-cfc122dc26ac.jpg', description: 'Разработка фирменного стиля' },
      { id: 2, category: 'Иллюстрация', client: 'Creative Agency', image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/7404f805-2c7e-47c9-afb1-6633158719e5.jpg', description: 'Серия иллюстраций для сайта' },
      { id: 3, category: 'UI/UX', client: 'StartUp Inc', image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/56f2ea5a-4581-4518-9745-f57217efaaa0.jpg', description: 'Дизайн мобильного приложения' }
    ];
    setItems(mockData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: 'Работа обновлена',
        description: 'Изменения успешно сохранены'
      });
    } else {
      const newItem: PortfolioItem = {
        id: Date.now(),
        ...formData
      };
      setItems([...items, newItem]);
      toast({
        title: 'Работа добавлена',
        description: 'Новая работа добавлена в портфолио'
      });
    }

    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      client: item.client,
      image_url: item.image_url,
      description: item.description || ''
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: 'Работа удалена',
      description: 'Работа удалена из портфолио'
    });
  };

  const resetForm = () => {
    setFormData({
      category: '',
      client: '',
      image_url: '',
      description: ''
    });
    setEditingItem(null);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light">Портфолио ({items.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-none">
              Добавить работу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Редактировать работу' : 'Добавить работу'}</DialogTitle>
              <DialogDescription>
                Заполните информацию о проекте
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Категория</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Брендинг, Иллюстрация, UI/UX..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="client">Клиент</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Название компании"
                  required
                />
              </div>
              <div>
                <Label htmlFor="image_url">URL изображения</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание проекта"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingItem ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group">
            <div className="aspect-square relative overflow-hidden mb-4 bg-secondary/20">
              <img src={item.image_url} alt={item.client} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleEdit(item)}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-none h-8 w-8"
                  onClick={() => handleDelete(item.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-light">{item.category}</h3>
              <p className="text-xs text-muted-foreground">{item.client}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground/70 pt-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}