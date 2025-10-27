import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  folder: string;
}

const Settings = () => {
  const navigate = useNavigate();
  
  const [history] = useState<HistoryItem[]>([
    { id: '1', title: 'Яндекс', url: 'https://yandex.ru', time: '15:30' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com', time: '14:15' },
    { id: '3', title: 'GitHub', url: 'https://github.com', time: '13:00' },
  ]);

  const [downloads] = useState<Download[]>([
    { id: '1', name: 'document.pdf', size: '2.4 МБ', date: '27.10.2024', status: 'completed' },
    { id: '2', name: 'image.jpg', size: '1.8 МБ', date: '26.10.2024', status: 'completed' },
    { id: '3', name: 'archive.zip', size: '15.3 МБ', date: '25.10.2024', status: 'completed' },
  ]);

  const [bookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Яндекс', url: 'https://yandex.ru', folder: 'Избранное' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com', folder: 'Видео' },
    { id: '3', title: 'GitHub', url: 'https://github.com', folder: 'Разработка' },
    { id: '4', title: 'ВКонтакте', url: 'https://vk.com', folder: 'Социальные сети' },
  ]);

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
                <h2 className="text-xl font-semibold text-primary">Закладки</h2>
                <Button className="bg-primary hover:bg-primary/90 neon-border">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>
              
              <div className="mb-4">
                <Input
                  placeholder="Поиск в закладках..."
                  className="bg-input border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Icon name="Bookmark" size={18} className="text-primary group-hover:animate-pulse-neon" />
                      <div>
                        <div className="font-medium">{bookmark.title}</div>
                        <div className="text-xs text-muted-foreground">{bookmark.url}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {bookmark.folder}
                      </span>
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20 neon-border-cyan">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-secondary">История посещений</h2>
                <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить
                </Button>
              </div>

              <div className="mb-4">
                <Input
                  placeholder="Поиск в истории..."
                  className="bg-input border-border/50 focus:border-secondary/50"
                />
              </div>

              <div className="space-y-2">
                {history.map((item) => (
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
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
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
