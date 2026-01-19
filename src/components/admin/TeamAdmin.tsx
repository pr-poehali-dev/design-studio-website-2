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

interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  bio?: string;
}

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    bio: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const mockData: TeamMember[] = [
      { id: 1, name: 'Анна Петрова', role: 'Арт-директор', experience: '10 лет опыта', bio: 'Ведущий арт-директор студии' },
      { id: 2, name: 'Дмитрий Соколов', role: 'Графический дизайнер', experience: '7 лет опыта', bio: 'Специалист по брендингу' },
      { id: 3, name: 'Елена Кузнецова', role: 'Иллюстратор', experience: '5 лет опыта', bio: 'Создание авторских иллюстраций' },
      { id: 4, name: 'Игорь Морозов', role: 'UI/UX дизайнер', experience: '6 лет опыта', bio: 'Эксперт по интерфейсам' }
    ];
    setMembers(mockData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMember) {
      setMembers(members.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData }
          : member
      ));
      toast({
        title: 'Сотрудник обновлён',
        description: 'Информация успешно сохранена'
      });
    } else {
      const newMember: TeamMember = {
        id: Date.now(),
        ...formData
      };
      setMembers([...members, newMember]);
      toast({
        title: 'Сотрудник добавлен',
        description: 'Новый член команды добавлен'
      });
    }

    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      experience: member.experience,
      bio: member.bio || ''
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
    toast({
      title: 'Сотрудник удалён',
      description: 'Член команды удалён из списка'
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      experience: '',
      bio: ''
    });
    setEditingMember(null);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light">Команда ({members.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-none">
              Добавить сотрудника
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</DialogTitle>
              <DialogDescription>
                Заполните информацию о члене команды
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя и фамилия</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Должность</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Графический дизайнер"
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Опыт работы</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5 лет опыта"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Краткая информация</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Краткая биография или специализация"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingMember ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <div key={member.id} className="group text-center">
            <div className="w-32 h-32 rounded-full bg-secondary/20 mx-auto mb-6 flex items-center justify-center">
              <Icon name="User" size={48} className="text-muted-foreground/40" />
            </div>
            <h3 className="font-light text-base mb-2">{member.name}</h3>
            <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
            <p className="text-xs text-muted-foreground/70 mb-3">{member.experience}</p>
            {member.bio && (
              <p className="text-xs text-muted-foreground/70 mb-4">{member.bio}</p>
            )}
            <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => handleEdit(member)}
              >
                <Icon name="Pencil" size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => handleDelete(member.id)}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}