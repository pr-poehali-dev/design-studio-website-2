import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export default function ContactsAdmin() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const mockData: ContactRequest[] = [
      {
        id: 1,
        name: 'Иван Сидоров',
        email: 'ivan@example.com',
        message: 'Здравствуйте! Интересует разработка фирменного стиля для нашей компании. Можете прислать примерную стоимость?',
        status: 'new',
        created_at: '2024-01-20T10:30:00'
      },
      {
        id: 2,
        name: 'Мария Кузнецова',
        email: 'maria@example.com',
        message: 'Нужна помощь с дизайном упаковки продукта. Когда можем обсудить детали?',
        status: 'read',
        created_at: '2024-01-19T14:20:00'
      },
      {
        id: 3,
        name: 'Алексей Петров',
        email: 'alex@example.com',
        message: 'Очень понравились ваши работы в портфолио. Хотел бы обсудить сотрудничество.',
        status: 'replied',
        created_at: '2024-01-18T09:15:00'
      }
    ];
    setRequests(mockData);
  };

  const handleView = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsOpen(true);
    if (request.status === 'new') {
      updateStatus(request.id, 'read');
    }
  };

  const updateStatus = (id: number, status: 'new' | 'read' | 'replied') => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status });
    }
  };

  const handleDelete = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
    toast({
      title: 'Заявка удалена',
      description: 'Заявка удалена из списка'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-primary">Новая</Badge>;
      case 'read':
        return <Badge variant="secondary">Прочитана</Badge>;
      case 'replied':
        return <Badge variant="outline">Отвечено</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Заявки с формы контактов</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-base">
            Всего: {requests.length}
          </Badge>
          <Badge className="bg-primary text-base">
            Новых: {requests.filter(r => r.status === 'new').length}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{request.name}</h3>
                  {getStatusBadge(request.status)}
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Icon name="Mail" size={16} />
                    {request.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    {formatDate(request.created_at)}
                  </span>
                </div>
                <p className="text-muted-foreground line-clamp-2">{request.message}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(request)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Просмотр
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(request.id)}
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Заявка от {selectedRequest?.name}</DialogTitle>
            <DialogDescription>
              {selectedRequest && formatDate(selectedRequest.created_at)}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selectedRequest.email}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedRequest.email);
                      toast({ title: 'Email скопирован' });
                    }}
                  >
                    <Icon name="Copy" size={14} />
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Сообщение</div>
                <Card className="p-4 bg-secondary/30">
                  <p className="whitespace-pre-wrap">{selectedRequest.message}</p>
                </Card>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Статус</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedRequest.status === 'read' ? 'default' : 'outline'}
                    onClick={() => updateStatus(selectedRequest.id, 'read')}
                  >
                    Прочитано
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedRequest.status === 'replied' ? 'default' : 'outline'}
                    onClick={() => updateStatus(selectedRequest.id, 'replied')}
                  >
                    Отвечено
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
