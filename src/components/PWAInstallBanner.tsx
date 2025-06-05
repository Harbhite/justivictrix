
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { useServiceWorker } from '@/hooks/useServiceWorker';

const PWAInstallBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { canInstall, installApp } = useServiceWorker();

  if (!canInstall || dismissed) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:left-auto md:right-4 md:w-96">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Install Law Portal</h3>
            <p className="text-xs text-gray-600 mb-3">
              Get quick access to all your study resources with our app!
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={installApp}
                className="flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Install
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setDismissed(true)}
              >
                Later
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDismissed(true)}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallBanner;
