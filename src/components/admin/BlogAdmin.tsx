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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  publish_date: string;
  author: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    publish_date: '',
    author: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const mockData: BlogPost[] = [
      {
        id: 1,
        title: 'Тренды графического дизайна 2024',
        excerpt: 'Обзор главных трендов в мире графического дизайна на предстоящий год',
        content: 'Полный текст статьи о трендах графического дизайна...',
        publish_date: '2024-01-15',
        author: 'Анна Петрова'
      },
      {
        id: 2,
        title: 'Как создать эффективный логотип',
        excerpt: 'Пошаговое руководство по разработке запоминающегося логотипа',
        content: 'Полный текст статьи о создании логотипов...',
        publish_date: '2024-01-08',
        author: 'Дмитрий Соколов'
      }
    ];
    setPosts(mockData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...formData }
          : post
      ));
      toast({
        title: 'Статья обновлена',
        description: 'Изменения успешно сохранены'
      });
    } else {
      const newPost: BlogPost = {
        id: Date.now(),
        ...formData
      };
      setPosts([...posts, newPost]);
      toast({
        title: 'Статья добавлена',
        description: 'Новая статья опубликована в блоге'
      });
    }

    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publish_date: post.publish_date,
      author: post.author
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: 'Статья удалена',
      description: 'Статья удалена из блога'
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      publish_date: '',
      author: ''
    });
    setEditingPost(null);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light">Блог ({posts.length})</h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-none">
              Добавить статью
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Редактировать статью' : 'Добавить статью'}</DialogTitle>
              <DialogDescription>
                Заполните информацию о статье
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Введите заголовок статьи"
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Краткое описание</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Краткое описание для превью"
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Полный текст</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Полный текст статьи"
                  rows={8}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publish_date">Дата публикации</Label>
                  <Input
                    id="publish_date"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Автор</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Имя автора"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingPost ? 'Сохранить' : 'Опубликовать'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="group border-b border-border/30 pb-6 hover:border-border transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-light mb-3">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">{post.excerpt}</p>
                <div className="flex gap-6 text-xs text-muted-foreground/70">
                  <span>{new Date(post.publish_date).toLocaleDateString('ru-RU')}</span>
                  <span>{post.author}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleEdit(post)}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleDelete(post.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}