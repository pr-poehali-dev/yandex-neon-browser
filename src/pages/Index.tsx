import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState('1');
  const [url, setUrl] = useState('');
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'Новая вкладка', url: '' }
  ]);
  
  const [bookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Яндекс', url: 'https://yandex.ru', favicon: '🔍' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com', favicon: '📺' },
    { id: '3', title: 'GitHub', url: 'https://github.com', favicon: '💻' },
    { id: '4', title: 'ВКонтакте', url: 'https://vk.com', favicon: '💙' },
  ]);

  const quickAccess = [
    { icon: 'Mail', label: 'Почта', color: 'text-[#8B5CF6]', url: 'https://mail.yandex.ru' },
    { icon: 'Video', label: 'Видео', color: 'text-[#0EA5E9]', url: 'https://yandex.ru/video' },
    { icon: 'Music', label: 'Музыка', color: 'text-[#8B5CF6]', url: 'https://music.yandex.ru' },
    { icon: 'ShoppingCart', label: 'Маркет', color: 'text-[#0EA5E9]', url: 'https://market.yandex.ru' },
  ];

  const handleQuickAccess = (accessUrl: string) => {
    setUrl(accessUrl);
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: accessUrl, title: accessUrl } : tab
    );
    setTabs(updatedTabs);
  };

  const handleBookmarkClick = (bookmarkUrl: string, title: string) => {
    setUrl(bookmarkUrl);
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: bookmarkUrl, title } : tab
    );
    setTabs(updatedTabs);
  };

  const handleHome = () => {
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: '', title: 'Новая вкладка' } : tab
    );
    setTabs(updatedTabs);
    setUrl('');
  };

  const [history, setHistory] = useState<{id: string, url: string, title: string, time: string}[]>([]);

  const handleNavigate = () => {
    if (!url) return;
    
    let searchUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      searchUrl = `https://yandex.ru/search/?text=${encodeURIComponent(url)}`;
    }
    
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: searchUrl, title: url } : tab
    );
    setTabs(updatedTabs);
    
    setHistory(prev => [{
      id: Date.now().toString(),
      url: searchUrl,
      title: url,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }, ...prev].slice(0, 50));
  };

  const addNewTab = () => {
    const newId = (tabs.length + 1).toString();
    setTabs([...tabs, { id: newId, title: 'Новая вкладка', url: '' }]);
    setActiveTabId(newId);
    setUrl('');
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen">
        <div className="bg-card border-b border-border">
          <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-all ${
                  activeTabId === tab.id 
                    ? 'bg-background border-x border-t border-primary/30 neon-border' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span className="text-sm truncate max-w-[150px]">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="hover:text-destructive"
                  >
                    <Icon name="X" size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addNewTab}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="Plus" size={18} />
            </button>
          </div>

          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:text-primary"
                onClick={() => window.history.back()}
                title="Назад"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:text-primary"
                onClick={() => window.history.forward()}
                title="Вперёд"
              >
                <Icon name="ArrowRight" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:text-primary"
                onClick={() => window.location.reload()}
                title="Обновить"
              >
                <Icon name="RotateCw" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:text-primary"
                onClick={handleHome}
                title="Домой"
              >
                <Icon name="Home" size={20} />
              </Button>
            </div>

            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                  placeholder="Введите адрес или поисковый запрос"
                  className="pl-10 bg-input border-border/50 focus:border-primary/50 neon-border-cyan"
                />
              </div>
              <Button onClick={handleNavigate} className="bg-primary hover:bg-primary/90 neon-border">
                <Icon name="Search" size={18} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="hover:text-primary"
                onClick={() => navigate('/settings')}
              >
                <Icon name="Settings" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-primary">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {tabs.find(t => t.id === activeTabId)?.url ? (
            <div className="h-full">
              <iframe
                src={tabs.find(t => t.id === activeTabId)?.url}
                className="w-full h-full border-0"
                title="SKZ Browser"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          ) : (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold neon-glow text-primary">SKZ</h1>
              <p className="text-muted-foreground">Ваш браузер на базе Яндекс платформы</p>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 neon-border">
              <h2 className="text-lg font-semibold mb-4 text-primary">Быстрый доступ</h2>
              <div className="grid grid-cols-4 gap-4">
                {quickAccess.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAccess(item.url)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all group"
                  >
                    <div className={`${item.color} group-hover:animate-pulse-neon`}>
                      <Icon name={item.icon as any} size={32} />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20 neon-border-cyan">
              <h2 className="text-lg font-semibold mb-4 text-secondary">Закладки</h2>
              <div className="grid grid-cols-2 gap-3">
                {bookmarks.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    onClick={() => handleBookmarkClick(bookmark.url, bookmark.title)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all text-left group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{bookmark.favicon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{bookmark.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{bookmark.url}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                🚀 Работает без интернета • Версия 1.0 • skz.ru
              </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;