
import { useState } from 'react';
import { Bell, X, Check, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Resource Added',
      message: 'Constitutional Law notes have been uploaded by Prof. Johnson',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: '2',
      title: 'Upcoming Event',
      message: 'Moot Court competition tomorrow at 2 PM in Main Hall',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false
    },
    {
      id: '3',
      title: 'Assignment Due',
      message: 'Contract Law assignment due in 2 days',
      type: 'error',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true
    },
    {
      id: '4',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true
    }
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {!showSettings ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-7 px-2"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(true)}
                  className="h-7 w-7"
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              {notifications.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-muted-foreground">No notifications</div>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`relative p-3 rounded-md hover:bg-muted/50 transition-colors ${
                        !notification.read ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{notification.title}</span>
                            <Badge variant="secondary" className={`text-xs ${getTypeColor(notification.type)}`}>
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="w-full text-xs h-8 text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear all notifications
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notification Settings</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="h-7 px-2"
              >
                Back
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive browser notifications</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
