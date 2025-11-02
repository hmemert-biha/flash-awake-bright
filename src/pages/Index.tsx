import { useState, useEffect } from "react";
import { Plus, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlarmCard } from "@/components/AlarmCard";
import { AddAlarmDialog } from "@/components/AddAlarmDialog";
import { Alarm } from "@/lib/types";
import { loadAlarms, saveAlarms, scheduleAlarm, cancelAlarm, requestNotificationPermission } from "@/lib/alarms";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<Alarm | undefined>();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const stored = loadAlarms();
    setAlarms(stored);
    
    const proStatus = localStorage.getItem('isPro') === 'true';
    setIsPro(proStatus);

    requestNotificationPermission();
  }, []);

  const handleToggleAlarm = async (id: string) => {
    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        const newEnabled = !alarm.enabled;
        
        if (newEnabled) {
          scheduleAlarm({ ...alarm, enabled: true }).catch(() => {
            toast.error("Alarm ayarlanamadı");
          });
        } else {
          cancelAlarm(id).catch(() => {
            toast.error("Alarm iptal edilemedi");
          });
        }
        
        return { ...alarm, enabled: newEnabled };
      }
      return alarm;
    });
    
    setAlarms(updatedAlarms);
    saveAlarms(updatedAlarms);
  };

  const handleSaveAlarm = async (alarm: Alarm) => {
    let updatedAlarms: Alarm[];
    
    if (editingAlarm) {
      updatedAlarms = alarms.map((a) => (a.id === alarm.id ? alarm : a));
    } else {
      updatedAlarms = [...alarms, alarm];
    }
    
    setAlarms(updatedAlarms);
    saveAlarms(updatedAlarms);
    
    if (alarm.enabled) {
      try {
        await scheduleAlarm(alarm);
        toast.success("Alarm kaydedildi");
      } catch (error) {
        toast.error("Alarm ayarlanamadı");
      }
    }
    
    setEditingAlarm(undefined);
  };

  const handleEditAlarm = (alarm: Alarm) => {
    setEditingAlarm(alarm);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAlarm(undefined);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">FlashAlarm</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
          </Button>
        </header>

        <div className="space-y-3">
          {alarms.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Henüz alarm yok</h2>
                <p className="text-muted-foreground">
                  İlk alarmınızı oluşturun
                </p>
              </div>
            </div>
          ) : (
            alarms.map((alarm) => (
              <AlarmCard
                key={alarm.id}
                alarm={alarm}
                onToggle={handleToggleAlarm}
                onClick={handleEditAlarm}
              />
            ))
          )}
        </div>

        <Button
          onClick={handleAddNew}
          size="lg"
          className="w-full shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Yeni Alarm
        </Button>

        <AddAlarmDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          alarm={editingAlarm}
          onSave={handleSaveAlarm}
          isPro={isPro}
        />
      </div>
    </div>
  );
};

export default Index;
