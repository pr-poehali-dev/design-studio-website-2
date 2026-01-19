import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PortfolioAdmin from '@/components/admin/PortfolioAdmin';
import BlogAdmin from '@/components/admin/BlogAdmin';
import TeamAdmin from '@/components/admin/TeamAdmin';
import ServicesAdmin from '@/components/admin/ServicesAdmin';
import ContactsAdmin from '@/components/admin/ContactsAdmin';

const ADMIN_PASSWORD = 'design2024';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-light tracking-wide mb-2">Admin Panel</h1>
            <p className="text-sm text-muted-foreground font-light">Введите пароль для доступа</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-foreground px-0 text-center"
                autoFocus
              />
              {error && (
                <p className="text-xs text-red-500 mt-2 text-center font-light">{error}</p>
              )}
            </div>
            
            <Button type="submit" variant="outline" className="rounded-none w-full" size="lg">
              Войти
            </Button>
          </form>

          <div className="mt-12 text-center">
            <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Вернуться на сайт
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light tracking-wide">
              <span className="text-foreground">Admin Panel</span>
            </h1>
<div className="flex gap-4 items-center">
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Выйти
              </button>
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Вернуться на сайт
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-border/50 rounded-none h-auto p-0 mb-16 justify-start gap-12">
            <TabsTrigger value="portfolio" className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none pb-4 text-base font-light">
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="blog" className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none pb-4 text-base font-light">
              Блог
            </TabsTrigger>
            <TabsTrigger value="team" className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none pb-4 text-base font-light">
              Команда
            </TabsTrigger>
            <TabsTrigger value="services" className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none pb-4 text-base font-light">
              Услуги
            </TabsTrigger>
            <TabsTrigger value="contacts" className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:shadow-none pb-4 text-base font-light">
              Заявки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioAdmin />
          </TabsContent>

          <TabsContent value="blog">
            <BlogAdmin />
          </TabsContent>

          <TabsContent value="team">
            <TeamAdmin />
          </TabsContent>

          <TabsContent value="services">
            <ServicesAdmin />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}