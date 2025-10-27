import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: `${query} — что это такое`,
          url: `https://ru.wikipedia.org/wiki/${encodeURIComponent(query)}`,
          snippet: `Информация о запросе "${query}". Подробное описание и определение термина с примерами использования...`,
          domain: 'ru.wikipedia.org'
        },
        {
          id: '2',
          title: `${query}: полное руководство`,
          url: `https://example.com/${encodeURIComponent(query)}`,
          snippet: `Полное руководство по теме "${query}". Узнайте все о данном запросе из нашего подробного материала...`,
          domain: 'example.com'
        },
        {
          id: '3',
          title: `Как работает ${query}`,
          url: `https://habr.com/ru/search/?q=${encodeURIComponent(query)}`,
          snippet: `Разбираемся в деталях работы ${query}. Техническая статья с примерами и объяснениями...`,
          domain: 'habr.com'
        }
      ];
      setResults(mockResults);
    }
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-lg">skz.ru</span>
          </button>

          <div className="flex-1 flex gap-2">
            <div className="flex-1 relative max-w-2xl">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Поиск в skz.ru"
                className="pl-10 bg-input border-border"
              />
            </div>
            <Button onClick={handleSearch} variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate('/settings')}
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex gap-4 text-sm">
            <button className="pb-2 border-b-2 border-primary font-medium">Все</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">Картинки</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">Видео</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">Карты</button>
            <button className="pb-2 text-muted-foreground hover:text-foreground">Новости</button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-muted-foreground">
          Найдено примерно {results.length * 1000} результатов ({(Math.random() * 0.5).toFixed(2)} сек)
        </div>

        <div className="space-y-6">
          {results.map((result) => (
            <Card key={result.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer border-none shadow-none">
              <button 
                onClick={() => handleOpenUrl(result.url)}
                className="w-full text-left space-y-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs">{result.domain.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{result.domain}</span>
                </div>
                <h3 className="text-xl text-primary hover:underline font-medium">
                  {result.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {result.snippet}
                </p>
              </button>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <div className="flex gap-1">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-10 h-10">1</Button>
            <Button variant="ghost" className="w-10 h-10">2</Button>
            <Button variant="ghost" className="w-10 h-10">3</Button>
            <Button variant="ghost" className="w-10 h-10">4</Button>
            <Button variant="ghost" className="w-10 h-10">5</Button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>skz.ru • Поиск на базе платформы Яндекс • © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
