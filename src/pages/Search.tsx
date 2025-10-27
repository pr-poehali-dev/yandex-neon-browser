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

type TabType = 'all' | 'images' | 'videos' | 'maps' | 'news';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [iframeUrls, setIframeUrls] = useState<string[]>([]);

  const RESULTS_PER_PAGE = 10;

  useEffect(() => {
    if (query) {
      const allResults: SearchResult[] = Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        title: `${query} — результат ${i + 1}`,
        url: `https://example${i % 5}.com/${encodeURIComponent(query)}/${i + 1}`,
        snippet: `Подробная информация о запросе "${query}". Результат номер ${i + 1} с полезной информацией и примерами использования данной темы...`,
        domain: `example${i % 5}.com`
      }));
      
      setResults(allResults);
    }
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery, page: '1' });
      setSelectedUrl(null);
      setIframeUrls([]);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedUrl(null);
    setIframeUrls([]);
  };

  const handleOpenUrl = (url: string) => {
    setSelectedUrl(url);
    setIframeUrls([url]);
  };

  const handleOpenMultiple = () => {
    const startIdx = (currentPage - 1) * RESULTS_PER_PAGE;
    const pageResults = results.slice(startIdx, startIdx + RESULTS_PER_PAGE);
    const urls = pageResults.map(r => r.url);
    setIframeUrls(urls);
    setSelectedUrl(null);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ q: query, page: page.toString() });
    setSelectedUrl(null);
    setIframeUrls([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIdx = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIdx = startIdx + RESULTS_PER_PAGE;
  const currentResults = results.slice(startIdx, endIdx);
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen">
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
            <button 
              onClick={() => handleTabChange('all')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'all' 
                  ? 'border-primary font-medium' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Все
            </button>
            <button 
              onClick={() => handleTabChange('images')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'images' 
                  ? 'border-primary font-medium' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Картинки
            </button>
            <button 
              onClick={() => handleTabChange('videos')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'videos' 
                  ? 'border-primary font-medium' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Видео
            </button>
            <button 
              onClick={() => handleTabChange('maps')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'maps' 
                  ? 'border-primary font-medium' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Карты
            </button>
            <button 
              onClick={() => handleTabChange('news')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'news' 
                  ? 'border-primary font-medium' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Новости
            </button>
          </div>
        </div>
      </div>

      {(selectedUrl || iframeUrls.length > 0) && (
        <div className="flex-1 overflow-auto bg-muted/20">
          <div className="sticky top-0 bg-card border-b border-border p-2 flex items-center gap-2 z-10">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedUrl(null);
                setIframeUrls([]);
              }}
            >
              <Icon name="X" size={16} />
              <span className="ml-1">Закрыть</span>
            </Button>
            {selectedUrl && (
              <span className="text-xs text-muted-foreground truncate">{selectedUrl}</span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {selectedUrl && (
              <div className="col-span-full">
                <iframe
                  src={selectedUrl}
                  className="w-full h-[calc(100vh-200px)] border border-border rounded-lg bg-white"
                  title="Просмотр сайта"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            )}
            
            {!selectedUrl && iframeUrls.map((url, idx) => (
              <div key={idx} className="relative">
                <div className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs">
                  {idx + 1} из {iframeUrls.length}
                </div>
                <iframe
                  src={url}
                  className="w-full h-[400px] border border-border rounded-lg bg-white"
                  title={`Сайт ${idx + 1}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                <div className="mt-1 text-xs text-muted-foreground truncate">{url}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedUrl && iframeUrls.length === 0 && (
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Найдено примерно {results.length * 100} результатов ({(Math.random() * 0.5).toFixed(2)} сек)
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleOpenMultiple}
                className="gap-2"
              >
                <Icon name="Grid3x3" size={16} />
                Открыть все 10 сайтов
              </Button>
            </div>

            <div className="space-y-6">
              {currentResults.map((result) => (
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
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              
              <div className="flex gap-1">
                {getPageNumbers().map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : ''
                    }`}
                    variant={currentPage === pageNum ? 'default' : 'ghost'}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>

            <div className="mt-12 text-center text-xs text-muted-foreground">
              <p>skz.ru • Поиск на базе платформы Яндекс • © 2024</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
