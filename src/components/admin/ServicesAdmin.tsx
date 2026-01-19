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

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const mockData: Service[] = [
      {
        id: 1,
        title: 'Брендинг',
        description: 'Создание уникального визуального стиля и фирменного стиля компании',
        icon: 'Palette'
      },
      {
        id: 2,
        title: 'Иллюстрация',
        description: 'Авторские иллюстрации для веб-сайтов, приложений и печатных изданий',
        icon: 'Lightbulb'
      },
      {
        id: 3,
        title: 'Графический дизайн',
        description: 'Разработка визуальных материалов: логотипы, плакаты, упаковка',
        icon: 'Layers'
      },
      {
        id: 4,
        title: 'UI/UX дизайн',
        description: 'Проектирование интерфейсов с фокусом на пользовательский опыт',
        icon: 'Layout'
      }
    ];
    setServices(mockData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
      toast({
        title: 'Услуга обновлена',
        description: 'Информация успешно сохранена'
      });
    } else {
      const newService: Service = {
        id: Date.now(),
        ...formData
      };
      setServices([...services, newService]);
      toast({
        title: 'Услуга добавлена',
        description: 'Новая услуга добавлена в список'
      });
    }

    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: 'Услуга удалена',
      description: 'Услуга удалена из списка'
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: ''
    });
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Управление услугами</h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить услугу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Редактировать услугу' : 'Добавить услугу'}</DialogTitle>
              <DialogDescription>
                Заполните информацию об услуге
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Название услуги</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Брендинг, UI/UX дизайн..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Подробное описание услуги"
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Название иконки</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Palette, Lightbulb, Layers..."
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Используйте названия иконок из Lucide Icons
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingService ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name={service.icon} size={32} className="text-primary" />
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(service)}
                >
                  <Icon name="Pencil" size={18} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(service.id)}
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
