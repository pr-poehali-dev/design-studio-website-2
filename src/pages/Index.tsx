import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const services = [
    {
      icon: 'Palette',
      title: 'Брендинг',
      description: 'Создание уникального визуального стиля и фирменного стиля компании'
    },
    {
      icon: 'Lightbulb',
      title: 'Иллюстрация',
      description: 'Авторские иллюстрации для веб-сайтов, приложений и печатных изданий'
    },
    {
      icon: 'Layers',
      title: 'Графический дизайн',
      description: 'Разработка визуальных материалов: логотипы, плакаты, упаковка'
    },
    {
      icon: 'Layout',
      title: 'UI/UX дизайн',
      description: 'Проектирование интерфейсов с фокусом на пользовательский опыт'
    }
  ];

  const portfolio = [
    { id: 1, category: 'Брендинг', client: 'TechCorp', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/3a78e3e0-1179-4b2e-9a34-cfc122dc26ac.jpg' },
    { id: 2, category: 'Иллюстрация', client: 'Creative Agency', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/7404f805-2c7e-47c9-afb1-6633158719e5.jpg' },
    { id: 3, category: 'UI/UX', client: 'StartUp Inc', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/56f2ea5a-4581-4518-9745-f57217efaaa0.jpg' },
    { id: 4, category: 'Графика', client: 'Fashion Brand', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/3a78e3e0-1179-4b2e-9a34-cfc122dc26ac.jpg' },
    { id: 5, category: 'Брендинг', client: 'EcoMarket', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/7404f805-2c7e-47c9-afb1-6633158719e5.jpg' },
    { id: 6, category: 'Иллюстрация', client: 'Book Publisher', image: 'https://cdn.poehali.dev/projects/565ca836-99bb-4807-a3ef-7d3d8deb371f/files/56f2ea5a-4581-4518-9745-f57217efaaa0.jpg' }
  ];

  const team = [
    { name: 'Анна Петрова', role: 'Арт-директор', experience: '10 лет опыта' },
    { name: 'Дмитрий Соколов', role: 'Графический дизайнер', experience: '7 лет опыта' },
    { name: 'Елена Кузнецова', role: 'Иллюстратор', experience: '5 лет опыта' },
    { name: 'Игорь Морозов', role: 'UI/UX дизайнер', experience: '6 лет опыта' }
  ];

  const blogPosts = [
    {
      title: 'Тренды графического дизайна 2024',
      date: '15 января 2024',
      excerpt: 'Обзор главных трендов в мире графического дизайна на предстоящий год'
    },
    {
      title: 'Как создать эффективный логотип',
      date: '8 января 2024',
      excerpt: 'Пошаговое руководство по разработке запоминающегося логотипа'
    },
    {
      title: 'Психология цвета в дизайне',
      date: '2 января 2024',
      excerpt: 'Влияние цветовых решений на восприятие бренда аудиторией'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-border/50' : 'bg-transparent'}`}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm font-light tracking-widest">
              LINEA STUDIO
            </div>
            <div className="hidden md:flex gap-12 items-center">
              {['home', 'portfolio', 'services', 'about', 'team', 'blog', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-xs font-light tracking-wide transition-colors uppercase ${activeSection === section ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О нас'}
                  {section === 'team' && 'Команда'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-48 pb-32 px-8 min-h-screen flex items-center">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
              Создаём<br />
              визуальные истории
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-16 max-w-xl font-light leading-relaxed">
              Студия графического дизайна. Создаём чистые линии, формы и визуальные решения для современных брендов.
            </p>
            <div className="flex gap-6">
              <button onClick={() => scrollToSection('portfolio')} className="text-sm font-light border-b border-foreground pb-1 hover:border-muted-foreground transition-colors">
                Смотреть работы →
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">Портфолио</h2>
            <p className="text-sm text-muted-foreground font-light">Избранные работы</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {portfolio.map((item, index) => (
              <div
                key={item.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden mb-4 bg-secondary/10">
                  <img 
                    src={item.image} 
                    alt={`${item.category} - ${item.client}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-light">{item.category}</h3>
                  <p className="text-xs text-muted-foreground">{item.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-8 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">Услуги</h2>
            <p className="text-sm text-muted-foreground font-light">Наши компетенции</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-l border-border/30 pl-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <Icon name={service.icon} size={28} className="text-foreground/30" />
                </div>
                <h3 className="text-lg font-light mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">О студии</h2>
          </div>
          <div className="space-y-8 text-base leading-loose text-muted-foreground font-light max-w-3xl">
            <p>
              LINEA Studio — это творческая команда профессионалов, объединённых любовью к визуальному искусству и стремлением создавать уникальные решения для каждого клиента.
            </p>
            <p>
              Мы специализируемся на создании графических элементов, иллюстраций и визуальных материалов, которые помогают брендам выделиться и донести свою историю до аудитории.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-16 mt-24 max-w-2xl">
            <div>
              <div className="text-4xl font-light mb-2">150+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Проектов</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">50+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">8</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-32 px-8 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">Команда</h2>
            <p className="text-sm text-muted-foreground font-light">Наши люди</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 rounded-full bg-secondary/20 mx-auto mb-6 flex items-center justify-center">
                  <Icon name="User" size={40} className="text-muted-foreground/30" />
                </div>
                <h3 className="text-base font-light mb-2">{member.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                <p className="text-xs text-muted-foreground/70">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-32 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">Блог</h2>
            <p className="text-sm text-muted-foreground font-light">Мысли и идеи</p>
          </div>
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="group border-b border-border/30 pb-12 hover:border-border transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xs text-muted-foreground/70 mb-4 uppercase tracking-wide">{post.date}</div>
                <h3 className="text-xl font-light mb-4 group-hover:text-muted-foreground transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-8 bg-secondary/5">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20">
            <h2 className="text-2xl font-light mb-2">Контакты</h2>
            <p className="text-sm text-muted-foreground font-light">Давайте обсудим ваш проект</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div>
                <div className="text-xs text-muted-foreground/70 mb-2 uppercase tracking-wide">Email</div>
                <div className="text-sm font-light">hello@designstudio.com</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground/70 mb-2 uppercase tracking-wide">Телефон</div>
                <div className="text-sm font-light">+7 (495) 123-45-67</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground/70 mb-2 uppercase tracking-wide">Адрес</div>
                <div className="text-sm font-light">Москва, ул. Примерная, 123</div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Ваше имя" className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-foreground px-0" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-foreground px-0" />
                </div>
                <div>
                  <Textarea placeholder="Расскажите о вашем проекте" rows={5} className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-foreground px-0 resize-none" />
                </div>
                <Button variant="outline" className="rounded-none w-full" size="lg">
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/30 py-16 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-start mb-16">
            <div>
              <div className="text-sm font-light tracking-widest mb-2">
                LINEA STUDIO
              </div>
              <p className="text-xs text-muted-foreground font-light">Чистые линии. Точные формы.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Behance</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Dribbble</a>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex justify-between items-center">
            <p className="text-xs text-muted-foreground/70">© 2024 LINEA Studio</p>
            <a href="/admin" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Admin</a>
          </div>
        </div>
      </footer>
    </div>
  );
}