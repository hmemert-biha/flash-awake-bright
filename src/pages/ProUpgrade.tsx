import { ArrowLeft, Crown, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProUpgrade = () => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    // Stripe entegrasyonu için placeholder
    // Lovable Cloud enable edildikten sonra Stripe entegrasyonu yapılacak
    localStorage.setItem('isPro', 'true');
    toast.success("Pro versiyona yükseltildi! (Demo)");
    setTimeout(() => navigate('/'), 1000);
  };

  const features = [
    {
      title: "Özelleştirilebilir Flaş Aralıkları",
      description: "1-30 saniye arası istediğiniz aralıkta flaş yanıp sönme",
      icon: Zap,
    },
    {
      title: "Sınırsız Alarm",
      description: "İstediğiniz kadar alarm ekleyin",
      icon: Crown,
    },
    {
      title: "Gelecek Özellikler",
      description: "Yeni özelliklere öncelikli erişim",
      icon: Check,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        <header className="flex items-center gap-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Pro'ya Yükselt</h1>
        </header>

        <div className="text-center space-y-2 py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold">FlashAlarm Pro</h2>
          <p className="text-muted-foreground">
            Gelişmiş özelliklerle daha fazlası
          </p>
        </div>

        <Card className="border-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">₺29,99</CardTitle>
            <CardDescription>Tek seferlik ödeme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button onClick={handlePurchase} size="lg" className="w-full">
              Hemen Satın Al
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Tek seferlik ödeme. Gizli ücret yok. İstediğiniz zaman iptal edebilirsiniz.
            </p>
          </CardContent>
        </Card>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Not: Şu an demo modundasınız. Gerçek ödeme için Stripe entegrasyonu yapılacak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProUpgrade;
