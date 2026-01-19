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
  attachments?: PortfolioAttachment[];
}

interface PortfolioAttachment {
  id: number;
  file_url: string;
  file_name: string;
  file_type?: string;
  description?: string;
}

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [viewingItem, setViewingItem] = useState<PortfolioItem | null>(null);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const [attachmentFormData, setAttachmentFormData] = useState({
    file_url: '',
    file_name: '',
    file_type: '',
    description: ''
  });
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
      { 
        id: 1, 
        category: 'Брендинг', 
        client: 'TechCorp', 
        image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/3a78e3e0-1179-4b2e-9a34-cfc122dc26ac.jpg', 
        description: 'Разработка фирменного стиля',
        attachments: [
          { id: 1, file_url: 'https://example.com/logo.pdf', file_name: 'Логобук.pdf', file_type: 'pdf', description: 'Руководство по использованию логотипа' },
          { id: 2, file_url: 'https://example.com/colors.pdf', file_name: 'Цветовая палитра.pdf', file_type: 'pdf' }
        ]
      },
      { id: 2, category: 'Иллюстрация', client: 'Creative Agency', image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/7404f805-2c7e-47c9-afb1-6633158719e5.jpg', description: 'Серия иллюстраций для сайта', attachments: [] },
      { id: 3, category: 'UI/UX', client: 'StartUp Inc', image_url: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/56f2ea5a-4581-4518-9745-f57217efaaa0.jpg', description: 'Дизайн мобильного приложения', attachments: [] }
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

  const handleViewDetails = (item: PortfolioItem) => {
    setViewingItem(item);
  };

  const handleAddAttachment = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setViewingItem(item);
      setIsAttachmentsOpen(true);
    }
  };

  const handleAttachmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingItem) return;

    const newAttachment: PortfolioAttachment = {
      id: Date.now(),
      ...attachmentFormData
    };

    setItems(items.map(item => {
      if (item.id === viewingItem.id) {
        return {
          ...item,
          attachments: [...(item.attachments || []), newAttachment]
        };
      }
      return item;
    }));

    const updatedItem = {
      ...viewingItem,
      attachments: [...(viewingItem.attachments || []), newAttachment]
    };
    setViewingItem(updatedItem);

    setAttachmentFormData({
      file_url: '',
      file_name: '',
      file_type: '',
      description: ''
    });
    setIsAttachmentsOpen(false);

    toast({
      title: 'Файл добавлен',
      description: 'Новый файл добавлен к работе'
    });
  };

  const handleDeleteAttachment = (itemId: number, attachmentId: number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          attachments: item.attachments?.filter(a => a.id !== attachmentId) || []
        };
      }
      return item;
    }));

    if (viewingItem && viewingItem.id === itemId) {
      setViewingItem({
        ...viewingItem,
        attachments: viewingItem.attachments?.filter(a => a.id !== attachmentId) || []
      });
    }

    toast({
      title: 'Файл удалён',
      description: 'Файл удалён из работы'
    });
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
            <div className="aspect-square relative overflow-hidden mb-4 bg-secondary/20 cursor-pointer" onClick={() => handleViewDetails(item)}>
              <img src={item.image_url} alt={item.client} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-none h-8 w-8"
                  onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-none h-8 w-8"
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
              {item.attachments && item.attachments.length > 0 && (
                <div className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-xs">
                  <Icon name="Paperclip" size={12} className="inline mr-1" />
                  {item.attachments.length}
                </div>
              )}
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

      {viewingItem && (
        <Dialog open={!!viewingItem} onOpenChange={(open) => !open && setViewingItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-light">{viewingItem.client} — {viewingItem.category}</DialogTitle>
              <DialogDescription>{viewingItem.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-8">
              <div className="aspect-video relative overflow-hidden bg-secondary/10">
                <img src={viewingItem.image_url} alt={viewingItem.client} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-light">Файлы проекта</h3>
                  <Button variant="outline" size="sm" className="rounded-none" onClick={() => setIsAttachmentsOpen(true)}>
                    <Icon name="Plus" size={14} className="mr-2" />
                    Добавить файл
                  </Button>
                </div>

                {viewingItem.attachments && viewingItem.attachments.length > 0 ? (
                  <div className="space-y-3">
                    {viewingItem.attachments.map((attachment) => (
                      <div key={attachment.id} className="group flex items-start gap-4 border-b border-border/30 pb-3 hover:border-border transition-colors">
                        <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="File" size={20} className="text-muted-foreground/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href={attachment.file_url} target="_blank" rel="noopener noreferrer" className="text-sm font-light hover:underline block truncate">
                            {attachment.file_name}
                          </a>
                          {attachment.file_type && (
                            <span className="text-xs text-muted-foreground/70 uppercase">{attachment.file_type}</span>
                          )}
                          {attachment.description && (
                            <p className="text-xs text-muted-foreground mt-1">{attachment.description}</p>
                          )}
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={() => handleDeleteAttachment(viewingItem.id, attachment.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-sm text-muted-foreground font-light">
                    Файлов пока нет. Добавьте скриншоты, PDF или другие материалы проекта.
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAttachmentsOpen} onOpenChange={setIsAttachmentsOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Добавить файл</DialogTitle>
            <DialogDescription>Загрузите дополнительные материалы проекта</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAttachmentSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file_name">Название файла</Label>
              <Input
                id="file_name"
                value={attachmentFormData.file_name}
                onChange={(e) => setAttachmentFormData({ ...attachmentFormData, file_name: e.target.value })}
                placeholder="Логобук.pdf"
                required
              />
            </div>
            <div>
              <Label htmlFor="file_url">URL файла</Label>
              <Input
                id="file_url"
                value={attachmentFormData.file_url}
                onChange={(e) => setAttachmentFormData({ ...attachmentFormData, file_url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <Label htmlFor="file_type">Тип файла</Label>
              <Input
                id="file_type"
                value={attachmentFormData.file_type}
                onChange={(e) => setAttachmentFormData({ ...attachmentFormData, file_type: e.target.value })}
                placeholder="pdf, jpg, png..."
              />
            </div>
            <div>
              <Label htmlFor="attachment_description">Описание (опционально)</Label>
              <Textarea
                id="attachment_description"
                value={attachmentFormData.description}
                onChange={(e) => setAttachmentFormData({ ...attachmentFormData, description: e.target.value })}
                placeholder="Краткое описание файла"
                rows={2}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsAttachmentsOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">
                Добавить
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}