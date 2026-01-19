import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PortfolioAdmin from '@/components/admin/PortfolioAdmin';
import BlogAdmin from '@/components/admin/BlogAdmin';
import TeamAdmin from '@/components/admin/TeamAdmin';
import ServicesAdmin from '@/components/admin/ServicesAdmin';
import ContactsAdmin from '@/components/admin/ContactsAdmin';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('portfolio');

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-primary">Design</span>
                <span className="text-foreground">Studio</span>
                <span className="text-muted-foreground ml-3 text-xl">/ Админ-панель</span>
              </h1>
            </div>
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ArrowLeft" size={20} />
              На сайт
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Icon name="Image" size={18} />
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <Icon name="FileText" size={18} />
              Блог
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Icon name="Users" size={18} />
              Команда
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Icon name="Layers" size={18} />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Icon name="Mail" size={18} />
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
