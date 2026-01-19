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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span className="text-primary">Design</span>
              <span className="text-foreground">Studio</span>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              {['home', 'portfolio', 'services', 'about', 'team', 'blog', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === section ? 'text-primary' : 'text-foreground/70'}`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'services' && 'Услуги'}
                  {section === 'about' && 'О студии'}
                  {section === 'team' && 'Команда'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="hidden md:flex">Связаться</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Создаём визуальные<br />
              <span className="text-primary">истории</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Студия графического дизайна, специализирующаяся на создании уникальных иллюстраций и визуальных решений
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('portfolio')} className="text-lg px-8">
                Смотреть работы
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-lg px-8">
                Обсудить проект
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Портфолио</h2>
            <p className="text-xl text-muted-foreground">Наши лучшие работы</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolio.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`${item.category} - ${item.client}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="text-center text-white">
                      <div className="font-semibold text-lg mb-1">{item.category}</div>
                      <div className="text-sm opacity-90">{item.client}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Услуги</h2>
            <p className="text-xl text-muted-foreground">Что мы делаем лучше всего</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 border-2 hover:border-primary transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name={service.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">О студии</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Design Studio — это творческая команда профессионалов, объединённых любовью к визуальному искусству и стремлением создавать уникальные решения для каждого клиента.
            </p>
            <p>
              Мы специализируемся на создании графических элементов, иллюстраций и визуальных материалов, которые помогают брендам выделиться и донести свою историю до аудитории.
            </p>
            <p>
              Наш подход основан на глубоком понимании задач клиента, тщательном исследовании и безграничном творчестве. Каждый проект для нас — это возможность создать что-то особенное.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Проектов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">8</div>
              <div className="text-muted-foreground">Лет опыта</div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Команда</h2>
            <p className="text-xl text-muted-foreground">Люди, которые создают магию</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-6 flex items-center justify-center">
                  <Icon name="User" size={48} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.experience}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Блог</h2>
            <p className="text-xl text-muted-foreground">Делимся опытом и знаниями</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-3">{post.date}</div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto">
                  Читать далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Свяжитесь с нами для обсуждения проекта</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <div className="text-muted-foreground">hello@designstudio.com</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div className="text-muted-foreground">Москва, ул. Примерная, 123</div>
                </div>
              </div>
            </div>
            <Card className="p-8 border-2">
              <form className="space-y-6">
                <div>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" />
                </div>
                <div>
                  <Textarea placeholder="Расскажите о вашем проекте" rows={5} />
                </div>
                <Button className="w-full" size="lg">
                  Отправить
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Design</span>Studio
              </div>
              <p className="text-background/70">Создаём визуальные истории</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-background/70">
                <li>Брендинг</li>
                <li>Иллюстрация</li>
                <li>Графический дизайн</li>
                <li>UI/UX дизайн</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-background/70">
                <li>О студии</li>
                <li>Команда</li>
                <li>Блог</li>
                <li>Карьера</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Icon name="Linkedin" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Icon name="Facebook" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/70">
            <p>© 2024 Design Studio. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}