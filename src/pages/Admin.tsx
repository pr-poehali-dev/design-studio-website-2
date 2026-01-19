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
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light tracking-wide">
              <span className="text-foreground">Admin Panel</span>
            </h1>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Вернуться на сайт
            </a>
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