import { ArrowLeft, Crown, Info, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const navigate = useNavigate();
  const isPro = localStorage.getItem('isPro') === 'true';

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto p-4 space-y-4">
        <header className="flex items-center gap-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
        </header>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" />
                Pro Versiyon
              </CardTitle>
              <CardDescription>
                Gelişmiş özelliklerin kilidini açın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isPro ? (
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-accent">Pro Üye</Badge>
                  <p className="text-sm text-muted-foreground">
                    Tüm özelliklere erişiminiz var!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Pro versiyonda neler var:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Özelleştirilebilir flaş aralıkları (1-30 saniye)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Sınırsız alarm sayısı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Gelecek özellikler için öncelikli erişim</span>
                    </li>
                  </ul>
                  <Button onClick={() => navigate('/pro')} className="w-full">
                    Pro'ya Yükselt
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Kurulum Bilgisi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Bu uygulama Capacitor ile geliştirilmiştir ve Google Play Store'a yayınlanabilir.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Play Store'a yükleme adımları:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Projeyi GitHub'a aktarın</li>
                  <li>npm install çalıştırın</li>
                  <li>npx cap add android</li>
                  <li>npm run build</li>
                  <li>npx cap sync</li>
                  <li>npx cap open android</li>
                  <li>Android Studio'da APK oluşturun</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>FlashAlarm v1.0.0</p>
              <p>© 2025 FlashAlarm</p>
              <p>Flaş ve ekran ışığı ile alarm uygulaması</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
