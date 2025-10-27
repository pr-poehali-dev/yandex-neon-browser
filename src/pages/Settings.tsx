import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  time: string;
}

interface Download {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'completed' | 'downloading';
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

const Settings = () => {
  const navigate = useNavigate();
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState('');
  const [newBookmarkUrl, setNewBookmarkUrl] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('skz-history');
    const savedBookmarks = localStorage.getItem('skz-bookmarks');
    
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  }, []);

  const [downloads] = useState<Download[]>([
    { id: '1', name: 'document.pdf', size: '2.4 МБ', date: '27.10.2024', status: 'completed' },
    { id: '2', name: 'image.jpg', size: '1.8 МБ', date: '26.10.2024', status: 'completed' },
    { id: '3', name: 'archive.zip', size: '15.3 МБ', date: '25.10.2024', status: 'completed' },
  ]);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('skz-history');
  };

  const handleRemoveHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('skz-history', JSON.stringify(updated));
  };

  const handleAddBookmark = () => {
    if (!newBookmarkTitle || !newBookmarkUrl) return;
    
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      title: newBookmarkTitle,
      url: newBookmarkUrl,
      favicon: '⭐'
    };
    
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem('skz-bookmarks', JSON.stringify(updated));
    
    setNewBookmarkTitle('');
    setNewBookmarkUrl('');
    setIsAddDialogOpen(false);
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('skz-bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:text-primary"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold neon-glow text-primary">Настройки</h1>
              <p className="text-sm text-muted-foreground">SKZ Browser</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Версия 1.0</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="bookmarks" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="bookmarks" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Bookmark" size={16} className="mr-2" />
              Закладки
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Clock" size={16} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Download" size={16} className="mr-2" />
              Загрузки
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Settings" size={16} className="mr-2" />
              Общие
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 neon-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-primary">Закладки ({bookmarks.length})</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 neon-border">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/20">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Добавить закладку</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input
                          value={newBookmarkTitle}
                          onChange={(e) => setNewBookmarkTitle(e.target.value)}
                          placeholder="Название сайта"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={newBookmarkUrl}
                          onChange={(e) => setNewBookmarkUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="bg-input border-border/50"
                        />
                      </div>
                      <Button onClick={handleAddBookmark} className="w-full bg-primary hover:bg-primary/90">
                        Сохранить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Bookmark" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Нет сохранённых закладок</p>
                  </div>
                ) : (
                  bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xl">{bookmark.favicon}</span>
                        <div>
                          <div className="font-medium">{bookmark.title}</div>
                          <div className="text-xs text-muted-foreground">{bookmark.url}</div>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="opacity-0 group-hover:opacity-100"
                        onClick={() => handleRemoveBookmark(bookmark.id)}
                      >
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20 neon-border-cyan">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-secondary">История посещений ({history.length})</h2>
                <Button 
                  variant="outline" 
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={handleClearHistory}
                  disabled={history.length === 0}
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить всё
                </Button>
              </div>

              <div className="space-y-2">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Clock" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>История пуста</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Icon name="Globe" size={18} className="text-secondary group-hover:animate-pulse-neon" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.url}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="opacity-0 group-hover:opacity-100"
                          onClick={() => handleRemoveHistoryItem(item.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 neon-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-primary">Скачанные файлы</h2>
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="FolderOpen" size={16} className="mr-2" />
                  Открыть папку
                </Button>
              </div>

              <div className="space-y-2">
                {downloads.map((download) => (
                  <div
                    key={download.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Icon name="FileText" size={18} className="text-primary group-hover:animate-pulse-neon" />
                      <div>
                        <div className="font-medium">{download.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {download.size} • {download.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20 neon-border-cyan">
              <h2 className="text-xl font-semibold mb-6 text-secondary">Общие настройки</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Домашняя страница</label>
                  <Input
                    defaultValue="skz://newtab"
                    className="bg-input border-border/50 focus:border-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Поисковая система</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 focus:border-secondary/50 focus:outline-none">
                    <option>Яндекс</option>
                    <option>Google</option>
                    <option>DuckDuckGo</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-3">Конфиденциальность</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Сохранять историю посещений</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Сохранять куки</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Блокировать рекламу</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-3">О браузере</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>SKZ Browser v1.0</p>
                    <p>На базе платформы Яндекс</p>
                    <p>Работает без интернета</p>
                    <p className="pt-2">© 2024 skz.ru</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
